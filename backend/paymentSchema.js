const mongoose=require("mongoose");
const paymentSchema=new mongoose.Schema({
    course:{
        type:mongoose.Types.ObjectId,
        ref:"course",
        required:true
    },
    student:{
        type:mongoose.Types.ObjectId,
        ref:"student",
        required:true
    }, 
    bkash:{
        type:String,
        required:true
    }
    
},{timestamps:true})

const Payment=new mongoose.model("payment",paymentSchema);
module.exports= Payment