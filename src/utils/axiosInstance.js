import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'https://writomat-backend.onrender.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;
