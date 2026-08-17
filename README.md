# Vibe Coding Prototype Hub

A GitHub repo non-technical people can open in a coding agent and use like a chatbot. They describe what they want. The agent builds it. When they say **make the link live**, it goes up to [Vercel](https://vercel.com).

The two files that make this work are [`AGENTS.md`](./AGENTS.md) (how the agent talks and deploys) and [`INIT.md`](./INIT.md) (how it builds the project the first time).

## One-time setup

1. Open this repo in a coding agent (Cursor, Claude Code, Copilot, Windsurf, or similar).
2. Tell it:

   > Follow the instructions in `INIT.md`, then commit and push everything to `main`.

3. Connect the repo to [Vercel](https://vercel.com) and deploy it. Optional: set a `PASSWORD` env var if you want the site locked, or `LLM_API` if prototypes will call an AI provider.
4. Invite people as [GitHub collaborators](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository).

They clone the repo (a container or Codespace is fine) and talk to the agent. That is the whole setup.

## What people say to the agent

You do not need to write code, run terminal commands, or learn Git.

- **New prototype:** "I want to build a prototype for a feedback form."
- **Change something:** "Make the buttons on the landing page blue."
- **Put it on the internet:** "Make the link live."
- **Keep it from expiring:** "I want this prototype to stay live for 90 days."
