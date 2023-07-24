import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import AuthServices from '../services/AuthServices';


const Login = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthServices.login({ username, password });
            const { token, user_id, role} = response.data;
            AuthServices.setAuthToken(token);
            AuthServices.setAuthId(user_id);
            AuthServices.setAuthUsername(username);
            AuthServices.setAuthRole(role);
            console.log("user :", username)
            setErrors(false);
            setIsLoggedIn(true);
            navigate('/');
        } catch (error) {
            setErrors(true);
            console.error(error);
        }
    };

    return (
        <div className="login ">
            <div className='container'>
            <div className="in">
                    <div className="card card-login">
                        <form className='form-login' onSubmit={handleLogin} >
                            <h2 className='h2-login'>Ingresar</h2><hr/>
                            <div className="mb-3" >
                                <div className="input"  >
                                    <i className="bi bi-person logo-login"></i>
                                    <input
                                        type="text"
                                        className="form-input"
                                        id="username"
                                        aria-describedby="emailHelp"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="input">
                                    <i className="bi bi-lock logo-login"></i>
                                    <input
                                        type="password"
                                        className="form-input"
                                        id="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            {errors && (
                                <div className='errorDiv'>
                                    <small className="errorSmall" id="helpId" >
                                        <i className="bi bi-exclamation-circle "> Usuario o contraseña incorrecta</i>

                                    </small>
                                </div>
                            )}

                            <button type="submit" className="btn btn-secondary">
                                Iniciar sesión
                            </button>
                            <div>
                                <Link className="btn btn-primary" to={"/RegistreUser"} >
                                    <i className="bi bi-person-plus"> Registrarse</i>
                                </Link>
                            </div>
                           

                        </form>
                    </div>
                </div>
            </div>
            </div>


    );
}

export default Login;
