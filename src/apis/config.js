import axios from 'axios'
import * as AxiosLogger from 'axios-logger'

export const axios_api = (() => {
    const token = localStorage.getItem('token')
    let header
    if (token) {
        header = { Authorization: `JWT ${token}` }
    } else {
        header = {}
    }

    return axios.create({
        baseURL: 'https://api.weekend.kim/',
        timeout: 5000,
        headers: header
    })
})()

axios_api.interceptors.request.use(AxiosLogger.requestLogger, AxiosLogger.errorLogger);
axios_api.interceptors.response.use(AxiosLogger.responseLogger, AxiosLogger.errorLogger);