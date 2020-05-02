import React from 'react';
import progressBar from './../../assets/img/progress-bar.gif';

const ProgressBar = () => (
    <div className="progress-bar">
        <img src={ progressBar } alt="Progress Bar" />
    </div>
);

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;