import React from 'react';

const Course = ({
    _id, title, description, teacher, image, price, handleButtonAddRemove, getIndex
}) => (
    <div key={ _id } className="course">
        <img src={ image } alt={ title } />
        <ul>
            <li><strong>{ title }</strong></li>
            <li><em>{ teacher }</em></li>
            <li><u>${ price }</u></li>
        </ul>
        <p>{ description }</p>
        <button
            className={ getIndex(_id) === -1 ? 'add' : 'remove' }
            onClick={ () => handleButtonAddRemove(_id) }
        >
            { getIndex(_id) === -1 ? '+ Add' : '- Remove' }
        </button>
    </div>
);

Course.displayName = 'Course';

export default Course;