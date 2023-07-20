import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import UserServices from "../services/UserServices";
import AuthServices from '../services/AuthServices';
import Swal from "sweetalert2";

const UserList = (props) => {
    const [User, setUser] = useState([]);
    useEffect(() => {
        getList()
        // eslint-disable-next-line
    }, []);


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
                if (result.isConfirmed) {
                    UserServices.remove(idUser).then((response) => {
                        console.log(response.data);
                        getList();
                        swalWithBootstrapButtons.fire(
                            "Eliminado!",
                            "Tu archivo ha sido eliminado",
                            "Correctamente"
                        )
                    })
                        .catch(error => {
                            console.log(error);
                            swalWithBootstrapButtons.fire(
                                'Error',
                                'error'
                            );
                        });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        "Cancelado",
                        "No se ha eliminado nungun archivo"
                    );
                }
            });
    };


    return (
        <div className="container">

            <div className="card text bg-light mb-3">

                <div className="card-header d-flex justify-content-between">
                    <Link className="btn btn-primary " to={"/RegistreUser"}>
                        <i className="bi bi-person-plus"> to register</i>
                    </Link>
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
                                    User.map((username) => (
                                        <tr key={username.id}>
                                            <th scope="row">{username.id}</th>
                                            <td>{username.username}</td>
                                            <td>{username.first_name}</td>
                                            <td>{username.last_name}</td>
                                            <td>{username.email}</td>
                                            <td>
                                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                    <Link className="btn btn-secondary" >
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

                    </div>
                </div>

            </div>

        </div >

    )

}

export default UserList