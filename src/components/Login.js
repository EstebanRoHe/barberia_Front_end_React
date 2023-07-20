import React, { useState, useEffect } from 'react';
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
            const { token } = response.data;
            AuthServices.setAuthToken(token);
            setErrors(false);
            setIsLoggedIn(true);
            navigate('/');
        } catch (error) {
            setErrors(true);
            console.error(error);
        }
    };

    return (
        <div className="login-container">

            <div className="content card-index" style={{ padding: "5%" }} >

                <h2 className='h2-login'>Ingresar</h2><hr />
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <div className="input-group">
                            <i className="bi bi-person"></i>
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
                        <div className="input-group">
                            <i className="bi bi-lock"></i>
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
                                <i className="bi bi-exclamation-circle"> Usuario o contraseña incorrecta</i>

                            </small>
                        </div>
                    )}

                    <button type="submit" className="btn btn-secondary">
                        Iniciar sesión
                    </button>


                </form>
                <div>
                    <Link className="btn btn-primary"to={"/RegistreUser"} >
                        <i className="bi bi-person-plus"> Registrarse</i>
                    </Link>
                </div>
                <div>
                    <Link className="btn btn-success" to={"/"}>
                        <i className="bi bi-box-arrow-left"> Regresar</i>
                    </Link>
                </div>

            </div>
        </div >
    );
}

export default Login;
