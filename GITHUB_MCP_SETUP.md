# GitHub MCP Server Setup Guide

The GitHub MCP (Model Context Protocol) server enables the LLM in Cursor to interact with GitHub repositories, allowing it to:

- 📁 **Browse repository contents** - Read files, directories, and code
- 🔍 **Search code** - Find specific code snippets across repositories
- 📝 **Manage issues** - Create, read, update, and close issues
- 🔀 **Handle pull requests** - Create and manage PRs
- 🌿 **Branch management** - Create and switch branches
- 📊 **Repository information** - Get repo stats, commits, and more

## Prerequisites

- A GitHub account
- Cursor IDE installed

## Step 1: Create a GitHub Personal Access Token

### 1.1 Go to GitHub Settings

1. Log in to [GitHub](https://github.com)
2. Click your profile picture (top-right corner)
3. Select **Settings**

### 1.2 Generate a Personal Access Token

1. In the left sidebar, scroll down and click **Developer settings**
2. Click **Personal access tokens** → **Tokens (classic)**
3. Click **Generate new token** → **Generate new token (classic)**
4. You may be asked to confirm your password

### 1.3 Configure Token Settings

**Name your token:**
```
Cursor MCP Server
```

**Set expiration:**
- Choose `No expiration` (recommended for development)
- Or set a custom expiration date

**Select scopes:** Check these boxes:

✅ **repo** (Full control of private repositories)
  - ✅ repo:status
  - ✅ repo_deployment
  - ✅ public_repo
  - ✅ repo:invite
  - ✅ security_events

✅ **workflow** (Update GitHub Action workflows)

✅ **read:org** (Read org and team membership, read org projects)

✅ **gist** (Create gists)

### 1.4 Generate and Copy Token

1. Scroll down and click **Generate token**
2. **IMPORTANT**: Copy the token immediately! 
   - It looks like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - You won't be able to see it again!
3. Save it somewhere secure temporarily

## Step 2: Configure Cursor MCP

The GitHub MCP server has already been added to your Cursor configuration file at:
```
~/.cursor/mcp.json
```

### 2.1 Update the GitHub Token

1. Open the MCP configuration file:
   ```bash
   nano ~/.cursor/mcp.json
   ```
   Or use your preferred text editor.

2. Find the `"github"` section:
   ```json
   "github": {
     "command": "npx",
     "args": ["-y", "@modelcontextprotocol/server-github"],
     "env": {
       "GITHUB_PERSONAL_ACCESS_TOKEN": "your_github_token_here"
     }
   }
   ```

3. Replace `"your_github_token_here"` with your actual GitHub token:
   ```json
   "github": {
     "command": "npx",
     "args": ["-y", "@modelcontextprotocol/server-github"],
     "env": {
       "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
     }
   }
   ```

4. Save and close the file

## Step 3: Restart Cursor

1. Completely close Cursor IDE
2. Reopen Cursor
3. The GitHub MCP server will initialize automatically

## Step 4: Test the Integration

### Test with the AI

Open Cursor and try asking the AI assistant questions like:

```
"Can you list the files in my current repository?"

"Show me the contents of the README.md file"

"What are the recent commits in this repository?"

"Create a new issue titled 'Add dark mode support'"

"Search for all functions named 'authenticate' in this repo"
```

### Verify MCP Connection

1. Open Cursor settings (Ctrl+,)
2. Search for "MCP"
3. You should see the GitHub server listed as connected

## What the GitHub MCP Server Can Do

### Repository Operations
- List repository files and directories
- Read file contents
- Get repository information
- View commit history

### Code Search
- Search for code across repositories
- Find specific functions or classes
- Search by file type

### Issue Management
- Create new issues
- List open/closed issues
- Update issue status
- Add comments to issues
- Close issues

### Pull Request Management
- Create pull requests
- List PRs
- Review PR status
- Merge pull requests

### Branch Operations
- List branches
- Create new branches
- Switch between branches
- Get branch information

## Example Use Cases

### 1. Code Review Assistant
```
"Review the code in src/components/Chat.tsx and suggest improvements"
```

### 2. Documentation Helper
```
"Read the entire codebase and help me write comprehensive documentation"
```

### 3. Issue Tracker
```
"Create an issue for implementing user authentication with the following requirements: [list]"
```

### 4. Code Search
```
"Find all files where we're using the useAuthStore hook"
```

### 5. Repository Analysis
```
"Analyze the repository structure and tell me how the authentication flow works"
```

## Security Best Practices

🔒 **Keep your token secure:**
- Never commit the `mcp.json` file with your token to version control
- Don't share your token publicly
- Use a token with minimal required permissions
- Rotate your token periodically
- If compromised, immediately revoke it on GitHub

🔑 **Token Scopes:**
- Only enable scopes you actually need
- For read-only operations, you can restrict to just `public_repo` scope
- For private repos, you need the full `repo` scope

## Troubleshooting

### "GitHub MCP server not responding"

**Solution:**
1. Check your GitHub token is correct in `~/.cursor/mcp.json`
2. Verify token hasn't expired on GitHub
3. Ensure token has required scopes
4. Restart Cursor completely

### "Permission denied" errors

**Solution:**
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Check your token has the required scopes
3. If not, create a new token with correct permissions
4. Update `mcp.json` with new token

### "Rate limit exceeded"

**Solution:**
- GitHub API has rate limits (5000 requests/hour for authenticated users)
- Wait for the rate limit to reset
- Consider using a different token

### Token not found

**Solution:**
1. Make sure you've copied the token correctly
2. Check for extra spaces or quotes in the configuration
3. Token should start with `ghp_`

## Current Configuration

Your MCP configuration file currently has:

```json
{
  "mcpServers": {
    "brave-search": { ... },
    "firecrawl": { ... },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your_github_token_here"
      }
    }
  }
}
```

## Next Steps

1. ✅ GitHub MCP server added to configuration
2. ⏳ **Action Required:** Get your GitHub Personal Access Token
3. ⏳ **Action Required:** Update `~/.cursor/mcp.json` with your token
4. ⏳ **Action Required:** Restart Cursor
5. ✨ Start using GitHub features with the AI!

## Additional Resources

- [GitHub Personal Access Tokens Documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [MCP GitHub Server on npm](https://www.npmjs.com/package/@modelcontextprotocol/server-github)

---

**Status:** ⚙️ Configuration file updated, waiting for GitHub token

