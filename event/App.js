const express=require('express')

const bodyParser=require('body-parser')
const cors=require('cors')
const axios=require('axios')

let app=express()
let events1=[]
app.use(bodyParser.json())
app.use(cors())
app.post('/events',async (req,res)=>{
    try{
    const events=req.body
    // console.log('hello')
    events1.push(events)
    await axios.post('http://localhost:4000/events',events)
    await axios.post('http://localhost:4001/events',events)
    await axios.post('http://localhost:4002/events',events)
    await axios.post('http://localhost:4003/events',events)

    res.send({status:'OK'})
}catch(err){
    console.log(err)
}
})
app.get('/events',(req,res)=>{
    res.send(events1)
})

app.listen(4005,()=>{
    console.log('4005')
})