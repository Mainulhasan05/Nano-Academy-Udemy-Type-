const express=require('express')
const mongoose=require("mongoose")
const app=express()
const cors=require("cors")
const PORT=5000
const Course=require("./courseSchema")

const mongodb="mongodb+srv://user:user@cluster0.ayogb.mongodb.net/udemyProject?retryWrites=true&w=majority"
const AdminRequestHandler=require("./AdminRequests/AdminRequest")
const StudentRequestHandler=require("./StudentRequests/StudentRequest")
const InstructorRequestHandler=require("./InstructorRequests/InstructorRequest")
app.use(express.json())
app.use("/admin",AdminRequestHandler)
app.use("/instructor",InstructorRequestHandler)
app.use("/student",StudentRequestHandler)
app.use(cors)


mongoose.connect(mongodb,()=>{
    console.log("Database Connected")
})

app.post("/abc",(req,res)=>{
    res.send("asche")
})



app.listen(PORT,()=>{
    console.log("server is running on port "+PORT);
})





        