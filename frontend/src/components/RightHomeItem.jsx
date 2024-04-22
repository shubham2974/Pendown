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
    const { username, setOpenModal } = useContext(AppContext);
    const [postBtnTxt, setPostBtnTxt] = useState('Post');
    const [postStatus, setPostBtn] = useState('postBtn')

    async function SendPostContent(){
        const heading = document.getElementById('PostHeading');
        const subheading = document.getElementById('PostSubheading');
        const body = document.getElementById('PostBody');
        const hashtags = document.getElementById('PostHashtags');
        const image = document.getElementById('PostImage');

        try{
            const postResult = await axios.post('http://localhost:3000/post/createpost/', {
                username: username,
                heading: heading.value,
                subheading: subheading.value,
                body: body.value,
                hashtags: hashtags.value.split(' '),
                imageURL: image.value
                }, {
                withCredentials: true
                })
            
            if(postResult.status == 201){
                setPostBtnTxt('Posted');
                setPostBtn('successPostBtn')
                setTimeout(()=>{
                    setPostBtn('postBtn')
                    setPostBtnTxt('Post');
                    
                }, 1000);
                
                setTimeout(()=>{
                    console.log("Clearing")
                    heading.value = '';
                    subheading.value = '';
                    body.value = '';
                    hashtags.value = '';
                    image.value = '';
                }, 1500)
            }
            
        }catch(error){
            console.log(error)
            setPostBtnTxt('Retry')
            setPostBtn('retryPostBtn')
            if(error.response.status === 401 && error.response.data && error.response.data.msg === 'Unauthorized'){
                setTimeout(()=>{
                    setOpenModal(true);
                    setPostBtn('postBtn')
                    setPostBtnTxt('Post');
                }, 500);
            }else{
                console.log(error)
            }
        }
        
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
                <div className='postBtnClass' id={postStatus} onClick={()=>SendPostContent()}>
                    {postBtnTxt}
                </div>
            </div>
        </div>
    )
}