const joi=require("joi");

module.exports.productSchema=joi.object({
    name:joi.string().required(),
    description:joi.string().required(),
    price: joi.number().required(),
    oldPrice:joi.number().required(),
    category:joi.string().required(),
    brand:joi.string().required(),
})