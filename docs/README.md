# Documentation Directory

This directory contains reference documentation for various APIs and services used in the project.

## Structure

```
docs/
├── README.md                 # This file - documentation index
├── api-references/           # API documentation for external services
│   ├── brave-api.md         # Brave Search API reference
│   ├── google-ai-api.md     # Google AI/Gemini API reference (future)
│   └── ...                  # Add more API docs as needed
└── guides/                   # Implementation guides (future)
    └── ...
```

## API References

### Active APIs

- **[Brave Search API](./api-references/brave-api.md)** - Web search functionality
  - Search endpoint documentation
  - Rate limits and quotas
  - Authentication details
  - Response format

### Planned Documentation

- **Google AI/Gemini API** - LLM integration details
- **MCP Server Protocols** - Model Context Protocol documentation

## Usage

When working with the AI assistant, you can reference these documents:
- `@docs/api-references/brave-api.md` - For Brave Search specific questions
- The AI can read these files directly for accurate API implementation

## Adding New Documentation

1. Create a new `.md` file in the appropriate subdirectory
2. Use clear, descriptive naming (e.g., `service-name-api.md`)
3. Include examples, limits, and authentication details
4. Update this README with a link and description

## Best Practices

- Keep each API documentation in a separate file
- Include version numbers and last updated dates
- Add code examples where relevant
- Document rate limits, quotas, and error codes
- Include links to official documentation sources

