import axios from 'axios'

const baseUrl = 'http://localhost:3001'
const token = localStorage.getItem('ecom')

export const getSite = () =>
    /* axios.get(baseUrl + '/api/site', { headers: { 'Authorization': `bearer ${token}` } }).then(res => res.data) */
    axios.get(baseUrl + '/api/site').then(res => res.data)

export const getCategories = () =>
    axios.get(baseUrl + '/api/categories').then(res => res.data)

export const createNote = newNote =>
    axios.post(baseUrl, newNote).then(res => res.data)

export const createCategory = newCategory =>
    axios.post(`${baseUrl}/api/categories`, newCategory).then(res => res.data)

export const createUser = user =>
    axios.post(baseUrl + '/api/users/register', user).then(res => res.data)

export const loginUser = user =>
    axios.post(baseUrl + '/api/users/login', user).then(res => res.data)

export const updateNote = updatedNote =>
    axios.put(`${baseUrl}/${updatedNote.id}`, updatedNote).then(res => res.data)