const jwt=require("jsonwebtoken");

exports.verifyToken=async(req,res,next)=>{
    try{
        let token=req.header("Authorization");
        if(!token){
            res.status(403).json({msg:"Access Denied"});
        }
        if(token.startsWith("Bearer ")){
            token=token.slice(7,token.length).trimLeft();
            // token=req.headers.authorization.split(" ")[1];
            //Both the above lines will do the same thing
        }
        const verified=jwt.verify(token,process.env.jwtSecret);
        req.user=verified;
        next();
    }catch(error){
        res.status(400).json({error:error.message});
    }
}