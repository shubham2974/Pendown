// import consistent from '../images/consistent.jpg';
// import confidence from '../images/confidence.jpg';
// import poverty from '../images/poverty.jpg';
// import learning from '../images/learning.jpg';
import React, { useEffect, useState, memo, useContext } from 'react';
import AppContext from './AppContext';
import './MidHomeItem.css'
import axios from 'axios';

const getTagId = (focus) => {
    let id;
    
    if (focus === 'Home' || focus === 'LeftHome'){
        id = 'MidHome';
    } else {
        id = 'FuseMidHome';
    }
    return id;
}

export function MidHomeItem({ style }){
    const { blogs, focus, fetchData } = useContext(AppContext);
    const tagId = getTagId(focus);
    useEffect(()=>{
        fetchData();
    },[]);
    return (
        <div className='MidHomeItem' id={tagId} style={style}>
            {
                blogs.map((blog, index) =>{
                    console.log(blog)
                    {/* const randomImage = images[Math.floor(Math.random() * images.length)] */}
                    return <Card key={blog["_id"]} blog_data={blog}/>
                })
            }
        </div>
    )
}

function Card({blog_data}){
    const [likes, setLikes] = useState(blog_data['likes'])
    const [liked, likeStatus] = useState(false)
    async function likeDislikePost(){
        var like = blog_data["likes"]
        if(!liked){
            like = like + 1;
            likeStatus(true);
        }else{
            like = like;
            likeStatus(false);
        }
        try{
            const { data } = await axios({
                method: 'put',
                url: `http://localhost:3000/post/updatepost/`,
                withCredentials: true,
                data: {
                    _id: blog_data["_id"],
                    likes: like
                }
                
            });

            setLikes(data.updateData.likes)
        }
        catch(err){
            console.log(err.response.status)
            console.log(err.response.data.msg)
        }
    }
    return(
        <div className='Card'>
            <div className="CardImage_Container">
                <img id='CardImage' src={blog_data["imageURL"]} alt={`${blog_data["heading"]} Image`} />
            </div>
            <div id='CardContent_Container'>
                <p id='CardHeading'>{blog_data["heading"]}</p>
                <p id='CardSubheading'>{blog_data["subheading"]}</p>
                <p id='CardBody'>{blog_data["body"]}</p>
                <p id='ReadMore'>Read More..</p>
                <div id='PostDetails'>
                    <div>
                        <span id='CardAuthor'>@{blog_data["username"]}</span>
                    </div>
                    <div id='Likes' onClick={()=>{likeDislikePost()}}>
                        <span id='Likes'>🩷</span>
                        <span id='totalLikes'>{likes}</span>
                    </div>
                    <div id='Comments'>
                        <span id='Comment'>🗨️</span>
                        <span id='totalComments'>{blog_data["comments"].length}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}