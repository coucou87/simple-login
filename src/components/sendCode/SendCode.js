import React, { useState, useEffect } from 'react';
import { Text } from '../container/language';
import { baseUrl, verifyEndPoint } from '../../constants/api';
import { useForm } from 'react-hook-form';
import ErrorModal from '../errorModal/ErrorModal';
import Cookies from 'universal-cookie';
import history from '../history/history';
import Button from '../button/Button';
import Logo from '../../constants/images/logo.png';
// import jwt_decode from "jwt-decode";
import './sendCode.css';

export default function SendCode({ model, login }) {
    const [code, setCode] = useState()
    const [showModal, setShowModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const cookie = new Cookies();
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        setCode(model.password)
    }, [model.password])

    const handleClose = () => setShowModal(!showModal)
    const getDirection = () => { return cookie.get('dir') }

    const onSubmit = () => {
        if (model.password === undefined) {
            return
        }

        const formdata = new FormData();
        formdata.append("username", model.username);
        formdata.append("password", model.password);
        formdata.append("registered", model.registered);
        formdata.append("language_id", model.languageId);
        formdata.append("app", model.app);

        const requestOptions = {
            method: 'POST',
            body: formdata
        };

        fetch(`${baseUrl}/${verifyEndPoint}`, requestOptions)
            .then((response) => response.json().then(res => ({ status: response.status, data: res })))
            .then(result => {
                if (result.status === 200) {
                    // var decoded = jwt_decode(result.data.data.access_token);
                    cookie.set("token", result.data.data.access_token,
                        {
                            path: '/'
                            // ,
                            //  expires:new Date(new Date().getTime() + (decoded.exp.split('.')[0]*1000))
                        })
                    cookie.set("refresh-token", result.data.data.refresh_token, { path: '/' })
                    login()
                    history.push("./Auth")
                } else {
                    setShowModal(!showModal)
                    setErrorMessage(result.data.message)
                }
            })
            .catch(error => {
                setShowModal(!showModal)
                setErrorMessage(<Text tid="server-error-500" />)
            })
    }

    return (
        <>
            {showModal && <ErrorModal errorTxt={errorMessage} handleClose={handleClose} />}
            <div className="sendcode-container">
                <form onSubmit={handleSubmit(onSubmit)} className="sendcode-form">
                    <img src={Logo} className="Logo" alt=''/>
                    <label style={{ direction: getDirection() }}>
                        <Text tid="code" />
                    </label>
                    <input disabled className="sendcode-disabled-input"
                        name="code" value={code || ''}
                        ref={register({ required: true })}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <Button >
                        {<Text tid="register-btn" />}
                    </Button>
                    <Button onClick={() => history.push("/Register")}>
                        <Text tid="back-btn" />
                    </Button>
                </form>
            </div>
        </>
    )
}