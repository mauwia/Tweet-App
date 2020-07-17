const express= require('express')
const bodyParser=require('body-parser')
const {randomBytes}=require('crypto')
const cors=require('cors')
const axios=require('axios')
const app=express()

let posts ={}
app.use(bodyParser.json())
app.use(cors())
app.get('/posts',(req,res)=>{
    // console.log('hello')
    res.send(posts)
})

app.post('/post',async (req,res)=>{
    // console.log('hello')
    try{let id=randomBytes(4).toString('hex')
    let {title}=req.body
    posts[id]={
        id,title
    }
    await axios.post('http://localhost:4005/events',{
        type:'POST_CREATED',
        data:{
            id,title
        }
    })
    res.status(201).send(posts[id])

}catch(err){
    console.log(err)
}
})
app.post('/events',(req,res)=>{
    console.log("Recieved Events",req.body.type)
    res.send({})
})

app.listen(4000)