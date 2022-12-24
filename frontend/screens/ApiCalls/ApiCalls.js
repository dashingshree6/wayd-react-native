import axios from 'axios';
import { API } from '../backend';
import SyncStorage from 'sync-storage';

// GET 

export const getPincodes = () => axios.get(`${API}/pin`);

export const getAllUsers = async () => await axios.get(`${API}/users`)

export const getAllProducts = () => axios.get(`${API}/products`);

export const getCartDetails = (id) => axios.get(`${API}/cart/${id}`);

export const getCartDetailsByUserId = (id) => axios.get(`${API}/cart/user/${id}`)

export const getCategories = () => axios.get(`${API}/categories`)

export const getAllProcurements = () => axios.get(`${API}/order/procure`)

export const getAllOrders = () => axios.get(`${API}/order/all`)

// POST

export const createPincodes = (data) =>
axios.post(`${API}/pin/create`,  data );

export const addProductToCart = (data, id) =>
axios.post(`${API}/add/${id}`,  data );

export const createNewOrder = (data) =>
axios.post(`${API}/order/create`,  data );

export const updateCartDetails = (action, id, data) => axios.post(`${API}/update/${action}/${id}`, data)

// PUT

export const updatePincodes = (data, id) =>
  axios.patch(`${API}/pin/${id}`, { percent_add: data });


 
export const updateCashCollection = (data) =>
axios.post(`${API}/cashcollection`,data)

export const updateCartItems = (id, data) => axios.post(`${API}/cart/update/${id}`, data)
       

  