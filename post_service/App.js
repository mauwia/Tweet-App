const express= require('express')
const bodyParser=require('body-parser')
const {randomBytes}=require('crypto')
const cors=require('cors')
const app=express()

let posts ={}
app.use(bodyParser.json())
app.use(cors())
app.get('/posts',(req,res)=>{
    // console.log('hello')
    res.send(posts)
})

app.post('/post',(req,res)=>{
    // console.log('hello')
    let id=randomBytes(4).toString('hex')
    let {title}=req.body
    posts[id]={
        id,title
    }
    res.status(201).send(posts[id])
})

app.listen(4000)