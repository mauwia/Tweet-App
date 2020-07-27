import React from 'react'
import { useState } from 'react'
import Axios from 'axios'
import { useEffect } from 'react'

export default({comments})=>{
    // const [posts,setPosts]=useState({})
    // const fetchComments=async()=>{
    //     let result=await Axios.get(`http://localhost:4001/posts/${postId}/comment`)
    //     setPosts(result.data)
    // }
    // useEffect(()=>{
    //     fetchComments()
    // },[])
    // // console.log(posts)
    console.log(comments)
    return<ul>
        {Object.values(comments).map(post=>{
            console.log(post)
            let comment
            if(post.status=='pending'){
                comment='Comment is waiting for moderation'
            }
            if(post.status=='approved'){
                comment=post.comment
            }
            else{
                comment='Comment rejected'

            }
            return<li key={post.id}>{comment}</li>
        })}
    </ul>
}