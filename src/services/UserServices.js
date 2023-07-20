import http from "../http-common";
let authToken = null;

const setAuthToken = (token) => {
  authToken = token;
};
const getAll = ()=>{
    const config = {
        headers: {
          Authorization: `Token ${authToken}`, 
        },
      };
    return http.get("/list/", config)
}

const get = idUser =>{
    const config = {
        headers: {
          Authorization: `Token ${authToken}`, 
        },
      };
    return http.get(`/findByid/${idUser}`, config);
};

const create = data => {
    return http.post("/register/",data);
};

const update =(idUser, data)=>{
    const config = {
        headers: {
          Authorization: `Token ${authToken}`, 
        },
      };
    return http.put(`/update/`,data, config);
};

const remove = idUser => {
    const config = {
        headers: {
          Authorization: `Token ${authToken}`, 
        },
      };
    return http.delete(`/delete/${idUser}`, config);
};

const UserServices = {
    getAll,
    get,
    create,
    update,
    remove,
    setAuthToken,
};
export default UserServices;
