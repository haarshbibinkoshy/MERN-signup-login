import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Signup() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate=useNavigate()

    return (
        <div>
        <h1>signup page</h1>
            <form onSubmit={async e=>{e.preventDefault();
            console.log(name)
            console.log(email)
            console.log(password)
            const resp= await axios.post('http://localhost:4000/signup',{name,email,password})
            if(resp.data.status==`error`){
                alert(resp.data.message)
            }else{
                navigate(`/login`)
            }
            console.log(resp)
            }} >
                <input type="text" placeholder="userName"  onChange={e=>{setName(e.target.value)}}/>
                <input type="email" placeholder="email" onChange={e=>{setEmail(e.target.value);}} />
                <input type="password" name="password" id="" onChange={e=>{setPassword(e.target.value)}}/>
                <button type="submit">submit</button>
            </form>
        </div>
    )
}
