import api from '../axiosClient'

export async function getAuthor(id) {
  const response = await api.get(`/author/${id}`)
  return response.data
}
