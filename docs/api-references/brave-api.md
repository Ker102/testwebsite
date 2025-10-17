# Brave Search API Documentation

> **Source:** [Brave API Dashboard - Web Search Documentation](https://api-dashboard.search.brave.com/app/documentation/web-search/get-started)
> 
> **Last Updated:** October 17, 2025

---

## Table of Contents
- [Web Search API](#brave-web-search-api)
  - [Introduction](#introduction)
  - [Endpoints](#endpoints)
  - [Example Usage](#example)
- [Local Search API](#brave-local-search-api)
  - [Introduction](#introduction-1)
  - [Endpoints](#endpoints-1)
  - [Example Usage](#example-1)
- [Implementation Notes](#implementation-notes)

---

## Brave Web Search API

### Introduction

Brave Web Search API is a REST API to query Brave Search and get back search results from the web. The following sections describe how to curate requests, including parameters and headers, to Brave Web Search API and get a JSON response back.

> **Important:** To try the API on a Free plan, you'll still need to subscribe — you simply won't be charged. Once subscribed, you can get an API key in the API Keys section.

### Endpoints

Brave Search API exposes multiple endpoints for specific types of data, based on the level of your subscription. If you don't see the endpoint you're interested in, you may need to change your subscription.

**Primary Endpoint:**
```
https://api.search.brave.com/res/v1/web/search
```

**Available Endpoints by Subscription:**
- Web Search (all tiers)
- Summarizer Search
- AI Grounding
- Image Search
- Video Search
- News Search
- Suggest
- Spellcheck

### Example

A request has to be made to the web search endpoint. An example CURL request is given below:

```bash
curl -s --compressed "https://api.search.brave.com/res/v1/web/search?q=brave+search" \
  -H "Accept: application/json" \
  -H "Accept-Encoding: gzip" \
  -H "X-Subscription-Token: <YOUR_API_KEY>"
```

The response specification for Web Search API can be seen in the `WebSearchApiResponse` model.

### Next Steps

To learn what parameters are available and what responses can be expected while querying Brave Web Search API, please review the following pages:

* Query Parameters
* Request Headers
* Response Headers
* Response Objects

---

## Brave Local Search API

### Introduction

Brave Local Search API provides enrichments for location search results.

> **Note:** Access to Local API is available through the Pro plans.

### Endpoints

Brave Local Search API is currently available at the following endpoints and exposes an API to get extra information about a location, including pictures and related web results.

**Points of Interest (POI) Endpoint:**
```
https://api.search.brave.com/res/v1/local/pois
```

The endpoint supports batching and retrieval of extra information of up to **20 locations** with a single request.

**AI Description Endpoint:**

The local API also includes an endpoint to get an AI generated description for a location:

```
https://api.search.brave.com/res/v1/local/descriptions
```

### Example

#### Step 1: Initial Web Search

An initial request has to be made to web search endpoint with a given query:

```bash
curl -s --compressed "https://api.search.brave.com/res/v1/web/search?q=greek+restaurants+in+san+francisco" \
  -H "Accept: application/json" \
  -H "Accept-Encoding: gzip" \
  -H "X-Subscription-Token: <YOUR_API_KEY>"
```

#### Step 2: Extract Location IDs

If the query returns a list of locations, each location result has an `id` field, which is a temporary ID that can be used to retrieve extra information about the location:

```json
{
  "locations": {
    "results": [
      {
        "id": "1520066f3f39496780c5931d9f7b26a6",
        "title": "Pangea Banquet Mediterranean Food"
      },
      {
        "id": "d00b153c719a427ea515f9eacf4853a2",
        "title": "Park Mediterranean Grill"
      },
      {
        "id": "4b943b378725432aa29f019def0f0154",
        "title": "The Halal Mediterranean Co."
      }
    ]
  }
}
```

#### Step 3: Fetch Extra Location Information

The `id` value can be used to further fetch extra information about the location:

```bash
curl -s --compressed "https://api.search.brave.com/res/v1/local/pois?ids=1520066f3f39496780c5931d9f7b26a6&ids=d00b153c719a427ea515f9eacf4853a2" \
  -H "accept: application/json" \
  -H "Accept-Encoding: gzip" \
  -H "x-subscription-token: <YOUR_API_KEY>"
```

#### Step 4: Fetch AI-Generated Descriptions

An AI generated description associated with a location can be fetched using:

```bash
curl -s --compressed "https://api.search.brave.com/res/v1/local/descriptions?ids=1520066f3f39496780c5931d9f7b26a6&ids=d00b153c719a427ea515f9eacf4853a2" \
  -H "accept: application/json" \
  -H "Accept-Encoding: gzip" \
  -H "x-subscription-token: <YOUR_API_KEY>"
```

The response specification for Local Search API can be seen in the `LocalPoiSearchApiResponse` and `LocalDescriptionsSearchApiResponse` models.

---

## Implementation Notes

### Current Project Implementation

Our project currently uses the **Brave Web Search API** with the following configuration:

**File:** `lib/brave-search.ts`

```typescript
// Endpoint used
const BRAVE_WEB_SEARCH_ENDPOINT = "https://api.search.brave.com/res/v1/web/search";

// Headers required
{
  "Accept": "application/json",
  "Accept-Encoding": "gzip",
  "X-Subscription-Token": process.env.BRAVE_API_KEY
}
```

### Authentication

- **Method:** API Key via `X-Subscription-Token` header
- **Storage:** Environment variable `BRAVE_API_KEY` in `.env.local`
- **Security:** Never commit API keys to version control (already in `.gitignore`)

### Rate Limits & Quotas

#### Free Tier
- **2,000 queries per month**
- Rate limited
- Perfect for development and testing

#### Pro Tiers
- More queries per month
- Higher rate limits
- Access to additional endpoints (Local Search, etc.)

### Response Format

All responses are in **JSON format** with the following structure:

```typescript
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
```

### Best Practices

1. **Always use compression:** Include `Accept-Encoding: gzip` header
2. **URL encoding:** Properly encode query parameters using `encodeURIComponent()`
3. **Error handling:** Implement retry logic for network failures
4. **Batching:** For local searches, batch up to 20 location IDs per request
5. **Caching:** Consider caching results to reduce API calls
6. **Timeout:** Set reasonable timeouts (we use 10 seconds)

### Integration Features

Our implementation includes:

✅ **Web Search** - Basic search functionality  
✅ **Result Parsing** - Extracts titles, URLs, descriptions  
✅ **URL Extraction** - Gets URLs for web content fetching  
✅ **Top 5 Results** - Returns the most relevant results  
✅ **Error Handling** - Graceful fallback on failures  
✅ **Web Content Fetching** - Reads full webpage content from results  

### Future Enhancements

Potential features to add:

- [ ] **Image Search** - Add image search capabilities
- [ ] **Video Search** - Search for video content
- [ ] **News Search** - Real-time news results
- [ ] **Local Search** - Location-based enrichments (requires Pro plan)
- [ ] **AI Descriptions** - AI-generated summaries (requires Pro plan)
- [ ] **Spellcheck** - Query correction suggestions
- [ ] **Autocomplete** - Search suggestions

### Troubleshooting

Common issues and solutions:

| Issue | Cause | Solution |
|-------|-------|----------|
| 401 Unauthorized | Invalid API key | Check `BRAVE_API_KEY` in `.env.local` |
| 429 Too Many Requests | Rate limit exceeded | Wait or upgrade plan |
| Empty results | No matches found | Refine search query |
| Timeout | Network issues | Increase timeout, check connectivity |

### Related Files

- `lib/brave-search.ts` - Main search implementation
- `lib/web-fetcher.ts` - Webpage content fetching
- `app/api/chat/route.ts` - Integration with Gemini AI
- `.env.local` - API key configuration (not in git)

### Documentation Links

- [Official Brave API Documentation](https://api-dashboard.search.brave.com/app/documentation/web-search/get-started)
- [API Dashboard](https://api-dashboard.search.brave.com/)
- [Pricing Plans](https://api-dashboard.search.brave.com/app/pricing)
- [API Playground](https://api-dashboard.search.brave.com/app/playground)



