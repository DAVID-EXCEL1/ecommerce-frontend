import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://ecommerce-api-f4f2.onrender.com',
});

export default instance;
