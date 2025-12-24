import api from "../axiosClient";

export async function getUserBorrowings(params){
    const response = await api.get('/borrowing/borrowings', { params });
    return response.data
}
