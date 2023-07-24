import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from '../images/logo.png'
import AuthServices from '../services/AuthServices';
import BlocServices from "../services/BlocServices";
import Swal from "sweetalert2";


const CreateBloc = () => {
 
    const initialBlocState = {
        id: null,
        description: "",
        url: "",
        user: null,
    }

    const [bloc, setBloc] = useState(initialBlocState);
    const [id, setId] = useState(null);

    useEffect(() => {
      const idUser =  AuthServices.getAuthId();
      setId(idUser)
    }, []);
   

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBloc({ ...bloc, [name]: value });

    };

    const createBloc = (e) => {
        e.preventDefault();
        const token = AuthServices.getAuthToken();
        if (token) {
            BlocServices.setAuthToken(token);
        } else {
            console.log("No se encontró un token válido");
            return;
        }
        var data = {
            id: bloc.id,
            description: bloc.description,
            url: bloc.url,
            user: id
        };

        BlocServices.create(data)
            .then(response => {
                setBloc({
                    description: response.data.description,
                    url: response.data.url,
                    user: response.data.user,
                });
                console.log(response.data);
                newBloc()
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Usuario Registrado Correctamente',
                    showConfirmButton: false,
                    timer: 2200,
                })
            })
            .catch(e => {
                console.log(e);
            });

    };
    const newBloc = () => {
        setBloc(initialBlocState);
    }

    return (
        <div className="first-create">
            <div className="container">
                <h1 className="h1-registre">New Post</h1>
                <div className="imagen-container">
                    <img src={logo} className="d-block w-100 imagen-thirs" alt="..." />
                </div>

                <div className="registre">
                    <div className="card card-registre">
                        <form className="row" onSubmit={createBloc} >

                        <div className="mb-3">
                                <label className="form-label">Url</label>
                                <input type="text" className="form-control" id="url"
                                    name="url"
                                    value={bloc.url}
                                    onChange={handleInputChange}
                                    required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Descripción</label>
                                <textarea  type="text" className="form-control" id="description"
                                    name="description"
                                    value={bloc.description}
                                    onChange={handleInputChange}
                                    required />
                            </div>
                            


                            <div>
                                <button type="submit" className="btn btn-primary" >
                                <i className="bi bi-plus-circle"> New Post</i>
                                    
                                </button>
                                <Link className="btn btn-danger" to={"/BlocList"} style={{ marginLeft: "1%" }}>
                                    <i className="bi bi-x-circle"> Cancelar</i>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CreateBloc