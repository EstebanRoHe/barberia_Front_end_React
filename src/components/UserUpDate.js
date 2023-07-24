import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserServices from "../services/UserServices";
import AuthServices from '../services/AuthServices';
import logo from '../images/logo.png'
import Swal from "sweetalert2";
import "./UserUpDate.css"

const UserUpDate = () => {
    const { id } = useParams();

    const initialUserState = {
        id: null,
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: "",
        role: null,
    }

    const [User, setUser] = useState(initialUserState);
    const [check, setCheck] = useState([]);
    const [errors, setErrors] = useState({});

    const getUser = id => {
        const token = AuthServices.getAuthToken();
        if (token) {
            UserServices.setAuthToken(token);
        } else {
            return;
        }
        UserServices.getBy(id)
            .then(response => {
                setUser(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getCheck();
        if (id) {
            getUser(id);
        }
        // eslint-disable-next-line
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...User, [name]: value });
    };

    const handleInputblur = (event) => {
        handleInputChange(event);
        setErrors(validationErrror(User));
    };

    const updateUser = (e) => {
        e.preventDefault();
        const token = AuthServices.getAuthToken();
        if (token) {
            UserServices.setAuthToken(token);
        } else {
            console.error("No se encontró un token válido");
            return;
        }
        if (Object.keys(errors).length === 0) {
        UserServices.update(User.id, User)
            .then(response => {
                console.log(response.data);
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

            });
        }else{
            console.log("error en el else")
        }
    };

    const getCheck = (e) => {
        UserServices.check()
            .then((reponse) => {
                setCheck(reponse.data)
                console.log(reponse.data)
            })
            .catch((e) => {
                console.log(e);
            })
    }

 
    const validationErrror = (User) => {
        let errors = {}
        check.forEach(email => {
            if (email.email === User.email) {
                errors.email = "Email ya resgistrado"
            }

        })
        return errors;
    }

    return (
        <div className="first">
            <div className="container">
                <h1 style={{ textAlign: "center" }}><i className="bi bi-person-circle"></i> {User.username}</h1>
                <div className="imagen-container">
                    <img src={logo} className="d-block w-100 imagen-thirs" alt="..." />
                </div>
                <div className="in-Update">
                    <div className="card card-update">

                        <form className=" row form-Update" onSubmit={updateUser}>
                            <div className="mb-3">
                                <label className="form-label">Username</label>

                                <span className="input-group-text">
                                    <label className="form-label"> {User.username}</label>
                                </span>
                                <p style={{ color: 'red', fontSize: "15px" }}>¡Este campo no se puede modificar por seguridad!</p>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Nombre</label>
                                <input type="text" className="form-control" id="first_name"
                                    name="first_name"
                                    value={User.first_name}
                                    onChange={handleInputChange}
                                    required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Apellidos</label>
                                <input type="text" className="form-control" id="last_name"
                                    name="last_name"
                                    value={User.last_name}
                                    onChange={handleInputChange}
                                    required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" className={((errors.email) ? "is-invalid" : "") + " form-control"}
                                    id="email"
                                    name="email"
                                    value={User.email}
                                    onChange={handleInputChange}
                                    onBlur={handleInputblur}
                                    onKeyUp={handleInputblur}
                                    required />
                                     <small className="invalid-feedback" id="helpId" >
                                        <i className="bi bi-exclamation-circle"> {errors.email}</i>
                                    </small>
                            </div>

                            <div>
                                <button type="submit" className="btn btn-primary" >
                                    <i className="bi bi-gear">  Actualizar</i>

                                </button>

                                <Link className="btn btn-danger" to={"/"} style={{ marginLeft: "1%" }}>
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

export default UserUpDate