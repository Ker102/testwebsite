# Firecrawl MCP Server Documentation

> **Source:** [Firecrawl MCP Server Documentation](https://docs.firecrawl.dev/mcp-server)
> 
> **Last Updated:** October 17, 2025

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Available Tools](#available-tools)
- [Implementation Notes](#implementation-notes)

---

## Overview

A Model Context Protocol (MCP) server implementation that integrates [Firecrawl](https://firecrawl.dev) for advanced web scraping capabilities. Firecrawl provides AI-powered web scraping, crawling, and content extraction.

**Official Repository:** [GitHub - firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)

### What is Firecrawl?

Firecrawl is a web scraping tool designed specifically for LLMs and AI applications. It:
- Converts any website into clean, LLM-ready markdown or structured data
- Handles JavaScript-heavy sites, dynamic content, and complex layouts
- Provides built-in rate limiting and batch processing
- Supports both cloud-hosted and self-hosted deployments

---

## Features

✅ **Web Scraping** - Extract clean content from single URLs  
✅ **Crawling** - Recursively crawl entire websites  
✅ **Discovery** - Map website structure and find all URLs  
✅ **Search** - Search the web with optional content extraction  
✅ **Content Extraction** - Structured data extraction with LLM  
✅ **Batch Processing** - Scrape multiple URLs efficiently  
✅ **Rate Limiting** - Built-in rate limit handling  
✅ **Cloud & Self-Hosted** - Flexible deployment options  
✅ **Streamable HTTP** - HTTP transport support

---

## Installation

### Option 1: Remote Hosted URL (Easiest)

Use Firecrawl's hosted MCP server:

```
https://mcp.firecrawl.dev/{FIRECRAWL_API_KEY}/v2/mcp
```

Replace `{FIRECRAWL_API_KEY}` with your actual API key.

### Option 2: Local Installation with npx

```bash
env FIRECRAWL_API_KEY=fc-YOUR_API_KEY npx -y firecrawl-mcp
```

### Option 3: Global Installation

```bash
npm install -g firecrawl-mcp
```

### Get Your API Key

Sign up and get your API key from: [https://firecrawl.dev/app/api-keys](https://firecrawl.dev/app/api-keys)

---

## Configuration

### Current Project Configuration

**File:** `/home/mint/.cursor/mcp.json`

```json
{
  "mcpServers": {
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "***REMOVED***"
      }
    }
  }
}
```

### Cursor-Specific Configuration

For **Cursor v0.48.6+**:
1. Open Cursor Settings
2. Go to Features > MCP Servers
3. Click "+ Add new global MCP server"
4. Add the configuration shown above

For **Cursor v0.45.6**:
1. Open Cursor Settings
2. Go to Features > MCP Servers
3. Click "+ Add New MCP Server"
4. Enter:
   - Name: "firecrawl"
   - Type: "command"
   - Command: `env FIRECRAWL_API_KEY=your-api-key npx -y firecrawl-mcp`

**Windows Users:** Use:
```cmd
cmd /c "set FIRECRAWL_API_KEY=your-api-key && npx -y firecrawl-mcp"
```

### Other IDE Configurations

#### VS Code

Add to User Settings (JSON) via `Ctrl + Shift + P`:

```json
{
  "mcp": {
    "inputs": [
      {
        "type": "promptString",
        "id": "apiKey",
        "description": "Firecrawl API Key",
        "password": true
      }
    ],
    "servers": {
      "firecrawl": {
        "command": "npx",
        "args": ["-y", "firecrawl-mcp"],
        "env": {
          "FIRECRAWL_API_KEY": "${input:apiKey}"
        }
      }
    }
  }
}
```

#### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "your-api-key"
      }
    }
  }
}
```

### Environment Variables

#### Required for Cloud API
- `FIRECRAWL_API_KEY` - Your Firecrawl API key

#### Optional Configuration
- `HTTP_STREAMABLE_SERVER` - Enable HTTP transport mode (default: false)
- `FIRECRAWL_BASE_URL` - Custom base URL for self-hosted instances
- `MAX_RETRIES` - Maximum retry attempts (default: 3)
- `RETRY_BASE_DELAY_MS` - Base delay for exponential backoff (default: 1000)
- `MAX_RETRY_DELAY_MS` - Maximum retry delay (default: 4000)
- `CREDIT_WARNING_THRESHOLD` - Credit usage warning level (default: 1000)
- `CREDIT_CRITICAL_THRESHOLD` - Critical credit level (default: 100)

---

## Available Tools

### 1. Scrape Tool (`firecrawl_scrape`)

Scrape content from a single URL with advanced options.

**Example:**
```json
{
  "name": "firecrawl_scrape",
  "arguments": {
    "url": "https://example.com",
    "formats": ["markdown"],
    "onlyMainContent": true,
    "waitFor": 1000,
    "timeout": 30000,
    "mobile": false,
    "includeTags": ["article", "main"],
    "excludeTags": ["nav", "footer"],
    "skipTlsVerification": false
  }
}
```

**Options:**
- `url` (required) - The URL to scrape
- `formats` - Output formats: ["markdown", "html", "links", "screenshot"]
- `onlyMainContent` - Extract only main content (removes nav, footer, etc.)
- `waitFor` - Wait time in ms before scraping (for dynamic content)
- `timeout` - Request timeout in ms
- `mobile` - Use mobile user agent
- `includeTags` - HTML tags to include
- `excludeTags` - HTML tags to exclude
- `skipTlsVerification` - Skip TLS certificate verification

**Best for:** Single page scraping with clean output

---

### 2. Batch Scrape Tool (`firecrawl_batch_scrape`)

Scrape multiple URLs efficiently with built-in rate limiting and parallel processing.

**Example:**
```json
{
  "name": "firecrawl_batch_scrape",
  "arguments": {
    "urls": ["https://example1.com", "https://example2.com"],
    "options": {
      "formats": ["markdown"],
      "onlyMainContent": true
    }
  }
}
```

**Returns:** Operation ID for status checking

**Best for:** Scraping multiple pages at once with automatic rate limiting

---

### 3. Check Batch Status (`firecrawl_check_batch_status`)

Check the status of a batch scraping operation.

**Example:**
```json
{
  "name": "firecrawl_check_batch_status",
  "arguments": {
    "id": "batch_1"
  }
}
```

**Returns:** Progress status and results when available

---

### 4. Map Tool (`firecrawl_map`)

Map a website to discover all indexed URLs on the site.

**Example:**
```json
{
  "name": "firecrawl_map",
  "arguments": {
    "url": "https://example.com",
    "search": "blog",
    "sitemap": "include",
    "includeSubdomains": false,
    "limit": 100,
    "ignoreQueryParameters": true
  }
}
```

**Options:**
- `url` (required) - Base URL to map
- `search` - Filter URLs by search term
- `sitemap` - Sitemap usage: "include", "skip", or "only"
- `includeSubdomains` - Include subdomains in mapping
- `limit` - Maximum URLs to return
- `ignoreQueryParameters` - Ignore query parameters

**Returns:** Array of URLs found on the site

**Best for:** Discovering URLs before deciding what to scrape

---

### 5. Search Tool (`firecrawl_search`)

Search the web and optionally extract content from search results.

**Example:**
```json
{
  "name": "firecrawl_search",
  "arguments": {
    "query": "artificial intelligence news",
    "limit": 5,
    "lang": "en",
    "country": "us",
    "scrapeOptions": {
      "formats": ["markdown"],
      "onlyMainContent": true
    }
  }
}
```

**Options:**
- `query` (required) - Search query
- `limit` - Number of results
- `lang` - Language code (e.g., "en")
- `country` - Country code (e.g., "us")
- `scrapeOptions` - Options for scraping results

**Best for:** Finding and extracting content about specific topics

---

### 6. Crawl Tool (`firecrawl_crawl`)

Start an asynchronous crawl with advanced options.

**Example:**
```json
{
  "name": "firecrawl_crawl",
  "arguments": {
    "url": "https://example.com",
    "maxDepth": 2,
    "limit": 100,
    "allowExternalLinks": false,
    "deduplicateSimilarURLs": true
  }
}
```

**Options:**
- `url` (required) - Starting URL
- `maxDepth` - Maximum crawl depth
- `limit` - Maximum pages to crawl
- `allowExternalLinks` - Follow external links
- `deduplicateSimilarURLs` - Remove similar URLs

**Returns:** Crawl job ID for status checking

**Best for:** Deep website crawling and site-wide extraction

---

### 7. Check Crawl Status (`firecrawl_check_crawl_status`)

Check the status of a crawl job.

**Example:**
```json
{
  "name": "firecrawl_check_crawl_status",
  "arguments": {
    "id": "550e8400-e29b-41d4-a716-446655440000"
  }
}
```

**Returns:** Status and progress, including results when available

---

### 8. Extract Tool (`firecrawl_extract`)

Extract structured information from web pages using LLM capabilities.

**Example:**
```json
{
  "name": "firecrawl_extract",
  "arguments": {
    "urls": ["https://example.com/page1"],
    "prompt": "Extract product information including name, price, and description",
    "systemPrompt": "You are a helpful assistant that extracts product information",
    "schema": {
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "price": { "type": "number" },
        "description": { "type": "string" }
      },
      "required": ["name", "price"]
    },
    "allowExternalLinks": false,
    "enableWebSearch": false,
    "includeSubdomains": false
  }
}
```

**Options:**
- `urls` (required) - Array of URLs to extract from
- `prompt` - Custom extraction prompt
- `systemPrompt` - System prompt for LLM
- `schema` - JSON schema for structured data
- `allowExternalLinks` - Follow external links
- `enableWebSearch` - Use web search for context
- `includeSubdomains` - Include subdomains

**Returns:** Structured data matching the provided schema

**Best for:** Extracting specific structured data (products, contacts, events, etc.)

---

## Implementation Notes

### Authentication

- **Method:** API Key via environment variable
- **Storage:** `FIRECRAWL_API_KEY` in environment or config
- **Security:** Never commit API keys to version control

### Rate Limiting & Error Handling

Firecrawl MCP includes:
1. **Automatic Retries** with exponential backoff:
   - 1st retry: 1 second delay
   - 2nd retry: 2 seconds delay
   - 3rd retry: 4 seconds delay (capped)
2. **Credit Usage Monitoring**:
   - Warning at 1000 credits remaining
   - Critical alert at 100 credits remaining
3. **Smart Request Queuing** for batch operations
4. **Rate Limit Handling** with automatic backoff

### Logging System

The server provides comprehensive logging:
- Operation status and progress
- Performance metrics
- Credit usage monitoring
- Rate limit tracking
- Error conditions

Example log messages:
```
[INFO] Firecrawl MCP Server initialized successfully
[INFO] Starting scrape for URL: https://example.com
[INFO] Batch operation queued with ID: batch_1
[WARNING] Credit usage has reached warning threshold
[ERROR] Rate limit exceeded, retrying in 2s...
```

### Best Practices

1. **Use `onlyMainContent: true`** for cleaner output
2. **Set reasonable timeouts** for dynamic sites
3. **Use batch operations** for multiple URLs
4. **Monitor credit usage** to avoid interruptions
5. **Use Map tool first** to discover URLs before crawling
6. **Apply filters** (includeTags/excludeTags) for targeted scraping
7. **Enable caching** for frequently accessed content

### Comparison: Firecrawl vs Custom Web Fetcher

| Feature | Our Web Fetcher | Firecrawl MCP |
|---------|----------------|---------------|
| Single Page Scraping | ✅ Basic | ✅✅ Advanced |
| JavaScript Rendering | ❌ Limited | ✅ Full |
| Batch Processing | ✅ Parallel | ✅✅ Optimized |
| Rate Limiting | ⚠️ Basic | ✅✅ Built-in |
| Crawling | ❌ None | ✅ Full |
| Site Mapping | ❌ None | ✅ Available |
| Web Search | ❌ None | ✅ Available |
| Structured Extraction | ❌ None | ✅ LLM-powered |
| Error Handling | ✅ Basic | ✅✅ Comprehensive |
| Cost | Free | Paid API |

### Integration Possibilities

Firecrawl can enhance our project with:
- **Deep Research:** Crawl entire websites for comprehensive data
- **Structured Data:** Extract specific information with schemas
- **Dynamic Sites:** Handle JavaScript-heavy modern websites
- **Site Discovery:** Map websites before targeted scraping
- **Lead Enrichment:** Extract company/contact information
- **SEO Analysis:** Crawl and analyze website structure

### Future Enhancements

Potential integrations:
- [ ] Replace custom web fetcher with Firecrawl for better reliability
- [ ] Add structured data extraction for specific use cases
- [ ] Implement website crawling for deep research queries
- [ ] Use Map tool for site discovery before scraping
- [ ] Add Firecrawl Search as alternative to Brave Search
- [ ] Cache Firecrawl results to reduce API costs

### Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| Server not found | Not installed | Run `npx -y firecrawl-mcp` |
| Authentication failed | Invalid API key | Check `FIRECRAWL_API_KEY` |
| Credit limit reached | API quota exceeded | Upgrade plan or wait for reset |
| Timeout errors | Slow site loading | Increase `timeout` value |
| Rate limit exceeded | Too many requests | Use batch operations |
| Empty results | Site blocking | Use `mobile` or adjust headers |

### Related Files

- `/home/mint/.cursor/mcp.json` - Cursor MCP configuration
- `.mcp/config.json` - Project MCP configuration (if using project-level)
- `lib/web-fetcher.ts` - Custom web fetcher (could be replaced by Firecrawl)
- `lib/brave-search.ts` - Brave Search integration

### Documentation Links

- [Official Firecrawl MCP Documentation](https://docs.firecrawl.dev/mcp-server)
- [Firecrawl Main Docs](https://docs.firecrawl.dev/)
- [Firecrawl GitHub](https://github.com/firecrawl/firecrawl)
- [Get API Key](https://firecrawl.dev/app/api-keys)
- [Pricing Plans](https://firecrawl.dev/pricing)

---

## Development

### Contributing to Firecrawl

```bash
# Clone repository
git clone https://github.com/firecrawl/firecrawl

# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test
```

### License

MIT License - see [LICENSE](https://github.com/firecrawl/firecrawl/blob/main/LICENSE) file for details

---

## Credits

Thanks to:
- [@vrknetha](https://github.com/vrknetha) - Initial implementation
- [@cawstudios](https://github.com/cawstudios) - Contributions
- [MCP.so](https://mcp.so/) and [Klavis AI](https://klavis.ai/) - Hosting
- [@gstarwd](https://github.com/gstarwd), [@xiangkaiz](https://github.com/xiangkaiz), [@zihaolin96](https://github.com/zihaolin96) - Integration work

