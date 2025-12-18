import api from '../axiosClient'

export async function login(username, password) {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
}

// export function register(username, password) {
//     return api.post('/auth/register', { username, password })
// }

export function logout(refreshToken) {
    return api.post('/auth/logout')
}

export function refreshToken(refreshToken) {
    const response = api.post('/auth/login', { username, password });
    return response.data;
}
