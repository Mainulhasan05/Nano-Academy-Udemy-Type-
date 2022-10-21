const mongoose=require("mongoose");
const studentSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        default:"admin"
    }
    
},{timestamps:true})

const Admin=new mongoose.model("admin",studentSchema);
module.exports= Admin