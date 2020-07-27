import React from 'react'
import { useState } from 'react'
import Axios from 'axios'
import { useEffect } from 'react'
import CommentCreate from './CommentCreate'
import CommentList from './CommentList'

export default()=>{
    const [posts,setPosts]=useState({})
    const fetchPosts=async()=>{
        let result=await Axios.get('http://localhost:4002/posts')
        setPosts(result.data)
        console.log(result.data)
    }
    useEffect(()=>{
        fetchPosts()
    },[])
    // console.log(posts)

    return<div className={"d-flex flex-row flex-wrap justify-content"}>
        {Object.values(posts).map(post=>{
            return<div className="card" style={{width: "18rem",marginLeft:10}} key={post.id}>
            <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <CommentList comments={post.comments}/>
            <CommentCreate postId={post.id}/>
            </div>
          </div>
        })}
    </div>
}