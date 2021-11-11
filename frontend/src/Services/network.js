import axios from 'axios';

// ADVERTS CRUD
const ENDPOINT_BASE = 'http://localhost:3001/adverts';

export const getItems = async () => axios.get(ENDPOINT_BASE);

export const updateItem = async (id, payload) => (
  axios.put(`${ENDPOINT_BASE}/${id}`, payload)
);

export const deleteItem = async (id) => axios.delete(`${ENDPOINT_BASE}/${id}`);

export const newItem = async (payload) => axios.post(ENDPOINT_BASE, payload);

export const getItem = async (id) => axios.get(`${ENDPOINT_BASE}/${id}`);

// Webservices
export const getMakers = async () => axios.get(
  'https://desafioonline.webmotors.com.br/api/OnlineChallenge/Make'
);

export const getModels = async (makeId) => axios.get(
  `https://desafioonline.webmotors.com.br/api/OnlineChallenge/Model?MakeID=${makeId}`
);

export const getVersions = async (modelId) => axios.get(
  `https://desafioonline.webmotors.com.br/api/OnlineChallenge/Version?ModelID=${modelId}`
);
