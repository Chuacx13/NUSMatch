export const useApiUrl = () => {
    let apiUrl = '';
    if (process.env.NODE_ENV === 'production') {
        apiUrl = 'https://nusmatch-api.onrender.com';
    } else {
        apiUrl = 'http://localhost:3001';
    }
    return apiUrl;
}


