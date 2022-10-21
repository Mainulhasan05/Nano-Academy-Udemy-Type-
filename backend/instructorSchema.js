const mongoose=require("mongoose");
const instructorSchema=new mongoose.Schema({
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
    education:{
        type:String,
        required:true
    },
    courseIds:[
         {
        type:mongoose.Types.ObjectId,
        ref:"course",
        required:true
         }
    ],
    role:{
        type:String,
        default:"instructor"
    }
    
},{timestamps:true})

const instructor=new mongoose.model("instructor",instructorSchema);
module.exports= instructor