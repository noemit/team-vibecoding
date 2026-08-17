# Repository Initialization Prompt

You are tasked with bootstrapping a Next.js applet hub optimized for non-technical vibe coders. Execute the following setup steps:

## 1. Next.js Framework & Layout Setup
- Initialize a Next.js (App Router) project with Tailwind CSS.
- Create a clean main landing page (`/`) that lists all applets found under the `/applets` directory.

## 2. Dynamic Applet & Expiry Engine
- Build an applet registry utility that reads applet metadata files (`metadata.json`).
- Implement the 30-day build filtering logic:
  - **Active Applets:** Built normally if `lastModified` is within 30 days, OR if `expiryOverride` is `"90days"` (and within 90 days), OR if `expiryOverride` is `"permalive"`.
  - **Inactive Applets:** If expired, exclude the route from static generation. Display the applet on the index page grayed out with the label: *"Applet inactive (not modified in 30 days). Ask your AI agent to enable it."*

## 3. Password Protection & Security
- Add Next.js middleware that checks for a `PASSWORD` environment variable.
- If `PASSWORD` is set, restrict access to the site via a simple full-page password form using HTTP cookies/sessions. If not set, keep the site public.

## 4. Environment & API Setup
- Ask the user if they would like to configure `PASSWORD` or `LLM_API` keys.
- If the user provides an `LLM_API` key, ask which AI provider it belongs to (e.g., OpenAI, Anthropic) and append provider documentation notes to `AGENTS.md`.

## 5. First-Time Scaffolding
- Create template folders: `applets/_template`, `notes/`, `resources/`.
- Create a helper script `scripts/install-local-node.sh` to install a local standalone Node.js environment if missing.
- Commit all initial files to `main`.
