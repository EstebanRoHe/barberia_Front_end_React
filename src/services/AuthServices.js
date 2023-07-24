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

const setAuthId = id => {
  localStorage.setItem('authId', id);
};

const getAuthId = () => {
  return localStorage.getItem('authId');
};

const setAuthUsername = username => {
  localStorage.setItem('authUsername', username);
};

const getAuthUsername = () => {
  return localStorage.getItem('authUsername');
};

const setAuthRole= role => {
  localStorage.setItem('authRole', role);
};

const getAuthRole = () => {
  return localStorage.getItem('authRole');
};



const removeAuthToken = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('authId');
  localStorage.removeItem('authUsername');
  localStorage.removeItem('authRole');
};


const AuthServices = {
  login,
  setAuthToken,
  getAuthToken,
  removeAuthToken,
  setAuthId,
  getAuthId,
  setAuthUsername,
  getAuthUsername,
  setAuthRole,
  getAuthRole

};

export default AuthServices;