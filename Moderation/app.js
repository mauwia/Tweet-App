const express=require('express')
const cors=require('cors')
const axios=require('axios')

const bodyParser=require('body-parser')

const app=express()

app.use(bodyParser.json())
app.use(cors())


app.post('/events',async (req,res)=>{
    try{
        const {type,data}=req.body
    if(type=='Comment_Created'){
        let status=data.comment.includes('orange')?"rejected":"approved"
        await axios.post('http://localhost:4005/events',{
            type:'Comment_Moderated',
            data:{
                id:data.id,
                postId:data.postId,
                status,
                comment:data.comment
            }
        })
    }
    }
    catch(err){
        console.log(err)
    }
    
})

app.listen(4003,()=>{
    console.log('4003')
})