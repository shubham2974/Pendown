import consistent from '../images/consistent.jpg';
import confidence from '../images/confidence.jpg';
import poverty from '../images/poverty.jpg';
import learning from '../images/learning.jpg';
import axios from "axios"
import React, { useEffect, useState, memo } from 'react';
import './MidHomeItem.css'

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

export function MidHomeItem(){
    const [blogs, setBlogs] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:3000/home`)
        .then((res)=>{
            const shuffledBlogs = shuffleArray(res.data.msg);
            setBlogs(shuffledBlogs)
        })
    },[]);
    const images = [consistent, confidence, learning, poverty];
    return (
        <div className='MidHomeItem'>
            {
                blogs.map((blog, index) =>{
                    console.log(blog)
                    const randomImage = images[Math.floor(Math.random() * images.length)]
                    return <Card key={blog["_id"]} blog_data={blog} image={randomImage}/>
                })
            }
        </div>
    )
}

function Card({blog_data, image}){
    // const { heading, subheading, body} = blog_data;
    return(
        <div className='Card'>
            <div className="CardImage_Container">
                <img id='CardImage' src={image} alt={`${blog_data["heading"]} Image`} />
            </div>
            <div id='CardContent_Container'>
                <p id='CardHeading'>{blog_data["heading"]}</p>
                <p id='CardSubheading'>{blog_data["subheading"]}</p>
                <p id='CardBody'>{blog_data["body"]}</p>
                <p id='ReadMore'>Read More..</p>
                <p id='CardAuthor'>@{blog_data["username"]}</p>
            </div>
        </div>
    )
}