import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Message from './../common/Message';

const NotFound = () => (
    <Fragment>
        <Message text="404: URL Not Found" />
        <div className="link">
            <Link to="/">Go Back</Link>
        </div>
    </Fragment>
);

NotFound.displayName = 'NotFound';

export default NotFound;