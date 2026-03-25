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
