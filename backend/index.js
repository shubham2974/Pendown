const express = require('express');
const cors = require('cors');
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

    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomCharacter = characters[randomIndex];
    const postId = postPayload.username + randomCharacter;
    const newPost = {
        username: postPayload.username,
        postId: postId,
        heading: postPayload.heading,
        subheading: postPayload.subheading,
        body: postPayload.body,
        hashtags: postPayload.hashtags,
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
            msg: `Post: ${postId}: ${postPayload.heading} Created`
        })
    }else{
        res.status(400).json({
            msg: `${postPayload.username} Username Not Found`
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