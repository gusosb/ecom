import axios from 'axios'

// const baseUrl = 'http://localhost:3001'
const baseUrl = 'https://ecomapi.kanindev.se'
const token = localStorage.getItem('ecom')

// export const getSite = () =>
//     /* axios.get(baseUrl + '/api/site', { headers: { 'Authorization': `bearer ${token}` } }).then(res => res.data) */
//     axios.get(baseUrl + '/api/site').then(res => res.data)

export const getCategories = () =>
    axios.get(baseUrl + '/api/categories').then(res => res.data)

export const getAdminCategories = () =>
    axios.get(baseUrl + '/api/categories/admin').then(res => res.data)

export const getAdminOrders = () =>
    axios.get(baseUrl + '/api/orders/admin').then(res => res.data)

export const createNote = newNote =>
    axios.post(baseUrl, newNote).then(res => res.data)

export const createCategory = newCategory =>
    axios.post(`${baseUrl}/api/categories/admin`, newCategory).then(res => res.data)

export const updateCategory = category =>
    axios.put(`${baseUrl}/api/categories/admin`, category).then(res => res.data)

export const createItem = newItem =>
    axios.post(`${baseUrl}/api/items`, newItem, { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': "multipart/form-data" } }).then(res => res.data)

export const createUser = user =>
    axios.post(baseUrl + '/api/users/register', user).then(res => res.data)

export const loginUser = user =>
    axios.post(baseUrl + '/api/users/login', user).then(res => res.data)

export const changeItemStatus = item =>
    axios.put(`${baseUrl}/api/items/status/${item}`, item).then(res => res.data)

export const updateItem = item =>
    axios.put(`${baseUrl}/api/items/${item.id}`, item).then(res => res.data)

export const updateVariant = variant =>
    axios.put(`${baseUrl}/api/items/variant/${variant.id}`, variant).then(res => res.data)

export const deleteImage = id =>
    axios.delete(`${baseUrl}/api/items/image/${id}`).then(res => res.data)

export const addImage = newImage =>
    axios.post(`${baseUrl}/api/items/image`, newImage, { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': "multipart/form-data" } }).then(res => res.data)

export const addVariant = newVariant =>
    axios.post(`${baseUrl}/api/items/variant`, newVariant, { headers: { 'Authorization': `bearer ${token}` } }).then(res => res.data)

export const initSession = data =>
    axios.post(baseUrl + '/api/orders/session', data).then(res => res.data)

export const confirmOrder = data => // => Fetch an existing order, when order_id already exists in localstorage
    axios.post(baseUrl + '/api/orders/confirm', data).then(res => res.data)

export const updateOrder = data => // => Updates the order with new price data
    axios.post(baseUrl + '/api/orders/update', data).then(res => res.data)

export const addReview = data =>
    axios.post(baseUrl + `/api/items/review/${data.id}`, data).then(res => res.data)