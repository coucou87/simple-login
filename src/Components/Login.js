import React, { useState } from 'react'
import styled from 'styled-components'
import UseDataFetching from '../HOC/UseDataFetching'


export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [rememberme, setRememberMe] = useState(false)


    const handleUsername = (e) => setUsername(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)
    const handleRememberme = () => setRememberMe(!rememberme)

    const { loading, data, error } = UseDataFetching("api.behzee.com" ); 

   

    return (
   
        <form onSubmit={UseDataFetching("api.behzee.com")}>
            {console.log(data)}
            <label>Username</label>
            <input type="text" value={username} onChange={handleUsername} />
            <label>Password</label>
            <input type="password" value={password} onChange={handlePassword} />
            <label>Remember Me</label>
            <input type="checkbox" value={rememberme} onChange={handleRememberme} />
            <button type="submit"  >Log in</button>
        </form>
    )
}