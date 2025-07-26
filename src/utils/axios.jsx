import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://ecommerce-api-xi-ten.vercel.app/',
});

export default instance;
