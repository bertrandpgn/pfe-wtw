import axios from 'axios'

const api = axios.create({
    baseURL: `${process.env.REACT_APP_URL}/api`,
})

const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export const getAllUsers = () => api.get(`/user/`)
export const getUser = id => api.get(`/user/${id}`)
export const insertUser = payload => api.post(`/user/`, payload, config)
export const deleteUser = id => api.delete(`/user/${id}`)
export const getAllSession = () => api.get(`/session/`)
export const getSession = (id) => api.get(`/session/${id}`)
export const insertSession = payload => api.post(`/session/`, payload, config)

const apis = {
    getAllUsers,
    getUser,
    insertUser,
    deleteUser,
    getAllSession,
    getSession,
    insertSession,
}

export default apis