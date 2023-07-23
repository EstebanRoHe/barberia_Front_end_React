import React, { useState } from "react";
import './RegistreUser.css'
import logo from '../images/logo.png'
import UserServices from "../services/UserServices";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";

const RegistreUser = () => {
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
    const [validPassword, setValidPassword] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...User, [name]: value });

    };

    const handleInputblurPassword = (event) => {
        handleInputChange(event);
        setValidPassword(validationPassword(User));

    };

    const createUser = (e) => {
        e.preventDefault();
        var data = {
            id: User.id,
            username: User.username,
            password: User.password,
            first_name: User.first_name,
            last_name: User.last_name,
            email: User.email,
        };
        setValidPassword(validationPassword(User));
        if (Object.keys(validPassword).length === 0) {
            UserServices.create(data)
                .then(response => {
                    setUser({
                        username: response.data.username,
                        password: response.data.password,
                        first_name: response.data.first_name,
                        last_name: response.data.last_name,
                        email: response.data.email,
                    });
                    console.log(response.data);
                    newUser()
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
        } else {
            console.log("error de paswword")
        }
    };

    const newUser = () => {
        setUser(initialUserState);
    }

    const validationPassword = (User) => {
        let validPassword = {}
        if (
            User.password.length < 8 ||
            !/[A-Z]/.test(User.password) ||
            !/[0-9]/.test(User.password) ||
            !/[!@#$%^&*]/.test(User.password)
        ) {
            validPassword.password =
                "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial";
        }
        return validPassword;
    }


    return (
        <div className="first" >
            <div className="container" >
                <h1 className="h1-registre">Registro</h1>
                <div className="imagen-container">
                    <img src={logo} className="d-block w-100 imagen-thirs" alt="..." />
                </div>

                <div className="registre">
                    <div className="card card-registre">
                        <form className="row" onSubmit={createUser}>
                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input type="text" className="form-control" id="username"
                                    name="username"
                                    value={User.username}
                                    onChange={handleInputChange}
                                    required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" className={((validPassword.password) ? "is-invalid" : "") + " form-control"}
                                    id="password"
                                    name="password"
                                    value={User.password}
                                    onChange={handleInputChange}
                                    onBlur={handleInputblurPassword}
                                    onKeyUp={handleInputblurPassword}
                                    required
                                />

                                <small className="invalid-feedback" id="helpId">
                                    <i className="bi bi-exclamation-circle"> {validPassword.password}</i>
                                </small>
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
                                <input type="email" className="form-control" id="email"
                                    name="email"
                                    value={User.email}
                                    onChange={handleInputChange}
                                    required />
                            </div>

                            <div>
                                <button type="submit" className="btn btn-primary" >Sign in
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

export default RegistreUser;