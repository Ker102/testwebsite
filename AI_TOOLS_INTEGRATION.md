# AI Tools Integration

This document explains how the AI tools (Brave Search, Firecrawl, and GitMCP) are integrated into the Teremaailm AI application.

## Overview

Your Gemini 2.5 Flash LLM now has access to three powerful tools that automatically activate based on the user's query:

1. **Brave Search** - Web search for current information
2. **Firecrawl** - Advanced web scraping for complex sites
3. **GitMCP** - GitHub repository documentation and code access

## How It Works

When a user sends a message, the system automatically:

1. **Analyzes the query** to determine which tools are needed
2. **Fetches relevant data** from the appropriate sources
3. **Combines all information** into a comprehensive context
4. **Sends to Gemini** with clear instructions on how to use the data
5. **Returns a well-informed response** to the user

## Tool Activation

### Brave Search
**Activates for:**
- Current events and news
- Weather queries
- Time/date questions
- Real-time information (stock prices, scores, etc.)
- Location-based queries
- "What is..." or "Tell me about..." questions

**Examples:**
- "What's the weather in Tallinn?"
- "What are the latest news about AI?"
- "What time is it in New York?"
- "Bitcoin price today"

### Firecrawl
**Activates for:**
- Complex websites that require advanced scraping
- JavaScript-heavy sites
- Sites like Medium, LinkedIn, Reddit, GitHub Pages

**Automatically used when Brave Search returns URLs from:**
- medium.com
- linkedin.com
- twitter.com
- reddit.com
- stackoverflow.com
- And other complex sites

**Benefits:**
- Better content extraction than basic HTML parsing
- Handles dynamic JavaScript content
- Cleaner markdown output
- More reliable for modern websites

### GitMCP
**Activates for:**
- Questions about open source projects
- GitHub repository mentions
- Code implementation questions
- Library/framework documentation requests

**Examples:**
- "How does React implement hooks?"
- "Show me Next.js documentation"
- "Explain the React repository structure"
- "How to use LangChain?"
- "What is github.com/facebook/react about?"

**Supported frameworks/libraries (auto-detected):**
- React, Next.js, Vue, Angular
- TypeScript, Tailwind CSS
- TensorFlow, PyTorch
- LangChain, LangGraph
- Playwright, Puppeteer
- And many more...

## API Keys Required

### Brave Search API Key
- **Status**: ✅ Configured
- **Location**: `.env.local` → `BRAVE_API_KEY`
- **Get key from**: https://brave.com/search/api/

### Firecrawl API Key
- **Status**: ✅ Configured
- **Location**: `.env.local` → `FIRECRAWL_API_KEY`
- **Get key from**: https://firecrawl.dev

### GitMCP
- **Status**: ✅ No API key needed
- **Service**: Free, open-source, cloud-based
- **Endpoint**: https://gitmcp.io

## File Structure

```
lib/
  ├── brave-search.ts    # Web search integration
  ├── firecrawl.ts       # Advanced web scraping
  ├── gitmcp.ts          # GitHub repository access
  └── web-fetcher.ts     # Basic webpage content fetching

app/api/chat/route.ts   # Main chat endpoint with all integrations
```

## Usage Flow

### Example 1: Web Search Query

**User Query**: *"What's the weather in Tallinn today?"*

**Flow:**
1. `shouldUseWebSearch()` detects weather query → TRUE
2. Brave Search fetches weather results
3. Top URLs are scraped for full content
4. Gemini receives weather data with instructions
5. User gets accurate, current weather information

**Tools Used:** Brave Search + Web Fetcher

### Example 2: GitHub Documentation Query

**User Query**: *"How do I implement authentication in Next.js?"*

**Flow:**
1. `shouldUseGitMCP()` detects Next.js mention → TRUE
2. `extractRepository()` identifies vercel/next.js
3. GitMCP fetches Next.js documentation
4. Gemini receives official documentation
5. User gets accurate implementation guidance

**Tools Used:** GitMCP

### Example 3: Complex Web Scraping

**User Query**: *"Summarize this Medium article: [medium.com/article]"*

