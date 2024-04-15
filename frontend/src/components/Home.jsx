import './Home.css'
import { RightHomeItem } from './RightHomeItem';
import { LeftHomeItem } from './LeftHomeItem';
import { MidHomeItem } from './MidHomeItem';

export function Home(){
    return(
        <div className='Home'>
            <div className='Home_container'>
                <LeftHomeItem/>
                <MidHomeItem/>
                <RightHomeItem/>
            </div>
        </div>
    )
}

