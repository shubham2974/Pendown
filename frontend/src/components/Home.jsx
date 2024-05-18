import './Home.css'
import { RightHomeItem } from './RightHomeItem';
import { LeftHomeItem } from './LeftHomeItem';
import { MidHomeItem } from './MidHomeItem';
import AppContext from './AppContext';
import { useContext, useState } from 'react';

export function Home(){
    const { focusSection, order} = useContext(AppContext);
    console.log(order.left, order.mid, order.right);
    return(
        <div className='Home'>
            <div className='Home_container'>
                <LeftHomeItem style={{gridColumn: order.left}}/>
                <MidHomeItem style={{gridColumn: order.mid}}/>
                <RightHomeItem style={{gridColumn: order.right}}/>
            </div>
        </div>
    )
}

