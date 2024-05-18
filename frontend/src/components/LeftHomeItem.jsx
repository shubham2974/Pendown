import { useContext, useEffect, useState } from 'react';
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

function Trending(){
    const {setBlogs, hashtags, fetchPosts} = useContext(AppContext);
    const [activeTrending, SetTrending] = useState()
    async function GetAllPosts(name){
        // console.log(name)
        const feeds = await fetchPosts();
        // console.log(feeds.data.msg)
        const newFeeds = feeds.data.msg.filter((feed)=>{
            return feed.hashtags.includes(name)
        })
        setBlogs(newFeeds)
    }
    return(
        <div className='Trending'>
            <div className="TrendingHeadline">
                <span>Trendings</span>
            </div>
            <div className="Hashtags">
                <div className='TrendingSections'>Hashtags</div>
                {
                    hashtags.slice(0, 4).map((tag, index)=>{
                        return <Hashtag key={tag._id} task={(name) => {GetAllPosts(name); SetTrending(name)}} name={tag.hashtagName} countes={tag.count} category={'posts'} activeTrending={activeTrending}/>
                    })
                }
            </div>
            <div className="Profiles">
                <div className='TrendingSections'>Profiles</div>
                <Hashtag name={"@Wasim786"} countes={"284"} category={'views'}/>
                <Hashtag name={"@Naveen484"} countes={"198"} category={'views'}/>
                <Hashtag name={"@Aman123"} countes={"150"} category={'views'}/>
                <Hashtag name={"@Shubham29"} countes={"142"} category={'views'}/>
            </div>
        </div>
    )
}

function Hashtag({task, name, countes, category, activeTrending}){
    return (
        <div className="HashtagContent" id={activeTrending === name ? 'HashtagContentActive' : 'HashtagContentDeactive'} onClick={()=>{task(name);}}>
            <span id='HashtagName'>{name}</span>
            <div className='HashtagDetails'>
                <span id='HashtagCountes'>{countes}</span>
                <span id='HashtagCategory'>{category}</span>
            </div>
        </div>
    )
}