const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const User=require("../models/User.js");


exports.register=async(req,res)=>{
    try{
        const {firstName,lastName,email,password,friends,location,picturePath,occupation}=req.body;
        const salt=await bcrypt.genSalt();
        const passwordHash=await bcrypt.hash(password,salt);

        const newUser=new User({
            firstName,
            lastName,
            email,
            friends,
            location,
            picturePath,
            occupation,
            password:passwordHash,
            viewedProfile:Math.floor(Math.random()*1000),
            impressions:Math.floor(Math.random()*1000)
        });

        const savedUSer=await newUser.save();
        res.status(201).json(savedUSer);
        
    }catch(error){
        // console.log(error);
        return res.status(500).json({error:error.message});
    }
}

exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email:email});
        if(!user){
            res.status(400).json({msg:"User not found"});
        }
        const comparePassword=await bcrypt.compare(password,user.password);
        if(!comparePassword){
            res.status(400).json({msg:"Invalid creds"});
        }
        const token=jwt.sign({id:user._id},process.env.jwtSecret);
        delete user.password;
        res.status(200).json({token,user});
    }catch(error){
        return res.status(500).json({error:error.message});
    }
}