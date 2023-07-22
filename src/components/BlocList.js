import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BlocServices from "../services/BlocServices";
import AuthServices from '../services/AuthServices';
import ModalMore from "./ModalMore";
import "./BlocList.css"
import logo from '../images/logo.png'

const BlocList = () => {
    const [bloc, setBloc] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [selectedBloc, setSelectedBloc] = useState(null);

    useEffect(() => {
        getList();
    }, [])

    const getList = () => {
        BlocServices.getAll()
            .then((reponse) => {
                setBloc(reponse.data)
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const handleShowModal = (blocs) => {
        setSelectedBloc(blocs);
        setShowModal(true);
    };


    return (
        <div className="first-bloc">
            <div className="container mt-3">
                <Link type="submit" className="btn btn-primary" to={"/CreateBloc"}>
                    New Post
                </Link>

            </div>

            <div className="container d-flex align-items-center justify-content-center">

                <div className="bloc">
                    {bloc && bloc.map((blocs) => (

                        <div className="card card-bloc mb-4" style={{ maxWidth: "28em" }}>
                            <div className="row g-0">
                                <div className="card-header featured">
                                    <h5 className="card-title card-margin ">
                                        <i className="bi bi-person-circle"></i>
                                        {blocs.user_details.username}
                                    </h5>

                                    <Link className="more"
                                        onClick={() => handleShowModal(blocs)}
                                    >
                                        <i className="bi bi-three-dots"></i></Link>
                                </div>
                                <div className="card-body featured">
                                    <p className="card-text">{blocs.description} </p>
                                </div>
                                <img src={blocs.url} className="img-fluid rounded-start" alt="..." />
                            </div>

                        </div>
                    ))}
                </div>


            </div>

            {showModal && selectedBloc && (
                <ModalMore
                    showModal={showModal}
                    setShowModal={setShowModal}
                    id={selectedBloc.id}
                    description={selectedBloc.description}
                    url={selectedBloc.url}
                    username={selectedBloc.user_details.username}
                    first_name={selectedBloc.user_details.first_name}
                    last_name={selectedBloc.user_details.last_name}
                    email={selectedBloc.user_details.email}
                    getList={getList}
                />
            )}

        </div>
    );
}

export default BlocList;



