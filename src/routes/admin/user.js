const { Router } = require('express')
const express=require('express')
const router=express.Router()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {signUp, signIn,signOut}=require('../../controller/admin/user')
const User=require('../../models/user')
const { validateSignupRequest,validatedRequest,validateSigninRequest } = require('../../validators/user')
const { requireSignIn } = require('../../common-middleware')

router.post('/admin/signup',validateSignupRequest,validatedRequest,signUp);

router.post('/admin/signin',validateSigninRequest,validatedRequest,signIn);

router.post('/admin/signout',requireSignIn,signOut);
// router.post('/profile',requiredSignIn,(req,res)=>{
//     return res.status(200).send('you are in profile')
// })


module.exports= router;