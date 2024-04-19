import { useContext } from 'react';
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
        <div className='LeftHomeItem' id={tagId} style={style}>Trending Hashtags</div>
    )    
}
