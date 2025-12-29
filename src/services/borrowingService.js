import api from "../axiosClient";

export async function getUserBorrowings(params){
    const response = await api.get('/borrowing/borrowings', { params });
    return response.data
}

export async function BorrowBook(bookId, daysToReturn){
    const response = await api.post('/borrowing/borrow', {bookId, daysToReturn});
    return response.data;
}
