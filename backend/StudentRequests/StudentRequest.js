const router=require("express").Router()
const Student=require("../studentSchema")
const bcrypt=require("bcrypt")
const Payment=require("../paymentSchema")
const Course=require("../courseSchema")

router.post("/login",async(req,res)=>{
    const user=await Student.findOne({email:req.body.email})
    if(user){
        const matchPass=await bcrypt.compare(req.body.password,user.password)
        if(matchPass){
            res.status(200).json(user);
        }
        else{
            res.status(500).json("pass did not match")
        }
    }
    else{
        res.status(500).json("undefinied")
    }
    
})

router.post("/signup",async(req,res)=>{
    req.body.password=await bcrypt.hash(req.body.password,10)
    const obj=new Student(req.body)
    await obj.save()
})

router.post('/payment',async(req,res)=>{
    const obj=new Payment(req.body)
    await obj.save()
    res.status(200).json("ok")
})

router.post("/checkrequested",async(req,res)=>{
    const obj=await Payment.findOne({course:req.body.course,student:req.body.student})
    
    if(obj){
        res.status(200).json("ok")
    }
    else{
        res.status(404).json("no")
    }
})

router.get('/getcourses/:id',async(req,res)=>{
    const enrolledCourses=await Course.find({students:[req.params.id]});
    const allcourses=await Course.find({});
    

var unenrolledCourses = allcourses.filter((n)=>{
    flag=0
    enrolledCourses.filter((x)=>{
        // console.log(x._id,n._id)
        // console.log()
        if(x._id.toString()===n._id.toString()){
            flag=1
            return false
        }
    })
    if(flag==0){
        return true
    }
    else{
        return false
    }
});
// console.log(unenrolledCourses)
    res.status(200).json({
        enrolledCourses:enrolledCourses,
        unenrolledCourses:unenrolledCourses
    })
})

module.exports=router