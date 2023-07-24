import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import UserServices from "../services/UserServices";
import AuthServices from '../services/AuthServices';
import Swal from "sweetalert2";
import Pagination from "./Pagination";
import Loading from "./Loading";
import ModalLoading from "./ModalLoading";

const UserList = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 9;
    const [User, setUser] = useState([]);
    const [error, setError] = useState(false);
    const [filtro, setFiltro] = useState("");
    const [showModalLoading, setShowModalLoading] = useState(false);

    useEffect(() => {
        getList()
        // eslint-disable-next-line
    }, []);

    const handleFiltroChange = (event) => {
        setFiltro(event.target.value);
        filtroName(filtro);
    };

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const showModalLoadingHandler = () => {
        setShowModalLoading(true);
    };

    const closeModalLoadingHandler = () => {
        setShowModalLoading(false);
    };

    const paginated = User.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );


    const getList = () => {
        const token = AuthServices.getAuthToken();
        if (token) {
            UserServices.setAuthToken(token);
        } else {
            console.log("No se encontró un token válido");
            return;
        }
        UserServices.getAll()
            .then((response) => {
                setUser(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const remove = (idUser) => {
        const token = AuthServices.getAuthToken();
        if (token) {
            UserServices.setAuthToken(token);
        } else {
            console.error("No se encontró un token válido");
            return;
        }
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
        });

        swalWithBootstrapButtons
            .fire({
                title: "Deseas eliminar este archivo?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Si, eliminar!",
                cancelButtonText: "No, cancelar!",
                reverseButtons: true,
            })
            .then((result) => {
                showModalLoadingHandler();
                if (result.isConfirmed) {
                    UserServices.remove(idUser).then((response) => {
                        console.log(response.data);
                        getList();
                        closeModalLoadingHandler();
                        swalWithBootstrapButtons.fire(
                            "Eliminado!",
                            "Tu archivo ha sido eliminado Correctamente.",
                            "success"
                        )
                    })
                        .catch(error => {
                            console.log(error);
                            closeModalLoadingHandler();
                            swalWithBootstrapButtons.fire(
                                'Error',
                                'Hubo un error al eliminar el archivo',
                                'error'
                            );
                        });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    closeModalLoadingHandler();
                    swalWithBootstrapButtons.fire(
                        "Cancelado",
                        "No se ha eliminado ningún archivo",
                        "info"
                    );
                }
            });
    };

    const filtroName = (filtro) => {
        showModalLoadingHandler();
        const token = AuthServices.getAuthToken();
        if (token) {
            UserServices.setAuthToken(token);
        } else {
            console.error("No se encontró un token válido");
            closeModalLoadingHandler();
            return;
        }
        if (filtro != null) {
            UserServices.filter(filtro)
                .then((response) => {
                    setUser(response.data);
                    setError(false);
                    closeModalLoadingHandler();
                })
                .catch((e) => {
                    setError(true);
                    console.log(e);
                    closeModalLoadingHandler();
                });
        } else {
            getList()
            closeModalLoadingHandler();
        }
    };


    return (
        <div className="container" style={{ marginTop: "1%" }}>
            {User.length === 0 ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Loading />
                    <i className="bi bi-info-circle" style={{ color: "red", marginBottom: "1%" }}> No se encuentra ningún Usuario Registrado</i>
                    <Link className="btn btn-primary " to={"/RegistreUser"}>
                            <i className="bi bi-person-plus"> Registrar</i>
                        </Link>

                </div>
            ) : (
                <div className="card text bg-light mb-3">
                    <div className="card-header d-flex justify-content-between">
                        <Link className="btn btn-primary " to={"/RegistreUser"}>
                            <i className="bi bi-person-plus"> Registrar</i>
                        </Link>

                        <div className="ml-auto d-flex flex-column">
                            <div className="input-container">
                                <input
                                    type="text"
                                    className="form-control filtro flex-grow-1"
                                    value={filtro}
                                    onChange={handleFiltroChange}
                                    onBlur={handleFiltroChange}
                                    onKeyUp={handleFiltroChange}
                                    placeholder="Seach for name"
                                />
                            </div>

                            {error && (
                                <small className="errorSmall" id="helpId" style={{ marginTop: "1%" }}>
                                    <i className="bi bi-exclamation-circle"> Usuario no encontrado</i>
                                </small>
                            )}

                        </div>


                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-striped border = 1">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">UserName</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Last Name</th>
                                        <th scope="col">Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {User &&
                                        paginated.map((username) => (
                                            <tr key={username.id}>
                                                <th scope="row">{username.id}</th>
                                                <td>{username.username}</td>
                                                <td>{username.first_name}</td>
                                                <td>{username.last_name}</td>
                                                <td>{username.email}</td>
                                                <td>
                                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                        <Link className="btn btn-secondary" to={"/UserUpDate/" + username.id} >
                                                            <i className="bi bi-gear"> Actualizar</i>
                                                        </Link>

                                                        <button className="btn btn-danger" onClick={() => remove(username.id)}>
                                                            <i className="bi bi-trash3"> Eliminar</i>
                                                        </button>
                                                    </div>

                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                            <Pagination
                                pageCount={Math.ceil(User.length / itemsPerPage)}
                                handlePageChange={handlePageChange}
                            />

                        </div>
                    </div>

                    {showModalLoading && (
                        <ModalLoading />
                    )}

                </div>
            )}
        </div >

    )

}

export default UserList