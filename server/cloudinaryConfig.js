const cloudinary=require("cloudinary").v2;
const {CloudinaryStorage}=require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    cloud_api_key:process.env.CLOUD_API_KEY,
    cloud_api_secret:process.env.CLOUD_API_SECRET,
})
const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    param:{
        folder:"ShopEasy",
        resource_type:"auto",
    }
})

module.exports=storage;