const express=require("express");
const router=express.Router();
const {getUser,getUserFriends,addRemoveFriend} =require("../controllers/userController");
const {verifyToken}=require("../middleware/middleware");

router.get("/:id",verifyToken,getUser);
router.get("/:id/friends",verifyToken,getUserFriends);
router.patch("/:id/:friendId",verifyToken,addRemoveFriend);

module.exports=router;
