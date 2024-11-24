const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const cors=require('cors')
var app=express()
app.use(cors())
app.use(bodyParser.json())

const port=3001
mongoose.connect("mongodb+srv://nirutthyu:pasta@cluster0.ghje5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>console.log("mongoDb connected"))
.catch(error=>console.log("error ocured while connecting "+error))

const employeeSchema=new mongoose.Schema({
    id:Number,
    name:String,
    age:Number,
    salary:Number,
})
const Employee=mongoose.model("Employee",employeeSchema)
app.post("/convert",(req,res)=>
{
    console.log(req.body)
    var data=req.body

    res.json(data.value *8)
    
})
app.post("/add",(req,res)=>{
    const newEmployee=new Employee(req.body)
    newEmployee.save()
    .then(()=>res.json("employee added"))
    .catch(error=>res.status(400).json("error adding emplyee"+error))
})

app.get("/get",(req,res)=>{
    Employee.find()
    .then(employees=>res.json(employees))
    .catch(error=>res.status(400).json("an error occured while fetching the details "+error))
})
app.delete("/remove/:name",(req,res)=>{
    var Employeename=req.params.name
    Employee.deleteOne({name:Employeename})
    .then(()=>res.json("removed successfully"))
    .catch(error=>res.status(400).json("an error ocurres while deleting "+error))
})
app.put("/update/:name",(req,res)=>{
    const Ename=req.params.name
    Employee.findOneAndUpdate({name:Ename},req.body,{new:true})
    .then(updatedEmployee=>{
        if(!updatedEmployee){
            res.status(400).json("not found")
        }
        res.json("updated successfully")
    })
    .catch(error=>{
        res.status(400).json(error)
    })
    
})


app.listen(port,()=>console.log("listening on port "+port))