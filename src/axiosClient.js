import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5140/api', // ← URL твоего backend'a
  timeout: 5000
})

export default api;
