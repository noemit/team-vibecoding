# Hiring Tracker — Plan

## Goal
A live "Hiring Tracker" page where the whole team can see every hire in flight: who's in which pipeline, what stage they're at, what the team thinks of them, and what happens next. Updates happen by chatting with an agent in this repo (the same way the HR manager works today) and redeploying — no spreadsheets, no accounts.

## How people use it
- **Anyone with the link (and the hub password)** can view all pipelines and candidates.
- **Adding a note:** a teammate opens this repo in an agent, says e.g. *"Add a note to Elena Rostova: she asked for a decision by Friday — signed, Marcus"*, the agent updates the candidate's notes (labeled with author + date), commits, and pushes. The live site updates on the next deploy.
- **HR manager's daily refresh:** chats with an agent to move stages, update next steps, mark statuses — same flow, every day.

## Data model (one file, easy for agents to edit)
`applets/hiring-tracker/data.ts` holds three pipelines (Chief of Staff, Backend Engineer, Growth Marketer), each with candidates:

- `name` — candidate name
- `role` — which role they're interviewing for
- `status` — Active / Offer / Rejected / Withdrawn / Paused etc.
- `stage` — current stage (Recruiter Screen, HM Screen, Final Panel…)
- `feedback` — the team's notes & feedback (from the existing report)
- `nextStep` — short text like "HM screen on Thursday", plus owner and due date when known
- `notes` — list of `{ author, date, text }` added over time by anyone in the team (starts empty; grows as people add notes via chat)

All 47 candidates from the HR manager's report are seeded in, including their stages and existing feedback. Next steps are included where the report states one (e.g. "Offer expires Friday").

## Page layout
- Header: title, generated date, password protected by the hub as normal.
- Summary chips: total candidates, per-pipeline counts, counts by status (e.g. 3 offers out).
- Three sections (one per pipeline), each listing candidate cards:
  - Name, stage badge, status badge
  - Team feedback (the original notes)
  - Next step (text + owner + due date) when present
  - Labeled notes: each shows "Marcus · Aug 17" style attribution
- Clean, readable, works on phones.

## Files
- `applets/hiring-tracker/metadata.json` — title, creator, lastModified, lastModifiedBy, expiryOverride: "standard"
- `applets/hiring-tracker/data.ts` — the pipelines data
- `applets/hiring-tracker/applet.tsx` — the tracker page
- `applets/hiring-tracker/notes/plan.md` — this plan

## After approval
1. Build the files.
2. Start the local preview and share the link.
3. On "make it live" — bump version, push, and it deploys to Vercel (hub password still applies).
