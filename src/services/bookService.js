import api from '../axiosClient'

export async function getBook(id) {
  const response = await api.get(`/book/${id}`)
  return response.data
}
