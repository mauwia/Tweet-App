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

app.post('/posts/:id/comment',async(req,res)=>{
    try{
    const commentId=randomBytes(4).toString('hex')
    const {comment}=req.body
    // console.log(req.params)
    const comments=commentByPostId[req.params.id]||[]
    // console.log(commentByPostId)
    comments.push({id:commentId,comment,status:'Pending'})
    commentByPostId[req.params.id]=comments
    await axios.post('http://localhost:4005/events',{
        type:'Comment_Created',
        data:{
            id:commentId,comment,
            postId:req.params.id,
            status:'Pending'
        }
    })
    // console.log(commentByPostId)
    res.status(201).send(comments)
}catch(err){
    console.log(err)
}
})
app.post('/events',async(req,res)=>{
    try{
    // console.log('Event Recieved',req.body.type)
    const {type,data}=req.body;
    if(type==='Comment_Moderated'){
        const {postId,id,status}=data
        const comments=commentByPostId[postId];
        const comment=comments.find(comment1=>{
            return comment1.id===id
        })
    comment.status=status
    console.log(data)    
    await axios.post('http://localhost:4005/events',{
        type:'Comment_Updated',
        data:{
            id,
            status,
            postId,
            comment
        }
    })
}
    res.send({})

    }catch(err){
        console.log(err)
    }
})

app.listen(4001,()=>{
    console.log('4001')
})