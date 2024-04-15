import LogoImage from '../images/logo.png';
import { MidHomeItem } from './MidHomeItem';
import './NavigationBar.css';

export function NavigationBar(){

    return (
        <div className='nav_bar'>
            <LeftNav/>
            <MidNav/>
            <RightNav/>
        </div> 
    )
}

function LeftNav(){
    return (
        <div className="left_nav">
            <img width={"80"} src={LogoImage} alt="Pendown"/>
            <p id='logoname'>Pendown</p>
        </div>
    )
}

function MidNav(){
    return (
        <div className="mid_nav">
            <Tabs task={"none"} heading={"Home"}/>
            <Tabs task={"none"} heading={"Trending"}/>
            <Tabs task={"none"} heading={"Blog"}/>
            <Tabs task={"none"} heading={"Our Story"}/>
            <Tabs task={"none"} heading={"Contact"}/>
        </div>
        )
}

function RightNav(){
    return (
        <div className="right_nav">
            <Tabs heading={"Log in"}/>
            <Button heading={"Sign up"}/>
        </div>
    )
}

function Tabs({task, heading}){
    function performTask(){
        alert("Hi Boss")
    }
    return (
        <p onClick={()=>{performTask()}} id='nav_heading'>
            {heading}
        </p>
    )
}

function Button({heading}){
    return (
        <div id='nav_button'>
            <p style={{
                padding:"10px",
                backgroundColor: "#444BFF",
                borderRadius: "10px"
            }}>
                {heading}
            </p>
        </div>
    )
}