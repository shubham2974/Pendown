import { useState } from 'react';
import { ResizableText } from '../utils/ResizableText';
import './RightHomeItem.css'
import axios from "axios"

export function RightHomeItem(){
    return (
        <div className='RightHomeItem'>
            <CreatePost/>
        </div>
    )
}

function CreatePost(){
    const [isPosted, setIsPosted] = useState(false);
    const users = ['Shubham29', 'Aman123', 'Naveen484']
    async function SendPostContent(){
        const heading = document.getElementById('PostHeading').value
        const subheading = document.getElementById('PostSubheading').value
        const body = document.getElementById('PostBody').value
        const hashtags = document.getElementById('PostHashtags').value.split(' ')
        axios.post('http://localhost:3000/post', {
            username: users[Math.floor(Math.random() * users.length)],
            heading: heading,
            subheading: subheading,
            body: body,
            hashtags: hashtags
          })
          .then((res)=>{
            alert(res.data.msg);
            alert(res.status);
            console.log(res);
          })
          .then((err)=>{
            alert(err)
          })
        setIsPosted(true);

        // Reset to "Post" after a short delay (e.g., 1 second)
        setTimeout(() => {
            // Clear all Fields
            setIsPosted(false);
        }, 2000);
    }

    return(
        <div className='CreatePost'>
            <div className='PostHeadline'>
                <span>Craft your thoughts</span>
            </div>
            <div className='PostContent'>
                <ResizableText className='PostText' id='PostHeading' placeholder='Heading'/>
                <ResizableText className='PostText' id='PostSubheading' placeholder='Subheading'/>
                <ResizableText className='PostText' id='PostBody' placeholder='Type your content...'/>
                <ResizableText className='PostText' id='PostHashtags' placeholder='Hashtags'/>
            </div>
            <div className='PostFooter'>
                <ResizableText className='PostText' id='PostImage' placeholder='Paste Image URL'/>
                <div onClick={()=>SendPostContent()}>
                    {isPosted ? "Posted" : "Post"}
                </div>
            </div>
        </div>
    )
}