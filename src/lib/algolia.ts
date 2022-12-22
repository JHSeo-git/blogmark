import algoliasearch from 'algoliasearch';

if (!process.env.ALGOLIA_APP_ID || !process.env.ALGOLIA_ADMIN_KEY) {
  throw new Error('Please define the ALGOLIA_APP_ID and ALGOLIA_API_KEY environment variables');
}

if (!process.env.ALGOLIA_INDEX_KEY) {
  throw new Error('Please define the ALGOLIA_INDEX_KEY environment variable');
}

const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);
export const algolia = client.initIndex(process.env.ALGOLIA_INDEX_KEY);
