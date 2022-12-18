import ApiClient from '../api-client';

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error('Please define the NEXT_PUBLIC_API_URL environment variable');
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const client = new ApiClient(baseUrl);

export default client;
