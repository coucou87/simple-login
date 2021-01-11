import React from 'react'
import history from './history'
import { Text } from './language/Language';
import LanguageSelector from './language/LanguageSelector';
import './home.css'
import Button from './Button'

export default function Home() {
    return (

        <div className="home-wrapper">
            <header className="header">
                <div className="lang-text">
                    <Text tid="choose-language" />
                </div>
                <div className="lang-select">
                    <LanguageSelector />
                </div>

            </header>
            <Button onClick={() => history.push('/Register')}>
                <Text tid="enter-user" />
            </Button>
        </div>

    )
}