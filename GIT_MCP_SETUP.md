# Git MCP Server Setup

This document describes the setup of the Git MCP Server (`@cyanheads/git-mcp-server`) for use with Cursor AI.

## Overview

The Git MCP Server enables AI agents to interact with Git repositories through the Model Context Protocol (MCP). It provides 27 comprehensive Git operations organized into six functional categories.

## Installation

The Git MCP Server has been configured in the MCP configuration file located at: `~/.cursor/mcp.json`

## Configuration

```json
{
  "git-mcp-server": {
    "command": "npx",
    "args": ["-y", "@cyanheads/git-mcp-server@latest"],
    "env": {
      "MCP_TRANSPORT_TYPE": "stdio",
      "MCP_LOG_LEVEL": "info",
      "GIT_BASE_DIR": "/home/mint/Desktop/cursor-projects",
      "LOGS_DIR": "/home/mint/.cursor/logs/git-mcp-server/",
      "GIT_USERNAME": "kristo",
      "GIT_EMAIL": "kristoferjussmann@gmail.com",
      "GIT_SIGN_COMMITS": "false"
    }
  }
}
```

## Environment Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `MCP_TRANSPORT_TYPE` | `stdio` | The transport protocol (standard I/O) |
| `MCP_LOG_LEVEL` | `info` | Logging level for the server |
| `GIT_BASE_DIR` | `/home/mint/Desktop/cursor-projects` | Base directory for all git operations (security sandboxing) |
| `LOGS_DIR` | `~/.cursor/logs/git-mcp-server/` | Directory for server logs |
| `GIT_USERNAME` | `kristo` | Your Git username |
| `GIT_EMAIL` | `kristoferjussmann@gmail.com` | Your Git email |
| `GIT_SIGN_COMMITS` | `false` | Whether to sign commits with GPG/SSH |

## Available Tools (27)

The Git MCP Server provides the following categories of tools:

### Repository Management
- `git_init` - Initialize new repositories
- `git_clone` - Clone from remote repositories
- `git_status` - Check repository status
- `git_clean` - Clean untracked files

### Staging & Commits
- `git_add` - Stage changes
- `git_commit` - Create commits
- `git_diff` - Compare changes

### History & Inspection
- `git_log` - View commit history
- `git_show` - Inspect objects
- `git_blame` - Trace line-by-line authorship
- `git_reflog` - View reference logs

### Branching & Merging
- `git_branch` - Manage branches
- `git_checkout` - Switch contexts
- `git_merge` - Integrate changes
- `git_rebase` - Reapply commits
- `git_cherry_pick` - Apply specific commits

### Remote Operations
- `git_remote` - Configure remotes
- `git_fetch` - Download updates
- `git_pull` - Synchronize repositories
- `git_push` - Publish changes

### Advanced Workflows
- `git_tag` - Tag releases
- `git_stash` - Stash changes
- `git_reset` - Reset repository state
- `git_worktree` - Manage worktrees
- `git_set_working_dir` - Set session directory
- `git_clear_working_dir` - Clear session directory
- `git_wrapup_instructions` - Access workflow guidance

## Resources

The server provides contextual information:

- **Git Working Directory** (`git://working-directory`) - Current session working directory for git operations

## Prompts

- **Git Wrap-up** - Systematic workflow protocol for completing git sessions

## How to Use

After restarting Cursor, the Git MCP Server will be available automatically. You can ask the AI to perform git operations like:

- "Show me the git status of this repository"
- "Create a new branch called feature/new-feature"
- "Commit all staged changes with message 'Add new feature'"
- "Push changes to origin"
- And many more git operations!

## Security Features

- **Path Sanitization**: All paths are validated to prevent directory traversal
- **Base Directory Restriction**: Operations are restricted to `/home/mint/Desktop/cursor-projects`
- **Command Injection Prevention**: Git commands use validated arguments
- **Destructive Operation Protection**: Dangerous operations require explicit confirmation
- **Audit Logging**: All operations are logged for security auditing

## Restart Required

**Important**: You need to restart Cursor for the Git MCP Server to become available.

## Troubleshooting

If the Git MCP Server doesn't work:

1. Check that Node.js is installed: `node --version` (requires v20.0.0+)
2. Verify the configuration in `~/.cursor/mcp.json`
3. Check logs in `~/.cursor/logs/git-mcp-server/`
4. Restart Cursor
5. In Cursor, open Settings → MCP tab to verify the server is listed

## References

- [Git MCP Server GitHub Repository](https://github.com/cyanheads/git-mcp-server)
- [Git MCP Server on NPM](https://www.npmjs.com/package/@cyanheads/git-mcp-server)
- [MCP Market Listing](https://mcpmarket.com/server/git-4)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/)

## Other MCP Servers Configured

Your system also has these MCP servers configured:

1. **Brave Search** - Web search capabilities
2. **Firecrawl** - Web scraping (⚠️ API key needs updating)
3. **GitHub** - GitHub API integration (⚠️ Token needs updating)

### Action Items

- ⚠️ **Firecrawl API Key**: The current API key is invalid. Get a new key from [firecrawl.dev](https://firecrawl.dev)
- ⚠️ **GitHub Token**: Update `GITHUB_PERSONAL_ACCESS_TOKEN` in the mcp.json file with a valid GitHub Personal Access Token

---

**Setup Date**: October 18, 2025
**Configured By**: AI Assistant

