const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
        min:3,
        max:20
    },
    lastName:{
        type:String,
        require:true,
        min:3,
        max:20
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        min:5
    },
    picturePath:{
        type:String,
        default:"",
    },
    friends:{
        type:Array,
        default:[]
    },
    location:String,
    occupation:String,
    viewedProfile:Number,
    impressions:Number,
},
{timestamps:true}
);

// const User=mongoose.model("User",UserSchema);
// export default User;
module.exports=mongoose.model("User",UserSchema)