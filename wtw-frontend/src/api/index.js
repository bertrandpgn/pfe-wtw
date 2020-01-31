import axios from 'axios'

const api = axios.create({
    baseURL: `${process.env.REACT_APP_URL}/api`,
})

export const getAllUsers = () => api.get(`/user`)
export const getUser = id => api.get(`/user/${id}`)
export const insertUser = payload => api.post(`/user`, payload)
export const deleteUser = id => api.delete(`/user/${id}`)

export const getSession = id => api.get(`/session/${id}`)

const apis = {
    getAllUsers,
    getUser,
    insertUser,
    deleteUser,
    getSession,
}

export default apis