import axios from 'axios';
export const API_URL = 'http://localhost:5000';


export const postApi = async(url, post, token ) => {
   const res = await axios.post( `${API_URL}/api/${url}`, post, {      headers: { Authorization: token} 
   })
   return res;
}

export const getApi = async(url, token ) => {
   const res = await axios.get(`${API_URL}/api/${url}`, {
      headers: { Authorization: token}
   })
   return res;
}

export const patchApi = async(url, post, token ) => {
   const res = await axios.patch( `${API_URL}/api/${url}`, post, {
      headers: { Authorization: token}
   })
   return res;
}

export const putApi = async(url, post, token ) => {
   const res = await axios.put( `${API_URL}/api/${url}`, post, {
      headers: { Authorization: token}
   })
   return res;
}

export const delApi = async(url, token ) => {
   const res = await axios.delete( `${API_URL}/api/${url}`, {
      headers: { Authorization: token}
   })
   return res;
}