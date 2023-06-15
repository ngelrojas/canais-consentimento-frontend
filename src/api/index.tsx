import axios from 'axios'
import { URL_API_GATEWAY } from './config';

const BASE_URL = URL_API_GATEWAY;

export default axios.create({
    baseURL: BASE_URL
})