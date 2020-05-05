import React, { Fragment, useContext } from 'react';
import { ELearningContext } from './../../context/ELearningContext';
import Course from './Course';

const Courses = () => {
    const { courses, handleButtonAddRemove, getIndex } = useContext(ELearningContext);
    return (
        <Fragment>
            {
                courses.length && courses.map(course => {
                    const { _id, title, description, teacher, image, price } = course;
                    return (
                        <Course key={ _id }
                            _id={ _id }
                            title={ title }
                            description={ description }
                            teacher={ teacher }
                            image={ image }
                            price={ price }
                            handleButtonAddRemove={ handleButtonAddRemove }
                            getIndex={ getIndex }
                        />
                    );
                })
            }
        </Fragment>
    );
}

Courses.displayName = 'Courses';

export default Courses;