import React from 'react';
import progressBar from './../../assets/img/progress-bar.gif';

const ProgressBar = () => (
    <div className="progress-bar">
        <img src={ progressBar } alt="progress-bar" />
    </div>
);

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;