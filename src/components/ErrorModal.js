import React, { useState, useEffect } from 'react'
import './errorModal.css'
import Cookies from 'universal-cookie';
import Button from './Button'

export default function ErrorModal({ errorTxt, handleClose }) {
    const cookie = new Cookies();
    const [direction, setDirection] = useState('rtl');

    useEffect(() => {
        setDirection(cookie.get('dir'))
    }, [])

    return (
        <div className="error-container">
            <div style={{ direction: direction }} className="error-wrapper">
                <Button onClick={handleClose} > X </Button>
                <p>{errorTxt}</p>
            </div>
        </div>
    )
}