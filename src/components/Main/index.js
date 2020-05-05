import React, { Fragment, useContext } from 'react';
import { ELearningContext } from './../../context/ELearningContext';
import Courses from './Courses';
import Message from './../common/Message';
import ProgressBar from './../common/ProgressBar';
import Modal from './Modal';

const Main = () => {
    const { charged, courses, showModal, message } = useContext(ELearningContext);
    return (
        <Fragment>
            {
                charged ? (
                    courses.length ?
                        <Fragment>
                            { showModal &&<Modal /> }
                            <section>
                                <Courses />
                            </section>
                        </Fragment>
                    :
                        <Message>{ message }</Message>
                )
                :
                    <ProgressBar />
            }
        </Fragment>
    );
}

Main.displayName = 'Main';

export default Main;