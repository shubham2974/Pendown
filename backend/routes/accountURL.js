const express = require('express');
const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { createAccount, loginAccount } = require('../types');
const { user } = require('../db');
const cookieParser = require('cookie-parser')
const app = express()
app.use(cookieParser())
const { jwtPassword } = require('../constants');


router.post('/signup', async (req, res)=>{
    const accountPayload = req.body;
    console.log(accountPayload);
    const parsePost = createAccount.safeParse(accountPayload);
    if(!parsePost.success){
        const errorMessages = parsePost.error.errors.map(error => {
            return `${error.message} for field '${error.path.join('.')}'`;
        });
        res.status(400).json({
            msg: 'Please correct the following errors:',
            errors: errorMessages
        });
        return;
    }
    console.log("Zod Authentication passed")
    //If Account Validation is successfull push the account in MongoDB with encrypted password and return jwt token, 

    try {
        const result = await user.create({
            username: accountPayload.username,
            password: accountPayload.password,
            posts: [],
            views: 1
        });
    
        console.log(result);

        const token = jwt.sign({
            username : accountPayload.username
            },
            jwtPassword,
            {expiresIn: "2h"})
        
        const options = { 
            httpOnly: true, 
            maxAge: 2 * 60 * 60 * 1000, // Cookie expires in 2 hours
        };

        res.cookie('jwt', token, options);
        res.cookie('username', accountPayload.username, {
            maxAge: 2 * 60 * 60 * 1000, // Cookie expires in 2 hours
        })
        res.status(201).json({
            msg: `Username: ${accountPayload.username} Account Created`,
            jwt: token
        })
    
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error
            res.status(400).json({
                msg: `Username ${accountPayload.username} already exists`
            });
        } else {
            // Other errors
            res.status(400).json({
                msg: `Error while creating account: ${error.message}`
            });
        }
    }
})

router.post('/login', async(req, res)=>{
    //take the credentials from user, 
    const UserLogin = req.body;
    //verify the credentials, using zod, 
    console.log(UserLogin);
    const parsePost = loginAccount.safeParse(UserLogin);
    if(!parsePost.success){
        const errorMessages = parsePost.error.errors.map(error => {
            return `${error.message} for field '${error.path.join('.')}'`;
        });
        res.status(400).json({
            msg: 'Please correct the following errors:',
            errors: errorMessages
        });
        return;
    }
    console.log("Zod Authentication passed")

    //check if the user exists in database, and password matches,
    const checkUser = await user.findOne({
        username: UserLogin.username  
    })

    console.log(`${checkUser} return from findOne`)

    if ((checkUser!=null) && (checkUser.password === UserLogin.password)){
        const token = jwt.sign({username: UserLogin.username}, jwtPassword, {expiresIn: "2h"})
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 2 * 60 * 60 * 1000
        })
        res.cookie('username', UserLogin.username, {
            maxAge: 2 * 60 * 60 * 1000
        })
        res.status(200).json({
            msg: "Successfully Logged In"
        })
    }else{
        res.status(400).json({
            msg: "Bad Credentials"
        })
    }
    //return the jwt token, 
})

router.post('/logout', async(req, res)=>{
    res.clearCookie("jwt")
    res.clearCookie("username")
    res.status(200).json({
        msg: `Logged out`
    })
})

module.exports = router;