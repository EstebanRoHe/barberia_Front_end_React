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

const getBy = id=>{
    const config = {
        headers: {
          Authorization: `Token ${authToken}`, 
        },
      };
    return http.get(`/findByid/${id}`, config);
};

const create = data => {
    return http.post("/register/",data);
};

const update = (id, data) => {
  const config = {
    headers: {
      Authorization: `Token ${authToken}`, 
    },
  };
  return http.put(`/update/${id}/`, data, config);
};


const remove = idUser => {
    const config = {
        headers: {
          Authorization: `Token ${authToken}`, 
        },
      };
    return http.delete(`/delete/${idUser}`, config);
};

const filter = firstName=> {
  const config = {
      headers: {
        Authorization: `Token ${authToken}`, 
      },
    };
  return http.get(`/users/search/?first_name=${firstName}`, config);
};

const check = ()=> {
  return http.get(`/check/`);
};

const UserServices = {
    getAll,
    getBy,
    create,
    update,
    remove,
    filter,
    setAuthToken,
    check,

};
export default UserServices;
