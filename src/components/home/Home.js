import React from 'react'
import history from '../history/history'
import { Text } from '../container/language';
import LanguageSelector from '../LanguageSelector';
import Button from '../button/Button';
import Cookies from 'universal-cookie';
import './home.css';

export default function Home() {

    const cookie = new Cookies();

    function enter() {
        if (cookie.get('token') === undefined || cookie.get('token') === ''){
            history.push('/Register')
        }else{
            history.push('/Auth')
        }
    }

    return (
        <div className="container">
        <div className="home-wrapper">
            <header >
                <div className="lang-text">
                    <Text tid="choose-language" />
                </div>
                <div className="lang-select">
                    <LanguageSelector />
                </div>
            </header>
            <Button onClick={enter}>
                <Text tid="enter-user" />
            </Button>
        </div>
        </div>

    )
}