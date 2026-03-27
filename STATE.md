# Tradie Quiz Site — STATE.md

## Repo Status
- **Local Control:** ✅ Confirmed — cloned from https://github.com/ddjesseai-prog/tradie-archetype-quiz
- **Location:** `/Users/ddai/.openclaw/workspace/projects/tradie_quiz_site`
- **Last Updated:** 2026-03-27

## Stack Summary
| Layer | Technology |
|-------|------------|
| Frontend | React 19 + Vite 7 + TailwindCSS 4 |
| Routing | wouter (SPA routing) |
| Backend | Express + tRPC API |
| Database | MySQL + Drizzle ORM |
| Email | Resend API |
| Storage | AWS S3 (presigned URLs) |
| Auth | JWT via jose |

## Key File Paths

| Purpose | Path |
|---------|------|
| Quiz questions (18 Q) | `shared/quiz.ts` |
| Archetypes (7 types) | `shared/archetypes.ts` |
| Scoring logic | `shared/scoring.ts` |
| Frontend entry | `client/src/main.tsx` |
| Frontend app | `client/src/App.tsx` |
| Quiz page | `client/src/pages/Quiz.tsx` |
| Results page | `client/src/pages/Results.tsx` |
| Email capture | `server/routers.ts` → `server/emailSender.ts` |
| DB schema | `drizzle/schema.ts` |
| API routes | `server/routers.ts` |

## Environment Variables Needed (CRM Prep)
```
DATABASE_URL (MySQL)
JWT_SECRET
RESEND_API_KEY
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_S3_BUCKET
```

## Next Recommended Step
Run `pnpm install` locally to validate dependencies, then test dev server (`pnpm dev`) to confirm the app builds and serves.

## CRM Integration Readiness
- **Backend exists:** Yes (tRPC + Express)
- **Email capture exists:** Yes (Resend)
- **Data schema exists:** Yes (Drizzle with users/results tables)
- **CRM hook:** ✅ Added — `server/crmLogger.ts` writes to `data/crm-leads.jsonl`

## Isolated Tradie Engine
| Component | Path | Status |
|-----------|------|--------|
| SQLite DB | `data/tradie.db` | ✅ Created (sql.js) |
| Sequences | `scripts/tradie-sequences.json` | ✅ Created |
| Engine | `scripts/tradie-engine.ts` | ✅ Working |
| Env template | `.env.tradie.example` | ✅ Created |
| Package scripts | `tradie:engine`, `tradie:sync` | ✅ Added |

## Files Changed (CRM Hook)
| File | Change |
|------|--------|
| `server/crmLogger.ts` | NEW — CRM payload builder + JSONL logger |
| `server/routers.ts` | ADDED — CRM log call in email.capture mutation |
| `server/db.ts` | ADDED — `getQuizSubmissionAnswers()` helper |
| `.gitignore` | ADDED — `data/` directory to gitignore |

## Files Created (Isolated System)
| File | Purpose |
|------|---------|
| `scripts/tradie-db.ts` | SQLite storage layer (sql.js) |
| `scripts/tradie-engine.ts` | Follow-up engine |
| `scripts/tradie-sequences.json` | Sequence definitions |
| `.env.tradie.example` | Env template |
| `data/tradie.db` | SQLite database (auto-created) |
| `data/crm-leads.jsonl` | Lead log (auto-created on first capture) |
| `scripts/com.dreamdealer.tradie-engine.plist` | LaunchAgent (5 min interval) |

## End-to-End Flow Verified
```
quiz submit → server/routers.ts → crmLogger.ts → data/crm-leads.jsonl
                                                          ↓
                                            tradie-engine (syncs JSONL)
                                                          ↓
                                            SQLite (leads table)
                                                          ↓
                                            sequence_state (post_quiz_capture)
```

## System Status
- **Mode:** LIVE-SEND ✅
- **LaunchAgent:** ✅ Loaded (ai.dreamdealer.tradie-engine, every 5 min)
- **Flow:** Verified end-to-end
- **Last test:** 27 Mar 2026 — email sent to jesse@dreamdealer.com.au
- **Status:** FULLY LIVE ✅
- **CRM View:** ✅ Available at /tradie-leads