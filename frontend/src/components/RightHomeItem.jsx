import { useContext, useState } from 'react';
import { ResizableText } from '../utils/ResizableText';
import './RightHomeItem.css'
import axios from "axios"
import AppContext from './AppContext';

const getTagId = (focus) => {
    let id;
    
    if (focus === 'Home' || focus === 'RightHome') {
        id = 'RightHome';
    } else {
        id = 'FuseRightHome';
    }
    return id;
}

export function RightHomeItem({style}){
    const { focus } = useContext(AppContext);
    const tagId = getTagId(focus);
    return (
        <div className='RightHomeItem' id={tagId} style={style}>
            <CreatePost/>
        </div>
    )
}

function CreatePost(){
    const [isPosted, setIsPosted] = useState(false);
    const users = ['Shubham29', 'Aman123', 'Naveen484', 'Aditya99']

    async function SendPostContent(){
        const heading = document.getElementById('PostHeading');
        const subheading = document.getElementById('PostSubheading');
        const body = document.getElementById('PostBody');
        const hashtags = document.getElementById('PostHashtags');
        const image = document.getElementById('PostImage');

        await axios.post('http://localhost:3000/post', {
            username: users[Math.floor(Math.random() * users.length)],
            heading: heading.value,
            subheading: subheading.value,
            body: body.value,
            hashtags: hashtags.value.split(' '),
            imageURL: image.value
        })
        .then(async (res) => {
            if(res.status == 201){
                alert(res.data.msg);
                console.log(res);
        
                setIsPosted(true);
                setTimeout(()=>{
                    setIsPosted(false);
                }, 1000);
            
            }
        })
        .catch((err)=>{
            alert(err);
        });

        heading.value = '';
        subheading.value = '';
        body.value = '';
        hashtags.value = '';
        image.value = '';
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