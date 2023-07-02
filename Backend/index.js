const express = require("express");
const bodyParser = require("body-parser"); //It is a middleware of Node JS used to handle HTTP POST request
const mongoose = require("mongoose"); //Database
const cors = require("cors"); //We need CORS to bypass the external requests
const dotenv = require("dotenv"); //It allows us to create a .env file where we store our passwords,username etc.
const helmet = require("helmet"); //It helps us secure our Node. js application by setting several HTTP headers
const morgan = require("morgan"); //Morgan is another HTTP request logger middleware for Node. js.
const path = require("path"); //It is a built-in module that helps you work with file system paths in an OS-independent way
const { fileUrlToPath } = require("url");
const authRoutes=require("./routes/authRoutes");
const userRoutes=require("./routes/userRoutes");
const postRoutes=require("./routes/postRoutes");
const User=require("./models/User");
const Post=require("./models/Post");
const {users,posts}=require("./data/index");


//configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
// limit: "30mb" sets the maximum size limit for the JSON payload to 30 megabytes. This means that if the incoming request body exceeds 30 megabytes in size, the parsing will fail and an error will be returned.
// extended: true allows for parsing of rich objects and arrays. When set to true, it enables the extended mode of the JSON parser, which allows for nested objects and arrays in the request body.
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));


//Routes-
app.use("/auth",authRoutes);
app.use("/users",userRoutes);
app.use("/posts",postRoutes);


//mongo setup
const PORT=process.env.PORT || 6001;
mongoose.set('strictQuery', false);
const mongoURL = `mongodb+srv://${process.env.Mongo_DB_User}:${process.env.Mongo_DB_Password}@cluster0.eq8d4zf.mongodb.net/${process.env.Mongo_DB_Database}?retryWrites=true&w=majority`;
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected");
}).catch((error)=> {
    console.log(error);
});


app.listen(PORT,()=>{
    console.log(`Server running at PORT - ${PORT}`);

    //Add manual data only once-
    // User.insertMany(users);
    // Post.insertMany(posts);
})
