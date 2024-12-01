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

export const doiThongTinDoctor = (_idAcc, lastName, firstName, email, passwordMoi) => {
    return axios.put('/api/users/doi-mat-khau-doctor', {
        _idAcc, lastName, firstName, email, passwordMoi
    })
}

export const handleQuenPassword = (email_doimk) => {
    const URL_BACKEND = '/api/users/quen-mat-khau-doctor'   
    return axios.post(URL_BACKEND, {email_doimk})
}


