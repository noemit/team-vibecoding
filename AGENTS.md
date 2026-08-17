# Repository Instructions & Agent Rules

## Communication Style & Tone
- **Audience:** The user is non-technical. Speak in plain English, avoiding developer jargon (e.g., instead of "merge conflicts" or "npm build failures," explain what happened and what to do next).
- **No Terminal Commands:** Never instruct the user to run terminal commands, install packages, or manipulate Git directly. Handle setup, runs, and configuration automatically through natural language prompts.
- **Multimodal Debugging:** If an issue occurs, invite visual debugging: *"Can you paste a screenshot of what you see?"* or *"Copy and paste the text on your screen so I can look into it."*
- **Decisive Guidance:** Provide one clear recommendation rather than presenting complex technical trade-offs, unless the user specifically asks for options.

## Deployment & Publishing Triggers
- Treat phrases like **"Deploy," "Make this live," "Publish," "Update the live link,"** or **"Send this up"** as a deployment trigger.
- **Deployment Process:**
  1. Silently pull and merge the latest changes from `origin/main`.
  2. Bump the patch version in `package.json` (or prototype metadata).
  3. Ask for confirmation using natural language: *"Ready to send these changes up to GitHub and update your live Vercel link?"*
  4. Once confirmed, ask for a user note: *"Would you like to add a quick note to label this version? I suggest: '<short plain-English summary>'. Works for you, or want to change it?"*
  5. Run `git add .`, `git commit -m "<note>"`, and `git push origin main`.

## Prototype Workflow & Lifecycle
- **Planning First:** Before writing code for a new prototype, ask 2–3 brief questions to understand the goal, target user, and key interactions.
- **Drafting Strategy:** Draft a `notes/plan.md` inside the prototype directory detailing the core goal and required interactions. Wait for approval before coding.
- **Metadata Management:** Every prototype directory must maintain a `metadata.json` (or header config) containing:
  - `title`: Name of prototype
  - `creator`: Creator's name (ask for this when creating)
  - `lastModified`: Current ISO date
  - `lastModifiedBy`: Person modifying the prototype
  - `expiryOverride`: `"standard"` (30 days), `"90days"`, or `"permalive"`
- **Updating Metadata:** Update `lastModified` and `lastModifiedBy` whenever changes are made, or when the user says *"Keep this live"* or *"I want this prototype to stay live."* If requested, set `expiryOverride` to `"90days"` or `"permalive"`.

## File & Asset Handling
- When users have content or data, instruct them on where to drop files:
  - Large assets (CSVs, PDFs, raw data): Place in `resources/` inside the prototype folder.
  - Images/UI assets: Place in `images/` inside the prototype folder.
- If the user cannot find the folder, offer to let them paste raw text directly into the chat.

## Local Environment & Fail-safes
- Automatically run `git pull origin main` before starting new tasks.
- If Node/npm issues or missing dependencies occur, attempt self-healing using a local runtime (`bash scripts/install-local-node.sh` followed by `source .node/env.sh`).
