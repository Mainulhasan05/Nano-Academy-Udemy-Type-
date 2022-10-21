const router=require("express").Router()
const Instructor=require("../instructorSchema")
const bcrypt=require("bcrypt")
const Course=require("../courseSchema")
const Payment=require("../paymentSchema")
const Student = require("../courseSchema")

router.post("/login",async(req,res)=>{
    const user=await Instructor.findOne({email:req.body.email})
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
    const obj=new Instructor(req.body)
    await obj.save()
    res.status(200).json("success")
})

router.post("/addcourse",async(req,res)=>{
    const obj=new Course(req.body)
    obj.save();
    res.status(200).json("success")
})

router.get('/getcourses',async(req,res)=>{
    const courses=await Course.find({});
    
    res.status(200).json(courses)
})

router.get('/getcourses/:id',async(req,res)=>{
    const courses=await Course.find({instructor:req.params.id});
    
    res.status(200).json(courses)
})

router.get('/getcourse/:id',async(req,res)=>{
    const course=await Course.findOne({_id:req.params.id})
    res.status(200).json(course)
})

router.get('/getrequests/:id',async(req,res)=>{
    const requests=await Payment.find({course:req.params.id}).populate("student")
    
    res.status(200).json(requests)
})


router.post("/addvideo",async(req,res)=>{
    //const course=await Course.findOne({_id:req.body.courseId})
    const course=await Course.findOneAndUpdate(
        { _id: req.body.courseId }, 
        { $push: { videos: req.body.link  }},{new:true})
        res.status(200).json(course.videos)
})

router.post("/deletevideo",async(req,res)=>{
    const course=await Course.findOneAndUpdate({ _id: req.body.courseId }, {
        $pull: {
            videos: req.body.video
        },
    },{new:true});
    res.status(200).json(course.videos)
})

router.post("/acceptrequest",async(req,res)=>{
    const course=await Course.findOneAndUpdate(
        { _id: req.body.id.course }, 
        { $push: { students: req.body.id.student  }},{new:true})
    const student=await Student.findOneAndUpdate(
        { _id: req.body.id.student }, 
        { $push: { courseIds: req.body.id.course  }},{new:true})
    const requests=await Payment.findByIdAndRemove({_id:req.body.id.request});
    res.status(200).json({msg:"ok"})
})


router.get('/getstudents/:id',async(req,res)=>{
    const requests=await Course.findOne({_id:req.params.id}).populate("students")
    
    res.status(200).json(requests.students)
})

module.exports=router








