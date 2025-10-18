# GitMCP Server Setup

This document describes the setup of the GitMCP Server (`idosal/git-mcp`) for use with Cursor AI.

## Overview

GitMCP is a free, open-source remote MCP server that transforms GitHub repositories into comprehensive documentation hubs accessible to AI assistants. It provides seamless access to the latest documentation and code from any public GitHub repository, effectively eliminating AI hallucinations.

**Official Repository**: [https://github.com/idosal/git-mcp](https://github.com/idosal/git-mcp)  
**Website**: [https://gitmcp.io](https://gitmcp.io)

## Installation

The GitMCP Server has been configured in the MCP configuration file located at: `~/.cursor/mcp.json`

## Configuration

```json
{
  "gitmcp": {
    "command": "npx",
    "args": ["-y", "mcp-remote", "https://gitmcp.io/docs"]
  }
}
```

This configuration uses the **dynamic endpoint** (`https://gitmcp.io/docs`), which allows the AI to access any public GitHub repository on demand without pre-configuring specific repositories.

### Alternative: Repository-Specific Configuration

If you want to limit access to specific repositories, you can use:

```json
{
  "gitmcp": {
    "command": "npx",
    "args": ["-y", "mcp-remote", "https://gitmcp.io/{owner}/{repo}"]
  }
}
```

Replace `{owner}` and `{repo}` with the actual GitHub username/organization and repository name.

## Key Features

- **Eliminates AI Hallucinations**: Ensures AI assistants have accurate context by providing up-to-date documentation and code
- **Free and Open-Source**: Available for use without cost, with options for self-hosting
- **Zero Setup**: Operates in the cloud, requiring no initial configuration
- **Smart Search Capabilities**: Efficiently finds information within GitHub projects
- **Works with Any Public Repository**: No modifications needed to the target repository

## Available Tools

GitMCP provides AI assistants with several valuable tools to help them access, understand, and query GitHub repositories:

### `fetch_generic_documentation`

Gets the primary documentation from a GitHub repository. It retrieves relevant documentation (e.g., `llms.txt`, `README.md`, or AI-optimized documentation).

**When it's useful**: For general questions about a project's purpose, features, or how to get started

**Example**: *"What is LangGraph and how do I use it?"*

### `search_generic_documentation`

Searches through a repository's documentation by providing a specific search query. Uses intelligent search to find just the relevant parts instead of loading all documentation.

**When it's useful**: For specific questions about particular features, functions, or concepts within a project

**Example**: *"How do I add memory to a LangGraph agent?"*

### `fetch_url_content`

Retrieves information from links mentioned in the documentation and converts it to a format the AI can easily read.

**When it's useful**: When documentation references external information that would help answer your question

### `search_generic_code`

Searches through the actual code in the repository using GitHub's code search. Helps AI find specific code examples or implementation details.

**When it's useful**: When you want examples of how something is implemented or need technical details not covered in documentation

**Example**: *"Show me how React implements useState"*

## Supported Documentation

GitMCP currently supports the following documents (in order of priority):

1. `llms.txt`
2. AI-optimized version of the project's documentation
3. `README.md` / root documentation

## How It Works

1. **You provide a GitMCP prompt** to your AI assistant (e.g., asking about a GitHub project)
2. **Prompt the AI assistant** with documentation/code-related questions
3. **Your AI sends requests** to GitMCP to use its tools (with your approval)
4. **GitMCP executes the AI's request** and returns the requested data from GitHub
5. **Your AI receives the information** and generates an accurate, grounded response

## Use Cases

### 1. Learning About Libraries and Frameworks

**Prompt**: *"I want to learn about the OpenAI Whisper speech recognition model. Explain how it works."*

The AI will use GitMCP to fetch documentation and code from the Whisper repository.

### 2. Implementing Features Based on Documentation

**Prompt**: *"Add memory to my LangGraph agent"*

The AI will pull the relevant documentation and code from the LangGraph repository to implement the feature correctly.

### 3. Finding Code Examples

**Prompt**: *"How does Next.js handle routing?"*

The AI will search through Next.js documentation and code to find and explain the routing implementation.

### 4. Understanding APIs and SDKs

**Prompt**: *"Show me examples of using the Playwright MCP server"*

The AI will fetch documentation and code examples from the Playwright MCP repository.

## Practical Examples

### Example 1: Using with Cursor

**Prompt**: *"How do I implement authentication in Next.js using the official examples?"*

Cursor will use GitMCP to fetch Next.js documentation and code examples for authentication.

### Example 2: Exploring Libraries

**Prompt**: *"What features does the Tailwind CSS library offer?"*

The AI will fetch Tailwind CSS documentation through GitMCP.

### Example 3: Code Implementation Details

**Prompt**: *"Show me how React implements the useEffect hook internally"*

The AI will search React's codebase to find the implementation details.

## Privacy & Security

- **No Authentication Required**: GitMCP doesn't require or store any personally identifiable information
- **No Query Storage**: GitMCP doesn't store any queries sent by agents
- **Public Content Only**: GitMCP only accesses content that is already publicly available on GitHub
- **On-Demand Access**: GitMCP doesn't automatically scrape repositories; it only accesses them when queried
- **Respects robots.txt**: GitMCP checks for and follows robots.txt directives
- **Self-Hostable**: As an open-source project, you can deploy GitMCP in your own environment

## Restart Required

**Important**: You need to restart Cursor for the GitMCP Server to become available.

## Troubleshooting

If the GitMCP Server doesn't work:

1. Check that Node.js is installed: `node --version` (requires v20.0.0+)
2. Verify the configuration in `~/.cursor/mcp.json`
3. Restart Cursor
4. In Cursor, open Settings → MCP tab to verify the server is listed
5. Test with a simple prompt like: *"What is Next.js?"*

## GitMCP vs Other Git Tools

| Feature | GitMCP (idosal/git-mcp) | Local Git MCP | GitHub MCP |
|---------|------------------------|---------------|------------|
| **Purpose** | Search/reference public GitHub repos | Local git operations | GitHub API operations |
| **Scope** | Any public GitHub repository | Your local repositories | GitHub-hosted repos only |
| **Setup** | Zero setup, cloud-based | Requires local git | Requires GitHub token |
| **Use Case** | Learning, documentation, code examples | Version control, commits, branches | Issues, PRs, GitHub management |
| **Tools** | Documentation search, code search | git commands (commit, push, etc.) | Create issues, PRs, manage repos |

## References

- [GitMCP GitHub Repository](https://github.com/idosal/git-mcp)
- [GitMCP Website](https://gitmcp.io)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/)
- [MCP Market Listing](https://mcpmarket.com/server/git-4)

## Other MCP Servers Configured

Your system also has these MCP servers configured:

1. **Brave Search** - Web search capabilities
2. **Firecrawl MCP** - Web scraping (✅ Configured)
3. **GitHub** - GitHub API integration (⚠️ Token needs updating)

---

**Setup Date**: October 18, 2025  
**Configured By**: AI Assistant  
**Last Updated**: October 18, 2025
