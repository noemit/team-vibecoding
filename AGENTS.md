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
  2. Bump the patch version in `package.json` (or applet metadata).
  3. Ask for confirmation using natural language: *"Ready to send these changes up to GitHub and update your live Vercel link?"*
  4. Once confirmed, ask for a user note: *"Would you like to add a quick note to label this version? I suggest: '<short plain-English summary>'. Works for you, or want to change it?"*
  5. Run `git add .`, `git commit -m "<note>"`, and `git push origin main`.

## Applet Workflow & Lifecycle
- **Planning First:** Before writing code for a new applet, ask 2–3 brief questions to understand the goal, target user, and key interactions.
- **Ask for the creator's name:** When someone builds an applet, ask what their name is so it can be recorded on the applet. A job title alone is not enough — get the person's actual name (e.g. "what name should I put on this applet?").
- **Drafting Strategy:** Draft a `notes/plan.md` inside the applet directory detailing the core goal and required interactions. Wait for approval before coding.
- **No Per-Applet Passwords:** Never add password protection or login to an individual applet. The only password protection on the site is the site-wide `PASSWORD` set up during initial setup (see `INIT.md`). If someone asks to lock a single applet, explain that protection applies to the whole site only.
- **Metadata Management:** Every applet directory must maintain a `metadata.json` (or header config) containing:
  - `title`: Name of applet
  - `creator`: The person's actual name (ask for it when creating — a job title alone is not enough)
  - `lastModified`: Current ISO date
  - `lastModifiedBy`: Person modifying the applet
  - `expiryOverride`: `"standard"` (30 days), `"90days"`, or `"permalive"`
- **Updating Metadata:** Update `lastModified` and `lastModifiedBy` whenever changes are made, or when the user says *"Keep this live"* or *"I want this applet to stay live."* If requested, set `expiryOverride` to `"90days"` or `"permalive"`.

## Teamwork & Shared Editing
- **Assume teammates and other people update this repo too.** Anyone with access can open the repo, talk to an agent, and add or edit pages and data. Always pull the latest changes before starting (`git pull origin main`) and assume files may have changed since you last saw them.
- **The repo is the only place data lives.** Never suggest setting up external data sources, databases, Google Sheets, or any outside service. Teammates add or edit data through the repo: new or updated files in an applet folder (e.g. `resources/`, `images/`, `notes/`, or a data file the applet reads). If two people edit at once, keep both sets of changes and mention that both updates are now live.

## File & Asset Handling
- When users have content or data, instruct them on where to drop files:
  - Large assets (CSVs, PDFs, raw data): Place in `resources/` inside the applet folder.
  - Images/UI assets: Place in `images/` inside the applet folder.
- If the user cannot find the folder, offer to let them paste raw text directly into the chat.
- Data the user wants an applet to show goes in a file inside the applet folder and is committed to the repo. The repo is the source of truth — no external services.

## Local Preview
- Be eager to show the user their work. After you build or change something, start the local preview server yourself and give them a clickable link. Do not wait for them to ask.
- Treat phrases like **"Let me see it," "Show me," "Preview," "Open it,"** or **"Can I look at it?"** as a preview trigger. Start (or restart) the local server and send the link again.
- Run the Next.js dev server for them (`npm run dev`, bind so their browser can reach it). Never ask them to start it.
- Hand them the URL in plain language, e.g. *"Here's your preview: http://localhost:3000"* (use the real port if it is not 3000, and the applet path if they are looking at one page).
- If the preview is already running, reuse it. If it died or a change needs a restart, start it again and confirm the new link works.
- After sending the link, invite them to look: *"Click that and tell me what you think. A screenshot helps if something looks off."*

## Local Environment & Fail-safes
- Automatically run `git pull origin main` before starting new tasks.
- If Node/npm issues or missing dependencies occur, attempt self-healing using a local runtime (`bash scripts/install-local-node.sh` followed by `source .node/env.sh`).
