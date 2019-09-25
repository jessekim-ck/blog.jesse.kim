import axios from 'axios'
// import * as AxiosLogger from 'axios-logger'


const axios_api = () => {
    const token = localStorage.getItem('token')
    let header
    if (token && token !== 'undefined') {
        header = { Authorization: `JWT ${token}` }
    } else {
        header = {}
    }

    return axios.create({
        baseURL: 'https://api.weekend.kim/',
        timeout: 5000,
        headers: header
    })
}

export default axios_api()

// axios_api.interceptors.request.use(AxiosLogger.requestLogger, AxiosLogger.errorLogger);
// axios_api.interceptors.response.use(AxiosLogger.responseLogger, AxiosLogger.errorLogger);