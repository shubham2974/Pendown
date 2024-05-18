import axios from 'axios';
import './LoginModal.css';
import { ResizableText } from './ResizableText';
import { useContext, useState } from 'react';
import AppContext from '../components/AppContext';


export function LoginModal({mode , open, onClose, setRightNavDiv, setUsername}){
    if(!open) return null
    const { fetchData, fetchHashtags } = useContext(AppContext);
    const [loginStatus, setLoginStatus] = useState('userBtnLogin')
    const [loginText, setLoginText] = useState(mode === 'signup' ? 'Sign Up' : 'Login');
    
    async function createAccount(){
        const username = document.getElementById('userUsername');
        const password = document.getElementById('userPassword');
        const email = document.getElementById('userEmail') ? document.getElementById('userEmail').value : null;
        try{

            const endpoint = mode === 'signup' ? '/signup' : '/login';
            const accountDetails = await axios.post(`http://localhost:3000/account${endpoint}`, {
                username: username.value,
                password: password.value,
                email,
            },{
                withCredentials: true
            })
    
            console.log(accountDetails);
            if (accountDetails.status === 201 || accountDetails.status === 200){
                setLoginStatus("userBtnSuccess")
                setLoginText(mode === 'signup' ? 'Account Created' : 'Logging In');
                setTimeout(() => {
                    setRightNavDiv('Logout')
                    setUsername(username.value)
                    onClose()
                }, 1000);
                fetchData();
                fetchHashtags()
            }
        } catch(error){
            console.log(error.response)
            setLoginStatus('userBtnFailed')
            if (error.response && error.response.data && error.response.data.msg){
                setLoginText(error.response.data.msg);
                setTimeout(() => {
                    setLoginText(mode === 'signup' ? 'Retry': 'Login');
                    setLoginStatus('userBtnLogin')
                }, 2000);
            }else{
                setLoginText(mode === 'signup' ? 'Retry' : 'Login');
            }

        }
    }
    return(
        <div className='overlay'>
            <div className="modalContainer">
                <span className="closeBtn" onClick={onClose} style={{cursor: "pointer"}}>X</span>
                <div className='PostHeadline'>
                    <span>{mode === 'signup' ? 'Create New Account' : 'Login'}</span>
                </div>
                <div className='modalContent'>
                    <ResizableText className='AccountText' id='userUsername' placeholder='Username*'/>
                    <ResizableText className='AccountText' id='userPassword' placeholder='Password*'/>
                    <ResizableText className='AccountText' id='userEmail' placeholder='Email'/>
                </div>
                <div className="modalContentBtn">
                    <div className='userBtn' id={loginStatus} onClick={()=>createAccount()}>
                        {loginText}
                    </div>
                </div>
            </div>
        </div>
    )
}