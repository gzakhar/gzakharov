# TaskBridge execution environment for this project (M2.5).
#
# TaskBridge builds this at boot (taskbridge-env-<worker-id>) and runs each
# task's Claude inside a disposable container from it. This file defines the
# toolchain the AI worker gets — the project owns its environment.
FROM node:20-bookworm-slim

# git: lets the worker inspect history/diffs in its worktree
RUN apt-get update \
  && apt-get install -y --no-install-recommends git ca-certificates procps \
  && rm -rf /var/lib/apt/lists/*

# The worker CLI itself + a static file server so the worker can serve the
# site and check its work (this is a static HTML/CSS project).
RUN npm install -g @anthropic-ai/claude-code @openai/codex http-server
