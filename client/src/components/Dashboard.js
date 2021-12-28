import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Dashboard() {
    const [quote, setQuote] = useState()
    const [tempQuote, setTempQuote] = useState()
    useEffect(() => {
       async function fetchQuote() {
        const token= localStorage.getItem('token')
        const res=await axios.get(`http://localhost:4000/quote`,{headers:{Authorization:token}})
        setQuote(res.data)
        console.log(res);
        }
        fetchQuote()
        return 
    }, [])

   async function handleQuote(e) {
        e.preventDefault()
        const token= localStorage.getItem('token')
        console.log(token);
        const res= await axios.post(`http://localhost:4000/quote`,{quote:tempQuote},{headers:{Authorization:token}})
        console.log(res);
        setQuote(tempQuote)
        setTempQuote(``)
    }

    return (
        <div>

            <h1>Dashboard</h1>
            <h1>the quote:{quote||`no quote found!!`}</h1>
            <form onSubmit={handleQuote}>
                <input type="text" name="" id="" onChange={e=>setTempQuote(e.target.value)} value={tempQuote}/>
                <button type="submit">submit</button>
            </form>
        </div>
    )
}
