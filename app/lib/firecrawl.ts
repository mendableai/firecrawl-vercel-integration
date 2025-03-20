import Firecrawl from '@mendable/firecrawl-js';

const firecrawl = new Firecrawl({
  apiKey: process.env.FIRECRAWL_API_KEY || 'FIRECRAWL-API-KEY',
});

const getEvents = async (url: string, prompt: string, schema: object) => {
  const result = await firecrawl.extract([url], {
    prompt,
    schema,
  });
  return result;
};

export {getEvents};
