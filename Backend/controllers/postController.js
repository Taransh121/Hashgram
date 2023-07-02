const User=require("../models/User.js");
const Post=require("../models/Post.js")

exports.createPost=async(req,res)=>{
    try {
        const {userId,description,picturePath}=req.body;
        const user=User.findById(userId);
        const newPost=new Post({
            userId,
            firstName:user.firstName,
            lastName:user.lastName,
            location:user.location,
            userPicturePath:user.userPicturePath,
            likes:{},
            comments:{},
            description,
            picturePath
        })
        await newPost.save();

        const post=await Post.find();
        res.status(201).json(post);
    } catch (error) {
        res.status(409).json({error:error.msg})
    }
}

exports.getFeedPosts=async(req,res)=>{
    try {
        const post=await Post.find();
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({error:error.msg})
    }
}

exports.getUserPosts=async(req,res)=>{
    try {
        const {userId}=req.params;
        const post=await Post.find({userId});
        res.status(200).json(post);
    } catch (error) {
        res.status(409).json({error:error.msg})
    }
}

exports.likePost=async(req,res)=>{
    try {
        const {id}=req.params;
        const {userId}=req.body;
        const post =await Post.findById(id);
        const isLiked=post.likes.get(userId); //It will check if the user has already liked the post or not.

        if(isLiked){
            post.likes.delete(userId);
        }else{
            post.likes.set(userId,true);
        }
        const updatedPost=await Post.findByIdAndUpdate(
            id,
            {likes:post.likes},
            {new:true}
            )
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(409).json({error:error.msg})
    }
}