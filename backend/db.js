const mongoose = require('mongoose');
const { array, any } = require('zod');

/*
[{ username: "Shubham",
password: "admin123",
posts: [{
    createdAt: "time",
    heading: "Confidence",
    sub_heading: "humans strongest weapon",
    body: "dummy lasdf nsdfluj hsdflkjh nsdlfkjsdf, asdlfkjsdf",
    hastags: ["Connect", "100DaysOfCode"],
    likes: counter,
    comment: ["This is good", "Loved It"],
    }]
},{ username: "Shubham",
    password: "admin123",
    posts: [{
        createdAt: "time",
        heading: "Confidence",
        sub_heading: "humans strongest weapon",
        body: "dummy lasdf nsdfluj hsdflkjh nsdlfkjsdf, asdlfkjsdf",
        hastags: ["Connect", "100DaysOfCode"],
        likes: counter,
        comment: ["This is good", "Loved It"],
    }]
},{

}
*/

mongoose.connect("mongodb+srv://admin:TodoDB@cluster0.ebni6sx.mongodb.net/pendown")
const postSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String, 
        required: true
    },
    postId: {
        type: String,
        unique: true,
        required: true,
    },
    heading: {
        type: String,
        required: true
    },
    subheading: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    hashtags: [String],
    likes: {
        type: Number
    },
    comments: [String]
})

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function(username) {
                return /[a-zA-Z]/.test(username) && /[0-9]/.test(username);
            },
            message: function(props) {
                return `${props.value} is not a valid username. Username must contain at least one letter and one number.`;
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(password) {
                return /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
            },
            message: function(props) {
                return `${props.value} is not a valid password. Password must contain at least one letter and one number.`;
            }
        }
    },
    posts: [postSchema]
})

const post = mongoose.model('post', postSchema);
const user = mongoose.model('user', userSchema);

module.exports = {
    user,
    post
}