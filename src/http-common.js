import axios from 'axios';

const api = axios.create({
  
 baseURL: 'https://barbers-tico.onrender.com',
  headers: {
    'Content-Type': 'application/json'
    ,'Access-Control-Allow-Origin': '*' 
  }
});

export default api;