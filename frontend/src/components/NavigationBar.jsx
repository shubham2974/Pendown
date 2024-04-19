import { useContext, useState } from 'react';
import LogoImage from '../images/logo.png';
import AppContext from './AppContext';
import './NavigationBar.css';

export function NavigationBar(){
    const [activeTab, setActiveTab] = useState('Home')
    return (
        <div className='nav_bar'>
            <LeftNav/>
            <MidNav setActiveTab={setActiveTab} activeTab={activeTab}/>
            <RightNav setActiveTab={setActiveTab} activeTab={activeTab}/>
        </div> 
    )
}

function LeftNav(){
    return (
        <div className="left_nav">
            <img width={"80"} src={LogoImage} alt="Pendown"/>
            <p id='logoname'></p>
        </div>
    )
}

function MidNav({setActiveTab, activeTab}){
    const { fetchData, focusSection } = useContext(AppContext);

    return (
        <div className="mid_nav">
            <Tabs task={() => { fetchData(); focusSection("Home"); }} heading={"Home"} setActiveTab={setActiveTab} activeTab={activeTab}/>
            <Tabs task={() => { focusSection("Trending"); }} heading={"Trending"} setActiveTab={setActiveTab} activeTab={activeTab}/>
            <Tabs task={() => { focusSection("Blog"); }} heading={"Blog"} setActiveTab={setActiveTab} activeTab={activeTab}/>
            <Tabs task={() => {}} heading={"Our Story"} setActiveTab={setActiveTab} activeTab={activeTab}/>
            <Tabs task={() => {}} heading={"Contact"} setActiveTab={setActiveTab} activeTab={activeTab}/>
        </div>
        )
}

function RightNav({setActiveTab, activeTab}){
    return (
        <div className="right_nav">
            <Tabs task={() => {}} heading={"Log in"} setActiveTab={setActiveTab} activeTab={activeTab}/>
            <Button heading={"Sign up"}/>
        </div>
    )
}

function Tabs({task, heading, setActiveTab, activeTab}){
    return (
        <p onClick={()=>{task(); setActiveTab(heading)}} className='nav_heading' id={activeTab === heading ? 'nav_heading_active' : 'nav_heading_inactive'}>
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