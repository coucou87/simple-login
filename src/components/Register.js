import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import history from './history'
import { baseUrl, registerEndPoint } from '../constants/api'
import { Text } from './language/Language';
import './register.css'
import ErrorModal from './ErrorModal'
import Cookies from 'universal-cookie';
import Logo from '../constants/images/logo.png'
import Button from './Button'

export default function Register({ getModel }) {

    const [username, setUsername] = useState('')
    const [app, setApp] = useState('pros')
    const [showModal, setShowModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('qwe')
    const { register, handleSubmit, errors } = useForm();
    const cookie = new Cookies();

    const handleClose = () => setShowModal(!showModal)
    const handleBack = () => history.push("/Home")
    const getLanguage = () => {
        switch (cookie.get('lang')) {
            case ('en'): return "2"
            case ('fa'): return "1"
        }
    }

    const onSubmit = (data) => {
        fetch(`${baseUrl}/${registerEndPoint}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: data.username,
                app: data.app
            })
        })
            .then((response) => response.json().then(res => ({ status: response.status, data: res })))
            .then((responseData) => {
                if (responseData.status == 200) {
                    getModel({
                        "username": username,
                        "password": responseData.data.data.code,
                        "registered": responseData.data.data.registered == false ? "0" : "1",
                        "languageId": getLanguage(),
                        "app": app,
                    })
                    history.push("/SendCode")
                } else {
                    setShowModal(!showModal)
                    setErrorMessage(responseData.data.message)
                }
            })
            .catch(error => {
                setShowModal(!showModal)
                setErrorMessage(<Text tid="server-error-500" />)
                // console.log('error', error)
            });
    };

    return (
        <>
            {showModal && <ErrorModal errorTxt={errorMessage} handleClose={handleClose} />}
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <img src={Logo} className="Logo"  />
                <div className="wrapper">
                    <input className="input" name="username" value={username} ref={register({ required: true })} onChange={(e) => setUsername(e.target.value)} />
                    <div className="error">
                        {errors.username && <Text tid="username-error" />}
                    </div>
                    <select className="select" name="app" value="pros" ref={register} value={app} onChange={(e) => setApp(e.target.value)} >
                        <option key="pros" value="pros" >pros</option>
                        <option key="admin" value="admin">admin</option>
                        <option key="care" value="care">care</option>
                    </select>

                    <Button>
                        <Text tid="register-btn" />
                    </Button>
                    <Button onClick={handleBack}>
                        <Text tid="back-btn" />
                    </Button>
                </div>
            </form>
        </>
    )
}