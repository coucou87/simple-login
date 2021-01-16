import React from 'react';
import { Text } from '../container/language';
import Cookies from 'universal-cookie';
import './table.css';

export default function Table({ fullname, name, username }) {
    const cookie = new Cookies();
    const getDirection = () => { return cookie.get('dir') }

    return (
        <div style={{ direction: getDirection() }}>
            <table>
                <thead></thead>
                <tbody>
                    <tr>
                        <td>
                            <label >{<Text tid="fullname" />}</label>
                        </td>
                        <td>
                            <label >{fullname}</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label >{<Text tid="name" />}</label>
                        </td>
                        <td>
                            <label >{name}</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>{<Text tid="username" />}</label>
                        </td>
                        <td>
                            <label >{username}</label>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}