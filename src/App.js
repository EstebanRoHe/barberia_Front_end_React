import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Index from './components/index';
import UserList from './components/UserList';
import Footer from './components/Footer';
import Login from './components/Login';
import AuthServices from './services/AuthServices';
import RegistreUser from './components/RegistreUser';
import UserUpDate from './components/UserUpDate';
import BlocList from './components/BlocList';
import CreateBloc from './components/CreateBloc';
import BlocUpDate from './components/BlocUpDate';
import AboutUs from './components/AboutUs';
import Offcanvas from 'react-bootstrap/Offcanvas';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usernameIn, setUsernameIn] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleLogout = () => {
    AuthServices.removeAuthToken();
    setIsLoggedIn(false);
    setShowOffcanvas(false);
  };

  useEffect(() => {
    const token = AuthServices.getAuthToken();
    const idUser = AuthServices.getAuthId();
    const user = AuthServices.getAuthUsername();
    const roleToken = AuthServices.getAuthRole();
    setIsLoggedIn(!!token);
    setId(idUser);
    setUsernameIn(user);
    setRole(roleToken);
  }, [isLoggedIn]);

  const handleOffcanvasClose = () => {
    setShowOffcanvas(false);
  };

  const handleShowcanvas = () => {
    setShowOffcanvas(true);
  };



  return (

    <div className='app-container'>


      <nav className="navbar navbar-expand-lg color-nav" >
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>Barbería</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll"
            aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ bsScrollHeight: '100px' }}>

              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={"/AboutUs"}>Información</Link>
              </li>

              <li className="nav-item dropdown" >
                <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Nuestro Bloc
                </Link>
                <ul className="dropdown-menu" >
                  <li><Link className="dropdown-item " to={"/BlocList"}>Ver Bloc</Link></li>
                  <li><Link className="dropdown-item" to={"/CreateBloc"}>New Bloc</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to={"/RegistreUser"}>Registrarse</Link></li>
                </ul>
              </li>

              {isLoggedIn && role === 'admin' ? (
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to={"/UserList"}>Usuarios</Link>
                </li>
              ) : (<></>)}



            </ul>

            <ul className="navbar-nav ">
              {isLoggedIn === false ? (
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to={"/Login"}>
                  <i className="bi bi-box-arrow-in-right"> </i>
                    Login</Link>
                </li>
              ) : (
                <>
                  <li className="nav-item dropdown" >
                     {/* eslint-disable-next-line */}
                    <a href="#" className="nav-link dropdown-toggle" role="button" aria-expanded="false" onClick={handleShowcanvas}>
                      <i className="bi bi-person-circle" > </i>{usernameIn} 
                    </a>
                    <Offcanvas placement="end"
                      show={showOffcanvas}
                      onHide={handleOffcanvasClose}
                      backdrop={false}
                    >
                      <Offcanvas.Header closeButton style={{ backgroundColor: "#212529", color: 'white' }}>
                        <Offcanvas.Title style={{ color: "#8C939A" }}>
                          <i className="bi bi-person-circle">
                          </i> {usernameIn}
                        </Offcanvas.Title>
                      </Offcanvas.Header>
                      <Offcanvas.Body style={{ backgroundColor: '#23272F', color: 'white' }}>

                        <ul className="navbar-nav">
                        <li>
                          <Link className="dropdown-item" 
                          to={"/UserUpDate/"+id} 
                          onClick={handleOffcanvasClose}>
                          <i className="bi bi-gear-fill"> </i>Actualizar</Link>
                          </li>

                          <li className="nav-item">
                          <hr style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', margin: '0.5rem 0' }} />
                          </li>

                          <li className="nav-item">
                            <Link to={"/"} className="nav-link" onClick={ () =>{
                              handleLogout()      
                              }}>

                              <i className="bi bi-box-arrow-right"></i> Cerrar sesión
                            </Link>

                          </li>
                        </ul>
                      </Offcanvas.Body>

                    </Offcanvas>

                  </li>


                </>
              )}

            </ul>

          </div>
        </div>
      </nav>


      <div className='secondary'>

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/Index" element={<Index />} />
          <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/RegistreUser" element={<RegistreUser />} />
          {isLoggedIn && role === 'admin' ? (
            <>
              <Route path="/UserList" element={<UserList />} />
            </>
          ) : (
            <>
              <Route path="/UserList" element={<Navigate to="/" />} />
            </>
          )
          }
          {isLoggedIn ? (
            <Route path="/UserUpDate/:id" element={<UserUpDate />} />
          ):(
            <Route path="/UserUpDate/:id" element={<Navigate to="/Login" />} />
          )}

          <Route path="/BlocList" element={<BlocList />} />
          <Route path="/CreateBloc" element={<CreateBloc />} />
          <Route path="/BlocUpDate/:id" element={<BlocUpDate />} />
          <Route path="/AboutUs" element={<AboutUs />} />
        </Routes>

      </div>

      <Footer />

    </div>


  );
}

export default App;
