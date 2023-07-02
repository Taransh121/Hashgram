const express=require("express");
const { verifyToken } = require("../middleware/middleware");
const router=express.Router();
const multer = require("multer");  //Its a middleware for uploading files
const {getFeedPosts,getUserPosts,likePost, createPost}=require("../controllers/postController");

// file storage 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload=multer({storage});

router.post("/create",verifyToken,upload.single("picture"),createPost)
router.get("/",verifyToken,getFeedPosts);
router.get("/:userId/posts",verifyToken,getUserPosts);
router.patch("/:id/like",verifyToken,likePost);

module.exports=router;
