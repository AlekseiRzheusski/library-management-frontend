import api from '../axiosClient'

export async function getBook(id) {
  const response = await api.get(`/book/${id}`)
  return response.data
}

export async function getBooksPage(params) {
  const response = await api.get('/book/list', { params });
  return response.data
}
