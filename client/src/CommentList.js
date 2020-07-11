import React from 'react'
import { useState } from 'react'
import Axios from 'axios'
import { useEffect } from 'react'

export default({postId})=>{
    const [posts,setPosts]=useState({})
    const fetchComments=async()=>{
        let result=await Axios.get(`http://localhost:4001/posts/${postId}/comment`)
        setPosts(result.data)
    }
    useEffect(()=>{
        fetchComments()
    },[])
    // console.log(posts)

    return<ul>
        {Object.values(posts).map(post=>{
            return<li key={post.id}>{post.comment}</li>
        })}
    </ul>
}