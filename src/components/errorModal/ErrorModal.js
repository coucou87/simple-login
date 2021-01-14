import React, { useState, useEffect } from 'react';
import './errorModal.css';
import Cookies from 'universal-cookie';

export default function ErrorModal({ errorTxt, handleClose }) {
    const cookie = new Cookies();
    const getDirection = () => { return cookie.get('dir') }

    return (
        <div className="error-container">
            <div style={{ direction: getDirection() }} className="error-wrapper">
                <button onClick={handleClose} className="error-modal-btn"> X </button>
                <p>{errorTxt}</p>
            </div>
        </div>
    )
}