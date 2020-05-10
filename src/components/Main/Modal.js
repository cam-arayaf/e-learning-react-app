import React, { useContext, Fragment } from 'react';
import { ELearningContext } from './../../context/ELearningContext';
import modalProgressBar from './../../assets/img/modal-progress-bar.gif';

const Modal = () => {
    const { closeModal, selectedCourses, postOrder, message, paid, processing, effect }
        = useContext(ELearningContext);
    return (
        <div id="modal" className={ `modal ${ effect }` }>
            <div className="modal-content">
                {
                    paid &&
                        <div className="modal-close">
                            <span onClick={ () => closeModal() } title="Close Modal">X</span>
                        </div>
                }
                <div className="modal-container">
                    <h2>Purchase order Payment</h2>
                    {
                        processing ?
                            <img src={ modalProgressBar } alt="Modal Progress Bar" />
                        :
                            <Fragment>
                                <p>{ message }</p>
                                {
                                    !paid &&
                                        <div className="modal-buttons">
                                            <button
                                                onClick={ () => closeModal() }
                                                className="modal-cancel"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={ () => postOrder(selectedCourses) }
                                                className="modal-pay"
                                            >
                                                Pay
                                            </button>
                                        </div>
                                }
                            </Fragment>
                    }
                </div>
            </div>
        </div>
    );
}

Modal.displayName = 'Modal';

export default Modal;