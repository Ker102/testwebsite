/**
 * Firecrawl API Integration
 * Provides advanced web scraping capabilities for the AI assistant
 */

export interface FirecrawlResult {
  url: string;
  markdown: string;
  success: boolean;
  error?: string;
}

/**
 * Scrapes a URL using Firecrawl and returns markdown content
 */
export async function scrapeWithFirecrawl(url: string): Promise<FirecrawlResult> {
  const apiKey = process.env.FIRECRAWL_API_KEY;

  if (!apiKey) {
    return {
      url,
      markdown: "",
      success: false,
      error: "Firecrawl API key not configured",
    };
  }

  try {
    const response = await fetch("https://api.firecrawl.dev/v1/scrape", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        url: url,
        formats: ["markdown"],
        onlyMainContent: true,
      }),
    });

    if (!response.ok) {
      return {
        url,
        markdown: "",
        success: false,
        error: `Firecrawl API error: ${response.status}`,
      };
    }

    const data = await response.json();

    if (data.success && data.data?.markdown) {
      // Limit markdown length to avoid token limits
      const maxLength = 8000; // characters
      const markdown = data.data.markdown;
      const truncatedMarkdown =
        markdown.length > maxLength
          ? markdown.substring(0, maxLength) + "\n\n... [content truncated]"
          : markdown;

      return {
        url,
        markdown: truncatedMarkdown,
        success: true,
      };
    }

    return {
      url,
      markdown: "",
      success: false,
      error: "No content extracted",
    };
  } catch (error: any) {
    return {
      url,
      markdown: "",
      success: false,
      error: error.message || "Failed to scrape with Firecrawl",
    };
  }
}

/**
 * Scrapes multiple URLs using Firecrawl
 */
export async function scrapeMultipleWithFirecrawl(
  urls: string[],
  maxResults: number = 3
): Promise<FirecrawlResult[]> {
  const urlsToScrape = urls.slice(0, maxResults);

  // Scrape in parallel
  const promises = urlsToScrape.map((url) => scrapeWithFirecrawl(url));
  const results = await Promise.all(promises);

  // Return only successful scrapes
  return results.filter((result) => result.success);
}

/**
 * Formats Firecrawl results for AI consumption
 */
export function formatFirecrawlResults(results: FirecrawlResult[]): string {
  if (results.length === 0) {
    return "No content could be scraped with Firecrawl.";
  }

  const formatted = results
    .map((result, index) => {
      return `
=== SCRAPED SOURCE ${index + 1} ===
URL: ${result.url}

${result.markdown}

========================================
`;
    })
    .join("\n");

  return formatted;
}

/**
 * Determines if a URL would benefit from Firecrawl vs basic fetch
 * Firecrawl is better for complex sites with JavaScript, dynamic content, etc.
 */
export function shouldUseFirecrawl(url: string): boolean {
  const lowerUrl = url.toLowerCase();

  // Firecrawl is especially useful for these types of sites
  const firecrawlBeneficialDomains = [
    "medium.com",
    "linkedin.com",
    "twitter.com",
    "facebook.com",
    "instagram.com",
    "reddit.com",
    "github.com", // For complex GitHub pages
    "stackoverflow.com",
    "quora.com",
    "youtube.com",
  ];

  return firecrawlBeneficialDomains.some((domain) => lowerUrl.includes(domain));
}

