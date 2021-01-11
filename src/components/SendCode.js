import React, { useState, useEffect } from 'react'
import { Text } from './language/Language';
import { baseUrl, verifyEndPoint } from '../constants/api'
import { useForm } from 'react-hook-form'
import ErrorModal from './ErrorModal'
import Cookies from 'universal-cookie';
import history from './history'
import './sendCode.css'
import Button from './Button'
import Logo from '../constants/images/logo.png'

export default function SendCode({ model, login }) {
    const [code, setCode] = useState()
    const [showModal, setShowModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const cookie = new Cookies();
    const { register, handleSubmit, errors } = useForm();

    useEffect(() => {
        console.log(model)
        console.log("useEffect")
        setCode(model.password)
    }, [])

    const handleClose = () => setShowModal(!showModal)
    const getDirection = () => { return cookie.get('dir') }

    const onSubmit = () => {
        if (model.password === undefined) {
            console.log("model not found")
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
                if (result.status == 200) {
                    cookie.set("token", result.data.data.access_token, { path: '/' })
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

            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <img src={Logo} className="Logo" />
                <label style={{ direction: getDirection(), paddingLeft: '10px', fontSize:'1em' }}>
                    <Text tid="code" /></label>
                <input disabled className="input" name="code" value={code} ref={register({ required: true })} onChange={(e) => setCode(e.target.value)} />

                <Button >
                    {<Text tid="register-btn" />}
                </Button>
            </form>

        </>
    )
}