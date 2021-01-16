import React, { useContext, useState, useEffect } from 'react';
import { baseUrl, authEndPoint } from '../../constants/api';
import history from '../history/history';
import { Text, LanguageContext  } from '../container/language';
import Cookies from 'universal-cookie';
import ErrorModal from '../errorModal/ErrorModal';
import Button from '../button/Button';
import Table from '../table/Table';
import Loader from '../loader/Loader';
import './authenticated.css';

export default function Authenticated() {
    const { dictionary } = useContext(LanguageContext);
    const [fullname, setFullname] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [id, setId] = useState('')
    const cookie = new Cookies();

    const handleClose = () => setShowModal(!showModal)
    const exit = () => {
        history.push("/")
        cookie.set('token', '', { path: '/' })
        cookie.set('refresh-token', '', { path: '/' })
    }

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
                if (responseData.status === 200) {
                    setLoading(true)
                    setId(responseData.data.data.id)
                    setFullname(responseData.data.data.full_name)
                    setName(responseData.data.data.name)
                    setUsername(responseData.data.data.username)
                } else {
                    setLoading(false)
                    setShowModal(!showModal)
                    setErrorMessage(responseData.data.message)
                }
            })
            .catch(error => {
                setLoading(false)
                setShowModal(!showModal)
                setErrorMessage(<Text tid="server-error-500" />)
            });
    }, [cookie, showModal])

    return (
        <>
          {dictionary.enterText}
            {showModal && <ErrorModal errorTxt={errorMessage} handleClose={handleClose} />}
            <div className="auth-wrapper">
                <Table name={name} fullname={fullname} username={username} />
                {!loading && <Loader />}
                <div className="auth-btn-container">
                    <Button onClick={exit} className="auth-btn">
                        <Text tid="logout-btn" />
                    </Button>
                    <Button onClick={() => history.push("/")}>
                        <Text tid="back-btn" />
                    </Button>
                </div>
            </div>

        </>
    )
}