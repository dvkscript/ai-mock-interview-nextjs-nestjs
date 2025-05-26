import envConfig from '@/configs/env.config';
import axios from 'axios';

const gatewayApi = axios.create({
  baseURL: envConfig.gatewayApi,
  timeout: 1000000,
  headers: {
    'Content-Type': 'application/json',
  },
  transformResponse: [(data) => {
    const parsed = JSON.parse(data);
    return parsed?.data?.data || parsed?.data || parsed;
  }]
});

export default gatewayApi;
