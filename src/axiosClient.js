import axios from 'axios'
import { useAuthStore } from './stores/auth';

const api = axios.create({
  baseURL: 'http://localhost:5140/api',
  withCredentials: true,
  timeout: 5000
})

api.interceptors.request.use(config => {
  const auth = useAuthStore()
  if (auth.accessToken) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`
  }
  return config
})

api.interceptors.response.use(
  res => res,
  async error => {
    const auth = useAuthStore();

    if (error.config.url.endsWith('/auth/refresh') || error.config.url.endsWith('/auth/logout') || error.config.url.endsWith('/auth/login')) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;

      try {
        const res = await api.post('/auth/refresh');
        const auth = useAuthStore();
        auth.setAccessToken(res.data.accessToken);

        error.config.headers.Authorization =
          `Bearer ${res.data.accessToken}`;

        return api(error.config)
      } catch {
        auth.logout();
        location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
)

export default api;
