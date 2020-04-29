import React, { Fragment, useContext } from 'react';
import { CoursesContext } from './../../context/CoursesContext';
import Courses from './Courses';
import Message from './../common/Message';
import ProgressBar from './../common/ProgressBar';
import Modal from './Modal';

const Main = () => {
    const { 
        charged, courses, handleButtonAddRemove, getIndex, showModal, errorMessage
    } = useContext(CoursesContext);
    return (
        <Fragment>
            {
                charged ? (
                    courses.length ?
                        <Fragment>
                            { showModal && <Modal /> }
                            <section>
                                <Courses
                                    courses={ courses }
                                    handleButtonAddRemove={ handleButtonAddRemove }
                                    getIndex={ getIndex }
                                />
                            </section>
                        </Fragment>
                    :
                        <Message text={ errorMessage } />
                )
                :
                    <ProgressBar />
            }
        </Fragment>
    );
}

Main.displayName = 'Main';

export default Main;