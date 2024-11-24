const express=require("express")
const cors=require("cors")
const bodyParser=require("body-parser")
var app=express()
app.use(cors())
app.use(bodyParser.json())
const port=3000
app.post("/convertfahrenheit",(req,res)=>{
    var temp=req.body.value
    console.log(temp)
    res.json(temp*(9/5)+32)
})
app.post("/convertcelcius",(req,res)=>{
    var temp=req.body.value
    console.log(temp)
    res.json((temp-32)*5/9)
})
app.listen(port,()=>console.log("listening on port "+port))