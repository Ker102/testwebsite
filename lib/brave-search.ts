/**
 * Brave Search API Integration
 * Provides web search capabilities for the AI assistant
 */

interface BraveSearchResult {
  title: string;
  url: string;
  description: string;
  age?: string;
}

interface BraveSearchResponse {
  web?: {
    results: Array<{
      title: string;
      url: string;
      description: string;
      age?: string;
    }>;
  };
}

export async function searchBrave(query: string): Promise<string> {
  const apiKey = process.env.BRAVE_API_KEY;

  if (!apiKey) {
    throw new Error("Brave API key not configured");
  }

  try {
    const response = await fetch(
      `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}`,
      {
        headers: {
          Accept: "application/json",
          "Accept-Encoding": "gzip",
          "X-Subscription-Token": apiKey,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Brave Search API error: ${response.status}`);
    }

    const data: BraveSearchResponse = await response.json();
    const results = data.web?.results || [];

    if (results.length === 0) {
      return "No search results found.";
    }

    // Format results for the AI
    const formattedResults = results.slice(0, 5).map((result, index) => {
      return `${index + 1}. ${result.title}
   URL: ${result.url}
   ${result.description}
   ${result.age ? `Published: ${result.age}` : ""}`;
    }).join("\n\n");

    return `Web Search Results for "${query}":\n\n${formattedResults}`;
  } catch (error) {
    console.error("Brave Search error:", error);
    throw error;
  }
}

/**
 * Determines if a query requires web search
 */
export function shouldUseWebSearch(query: string): boolean {
  const searchTriggers = [
    "search",
    "find",
    "look up",
    "what is",
    "who is",
    "latest",
    "current",
    "recent",
    "news",
    "today",
    "2024",
    "2025",
  ];

  const lowerQuery = query.toLowerCase();
  return searchTriggers.some((trigger) => lowerQuery.includes(trigger));
}

