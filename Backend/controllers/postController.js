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

        const posts=await Post.find();
        for (index = 0; index < posts.length; index++) {
            
            const id = posts[index].userId;  
            const user=await User.findById(id);
            posts[index].firstName = user.firstName;
            posts[index].lastName = user.lastName;
            posts[index].location = user.location;
            posts[index].userPicturePath = user.picturePath;
        }
        res.status(201).json(posts);
    } catch (error) {
        res.status(409).json({error:error.msg})
    }
}

exports.getFeedPosts=async(req,res)=>{
    try {
        const posts = await Post.find();

        for (index = 0; index < posts.length; index++) {
            
            const id = posts[index].userId;  
            const user=await User.findById(id);
            posts[index].firstName = user.firstName;
            posts[index].lastName = user.lastName;
            posts[index].location = user.location;
            posts[index].userPicturePath = user.picturePath;
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({error:error.msg})
    }
}

exports.getUserPosts=async(req,res)=>{
    try {
        const {userId}=req.params;
        const posts=await Post.find({userId});
        for (index = 0; index < posts.length; index++) {
            
            const id = posts[index].userId;  
            const user=await User.findById(id);
            posts[index].firstName = user.firstName;
            posts[index].lastName = user.lastName;
            posts[index].location = user.location;
            posts[index].userPicturePath = user.picturePath;
        }
        res.status(200).json(posts);
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
            // {firstName},
            {new:true}
            )

                const user_id = updatedPost.userId;  
                const user=await User.findById(user_id);
                updatedPost.firstName = user.firstName;
                updatedPost.lastName = user.lastName;
                updatedPost.location = user.location;
                updatedPost.userPicturePath = user.picturePath;

            
            console.log(updatedPost);
        //     const posts=await Post.find();
        // for (index = 0; index < posts.length; index++) {
            
        //     const id = posts[index].userId;  
        //     const user=await User.findById(id);
        //     posts[index].firstName = user.firstName;
        //     posts[index].lastName = user.lastName;
        //     posts[index].location = user.location;
        //     posts[index].userPicturePath = user.picturePath;
        // }
        // res.status(201).json(posts);
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(409).json({error:error.msg})
    }
}