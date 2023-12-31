import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import logo from '../images/logo.png'
import AuthServices from '../services/AuthServices';
import BlocServices from "../services/BlocServices";
import Swal from "sweetalert2";
import ModalLoading from "./ModalLoading";

const BlocUpDate = () =>{
    const { id } = useParams();
 
    const initialBlocState = {
        id: null,
        description: "",
        url: "",
        user: null,
    }

    const [bloc, setBloc] = useState(initialBlocState);
    const [showModalLoading, setShowModalLoading] = useState(false);


    const getUser = id => {
        showModalLoadingHandler();
        const token = AuthServices.getAuthToken();
        if (token) {
            BlocServices.setAuthToken(token);
        } else {
            closeModalLoadingHandler();
            return;
        }
        BlocServices.getBy(id)
            .then(response => {
                setBloc(response.data);
                closeModalLoadingHandler();
            })
            .catch(e => {
                console.log(e);
                closeModalLoadingHandler();
            });
    };

    useEffect(() => {
        if (id) {
            getUser(id);
        }
        // eslint-disable-next-line
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setBloc({ ...bloc, [name]: value });
    };

    const showModalLoadingHandler = () => {
        setShowModalLoading(true);
    };

    const closeModalLoadingHandler = () => {
        setShowModalLoading(false);
    };

    const updateBloc = (e) => {
        e.preventDefault();
        showModalLoadingHandler();
        const token = AuthServices.getAuthToken();
        if (token) {
            BlocServices.setAuthToken(token);
        } else {
            console.error("No se encontró un token válido");
            closeModalLoadingHandler();
            return;
        }

        BlocServices.update(id, bloc)
            .then(response => {
                console.log(response.data);
                closeModalLoadingHandler();
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Usuario Actualizado Correctamente',
                    showConfirmButton: false,
                    timer: 2200
                })

            })
            .catch(e => {
                console.log(e);
                closeModalLoadingHandler();
            });

    };
    return (
        <div className="first-update-bloc">
            <div className="container">
                <h1 className="h1-registre">Actualizar Post</h1>
                <div className="imagen-container">
                    <img src={logo} className="d-block w-100 imagen-thirs" alt="..." />
                </div>

                <div className="registre">
                    <div className="card card-registre">
                        <form className="row" onSubmit={updateBloc} >
                        <div className="mb-3">
                                <label className="form-label">Url</label>
                                <input type="text" className="form-control" id="url"
                                    name="url"
                                    value={bloc.url}
                                    onChange={handleInputChange}
                                    required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea  type="text" className="form-control" id="description"
                                    name="description"
                                    value={bloc.description}
                                    onChange={handleInputChange}
                                    required />
                            </div>
        
                            <div>
                                <button type="submit" className="btn btn-primary" >
                                    Actualizar
                                </button>
                                <Link className="btn btn-danger" to={"/BlocList"} style={{ marginLeft: "1%" }}>
                                    <i className="bi bi-x-circle"> Cancelar</i>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
                
                {showModalLoading && (
                        <ModalLoading />
                    )}
            </div>
        </div>

    )
}

export default BlocUpDate;