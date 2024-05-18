const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { post } = require('./db');
const accountRoutes = require('./routes/accountURL');
const postRoutes = require('./routes/postsURL');
const cookieJWTAuth = require('./middlewares/cookieJWTAuth');
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use("*",cors({
    credentials: true,
    origin: 'http://localhost:5173',
}))
//use Account routes
app.use('/account', accountRoutes);

//use Post routes
app.use('/post', cookieJWTAuth, postRoutes);

app.get('/home', cookieJWTAuth, async (req, res)=>{
    const feedPayload = req.user;
    console.log(feedPayload)
    const feeds = await post.find();
    if(feeds){
        res.status(200).json({
            msg: feeds
        })
    } else{
        res.status(400).json({
            msg: `Error Getting Feeds from database`
        })
    }
})
app.listen(3000);