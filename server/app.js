const dotenv=require("dotenv");
const path=require("path");
dotenv.config({path:path.resolve("./server/.env")});
const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const Port=process.env.PORT || 8080;
const app=express();
const cookieParser=require("cookie-parser");
const authRouter=require("./routes/auth_routes.js");
const productRouter=require("./routes/product_routes.js");
const cartRouter=require("./routes/cart_routes.js");
const reviewRouter=require("./routes/review_routes.js");
const ExpressError = require("./utils/ExpressError.js");

main().then(()=>{
    console.log("connected successfully");
}).catch((err)=>{
    console.log(err);
})
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/E-commercial');
}

const allowedOrigin=["http://localhost:5173","https://shopeasy-ecommerce-ubgf.vercel.app"]
app.use(cors({origin:allowedOrigin,credentials:true}));
app.use(express.json());
app.use(cookieParser());
app.listen(Port,()=>{
    console.log(`app is listening through port : ${Port}`);
})

app.use("/api/auth",authRouter);
app.use("/api/product",productRouter);
app.use("/api/cart",cartRouter);
app.use("/api/review",reviewRouter);

app.use((req,res,next)=>{
    return next(new ExpressError(400,"Page Not Found"));
})
app.use((err,req,res,next)=>{
    const {status=500,message="Server Error"}=err;
    return res.status(status).json({success:false,message:message});
})