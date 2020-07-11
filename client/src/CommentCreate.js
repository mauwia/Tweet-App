import React from 'react'
import { useState } from 'react'
import axios from 'axios'

export default ({postId})=>{
    const [comment,setComment]=useState('')
    let onSubmit= async e=>{
        e.preventDefault()
        let res=await axios.post(`http://localhost:4001/posts/${postId}/comment`,{comment})
        // console.log(res.data)
        setComment('')
    }
    return<div >
        <form onSubmit={onSubmit}>
            <input value={comment} onChange={e=>setComment(e.target.value)} className='form-control' placeholder='Add Comment'/>
            <button className='btn btn-primary'  style={{float:'right',marginTop:10}}>Add</button>
        </form>
    </div>
}