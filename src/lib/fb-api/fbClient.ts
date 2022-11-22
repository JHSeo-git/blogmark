import ApiClient from '../api-client';

const baseUrl = 'https://graph.facebook.com/v15.0';

const fbClient = new ApiClient(baseUrl);

export default fbClient;
