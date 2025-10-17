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
 * Uses a liberal approach - prefers searching for most factual queries
 */
export function shouldUseWebSearch(query: string): boolean {
  const lowerQuery = query.toLowerCase();

  // Always search for these types of queries
  const highPriorityTriggers = [
    // Time and date
    "time", "date", "when", "today", "yesterday", "tomorrow",
    "now", "currently", "right now", "this moment",
    
    // Weather and location
    "weather", "temperature", "forecast", "rain", "snow", "sunny",
    "climate", "hot", "cold", "humid",
    
    // Current events and news
    "news", "latest", "recent", "current", "breaking", "happening",
    "update", "updates", "development", "developments",
    
    // Real-time information
    "stock", "price", "market", "crypto", "bitcoin", "exchange rate",
    "score", "game", "match", "sports",
    
    // Location and travel
    "in ", " at ", "where", "location", "address", "directions",
    "city", "country", "state", "province",
    
    // People and organizations (might have updates)
    "who is", "ceo", "president", "leader", "founder",
    "company", "organization",
    
    // Search-related keywords
    "search", "find", "look up", "tell me about", "information about",
    
    // Years (likely asking about current info)
    "2024", "2025", "2026",
    
    // Question words that often need current data
    "what is the", "what are the", "how much", "how many",
  ];

  // Don't search for these types of queries (creative/coding/general knowledge)
  const noSearchKeywords = [
    "write", "create", "generate", "make", "compose", "draft",
    "explain", "help me understand", "teach me", "how does",
    "calculate", "solve", "compute",
    "translate", "convert to",
    "poem", "story", "essay", "letter",
    "code", "debug", "programming", "function", "algorithm",
    "summarize", "summary of",
  ];

  // Check if query should NOT use search
  const shouldNotSearch = noSearchKeywords.some(keyword => {
    // More precise matching for no-search keywords
    if (lowerQuery.startsWith(keyword) || lowerQuery.includes(` ${keyword} `)) {
      return true;
    }
    return false;
  });

  if (shouldNotSearch) {
    return false;
  }

  // Check if query should definitely use search
  const shouldSearch = highPriorityTriggers.some(trigger => 
    lowerQuery.includes(trigger)
  );

  // Default to searching for questions and statements
  // unless they're clearly creative/coding tasks
  const isQuestion = lowerQuery.includes("?") || 
                     lowerQuery.startsWith("what") ||
                     lowerQuery.startsWith("who") ||
                     lowerQuery.startsWith("where") ||
                     lowerQuery.startsWith("when") ||
                     lowerQuery.startsWith("why") ||
                     lowerQuery.startsWith("how much") ||
                     lowerQuery.startsWith("how many");

  return shouldSearch || (isQuestion && !shouldNotSearch);
}

