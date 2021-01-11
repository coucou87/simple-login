import React, { useState, useEffect } from 'react';
import { baseUrl, authEndPoint } from '../constants/api';
import history from './history';
import { Text } from './language/Language';
import { useForm } from 'react-hook-form';
import Cookies from 'universal-cookie';
import ErrorModal from './ErrorModal';
import Button from './Button';

export default function Authenticated() {
    const [fullname, setFullname] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const { register, handleSubmit, errors } = useForm();
    const cookie = new Cookies();

    const handleClose = () => setShowModal(!showModal)
    const getDirection = () => {return cookie.get('dir')}
    const handleClick = () =>  history.push("/Welcome")
    useEffect(() => {
        const token = cookie.get("token")

        fetch(`${baseUrl}/${authEndPoint}?origin=*`, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then((response) => response.json().then(res => ({ status: response.status, data: res })))
            .then((responseData) => {
                if (responseData.status == 200) {
                    setFullname(responseData.data.data.full_name)
                    setName(responseData.data.data.name)
                    setUsername(responseData.data.data.username)
                } else {
                    setShowModal(!showModal)
                    setErrorMessage(responseData.data.message)
                }
            })
            .catch(error => {
                setShowModal(!showModal)
                setErrorMessage(<Text tid="server-error-500" />)
            });
    }, [])

    const onSubmit = (data) => {

    }
    return (
        <>
            {showModal && <ErrorModal errorTxt={errorMessage} handleClose={handleClose} />}
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <div className="wrapper">
                    <label style={{ direction: getDirection() }}>{<Text tid="fullname" />}</label>
                    <input className="input" name="fullname" value={fullname} ref={register({ required: true })} onChange={(e) => setFullname(e.target.value)} />
                    <label style={{ direction: getDirection() }}>{<Text tid="name" /> }</label>
                    <input className="input" name="name" value={name} ref={register({ required: true })} onChange={(e) => setName(e.target.value)} />
                    <label style={{ direction: getDirection() }}>{<Text tid="username" />}</label>
                    <input className="input" name="username" value={username} ref={register({ required: true })} onChange={(e) => setUsername(e.target.value)} />
                    <Button onClick={handleClick} >
                        {<Text tid="register-btn" />}
                    </Button>
                </div>
            </form>

        </>
    )
}