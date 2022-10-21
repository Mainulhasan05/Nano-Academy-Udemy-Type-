const mongoose=require("mongoose");
const studentSchema=new mongoose.Schema({
    first:{
        type:String,
        required:true
    },
    last:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    courseIds:[
         {
        type:mongoose.Types.ObjectId,
        ref:"course",
        required:true
         }
    ]  ,
    role:{
        type:String,
        default:"student"
    }
    
},{timestamps:true})

const Student=new mongoose.model("student",studentSchema);
module.exports= Student