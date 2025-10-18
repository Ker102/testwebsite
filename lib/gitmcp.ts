/**
 * GitMCP Integration
 * Provides access to GitHub repository documentation and code
 */

export interface GitMCPDocResult {
  repository: string;
  content: string;
  success: boolean;
  error?: string;
}

export interface GitMCPSearchResult {
  repository: string;
  results: string;
  success: boolean;
  error?: string;
}

/**
 * Detects if a query is asking about a GitHub repository or open source project
 */
export function shouldUseGitMCP(query: string): boolean {
  const lowerQuery = query.toLowerCase();

  const gitMCPTriggers = [
    // Direct repository mentions
    "github",
    "repository",
    "repo",
    "open source",
    "source code",

    // Library/framework related
    "how does",
    "how to use",
    "implementation",
    "example",
    "documentation",
    "docs",

    // Specific frameworks/libraries (common ones)
    "react",
    "next.js",
    "nextjs",
    "vue",
    "angular",
    "typescript",
    "tailwind",
    "node.js",
    "express",
    "django",
    "flask",
    "spring",
    "laravel",
    "rails",
    "tensorflow",
    "pytorch",
    "langchain",
    "langgraph",
    "openai",
    "playwright",
    "puppeteer",
  ];

  return gitMCPTriggers.some((trigger) => lowerQuery.includes(trigger));
}

/**
 * Extracts repository information from a query
 * Returns owner and repo name if found
 */
export function extractRepository(query: string): {
  owner: string;
  repo: string;
} | null {
  // Try to find GitHub URL pattern
  const githubUrlMatch = query.match(
    /github\.com\/([^\/\s]+)\/([^\/\s\?#]+)/i
  );
  if (githubUrlMatch) {
    return {
      owner: githubUrlMatch[1],
      repo: githubUrlMatch[2],
    };
  }

  // Try to find owner/repo pattern
  const ownerRepoMatch = query.match(/([a-z0-9_-]+)\/([a-z0-9_-]+)/i);
  if (ownerRepoMatch) {
    // Verify it looks like a valid repo name
    const owner = ownerRepoMatch[1];
    const repo = ownerRepoMatch[2];
    if (owner.length > 0 && repo.length > 0) {
      return { owner, repo };
    }
  }

  // Try to infer from common project names
  const projectMapping: { [key: string]: { owner: string; repo: string } } = {
    react: { owner: "facebook", repo: "react" },
    "next.js": { owner: "vercel", repo: "next.js" },
    nextjs: { owner: "vercel", repo: "next.js" },
    vue: { owner: "vuejs", repo: "core" },
    tailwind: { owner: "tailwindlabs", repo: "tailwindcss" },
    tensorflow: { owner: "tensorflow", repo: "tensorflow" },
    pytorch: { owner: "pytorch", repo: "pytorch" },
    langchain: { owner: "langchain-ai", repo: "langchain" },
    langgraph: { owner: "langchain-ai", repo: "langgraph" },
    playwright: { owner: "microsoft", repo: "playwright" },
  };

  const lowerQuery = query.toLowerCase();
  for (const [key, value] of Object.entries(projectMapping)) {
    if (lowerQuery.includes(key)) {
      return value;
    }
  }

  return null;
}

/**
 * Fetches documentation from a GitHub repository using GitMCP
 */
export async function fetchGitMCPDocumentation(
  owner: string,
  repo: string
): Promise<GitMCPDocResult> {
  try {
    // GitMCP provides documentation via their API endpoint
    const url = `https://gitmcp.io/${owner}/${repo}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent": "Teremaailm-AI/1.0",
      },
    });

    if (!response.ok) {
      return {
        repository: `${owner}/${repo}`,
        content: "",
        success: false,
        error: `GitMCP API error: ${response.status}`,
      };
    }

    const data = await response.json();

    // GitMCP returns documentation in a structured format
    if (data && data.documentation) {
      // Limit content length
      const maxLength = 10000;
      const content = data.documentation;
      const truncatedContent =
        content.length > maxLength
          ? content.substring(0, maxLength) + "\n\n... [content truncated]"
          : content;

      return {
        repository: `${owner}/${repo}`,
        content: truncatedContent,
        success: true,
      };
    }

    return {
      repository: `${owner}/${repo}`,
      content: "",
      success: false,
      error: "No documentation found",
    };
  } catch (error: any) {
    return {
      repository: `${owner}/${repo}`,
      content: "",
      success: false,
      error: error.message || "Failed to fetch from GitMCP",
    };
  }
}

/**
 * Searches code in a GitHub repository using GitMCP
 */
export async function searchGitMCPCode(
  owner: string,
  repo: string,
  searchQuery: string
): Promise<GitMCPSearchResult> {
  try {
    const url = `https://gitmcp.io/${owner}/${repo}/search`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "Teremaailm-AI/1.0",
      },
      body: JSON.stringify({
        query: searchQuery,
        type: "code",
      }),
    });

    if (!response.ok) {
      return {
        repository: `${owner}/${repo}`,
        results: "",
        success: false,
        error: `GitMCP search API error: ${response.status}`,
      };
    }

    const data = await response.json();

    if (data && data.results) {
      // Format search results
      const formattedResults = Array.isArray(data.results)
        ? data.results
            .slice(0, 5)
            .map(
              (result: any, index: number) => `
${index + 1}. ${result.file || "Unknown file"}
   ${result.snippet || "No snippet available"}
`
            )
            .join("\n")
        : "No results found";

      return {
        repository: `${owner}/${repo}`,
        results: formattedResults,
        success: true,
      };
    }

    return {
      repository: `${owner}/${repo}`,
      results: "",
      success: false,
      error: "No search results found",
    };
  } catch (error: any) {
    return {
      repository: `${owner}/${repo}`,
      results: "",
      success: false,
      error: error.message || "Failed to search GitMCP",
    };
  }
}

/**
 * Formats GitMCP documentation results for AI consumption
 */
export function formatGitMCPDocumentation(result: GitMCPDocResult): string {
  if (!result.success) {
    return `Could not fetch documentation for ${result.repository}: ${result.error}`;
  }

  return `
=== GITHUB REPOSITORY DOCUMENTATION ===
Repository: ${result.repository}

${result.content}

========================================
`;
}

/**
 * Formats GitMCP code search results for AI consumption
 */
export function formatGitMCPSearchResults(result: GitMCPSearchResult): string {
  if (!result.success) {
    return `Could not search ${result.repository}: ${result.error}`;
  }

  return `
=== GITHUB CODE SEARCH RESULTS ===
Repository: ${result.repository}

${result.results}

========================================
`;
}

