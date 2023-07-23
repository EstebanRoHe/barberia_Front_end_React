import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BlocServices from "../services/BlocServices";
import AuthServices from '../services/AuthServices';
import ModalMore from "./ModalMore";
import "./BlocList.css"
import logo from '../images/logo.png'
import Pagination from "./Pagination";
import ReactPaginate from 'react-paginate';

const BlocList = () => {
    const [bloc, setBloc] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [selectedBloc, setSelectedBloc] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

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

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const paginated = bloc.slice(
        currentPage * itemsPerPage,
        (currentPage + 1 ) * itemsPerPage
    );



    return (
        <div className="first-bloc">
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



