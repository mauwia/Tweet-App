const express=require('express')
const bodyParser=require('body-Parser')
const {randomBytes}=require('crypto')
const cors=require('cors')
const axios=require('axios')
const app=express()
app.use(cors())
app.use(bodyParser.json())
let commentByPostId={}
app.get('/posts/:id/comment',(req,res)=>{
    res.send( commentByPostId[req.params.id]||[])
})

app.post('/posts/:id/comment',(req,res)=>{
    const commentId=randomBytes(4).toString('hex')
    const {comment}=req.body
    // console.log(req.params)
    const comments=commentByPostId[req.params.id]||[]
    // console.log(commentByPostId)
    comments.push({id:commentId,comment})
    commentByPostId[req.params.id]=comments
    axios.post('http://localhost:4005/events',{
        type:'Comment_Created',
        data:{
            id:commentId,comment,
            postId:req.params.id
        }
    })
    // console.log(commentByPostId)
    res.status(201).send(comments)
})
app.post('/events',(req,res)=>{
    console.log('Event Recieved',req.body.type)
    res.send({})
})

app.listen(4001)