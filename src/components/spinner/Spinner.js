import React from 'react';
import './Spinner.css';

function Spinner() {
    return (
        <div className="Spinner">
            <center>
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </center>

        </div>

    );
}

export default Spinner;
