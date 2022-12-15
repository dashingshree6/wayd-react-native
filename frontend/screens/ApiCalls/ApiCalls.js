import axios from 'axios';
import { API } from '../backend';
import SyncStorage from 'sync-storage';

// GET 

export const getPincodes = () => axios.get(`${API}/pin`);

export const getAllUsers = async () => await axios.get(`${API}/users`)

// POST

export const createPincodes = (data) =>
axios.post(`${API}/pin/create`,  data );

// PUT

export const updatePincodes = (data, id) =>
  axios.patch(`${API}/pin/${id}`, { percent_add: data });

 

