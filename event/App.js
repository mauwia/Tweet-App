const express=require('express')

const bodyParser=require('body-parser')
const cors=require('cors')
const axios=require('axios')

let app=express()

app.use(bodyParser.json())
app.use(cors())
app.post('/events',async (req,res)=>{
    try{
    const events=req.body
    // console.log('hello')
    await axios.post('http://localhost:4000/events',events)
    await axios.post('http://localhost:4001/events',events)
    // await axios.post('http://localhost:4002/events',events)

    res.send({status:'OK'})
}catch(err){
    console.log(err)
}
})

app.listen(4005)