import React from "react";
import "./index.css"
import imagen1 from '../images/barberia3.webp'
import imagen2 from '../images/barberia.webp'
import imagen3 from '../images/barberia.jpg'
import logo from '../images/logo.png'


const index = () => {
    return (
        <div className="first">
            <div className="second">
                <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner ">

                        <div className="carousel-item active" data-bs-interval="10000">
                            <img src={imagen1} className="d-block w-100 " alt="..." />
                            <div className="carousel-caption imagen-carousel-caption ">
                                <img src={logo} className='d-block w-100 imagen-caption ' alt="..." />
                            </div>
                        </div>

                        <div className="carousel-item ">
                            <img src={imagen3} className="d-block w-100" alt="..." />
                            <div className="carousel-caption  ">
                                <h5 className="h5-carousel">Las mejores instalaciones</h5>
                            </div>
                        </div>
                        <div className="carousel-item " data-bs-interval="2000">
                            <img src={imagen2} className="d-block w-100" alt="..." />
                            <div className="carousel-caption ">
                                <h5 className="h5-carousel">El mejor servicio</h5>
                            </div>
                        </div>

                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

            </div>

            <div className="thirs">
                <div className="container">
                    <div className="imagen-container">
                    <img src={logo} className="d-block w-100 imagen-thirs" alt="..." />
                    </div>
                    <h1 className="title-animacion" style={{ textAlign: "center" }}>Barber's Tico</h1>
                    <p className="paragraph">
                        ¡Bienvenido a "Barber's Tico"! Somos un santuario dedicado al arte del cuidado y estilo del cabello. Nuestra barbería combina la tradición de las barberías clásicas con un toque moderno y sofisticado. <br />
                        En un ambiente cálido y acogedor, te ofrecemos una experiencia de barbería excepcional que te dejará sintiéndote renovado y con una confianza renovada.<br />

                        Nuestro equipo de barberos altamente capacitados y apasionados se esfuerza por brindarte un servicio personalizado y de alta calidad. Cada corte de cabello y arreglo de barba es una obra maestra única, adaptada
                        a tu estilo y personalidad. Nos enorgullecemos de ofrecer cortes de cabello clásicos y contemporáneos, desde los estilos retro más icónicos hasta las tendencias más modernas.<br />

                        En "Barber's Tico", no solo te ofrecemos excelentes cortes de cabello y afeitados impecables, sino también una experiencia completa de bienestar. Disfruta de una refrescante bebida
                        mientras esperas o relájate con una terapia de vapor facial para una experiencia de afeitado de primera clase.<br />

                        ¡Esperamos verte pronto en "Barber's Tico"!<br />
                    </p>
                </div>
            </div>

            <div className="four">
                <div className="container" style={{ textAlign: "center" }}>

                    <h1 className="rc-section-title" style={{ color: "white" }}>Servicios</h1>
                    <p className="paragraph" style={{ margin: "0% 6% 0% 6%" }}>
                        Nuestra pasión por la atención al detalle y el servicio al cliente nos ha convertido en el destino preferido para hombres que buscan una barbería de élite en la
                        ciudad. No importa si vienes a mantenerte con un look clásico o quieres probar algo completamente nuevo, nuestro equipo de expertos estará encantado de asesorarte
                        y ayudarte a encontrar el estilo perfecto para ti.

                    </p>

                    <div className="row" style={{ justifyContent: "center" }}>

                        <div className="col-lg-3 col-md-6 card-index" >
                            <div className="benefit-item">
                                <h6 className="h6-services">Tico Junior ................ ₡6,000</h6><hr />
                                <p className="text-justify paragraph">
                                    El “Tico Junior”, es para los más pequeños, ya que ellos también merecen un estilo especial. Nuestro servicio
                                    está diseñado para niños de 4 a 9 años. Comenzamos con un corte de cabello personalizado, adaptado a la personalidad de cada niño.<br />
                                    El lavado revitalizarte les dará una experiencia refrescante. Después,
                                    el secado y el peinado con nuestros productos de alta calidad que los hará lucir adorables y llenos de estilo.<br />
                                    Nuestros barberos expertos garantizan que los niños se sientan cómodos y divertidos durante todo el proceso.
                                </p>
                            </div>
                        </div>


                        <div className="col-lg-3 col-md-6 card-index">
                            <div className="benefit-item">

                                <h6 className="h6-services">Tico King ................ ₡12,000</h6><hr />
                                <p className="text-justify paragraph">
                                    Sumérgete en una experiencia real de realeza con nuestro servicio "Tico King ". Comienza con un corte de cabello personalizado y
                                    precisamente ejecutado, seguido de un retoque o rasurado completo de barba para un look impecable.
                                    Relájate mientras te consentimos con una limpieza facial completa, paño caliente con aromaterapia, y una aplicación de espuma
                                    o gel para un afeitado suave. Finalizamos con un refrescante after shave y un tratamiento de mascarilla facial revitalizante.
                                    Nuestros productos de aceite para barba te darán un toque final de perfección.
                                </p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 card-index">
                            <div className="benefit-item">

                                <h6 className="h6-services">Tico Beard ................ ₡8,000</h6><hr />
                                <p className="text-justify paragraph">
                                    Si buscas un cambio sutil pero impactante, nuestro servicio "Tico Beard" es la elección ideal.
                                    Experimenta una transformación en el color de tu barba con nuestro tinte profesional.
                                    Nuestros expertos te asesorarán sobre la mejor tonalidad para complementar tu estilo y personalidad. <br />
                                    Después de aplicar el tinte, realizamos un lavado y utilizamos aceite para mantener tu barba suave y nutrida.
                                    Finalizamos con un cepillado que realzará el resultado del tinte y te hará lucir renovado.
                                </p>
                            </div>
                        </div>






                    </div>
                </div>

            </div>



        </div>
    )
}

export default index;