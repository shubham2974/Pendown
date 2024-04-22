import { useContext, useEffect, useState } from 'react';
import LogoImage from '../images/logo.png';
import AppContext from './AppContext';
import './NavigationBar.css';
import { LoginModal } from '../utils/LoginModal';
import AccountImg from '../images/account.png';
import axios from 'axios';
import Cookies from 'js-cookie';

export function NavigationBar(){
    const [activeTab, setActiveTab] = useState('Home')
    console.log('Navbar')
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
    const { openModal, setOpenModal, username, setUsername } = useContext(AppContext);
    // const [openModal, setOpenModal] = useState(false)
    const [mode, setMode] = useState()
    const [right_nav_div, setRightNavDiv] = useState('Login')

    useEffect(()=>{
        const cookieUsername = Cookies.get('username');
        if (cookieUsername) {
            // Decode the JWT token
            // const decodedToken = parseJwt(token);
            // console.log(decodedToken)
            // Set the username state
            setUsername(cookieUsername);
            setRightNavDiv('Logout')
        }else {
            console.log('No token found in cookies'); // Log if no token found
        }
    }, [])

    async function AccountLogout(){
        try{
            const logout = await axios.post(`http://localhost:3000/account/logout`,{}, {
                withCredentials: true
            })
            console.log(logout)
            if(logout.status === 200){
                setRightNavDiv('Login')
            }
        }catch(error){
            console.log(error)
        }
    }
    return (
        <div className="right_nav">
            {
                right_nav_div === 'Login' ? 
                <div className="nav_login">
                    <Tabs task={() => {setOpenModal(true); setMode('login')}} heading={"Login"} setActiveTab={setActiveTab} activeTab={activeTab}/>
                    <Button task={() => {setOpenModal(true); setMode('signup')}} heading={"Sign up"}/>
                    <LoginModal mode={mode} open={openModal} onClose={()=> setOpenModal(false)} setRightNavDiv={setRightNavDiv} setUsername={setUsername}/>
                </div>
                : 
                <div className="nav_logout">
                    <div className='accountContent'>
                        <img id='accountImg' src={AccountImg}/>
                        <span className='nav_heading'>{username}</span>
                    </div>
                    <Button task={()=>{AccountLogout()}} heading={"Logout"}/>
                </div>
            }
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

function Button({task, heading}){
    return (
        <div onClick={()=>{task();}} id='nav_button'>
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