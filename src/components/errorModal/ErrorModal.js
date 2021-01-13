import React, { useState, useEffect } from 'react';
import './errorModal.css';
import Cookies from 'universal-cookie';
import Button from '../button/Button';

export default function ErrorModal({ errorTxt, handleClose }) {
    const cookie = new Cookies();
    const [direction, setDirection] = useState('rtl');

    useEffect(() => {
        setDirection(cookie.get('dir'))
    }, [cookie])

    return (
        <div className="error-container">
            <div style={{ direction: direction }} className="error-wrapper">
                <Button onClick={handleClose} className="error-modal-btn"> X </Button>
                <p>{errorTxt}</p>
            </div>
        </div>
    )
}