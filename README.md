# Events Extractor

This is a demo application showcasing the use of [Firecrawl](https://firecrawl.dev) to extract events and information from Rotten Tomatoes movie pages.

## Overview

The application demonstrates how to:
- Extract structured data from a website using Firecrawl's AI-powered extraction
- Process webpage content using predefined schemas
- Display extracted results in a user-friendly interface
- Export results as JSON

[View the live demo here](https://events-extractor.vercel.app/)

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/) package manager
- [Firecrawl API Key](https://www.firecrawl.dev/app/api-keys)

## Setup

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env.local` file and add your Firecrawl API key:

```
FIRECRAWL_API_KEY=your_api_key_here
```

## Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## API Key

This demo requires an API Key from Firecrawl. You can obtain one by:
1. Signing up at [Firecrawl](https://www.firecrawl.dev)
2. Accessing the dashboard
3. Navigating to the [API Keys page](https://www.firecrawl.dev/app/api-keys)
