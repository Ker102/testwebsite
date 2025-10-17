/**
 * Web Content Fetcher
 * Fetches and extracts readable content from web pages
 */

interface FetchedContent {
  url: string;
  title: string;
  content: string;
  success: boolean;
  error?: string;
}

/**
 * Strips HTML tags and extracts readable text
 */
function extractTextFromHTML(html: string): string {
  // Remove script and style tags with their content
  let text = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, "");

  // Remove all HTML tags
  text = text.replace(/<[^>]+>/g, " ");

  // Decode HTML entities
  text = text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&[^;]+;/g, " ");

  // Clean up whitespace
  text = text
    .replace(/\s+/g, " ") // Multiple spaces to single space
    .replace(/\n\s*\n/g, "\n") // Multiple newlines to single
    .trim();

  return text;
}

/**
 * Extracts the title from HTML
 */
function extractTitle(html: string): string {
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch && titleMatch[1]) {
    return titleMatch[1].trim();
  }

  // Try og:title
  const ogTitleMatch = html.match(
    /<meta\s+property="og:title"\s+content="([^"]+)"/i
  );
  if (ogTitleMatch && ogTitleMatch[1]) {
    return ogTitleMatch[1].trim();
  }

  return "Untitled";
}

/**
 * Fetches content from a URL and extracts readable text
 */
export async function fetchWebContent(url: string): Promise<FetchedContent> {
  try {
    // Set a timeout for the fetch
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; GeminiBot/1.0; +http://www.google.com/bot.html)",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return {
        url,
        title: "",
        content: "",
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const html = await response.text();
    const title = extractTitle(html);
    const content = extractTextFromHTML(html);

    // Limit content length to avoid token limits
    const maxLength = 5000; // characters
    const truncatedContent =
      content.length > maxLength
        ? content.substring(0, maxLength) + "... [content truncated]"
        : content;

    return {
      url,
      title,
      content: truncatedContent,
      success: true,
    };
  } catch (error: any) {
    return {
      url,
      title: "",
      content: "",
      success: false,
      error: error.message || "Failed to fetch content",
    };
  }
}

/**
 * Fetches content from multiple URLs (top N results)
 */
export async function fetchMultipleWebContents(
  urls: string[],
  maxResults: number = 3
): Promise<FetchedContent[]> {
  const urlsToFetch = urls.slice(0, maxResults);

  // Fetch in parallel
  const promises = urlsToFetch.map((url) => fetchWebContent(url));
  const results = await Promise.all(promises);

  // Return only successful fetches
  return results.filter((result) => result.success);
}

/**
 * Formats fetched content for AI consumption
 */
export function formatFetchedContent(contents: FetchedContent[]): string {
  if (contents.length === 0) {
    return "No webpage content could be fetched.";
  }

  const formatted = contents
    .map((content, index) => {
      return `
=== SOURCE ${index + 1}: ${content.title} ===
URL: ${content.url}

${content.content}

========================================
`;
    })
    .join("\n");

  return formatted;
}

