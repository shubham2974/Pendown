import { useContext, useEffect } from 'react';
import './LeftHomeItem.css'
import AppContext from './AppContext';

const getTagId = (focus) => {
    let id;
    
    if (focus === 'Home' || focus === 'LeftHome') {
        id = 'LeftHome';
    } else {
        id = 'FuseLeftHome';
    }
    return id;
}
export function LeftHomeItem({style}){
    const { focus } = useContext(AppContext);
    const tagId = getTagId(focus);
    return (
        <div className='LeftHomeItem' id={tagId} style={style}>
            <Trending/>
        </div>
    )    
}

function checkout(blogs){
    blogs.map((blog)=>{
        console.log(blog)
    })
}

function Trending(){
    const {blogs} = useContext(AppContext);
    checkout(blogs)
    return(
        <div className='Trending'>
            <div className="TrendingHeadline">
                <span>Trendings</span>
            </div>
            <div className="Hashtags">
                <div className='TrendingSections'>Hashtags</div>
                <Hashtag name={"100DaysOfCode"} countes={"114"} category={'posts'}/>
                <Hashtag name={"WebDevelopment"} countes={"98"} category={'posts'}/>
                <Hashtag name={"SoftwareEngineering"} countes={"86"} category={'posts'}/>
                <Hashtag name={"Pendown"} countes={"48"} category={'posts'}/>
            </div>
            <div className="Profiles">
                <div className='TrendingSections'>Profiles</div>
                <Hashtag name={"Wasim786"} countes={"284"} category={'views'}/>
                <Hashtag name={"Naveen484"} countes={"198"} category={'views'}/>
                <Hashtag name={"Aman123"} countes={"150"} category={'views'}/>
                <Hashtag name={"Shubham29"} countes={"142"} category={'views'}/>
            </div>
        </div>
    )
}

function Hashtag({name, countes, category}){
    return (
        <div className="HashtagContent">
            <span id='HashtagName'>#{name}</span>
            <div className='HashtagDetails'>
                <span id='HashtagCountes'>{countes}</span>
                <span id='HashtagCategory'>{category}</span>
            </div>
        </div>
    )
}