import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001'

const api = axios.create({
    baseURL
})

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('@token');
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
});

export { api, baseURL };