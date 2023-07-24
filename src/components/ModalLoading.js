import React from "react";
import './ModalLoading.css'
import Loading from "./Loading";
const ModalLoading = (props) => {
    return (
        <div className="modal  modal-right" tabIndex="-1" role="dialog" >
            <div className="modal-dialog modal-lg" role="document"style={{backgroundColor: "rgba(33, 37, 41, 0)"}} >
                <div className="modal-content" style={{backgroundColor: "rgba(33, 37, 41, 0)", border: "none"}}>                    
                    <Loading />
                </div>
            </div>
        </div>
    );
};

export default ModalLoading;

