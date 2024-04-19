const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { createPost, createAccount, updatePost } = require('./types');
const { user, post } = require('./db');
const app = express()
app.use(express.json())
app.use(cors());

app.post('/account', async (req, res)=>{
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
    console.log("user Zod passed")
    //If Account Validation is successfull push the account in MongoDB, 
    const result = await user.create({
        username: accountPayload.username,
        password: accountPayload.password,
        posts: []
    })

    console.log(result)
    if (result){
        res.status(201).json({
            msg: `Username: ${accountPayload.username} Account Created`
        })
    }else{
        res.status(400).json({
            msg: `${result.error}`
        })
    }
})

app.post("/post", async (req, res)=>{
    const postPayload = req.body;
    console.log(postPayload)
    const parsePost = createPost.safeParse(postPayload);
    if(!parsePost.success){
        const errorMessages = parsePost.error.errors.map(error => {
            return `${error.message} for field '${error.path.join('.')}'`;
        });
        res.status(400).json({
            msg: 'Please correct the following errors:',
            erros: errorMessages
        });
        return;
    }
    
    console.log("user Zod passed")
    // if Post Validation is successfull push the post in MongoDB account, 
    const checkUsername = await user.exists({
        username: `${postPayload.username}`  
    })

    if(checkUsername == null){
        res.status(400).json({
            msg: `${postPayload.username} Username Not Found`
        })
        return;
    }

    const customId = new mongoose.Types.ObjectId();
    const newPost = {
        _id: customId,
        username: postPayload.username,
        heading: postPayload.heading,
        subheading: postPayload.subheading,
        body: postPayload.body,
        hashtags: postPayload.hashtags,
        imageURL: postPayload.imageURL,
        likes: 0,
        comments: []
    }
    //Add post in Post database
    const postResult = await post.create(newPost)
    //Add post in User database
    const updatePosts = { $push: {posts: newPost}}
    const userResult = await user.findOneAndUpdate({
        username: postPayload.username
    }, updatePosts)

    if(userResult && postResult){
        res.status(201).json({
            msg: `Post: ${postPayload.heading} Posted`
        })
    }else{
        res.status(400).json({
            msg: `${postPayload.username} Username Not Found`
        })
    }
})

app.put('/post_update', async (req, res)=>{
    const updatePayload = req.body;
    console.log(req.body)
    const {_id, ...updateData} = updatePayload
    const updateResult = await post.findOneAndUpdate({
        _id: _id
    }, updateData,
    { new: true})

    if(updateResult){
        res.status(201).json({
            msg: `Updated ${updatePayload._id}`,
            updateData: updateResult
        })
    }else{
        res.status(400).json({
            msg: `Bad Request, check it why ${updateResult}`
        })
    }
})

app.get('/home', async (req, res)=>{
    const feedPayload = req.body;
    console.log(feedPayload)
    const feeds = await post.find();
    if(feeds){
        const myfeeds = feeds.filter(feed =>{
            return feed.username != feedPayload.username;
        })
        res.status(200).json({
            msg: myfeeds
        })
    }
})
app.listen(3000);