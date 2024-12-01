import axios from "../utils/axios-customize"

export const handleLoginDoctor = (email, password) => {
    const URL_BACKEND = '/api/users/login-doctor'
    const data = {
        email, password
    }
    return axios.post(URL_BACKEND, data)
}

export const handleLogouDoctort = () => {
    const URL_BACKEND = '/api/users/logout-doctor'    
    return axios.post(URL_BACKEND)
}

