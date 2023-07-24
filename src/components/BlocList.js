import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlocServices from "../services/BlocServices";
import AuthServices from '../services/AuthServices';
import ModalMore from "./ModalMore";
import "./BlocList.css"
import ReactPaginate from 'react-paginate';
import Loading from "./Loading";
import ModalLoading from "./ModalLoading";

const BlocList = () => {
    const [bloc, setBloc] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [selectedBloc, setSelectedBloc] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [idAuth, setidAuth] = useState("");
    const [role, setRole] = useState("")
    const itemsPerPage = 5;
    const [showModalLoading, setShowModalLoading] = useState(false);

    useEffect(() => {
        getList();
        const idUser = AuthServices.getAuthId();
        const roleAuth = AuthServices.getAuthRole();
        setidAuth(idUser);
        setRole(roleAuth);
          // eslint-disable-next-line
    }, [])

    const getList = () => {
        showModalLoadingHandler();
        BlocServices.getAll()
            .then((reponse) => {
                setBloc(reponse.data)
                closeModalLoadingHandler();
            })
            .catch((e) => {
                console.log(e);
                closeModalLoadingHandler();
            });
    }

    const handleShowModal = (blocs) => {
        setSelectedBloc(blocs);
        setShowModal(true);
    };

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const paginated = bloc.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const showModalLoadingHandler = () => {
        setShowModalLoading(true);
    };

    const closeModalLoadingHandler = () => {
        setShowModalLoading(false);
    };


    return (
        <div className="first-bloc">
            {bloc.length === 0 && showModal === false ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Loading />
                    <i className="bi bi-info-circle" style={{ color: "red", marginBottom: "1%" }}> No se encuentra ningún Post Creado</i>
                    <Link className="btn btn-primary" to={"/CreateBloc"}><i className="bi bi-plus-circle"> </i>New Bloc</Link>

                </div>
            ) : (
                <>
                    <h1 style={{ textAlign: "center", color: "#FFFFFF", padding: "2%" }}>Nuestro Bloc</h1>
                    <div className="container d-flex align-items-center justify-content-center">

                        <div className="bloc">
                            {bloc && paginated.map((blocs) => (

                                <div className="card card-bloc card-bloc mb-4 " style={{ maxWidth: "28em" }}>
                                    <div className="row g-0">
                                        <div className="card-header featured modal-color">
                                            <h5 className="card-title card-margin ">
                                                <i className="bi bi-person-circle"></i>
                                                {blocs.user_details.username}
                                            </h5>

                                            <Link className="more"
                                                onClick={() => handleShowModal(blocs)}
                                            >
                                                <i className="bi bi-three-dots"></i></Link>
                                        </div>
                                        <div className="card-body featured segundo-color">
                                            <p className="card-text">{blocs.description} </p>
                                        </div>
                                        <img src={blocs.url} className="img-fluid rounded-start" alt="..." />
                                    </div>

                                </div>
                            ))}
                            <div className="pagination-container">

                                <ReactPaginate
                                    previousLabel={<i className="bi bi-arrow-left-circle-fill left-paginate-arrow-indexrent"> </i>}
                                    nextLabel={<i className="bi bi-arrow-right-circle-fill rigth-paginate"> </i>}
                                    pageCount={Math.ceil(bloc.length / itemsPerPage)}
                                    onPageChange={handlePageChange}
                                    containerClassName={'pagination'}
                                    activeClassName={'active'}
                                    previousClassName={'left-paginate-arrow-indexrent'}
                                    nextClassName={'rigth-paginate'}
                                    pageClassName={'indexrent-page-count'} />

                            </div>
                        </div>
                    </div>

                    {showModal && selectedBloc && (
                        <ModalMore
                            showModal={showModal}
                            setShowModal={setShowModal}
                            id={selectedBloc.id}
                            description={selectedBloc.description}
                            url={selectedBloc.url}
                            idUsername={selectedBloc.user_details.id}
                            username={selectedBloc.user_details.username}
                            first_name={selectedBloc.user_details.first_name}
                            last_name={selectedBloc.user_details.last_name}
                            email={selectedBloc.user_details.email}
                            getList={getList}
                            idAuth={idAuth}
                            roleAuth={role}
                        />
                    )}

                    {showModalLoading && (
                        <ModalLoading />
                    )}
                </>
            )}
        </div>
    );
}

export default BlocList;



