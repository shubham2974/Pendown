const zod = require('zod');

/*
[{ username: "Shubham",
password: "admin123",
posts: [{
    createdAt: "time",
    post_id: "",
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
        post_id: "",
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

function validateUserAndPass(value){
    return /[a-zA-Z]/.test(value) && /\d/.test(value);
}

const createAccount = zod.object({
    username: zod.string().refine(value => validateUserAndPass(value), {
        message: 'Username must contain at least one letter and one number'
    }),
    password: zod.string().refine(value => validateUserAndPass(value), {
        message: 'Password must contain at least one letter and one number'
    })
})

const loginAccount = zod.object({
    username: zod.string().refine(value => validateUserAndPass(value), {
        message: 'Username must contain at least one letter and one number'
    }),
    password: zod.string().refine(value => validateUserAndPass(value), {
        message: 'Password must contain at least one letter and one number'
    })
})

const createPost = zod.object({
    username: zod.string().refine(value => validateUserAndPass(value), {
        message: 'Username must contain at least one letter and one number'
    }),
    heading: zod.string(),
    subheading: zod.string(),
    body: zod.any(),
    hashtags: zod.array(zod.string()).min(1, "Please provide atlease one hashtags"),
    imageURL: zod.string()
})

const updatePost = zod.object({
    username: zod.string().refine(value => validateUserAndPass(value), {
        message: 'Username must contain at least one letter and one number'
    }),
    heading: zod.string(),
    subheading: zod.string(),
    body: zod.any(),
    hashtags: zod.array(zod.string()).min(1, "Please provide atlease one hashtags"),
    imageURL:zod.string()
})

const addComment = zod.object({
    post_id: zod.string(),
    body: zod.string()
})

module.exports = {
    createAccount,
    loginAccount,
    createPost,
    updatePost,
    addComment
}