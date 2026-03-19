const dotenv=require("dotenv");
dotenv.config();
const express=require("express");
const mongoose=require("mongoose");
const Port=8080;
const app=express();
const cookieParser=require("cookie-parser");
const authRouter=require("./routes/auth_routes.js");
const productRouter=require("./routes/product_routes.js");

main().then(()=>{
    console.log("connected successfully");
}).catch((err)=>{
    console.log(err);
})
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/E-commercial');
}

app.use(express.json());
app.use(cookieParser());
app.listen(Port,()=>{
    console.log(`app is listening through port : ${Port}`);
})

app.use("/api/auth",authRouter);
app.use("/api/product",productRouter);