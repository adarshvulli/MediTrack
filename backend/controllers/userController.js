const express = require('express');
const userModel = require('../models/userModel.js');
const { default: mongoose } = require('mongoose');
const expressAsyncHandler =require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt= require('bcryptjs');
require('dotenv').config();
 
const loginController = expressAsyncHandler(async(req,res) => { 
    // console.log(req.body);
    const{email,password}= req.body;
    if(!email||!password){
        res.sendStatus(400);
        throw Error("All necessary fields have not been filled to sign in");
    }
    const user= await userModel.findOne({email});
    if (!user){return res.status(401).json({message:"user not found"});}
    const match = await bcrypt.compare(password,user.password);
    console.log(match);
    if(match){
        console.log("logged in")
        res.json({
            _id :user._id,
            email:user.email,
            password:user.password
            // isAdmin:user.isAdmin,
            // token:generateToken(user._id)
        })
    }else{
        res.sendStatus(400);
        throw new Error("unauthorized");
}});

// const generateToken = (id)=>{
//     return jwt.sign({id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"30d"});
// }

const registerController = expressAsyncHandler(async (req, res) => {
    const{firstname,lastname, hospitalname,addressone,addresstwo,city,country,pincode,email,phonenumber,password} = req.body;
    //check for all fields
    
        if(!firstname||!email||!password){
            res.sendStatus(400);
            throw Error("All necessary fields have not been filled");
        }
        // pre exisiting user
        const userExists = await userModel.findOne({email});
        if(userExists){
            throw Error("user Exists,please login");
        }

        const userNameExists=await userModel.findOne({firstname});
        if (userNameExists){
            throw Error("username already taken");
        }
        //creating a doc in db
        // const user=  await userModel.create({username, email, password});
            const salt= await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password,salt);
            const user= await userModel.create({firstname,lastname, hospitalname,addressone,addresstwo,city,country,pincode,email,phonenumber,password:hashedPassword});
            // const user= await userModel.create({name, email, password:hashedPassword});
            if(user){
                res.json({
                    id:user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    hospitalname: user.hospitalname,
                    addressone: user.addressone,
                    addresstwo: user.addresstwo,
                    city: user.city,
                    country: user.country,
                    pincode: user.pincode,
                    email: user.email,
                    phonenumber: user.phonenumber,
                    password: hashedPassword
                    // isAdmin:user.isAdmin,
                    // token: generateToken(user._id)

                })
            }else{
                console.log("registration error",err);
            }
});

// const fetchAllUsersController = expressAsyncHandler(async (req, res) => {
//     const users = await userModel.find({
//                 $or: [ 
//                     { name: { $regex: req.query.search, $options: "i" } }, 
//                     { email: { $regex: req.query.search, $options: "i" } } 
//                 ] 
//             }).find({ _id: { $ne: req.user._id } },);
//     res.send(users);
//   });

module.exports = {loginController, registerController};