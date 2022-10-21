const router=require("express").Router()
const Admin=require('../adminSchema')
router.post("/login",async(req,res)=>{
    const admin=await Admin.findOne({email:req.body.email,password:req.body.password})
    
    res.status(200).json(admin)

})

module.exports=router