# Tradie Quiz — Isolated CRM Architecture

Reference: DreamDealer Cypher system (production)

---

## Proposed Isolated Architecture

```
tradie_quiz_site/
├── data/                          # LOCAL STORAGE (isolated)
│   ├── crm-leads.jsonl           # Quiz leads (JSONL)
│   ├── tradie.db                 # SQLite follow-up state
│   └── sequences.json            # Tradie-specific sequences
├── server/
│   └── tradie-engine.ts          # Follow-up engine (like cypher/engine.py)
├── scripts/
│   ├── tradie-ingestion.py       # Lead ingestion (like cypher/ingestion)
│   ├── tradie-sequences.json     # Follow-up sequences
│   └── tradie-manual-review.py   # Manual review handler
└── .env.tradie                   # Separate config
```

---

## Layer Mapping (DreamDealer → Tradie Quiz)

| DreamDealer (Cypher) | Tradie Quiz (Isolated) | Reusable? |
|---------------------|------------------------|-----------|
| `dreamdealer.db` | `tradie.db` | ❌ Separate |
| `engine.py` | `server/tradie-engine.ts` | ⚠️ Pattern only |
| `sequences.json` | `scripts/tradie-sequences.json` | ⚠️ Separate content |
| `lead-ingestion.py` | `tradie-ingestion.py` | ⚠️ Pattern only |
| `manual-review-cycle.py` | `tradie-manual-review.py` | ⚠️ Pattern only |
| `sheets-leads-poller.py` | Built into quiz app | N/A |
| Twilio SMS | Different channel (Resend email for now) | ❌ Separate |
| Ignition Cloud CRM | DreamDealer (future bridge) | ❌ Separate |

---

## What Can Be Reused Safely

| Component | How to Reuse |
|-----------|--------------|
| **Qualification flow logic** | Pattern from Cypher — adapt stage names |
| **State machine structure** | Same `qual_stage` / `sequence_status` pattern |
| **Manual review triggers** | Copy trigger logic (e.g., no response after N days) |
| **Logging structure** | JSONL format compatible |
| **LaunchAgent patterns** | Same service structure, different names |

---

## What Must Remain Separate

| Component | Why |
|-----------|-----|
| **Database (SQLite)** | Different lead records, no shared tables |
| **Phone numbers** | Different SMS/email destinations |
| **Sequences** | Tradie-specific content (not DreamDealer loan content) |
| **Environment variables** | Separate API keys, tokens |
| **Telegram bot** | Separate channel or bot |
| **CRM endpoint** | DreamDealer vs Tradie brand |
| **Logs/task tracking** | Separate files, avoid confusion |

---

## The Clean Bridge Point

When ready to send qualified Tradie Quiz leads to DreamDealer:

**Bridge Location:** `server/crmLogger.ts` (already exists)

**Current:** Writes to `data/crm-leads.jsonl`

**Future:** Replace with:
```typescript
// Option A: Direct to DreamDealer API
await fetch("https://dreamdealer.com/api/leads", { ... })

// Option B: Via shared queue (recommended for decoupling)
// Write to /workspace/cypher/bridge-queue.jsonl
// Cypher engine picks up and processes
```

**Recommended:** Queue-based bridge
- Tradie Quiz writes lead to `cypher/bridge-queue.jsonl`
- Cypher engine (already running) polls queue on interval
- On "bridge" trigger, creates DreamDealer lead via Ignition Cloud API

**Why queue-based:**
1. No direct coupling between systems
2. Lead doesn't enter DreamDealer until explicitly bridged
3. Jesse can review/moderate before cross-system handoff
4. Easy to audit what's bridged vs not

---

## Next Steps (Implementation Order)

1. **LaunchAgents** — Set up isolated services
2. **tradie-sequences.json** — Define follow-up content
3. **tradie-engine.ts** — Run sequences
4. **Manual review** — Tradie-specific triggers
5. **Bridge queue** — At go-live, wire to DreamDealer