**Flow:**
1. `shouldUseWebSearch()` → TRUE (URL provided)
2. Brave Search fetches the URL
3. `shouldUseFirecrawl()` detects Medium → TRUE
4. Firecrawl scrapes article (better than basic fetch)
5. Gemini receives clean markdown content
6. User gets accurate article summary

**Tools Used:** Brave Search + Firecrawl

### Example 4: Multiple Tools Combined

**User Query**: *"What's the latest React 19 feature and how is it implemented in the React repository?"*

**Flow:**
1. `shouldUseWebSearch()` detects "latest" → TRUE
2. `shouldUseGitMCP()` detects "React" + "repository" → TRUE
3. Brave Search finds latest React news
4. GitMCP fetches React repository documentation
5. Gemini receives both current news AND official docs
6. User gets comprehensive answer with recent info + implementation details

**Tools Used:** Brave Search + GitMCP

## Response Format

The API now returns additional metadata:

```json
{
  "response": "AI generated response text",
  "usedTools": ["Brave Search", "GitMCP", "Firecrawl"],
  "usedWebSearch": true,
  "usedGitMCP": true,
  "usedFirecrawl": true
}
```

## Advantages

### Before (Basic Gemini)
- Limited to training data knowledge
- No access to current information
- Cannot fetch GitHub documentation
- Generic responses

### After (With Tools)
- ✅ Current, real-time information
- ✅ Accurate weather, news, prices
- ✅ Official documentation from GitHub
- ✅ Code examples from open source
- ✅ Better web content extraction
- ✅ Automatic tool selection
- ✅ Comprehensive, well-sourced answers

## Testing

### Test Brave Search
```
"What's the weather in your city today?"
"What are the latest AI news?"
"Bitcoin price now"
```

### Test GitMCP
```
"Explain how React hooks work"
"Show me Next.js routing documentation"
"How does LangChain work?"
```

### Test Firecrawl
```
"Summarize this Reddit thread: [reddit.com/...]"
"What does this Medium article say: [medium.com/...]"
```

### Test Multiple Tools
```
"What's the latest Next.js version and how do I use server components?"
"Latest TensorFlow release and how is it implemented?"
```

## Troubleshooting

### Tool Not Activating

**Problem**: GitMCP or web search not triggering

**Solutions:**
- Be more specific in your query
- Mention the framework/library name explicitly
- Include keywords like "latest", "documentation", "how to"

### No Results from GitMCP

**Problem**: "Could not fetch documentation"

**Reasons:**
- Repository doesn't exist or is private
- Repository name misspelled
- GitMCP service temporarily unavailable

**Solution:** Provide exact GitHub URL (e.g., "github.com/facebook/react")

### Firecrawl Not Working

**Problem**: Falling back to basic fetch

**Check:**
1. Is `FIRECRAWL_API_KEY` in `.env.local`?
2. Is the API key valid? (check https://firecrawl.dev)
3. Check console logs for error messages

### Web Search Not Finding Content

**Problem**: "No content could be fetched"

**Reasons:**
- Websites blocking scrapers
- Network issues
- Rate limiting

**Solution:** Try rephrasing query or asking about official documentation

## Performance

### Response Times (Approximate)

- **No tools**: 1-2 seconds
- **Brave Search only**: 3-5 seconds
- **Brave + Firecrawl**: 4-7 seconds
- **GitMCP only**: 2-4 seconds
- **All tools**: 5-10 seconds

### Content Limits

To avoid token limits, content is automatically truncated:

- **Web Fetcher**: 5,000 characters per page
- **Firecrawl**: 8,000 characters per page
- **GitMCP Documentation**: 10,000 characters

## Future Enhancements

Potential additions:
- [ ] Code search in GitMCP (search_generic_code)
- [ ] Documentation search in GitMCP (search_generic_documentation)
- [ ] Image analysis from web search results
- [ ] PDF content extraction
- [ ] Video transcript fetching
- [ ] More intelligent tool selection
- [ ] Tool result caching

## Notes

- All tools work independently - if one fails, others still work
- Tools are automatically selected - no user configuration needed
- Source citations are included in responses
- All external API calls are logged for debugging
- No personally identifiable information is sent to external services

---

**Last Updated**: October 18, 2025  
**Integration Status**: ✅ Fully Operational

