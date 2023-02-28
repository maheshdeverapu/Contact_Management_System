const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("../schema");

router.post("/v1/contacts",async(req,res)=>{
    try{
        const {firstName,lastName,email,phone} = req.body;
        
        if(!firstName){
            return res.status(400).json({
                error:"Missing required field(s):firstName"
            })
        }
        else if(!lastName){
            return res.status(400).json({
                error:"Missing required field(s):lastName"
            })
        }
        else if(!email){
            return res.status(400).json({
                error:"Missing required field(s):email"
            })
        }
        else if(!phone){
            return res.status(400).json({
                error:"Missing required field(s):phone number"
            })
        }
        const userEmail = await User.findOne({email:email});
        const userPhone = await User.findOne({phone:phone});

        if(userEmail || userPhone){
            return res.status(400).json({
                error:"email or phone already existed, please give another"
            })
        }
        const user = await User.create({
            firstName,lastName,email,phone
        })
        res.status(201).json({
            user
        })
    }catch(err){
        res.status(400).json({
            error:err,
            message:err.message
        })
    }
})
router.get("/v1/contacts",async(req,res)=>{
    try{
        const user = await User.find();
        if(!user){
            return res.status(400).json({
                error:"contact manager is empty"
            })
        }
        res.status(200).json({
            user
        })
    }catch(err){
        res.status(401).json({
            error:err.message
        })
    }
})
router.get("/v1/contacts/:id",async(req,res)=>{
    try{
        const user = await User.findOne({_id:req.params.id});
        if(!user){
            return res.status(404).json({
                error:"There is no contact with that id"
            })
        }
        res.status(200).json({
            user
        })
    }catch(err){
        res.status(404).json({
            error:"There is no contact with that id"
        })
    }
})
router.delete("/v1/contacts/:id",async(req,res)=>{
    try{
        let user = await User.findOne({_id:req.params.id});
        if(!user){
            return res.status(204).send("")
        }
         user = await User.deleteOne({_id:req.params.id});
        res.status(204).send("")
    }catch(err){
        res.status(204).send("")
    }
})
router.put("/v1/contacts/:id",async(req,res)=>{
    try{
        let user = await User.findOne({_id:req.params.id});
        if(!user){
            return res.status(404).json({
                error:"There is no contact with that id"
            })
        }
        user = await User.updateOne({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            phone:req.body.phone
        })
        res.status(204).json({
        
        })
    }catch(err){
        res.status(401).json({
            error:err.message
        })
    }
})
router.patch("/v1/contacts/:id",async(req,res)=>{
    try{
        let user = await User.findOne({_id:req.params.id});
        if(!user){
            return res.status(404).json({
                error:"There is no contact with that id"
            })
        }
        console.log(req.body)
        user = await User.updateOne(req.body)
        res.status(204).json({
        
        })
    }catch(err){
        res.status(404).json({
            error:"There is no contact with that id"
        })
    }
})
module.exports = router;