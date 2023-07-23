import React, { useEffect, useState } from "react";
import logo from '../images/logo.png'
import "./AboutUs.css"


const AboutUs = () => {

    return (
        <div className="informacion">
            <div className="container">
                <h1 style={{ textAlign: "center" , marginTop:"2%"}}>Información</h1>
                <div className="imagen-container">
                    <img src={logo} className="d-block w-100 imagen-thirs" alt="..." />
                </div>
                <div className="row" style={{display: "flex", textAlign: "center" }}>
                    <div className="col-lg-4 col-md-6">
                        <div className="aboutFooter">

                            <h3 className="negrita" >Nosotros</h3>
                            <p>
                                En Barber's Tico, no solo buscamos ofrecerte un excelente corte de cabello o un afeitado impecable,
                                sino también una experiencia completa de bienestar. Queremos que te sientas como en casa mientras
                                esperas, por eso te ofrecemos una refrescante bebida para relajarte antes de tu servicio.
                            </p>

                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="adressFooter">
                            <h3 className="negrita">Direccion</h3>
                            <p>
                                <i className="bi bi-geo-alt-fill"></i> Heredia, Costa Rica.
                            </p>
                            <p>
                                <i className="bi bi-telephone-fill"></i> (+506) 8080 80 80
                            </p>
                            <p>
                                <i className="bi bi-envelope-at-fill"></i> barberiaejemplo@gmail.com
                            </p>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <div className="horarioFooter">
                            <h3 className="negrita">Horario de atención</h3>
                            <p>
                                <i class="bi bi-calendar-check"> </i> Lunes a Viernes: 9:00 AM - 7:00 PM
                            </p>
                            <p>
                                <i class="bi bi-calendar-check"> </i> Sábados: 10:00 AM - 6:00 PM
                            </p>
                            <p>
                                <i class="bi bi-calendar-x"> </i> Domingos: Cerrado
                            </p>
                        </div>
                    </div>

                </div>
                <div className="social-icons" style={{  textAlign: "center" }}>
                    <a href="https://www.facebook.com/pelu.quiquepop.alicante" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-facebook logo-hover logo-face"></i>
                    </a>
                    <a href="https://twitter.com/i/flow/login?redirect_after_login=%2Fpeluquiquepop" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-twitter logo-hover logo-twitter" ></i>
                    </a>
                    <a href="https://www.instagram.com/quiquepop/" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-instagram logo-hover logo-instagram"></i>
                    </a>

                </div>
            </div>


        </div>
    )

}

export default AboutUs