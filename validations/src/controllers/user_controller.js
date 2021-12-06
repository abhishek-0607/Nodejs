const express = require("express");
const { body, validationResult } = require('express-validator');

const User = require("../models/user");

const router = express.Router();

router.post("/",
body("first_name").notEmpty().withMessage("first name is required"),
body("last_name").notEmpty().withMessage("last name is required"),
body("email").custom((value)=>{
    const userByEmail = await User.findOne({email:value}).lean().exec();
    const isEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/.test(value);
    if(!isEmail || value <= 0){
        throw new Error("Email is invalid")
    }
    if(userByEmail){
        throw new Error("Please try with different email")
    }
    return true;
}),
body("pincode").custom((value)=>{
    const isNumber = /^[0-9]*$/.test(value);
    if(!isNumber || value < 100000||value>999999){
        throw new Error("invalid pincode")
    }
    return true;
}),
body("gender").notEmpty().equals("male"||"female").withMessage("should be male or female"),
body("age").custom((value)=>{
    const isNumber = /^[0-9]*$/.test(value);
    if(!isNumber || value <= 100||value>=1){
        throw new Error("invalid pincode")
    }
    return true;
}),

    async (req,res)=>{
        console.log(body("first_name"))
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
        let newErrors = errors.array().map(({msg,param,location})=>{
            return {
                [param]:msg
            }
        })

        return res.status(400).json({ errors: newErrors });
        }

        try{
        const user = await User.create(req.body);

        return res.status(201).send({user});
        }
        catch(e){
            return res.status(500).json({status:"Failed", message:e.message})
        }
})
router.get("/",async(req,res)=>{
     try{
        const page = +req.query.page || 1;
        const size = +req.query.size || 5;
        const skip = (page -1)*size;

        const users = await User.find().skip(skip).limit(size).lean().exec();

        const totalPages = Math.ceil((await User.find().countDocuments())/size)

        return res.json({users, totalPages});
     }
     catch(e){
         return res.status(500).json({status:"Failed", message:e.message})
     }
})
 module.exports = router;