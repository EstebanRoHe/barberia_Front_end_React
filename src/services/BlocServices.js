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
    return http.get("/bloc/list/", config)
}

const getBy = id=>{
    const config = {
        headers: {
          Authorization: `Token ${authToken}`, 
        },
      };
    return http.get(`/bloc/findBy/${id}`, config);
};

const create = data => {
  const config = {
    headers: {
      Authorization: `Token ${authToken}`, 
    },
  };
    return http.post("/bloc/create/",data, config);
};

const update = (id, data) => {
  const config = {
    headers: {
      Authorization: `Token ${authToken}`, 
    },
  };
  return http.put(`/bloc/update/${id}/`, data, config);
};


const remove = id => {
    const config = {
        headers: {
          Authorization: `Token ${authToken}`, 
        },
      };
    return http.delete(`/bloc/delete/${id}`, config);
};

const BlocServices = {
    getAll,
    getBy,
    create,
    update,
    remove,
    setAuthToken,
};
export default BlocServices;
