import http from '../http-common';

const login = credentials => {
  return http.post('/login/', credentials);
};
 
const setAuthToken = token => {
  localStorage.setItem('authToken', token);
};

const getAuthToken = () => {
  return localStorage.getItem('authToken');
};


const removeAuthToken = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
};


const AuthServices = {
  login,
  setAuthToken,
  getAuthToken,
  removeAuthToken,
};

export default AuthServices;