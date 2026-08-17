# Team Vibecoding

Ready to turn your non-technical teams AI-native? Teach them to vibe code in a fun, low risk applet hub and watch what happens!

This repo has all the instructions needed for creating an applet hub that non-technical people can open in a coding agent and use like a chatbot. They describe what they want. The agent builds it, starts a local preview, and sends a link so they can see it right away. When they say **make the link live**, it goes up to [Vercel](https://vercel.com). Note: we recommend Codex for getting started as fast as possible, but this system works with any agent. It was tested with DeepSeek-V4-Flash, Codex and Kimi. It will work for every model.

The two files that make this work are [`AGENTS.md`](./AGENTS.md) (how the agent talks and deploys) and [`INIT.md`](./INIT.md) (how it builds the project the first time).

## One-time setup

1. Open this repo in a coding agent (Cursor, Claude Code, Copilot, Windsurf, or similar).
2. Tell it:

   > Follow the instructions in `INIT.md`, then commit and push everything to `main`.

3. Connect the repo to [Vercel](https://vercel.com) and deploy it. Optional: set a `PASSWORD` env var if you want the site locked, or `LLM_API` if applets will call an AI provider.
4. Invite people as [GitHub collaborators](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository).

They clone the repo (a container or Codespace is fine) and talk to the agent. That is the whole setup.

## What people say to the agent

You do not need to write code, run terminal commands, or learn Git.

- **New applet:** "I want to build an applet for a feedback form."
- **See it:** "Show me" or "Let me see it." The agent should also send a preview link on its own after it builds something.
- **Change something:** "Make the buttons on the landing page blue."
- **Put it on the internet:** "Make the link live."
- **Keep it from expiring:** "I want this applet to stay live for 90 days."
