import React,{useEffect,useState } from 'react';
import { Routes, Route, Link} from 'react-router-dom';
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    AuthServices.removeAuthToken();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const token = AuthServices.getAuthToken();
    setIsLoggedIn(!!token);
  }, [isLoggedIn]);

  

  return (

    <div className='app-container'>
      <nav className="navbar navbar-expand-lg bg-body-tertiary ">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>Barbería</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll"
            aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ bsScrollHeight: '100px' }}>

              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to={"/Login"} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  About us
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to={"/Login"}>Information</Link></li>
                  <li><Link className="dropdown-item" to={"/Login"}>Contact us</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to={"/RegistreUser"}>Registrer</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={"/BlocList"}>Bloc</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={"/UserList"}>Users</Link>
              </li>

            </ul>

            <ul className="navbar-nav ">
              {isLoggedIn === false ? (
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to={"/Login"}>Login</Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to={"/"} onClick={handleLogout}>Cerrar sesión</Link>
                </li>
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
          <Route path="/UserList" element={<UserList />} />
          <Route path="/UserUpDate/:id" element={<UserUpDate />} />
          <Route path="/BlocList" element={<BlocList />} />
          <Route path="/CreateBloc" element={<CreateBloc />} />
          <Route path="/BlocUpDate/:id" element={<BlocUpDate />} />
        </Routes>
       
      </div>

      <Footer />

    </div>
    
   
  );
}

export default App;
