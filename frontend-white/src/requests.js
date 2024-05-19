import axios from 'axios'

export const baseUrl = 'http://localhost:3001'
//export const baseUrl = 'https://api.gustaflund.com'
const token = localStorage.getItem('gustaflund-bunny-racer') || '';

// export const getSite = () =>
//     /* axios.get(baseUrl + '/api/site', { headers: { 'Authorization': `bearer ${token}` } }).then(res => res.data) */
//     axios.get(baseUrl + '/api/site').then(res => res.data)

export const getCategories = () =>
    axios.get(baseUrl + '/api/categories/new').then(res => res.data)

export const getAdminCategories = () =>
    axios.get(baseUrl + '/api/categories/admin/new', { headers: { 'Authorization': `bearer ${token}` } }).then(res => res.data)

export const getAdminOrders = () =>
    axios.get(baseUrl + '/api/orders/admin', { headers: { 'Authorization': `bearer ${token}` } }).then(res => res.data)

export const createNote = newNote =>
    axios.post(baseUrl, newNote).then(res => res.data)

export const createCategory = newCategory =>
    axios.post(`${baseUrl}/api/categories/admin`, newCategory, { headers: { 'Authorization': `bearer ${token}` } }).then(res => res.data)

export const updateCategory = category =>
    axios.put(`${baseUrl}/api/categories/admin`, category, { headers: { 'Authorization': `bearer ${token}` } }).then(res => res.data)

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

export const updateTracking = order => // => Updates the tracking number on the order
    axios.put(`${baseUrl}/api/order/admin/tracking/${order.id}`, order).then(res => res.data)

// export const readOrder = data => // => REad the order on confirmation
//     axios.post(baseUrl + `/api/read/${data.order_id}`, data).then(res => res.data)

export const addReview = data =>
    axios.post(baseUrl + `/api/items/reviews/${data.id}`, data).then(res => res.data)


export const addReminder = data =>
    axios.post(baseUrl + `/api/items/remindme/${data.itemid}`, data).then(res => res.data)


// STRIPE
export const initiateCheckout = data =>
    axios.post(baseUrl + '/api/orders/create-payment-intent', data).then(res => res.data)

export const checkPayment = data =>
    axios.post(baseUrl + '/api/orders/checkpayment', data).then(res => res.data)

export const updatePayment = data =>
    axios.post(baseUrl + '/api/orders/update-payment-intent', data).then(res => res.data)

export const createOrder = data =>
    axios.post(baseUrl + '/api/orders/createorder', data).then(res => res.data)
