import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AuthServices from "../services/AuthServices";
import BlocServices from "../services/BlocServices";
import Swal from "sweetalert2";

const ModalMore = ({ showModal, setShowModal, id, description, url, username, first_name, last_name, email, getList }) => {
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const remove = (id) => {
        const token = AuthServices.getAuthToken();
        if (token) {
            BlocServices.setAuthToken(token);
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
                    BlocServices.remove(id).then((response) => {
                        console.log(response.data);
                        swalWithBootstrapButtons.fire(
                            "Eliminado!",
                            "Tu archivo ha sido eliminado Correctamente.",
                            "success"
                        )
                        getList()
                        handleClose()
                    })
                        .catch(error => {
                            console.log(error);
                            swalWithBootstrapButtons.fire(
                                'Error',
                                'Hubo un error al eliminar el archivo',
                                'error'
                            );
                        });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        "Cancelado",
                        "No se ha eliminado ningún archivo",
                        "info"
                    );
                }
            });
    };


    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <div className="container d-flex align-items-center">
                        <h4>
                            <i className="bi bi-person-circle"> </i>
                            {username}
                        </h4>

                    </div>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        <i className="bi bi-person-lines-fill"> </i>{first_name + " " + last_name}<br />
                        <i className="bi bi-envelope-at"> </i>{email}
                    </p>
                    <div style={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)', margin: '1rem 0' }}></div>
                    <i className="bi bi-card-text"> </i> {description}
                </Modal.Body>

                <Modal.Footer>
                    <div>
                        <img src={url} className="img-fluid rounded-start" alt="..." />
                    </div>

                </Modal.Footer >

                <Modal.Footer>

                    <Button variant="danger" onClick={() => remove(id)}>
                        <i className="bi bi-trash3"> </i>
                        Eliminar
                    </Button>

                    <Link className="btn btn-primary"
                        onClick={handleClose}
                        to={"/BlocUpDate/" + id} >
                        <i className="bi bi-gear"> </i>
                        Actualizar
                    </Link>

                    <Button variant="secondary" onClick={handleClose}>
                        <i className="bi bi-x-circle"> </i>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
};

export default ModalMore;



/*
[
    {
        "id": 1,
        "description": "Descripción del Bloc",
        "url": "https://w.forfun.com/fetch/2a/2a3c5a2a105989bebda3dba422c4bb4a.jpeg",
        "user": 1,
        "user_details": {
            "id": 1,
            "username": "admin",
            "first_name": "",
            "last_name": "",
            "email": "admin@gmail.com",
            "role": "admin"
        }
    },
*/
