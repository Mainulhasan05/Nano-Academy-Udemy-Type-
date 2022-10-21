const mongoose=require("mongoose");
const courseSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    forwho:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    instructor:{
        type:mongoose.Types.ObjectId,
        ref:"instructor",
        required:true
    },
    students:[{
        type:mongoose.Types.ObjectId,
        ref:"student",
    }],
    description:{
        type:String,
        required:true
    }, 
    category:{
        type:String
    },
    imageUrl:{
        type:String,
        default:"https://campustechnology.com/-/media/EDU/CampusTechnology/2019-Images/20191209online.jpg"
    },
    videos:[String]  
    
},{timestamps:true})

const Student=new mongoose.model("course",courseSchema);
module.exports= Student