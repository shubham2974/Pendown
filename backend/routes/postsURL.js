const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { createPost } = require('../types');
const { user, post, hashtag } = require('../db');

router.post("/createpost", async (req, res)=>{
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
    
    console.log("Zod Authentication passed")
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
    
    var hashTagResult = true
    for (const tag of postPayload.hashtags) {
        try {
            // Check if the hashtag exists
            const checkTag = await hashtag.exists({ hashtagName: tag });
    
            if (!checkTag) {
                // If the hashtag doesn't exist, create it
                await hashtag.create({
                    _id: new mongoose.Types.ObjectId(),
                    hashtagName: tag,
                    count: 1
                });
            } else {
                // If the hashtag exists, update the count
                await hashtag.findOneAndUpdate(
                    { hashtagName: tag },
                    { $inc: { count: 1 } }
                );
            }
        } catch (error) {
            console.error('Error processing hashtag:', error);
            hashTagResult = false
        }
    }

    if(userResult && postResult && hashTagResult){
        res.status(201).json({
            msg: `Post: ${postPayload.heading} Posted`
        })
    }else{
        res.status(400).json({
            msg: `${postPayload.username} Username Not Found`
        })
    }
})

router.put('/updatepost', async (req, res)=>{
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


router.get('/hashtags', async(req, res)=>{
    const hashtagsPayload = req.user;
    console.log(hashtagsPayload);
    const hashtags = await hashtag.find();
    if(hashtags){
        const sortedHashtags = await hashtag.find().sort({ count: -1 });
        res.status(200).json({
            msg: sortedHashtags
        })
    }else{
        res.status(400).json({
            msg: 'Error getting Hashtags from database'
        })
    }
})
module.exports = router