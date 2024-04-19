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
                {/* <div className='div1' style={{ gridColumn: order.left, border: "2px solid red"}}>Section 1</div>
                <div className='div2' style={{ gridColumn: order.mid}}>Section 2</div>
                <div className='div3' style={{ gridColumn: order.right}}>Section 3</div> */}
            </div>
        </div>
    )
}

