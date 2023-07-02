const express=require("express");
const router=express.Router();
const multer = require("multer");  //Its a middleware for uploading files.
const {register,login} =require("../controllers/authController");

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
// diskStorage() is a function provided by multer to define the storage settings for uploaded files.
// It takes an object with two properties: destination and filename
// destination specifies the directory where the uploaded files should be stored. In this case, it is set to "public/assets", which means the uploaded files will be stored in the public/assets directory.
// filename specifies the name of the uploaded file. In this case, it is set to file.originalname, which means the uploaded file will keep its original name.


router.post("/register",upload.single("picture"),register);
router.post("/login",login);

module.exports=router;