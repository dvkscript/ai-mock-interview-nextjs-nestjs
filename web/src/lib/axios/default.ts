import envConfig from '@/configs/env.config';
import axios from 'axios';
import { getCookie } from '../utils/cookie';

const defaultApi = axios.create({
  baseURL: envConfig.defaultApi,
  // timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  transformResponse: [(data) => {
    const parsed = JSON.parse(data);
    return parsed?.data ?? parsed;
  }],
});

defaultApi.interceptors.request.use(async (config) => {
  const token = await getCookie("accessToken");
    
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default defaultApi;
