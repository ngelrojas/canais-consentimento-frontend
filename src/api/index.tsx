import axios from 'axios'

const URL_PROD=import.meta.env.VITE_APP_URL_CANAIS

export default axios.create({
    baseURL: URL_PROD
})