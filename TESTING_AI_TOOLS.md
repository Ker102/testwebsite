# Testing AI Tools Integration

Quick guide to test that all MCP tools are working in your Teremaailm AI app.

## Prerequisites

1. ✅ All API keys configured in `.env.local`:
   - `BRAVE_API_KEY` - Configured
   - `FIRECRAWL_API_KEY` - Configured
   - `GOOGLE_AI_API_KEY` - Should be configured

2. ✅ Development server running:
   ```bash
   npm run dev
   ```

## Test Cases

### 1. Test Brave Search (Web Search)

**Test Query 1: Current Information**
```
What's the weather like today?
```
**Expected:**
- Response includes current weather data
- Console shows: "🔍 Web search performed"
- Console shows: "✅ Successfully fetched content from X webpages"

**Test Query 2: Latest News**
```
What are the latest AI developments in 2025?
```
**Expected:**
- Response includes recent news
- Sources are cited (e.g., "According to...")
- Current dates mentioned

### 2. Test GitMCP (GitHub Documentation)

**Test Query 1: Framework Documentation**
```
How does Next.js implement server components?
```
**Expected:**
- Console shows: "📚 Fetching GitHub documentation for vercel/next.js..."
- Console shows: "✅ Successfully fetched documentation from vercel/next.js"
- Response includes official Next.js documentation details

**Test Query 2: React Hooks**
```
Explain how React hooks work with examples
```
**Expected:**
- Console shows GitMCP fetching from facebook/react
- Response includes implementation details from React repository
- Code examples from official source

**Test Query 3: Direct Repository URL**
```
What is github.com/langchain-ai/langgraph about?
```
**Expected:**
- GitMCP detects repository from URL
- Fetches documentation from langchain-ai/langgraph
- Response explains LangGraph with official information

### 3. Test Firecrawl (Advanced Web Scraping)

**Test Query: Complex Website**
```
Summarize this article: [paste any Medium article URL]
```
**Expected:**
- Console shows: "🔥 Using Firecrawl for X complex websites..."
- Console shows: "✅ Successfully scraped X pages with Firecrawl"
- Response includes clean, well-formatted content summary

**Note:** Firecrawl automatically activates for these domains:
- medium.com
- reddit.com
- stackoverflow.com
- linkedin.com
- twitter.com

### 4. Test Multiple Tools Together

**Test Query: Current + GitHub**
```
What's the latest version of React and how do I use the new features?
```
**Expected:**
- Brave Search finds latest React news
- GitMCP fetches React documentation
- Response combines current version info with implementation details
- Both tools listed in response

**Test Query: Complex Search + Scraping**
```
Find the best TypeScript tutorial on Medium and summarize it
```
**Expected:**
- Brave Search finds Medium tutorials
- Firecrawl scrapes the Medium article
- Response includes comprehensive tutorial summary

## What to Look For

### In Browser (User View)
1. ✅ Response is accurate and detailed
2. ✅ Sources are cited
3. ✅ Information is current/relevant
4. ✅ Code examples are provided (for GitHub queries)

### In Console (Developer View)
1. ✅ Tool activation logs:
   - "🔍 Web search performed"
   - "📚 Fetching GitHub documentation"
   - "🔥 Using Firecrawl"

2. ✅ Success confirmations:
   - "✅ Successfully fetched..."
   - "✅ Successfully scraped..."

3. ✅ Error handling (if any):
   - "⚠️ Could not fetch..." (graceful degradation)

### In Response Metadata
Check the API response JSON:
```json
{
  "response": "...",
  "usedTools": ["Brave Search", "GitMCP"],
  "usedWebSearch": true,
  "usedGitMCP": true,
  "usedFirecrawl": false
}
```

## Troubleshooting

### GitMCP Not Working

**Problem:** Console shows "⚠️ Could not fetch GitMCP documentation"

**Possible Causes:**
1. Repository doesn't exist or is private
2. GitMCP service temporarily unavailable
3. Repository name misspelled

**Solution:**
- Try a well-known repository: "How does the React library work?"
- Provide exact GitHub URL
- Check if GitMCP service is up: https://gitmcp.io

### Firecrawl Not Activating

**Problem:** Not seeing "🔥 Using Firecrawl"

**Possible Causes:**
1. URL is from a regular website (not in the complex domain list)
2. `FIRECRAWL_API_KEY` not in `.env.local`
3. API key invalid

**Check:**
```bash
# Verify API key is in .env.local
grep FIRECRAWL_API_KEY .env.local
```

**Solution:**
- Use a URL from Medium, Reddit, or Stack Overflow
- Verify API key at https://firecrawl.dev

### Brave Search Not Working

**Problem:** No web search results

**Possible Causes:**
1. `BRAVE_API_KEY` not configured
2. API key invalid or expired
3. Rate limit reached

**Check:**
```bash
# Verify API key is in .env.local
grep BRAVE_API_KEY .env.local
```

**Solution:**
- Verify API key at https://brave.com/search/api/
- Check API quota/rate limits

## Expected Console Output Examples

### Successful GitMCP Query
```
📚 Fetching GitHub documentation for vercel/next.js...
✅ Successfully fetched documentation from vercel/next.js
```

### Successful Web Search + Firecrawl
```
🔍 Web search performed for: latest AI news on Medium
🌐 Fetching content from 5 webpages...
🔥 Using Firecrawl for 2 complex websites...
✅ Successfully scraped 2 pages with Firecrawl
✅ Successfully fetched content from 3 webpages
```

### Successful Multi-Tool Query
```
📚 Fetching GitHub documentation for facebook/react...
✅ Successfully fetched documentation from facebook/react
🔍 Web search performed for: latest React version 2025
🌐 Fetching content from 5 webpages...
✅ Successfully fetched content from 3 webpages
```

## Quick Test Script

Run these queries one by one:

1. **Basic web search:** "What time is it in Tokyo?"
2. **GitHub docs:** "Explain Next.js routing"
3. **Current events:** "Latest TypeScript news"
4. **Code examples:** "Show me React useState examples"
5. **Complex scraping:** [paste a Medium article URL]

If all 5 work correctly, your integration is successful! ✅

---

**Last Updated**: October 18, 2025  
**Status**: Ready for Testing

