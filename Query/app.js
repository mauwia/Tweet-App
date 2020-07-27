const express=require('express')
const cors=require('cors')
const axios=require('axios')

const bodyParser=require('body-parser')

const app=express()

app.use(bodyParser.json())
app.use(cors())
let posts={}
app.get('/posts',(req,res)=>{
    res.send(posts)
})
let handleEvent=(type,data)=>{
    if(type=='POST_CREATED'){
        const {id,title}=data
        posts[id]={id,title,comments:[]}
        // console.log(posts)
    }
    if(type=='Comment_Created'){
        let {id,comment,postId,status}=data
        // console.log(data)
        const post=posts[postId]
        post.comments.push({id,comment,status})
        // console.log(posts[postId])
    }
    if(type=='Comment_Updated'){
        const {id,comment,postId,status}=data
        console.log(id)
        const post=posts[postId]
        const comment1 = post.comments.find(comment2=>{
            return comment2.id===id
        })
        // com
        comment1.status=status
        comment1.comment=comment.comment
        // console.log(comment)
        // console.log(posts[postId])
        
    }
}
app.post('/events',(req,res)=>{
    const {type,data}=req.body
    // console.log(type,data)
    handleEvent(type,data)
    
    res.send({})
})

app.listen(4002,async ()=>{
    try{
    // console.log('4002')
    const res = await axios.get('http://localhost:4005/events')
    for(let event of res.data){
        console.log(event.type)
        handleEvent(event.type,event.data)
    }
}catch(err){
    console.log(err)
}
})