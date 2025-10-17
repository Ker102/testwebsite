# Brave Search Integration

## Overview
The chat application now includes Brave Search API integration, allowing Gemini AI to access real-time web search results when answering questions.

## How It Works

### Automatic Web Search Detection
The system automatically detects when a query needs web search based on keywords:
- "search", "find", "look up"
- "what is", "who is"
- "latest", "current", "recent", "news"
- "today", "2024", "2025"
- And more...

### Search Flow
1. **User sends message** → System checks if it needs web search
2. **If search needed** → Brave Search API is called
3. **Search results** → Top 5 results are retrieved
4. **Context to AI** → Results are provided to Gemini as context
5. **AI Response** → Gemini answers using the search results

## Configuration

### MCP Server Configuration
Located in `.mcp/config.json`:
```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

### Environment Variable
Add to `.env.local`:
```env
BRAVE_API_KEY=your_brave_api_key_here
```

## Getting a Brave API Key

1. Go to [Brave Search API](https://brave.com/search/api/)
2. Sign up for an account
3. Subscribe to a plan (Free tier available)
4. Generate your API key
5. Add it to `.env.local`

## API Limits

### Free Tier
- 2,000 queries per month
- Rate limited
- Perfect for development and testing

### Paid Tiers
- More queries per month
- Higher rate limits
- Additional features

## Features

### Search Result Format
Each result includes:
- **Title**: Page title
- **URL**: Source link
- **Description**: Page summary
- **Age**: When published (if available)

### AI Integration
- Results are formatted for AI comprehension
- Top 5 results provided as context
- AI cites sources when relevant
- Seamless integration with chat flow

## Visual Indicators

When web search is active:
- 🌐 Globe icon appears in loading state
- Console log: "🔍 Web search performed for: [query]"
- Console log: "🌐 Response includes web search results"

## Example Queries

### Triggers Web Search:
- "What is the latest news about AI?"
- "Search for recent developments in quantum computing"
- "Who is the current CEO of Microsoft?"
- "Find information about climate change 2025"
- "What's happening today in technology?"

### Regular Chat (No Search):
- "Explain how photosynthesis works"
- "Write a poem about cats"
- "Help me debug this code"
- "Translate this to Spanish"

## Error Handling

If Brave Search fails:
- System continues without search results
- User still gets AI response
- Error logged to console
- No disruption to chat experience

## Security

- ✅ API key stored in environment variable
- ✅ Never committed to git
- ✅ Server-side only (not exposed to client)
- ✅ Rate limiting handled by Brave
- ✅ HTTPS requests only

## Testing

Test the integration:
1. Start dev server: `npm run dev`
2. Login to chat
3. Ask: "What is the latest news today?"
4. Check console for search logs
5. AI should respond with current information

## Troubleshooting

### Search Not Working
- Check `.env.local` has `BRAVE_API_KEY`
- Verify API key is valid
- Check API quota not exceeded
- Restart dev server after adding key

### Results Not Appearing
- Check console for errors
- Verify Brave API is accessible
- Check network connectivity
- Review API response in logs

## Future Enhancements

Consider adding:
- Manual search toggle
- Search result caching
- Multiple search engines
- Image search
- News-specific search
- Custom search filters

