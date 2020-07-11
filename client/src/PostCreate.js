import React from 'react'
import { useState } from 'react'
import axios from 'axios'

export default ()=>{
    const [title,setTitle]=useState('')
    let onSubmit= async e=>{
        e.preventDefault()
        await axios.post('http://localhost:4000/post',{title})
        setTitle('')
    }
    return<div className='jumbotron'>
        <form onSubmit={onSubmit}>
        <div className="input-group input-group-lg">
        <div className="input-group-prepend">
    <span className="input-group-text" id="inputGroup-sizing-lg">Create Post</span>
            </div>
  <input type="text" value={title} onChange={e=>setTitle(e.target.value)} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>
        </div>
            <button className='btn btn-primary' style={{float:'right',marginTop:10}}>Submit</button>
        </form>
    </div>
}