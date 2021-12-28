import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export default function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate=useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        const res= await axios.post(`http://localhost:4000/login`,{email, password})
        console.log(res)
        if (res.data.status ===`error`) {
            alert(res.data.message)
        }else{
            localStorage.setItem("token",res.data.token)
        navigate(`/dashboard`)
        }
        
    }
    return (
        <div>
        <h1>login page</h1>
        <form onSubmit={ handleSubmit} >
            <input type="email" name="email" id="" onChange={e=>setEmail(e.target.value)}/>
            <input type="password" name="password" id="" onChange={e=>setPassword(e.target.value)}/>
            <button type="submit">login</button>
        </form>
        </div>
    )
}
