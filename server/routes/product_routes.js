const express = require("express");
const storage = require("../cloudinaryConfig.js");
const multer = require("multer");
const upload = multer({ storage });
const {
  newItem,
  updateItemInformation,
  deleteItem,
  getItemDetails,
  getProducts,
  getDetail,
  filterProducts,
  removeProduct,
} = require("../controller/product_controller");
const { isAdmin, isUserExist } = require("../middleware");
const { productSchema } = require("../utils/joiSchema.js");
const ExpressError = require("../utils/ExpressError.js");
const router = express.Router();

const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  const errMsg = error?.details.map((el) => el.message).join(",");
  if (errMsg) return next(new ExpressError(400, errMsg));
  else return next();
};

router.post("/getDetail/:id", getDetail);
router.get("/getProducts", getProducts);
router.post(
  "/newItem",
  validateProduct,
  isUserExist,
  isAdmin,
  upload.array("images",5),
  newItem,
);
router.get("/updateItemInformation/:id", isUserExist, isAdmin, getItemDetails);
router.put(
  "/updateItemInformation/:id",
  validateProduct,
  isUserExist,
  isAdmin,
  upload.single("image"),
  updateItemInformation,
);
router.delete("/deleteItem/:id", isUserExist, isAdmin, deleteItem);
router.post("/filter-products", filterProducts);
router.delete("/remove-products",isUserExist, removeProduct);
module.exports = router;
