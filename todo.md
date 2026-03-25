# Tradie Brand Archetype Quiz - TODO

## Phase 1: Data Layer & Schema
- [x] Create DB schema: quiz_submissions, email_captures tables
- [x] Write archetype data objects (5-7 archetypes with full brand playbooks)
- [x] Write 20-25 quiz questions with weighted scoring map
- [x] Write scoring engine logic

## Phase 2: Backend
- [x] tRPC router: submitQuiz (calculate scores, return archetype result)
- [x] tRPC router: captureEmail (save email + send playbook email)
- [x] Email template: archetype breakdown + next steps

## Phase 3: Frontend
- [x] Landing page with hook headline and CTA
- [x] Quiz page: mobile-first, progress indicator, multiple choice + Likert scale
- [x] Results page: archetype reveal + partial teaser
- [x] Email gate: optional capture before full playbook unlock
- [x] Full brand playbook display (post email capture)
- [x] App routing (/, /quiz, /results)

## Phase 4: Polish & Tests
- [x] Global styling: dark, gritty-premium tradie aesthetic
- [x] Mobile responsiveness pass
- [x] Vitest: scoring engine unit tests
- [x] Vitest: router tests
- [x] Final checkpoint

## Phase 5: Email Delivery & Sheets Integration
- [x] Add Resend API key secret
- [x] Install resend npm package (using Gmail MCP instead)
- [x] Build shareable playbook URL (results page accessible via direct link with submissionId)
- [x] Update email template to include shareable playbook link
- [x] Wire Gmail MCP in server to actually send email on capture
- [x] Google Sheets logging: append row on every email capture (email, name, archetype, timestamp)
- [x] Test full flow end-to-end
- [x] Update vitest tests for email router (23 passing)
- [x] Save checkpoint

## Phase 6: Email Gate UX Fix (Mobile)
- [x] Add explicit "Get My Playbook" submit button after name/email fields
- [x] Remove auto-unlock on mutation success — wait for button press
- [x] On submit success: show full playbook inline (no new window needed, smooth scroll down)
- [x] Add loading state on button while mutation is in-flight
- [x] Add success confirmation banner after email sent
- [x] Ensure skip option still works cleanly

## Phase 7: Sheets + Email Production Fix
- [x] Debug sheetsLogger.ts — CLI tools (gws, manus-mcp-cli) not available in deployed runtime
- [x] Fix sheetsLogger to use Google Sheets REST API directly with GOOGLE_WORKSPACE_CLI_TOKEN
- [x] Fix emailSender to use Resend REST API (re_X8YpgeC2 key stored as RESEND_API_KEY)
- [x] Verified Sheets append: 200 OK, row lands in spreadsheet
- [x] Verified Resend send: 200 OK, email id b3c1c6b4 delivered
- [x] All 23 tests passing
- [x] Save checkpoint

## Phase 8: Self-Assessment & Value Upgrade

### Quiz Issues
- [ ] Q3/Q8/Q19 are too similar — all test quality vs speed. Consolidate to 1, replace 2 with new categories
- [ ] Likert questions (Q20-Q25) are too abstract and corporate-sounding for tradies
- [ ] Q7 (difficult client) and Q15 (price match) overlap heavily — merge or replace one
- [ ] Missing category: "What do you do on a Sunday arvo?" — personality/lifestyle signal
- [ ] Missing category: social media behaviour — do they post, avoid it, or obsess over it
- [ ] Scoring: Craftsman and Specialist are too close in most questions — hard to differentiate
- [ ] Secondary archetype threshold (85%) is too tight — most users won't get one

### Archetype Issues
- [ ] Playbook content is good but too generic in places — needs specific tradie examples
- [ ] "What to post" lists are too long (6 items) — trim to 3 killer ones
- [ ] Growth strategy sections are strong but the "common blockers" are too similar across archetypes
- [ ] The Hustler playbook undersells the pivot opportunity — needs a "your next move" section
- [ ] Maverick and Leader overlap too much in brand identity and content strategy
- [ ] Guardian archetype needs a stronger emotional hook — currently reads too passive

### Results Page Issues
- [ ] Teaser shows 3 strengths + 3 weaknesses — good, but the gate copy is weak
- [ ] Email gate headline "Unlock Your Full Brand Playbook" is generic — needs archetype-specific hook
- [ ] Post-unlock playbook sections are dense text walls — need visual hierarchy
- [ ] No "your #1 action this week" moment — the most valuable thing missing

### Fixes
- [ ] Rewrite 6 weakest quiz questions with sharper tradie language
- [ ] Add "your #1 action this week" to every archetype playbook
- [ ] Make email gate headline archetype-specific
- [ ] Add visual hierarchy to playbook sections (icons, callout boxes)
- [ ] Tighten Likert questions to feel like real tradie decisions, not surveys
- [ ] Adjust secondary archetype threshold to 80% for better coverage

### Completed
- [x] Rewrite all 25 quiz questions with sharper, more distinct tradie language
- [x] Rewrite all 7 archetype playbooks with deeper, more specific content
- [x] Add #1 Action This Week to every archetype
- [x] Surface actionThisWeek as a hero callout on the results page
- [x] Add Copy Results Link button to the playbook
- [x] Update email gate copy to be archetype-specific
- [x] Adjust secondary archetype threshold to 80%
- [x] Update tests to match new quiz question weights (23 passing)

## Phase 9: Production Email + Sheets Debug
- [ ] Check live server logs for email capture errors
- [ ] Verify RESEND_API_KEY and GOOGLE_WORKSPACE_CLI_TOKEN are set in production env
- [ ] Fix emailSender.ts root cause
- [ ] Fix sheetsLogger.ts root cause
- [ ] Run live end-to-end test
- [ ] Verify Sheets row lands and email is delivered
- [ ] Save checkpoint

## Phase 10: Secure Admin Dashboard
- [ ] Add adminProcedure (owner-only, role=admin gate) to tRPC
- [ ] Add getLeads query returning all email_captures with submission data
- [ ] Add getStats query returning archetype distribution and conversion rate
- [ ] Build /admin route with Manus OAuth login gate
- [ ] Build leads table: name, email, archetype, email status, date
- [ ] Build stats row: total submissions, email captures, conversion rate, top archetype
- [ ] Add CSV export button
- [ ] Add /admin route to App.tsx
- [ ] Write tests for admin procedures
- [ ] Save checkpoint
