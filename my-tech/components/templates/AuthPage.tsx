'use client'

import { useState } from 'react';
import styles from './AuthPage.module.css'
import { FiLogIn } from "react-icons/fi";
import { GiArchiveRegister } from "react-icons/gi";
import { TbPasswordUser } from "react-icons/tb";

// import OtpForm from '../modules/authModules/OtpForm';
// import GoogleSignButton from '../modules/authModules/GoogleSignButton';
import SignForm from '../modules/auth/SignForm';
import LogForm from '../modules/auth/LogForm';
import Notification from '../constants/Notfications&loaders/Notification';
import { decideType } from '../modules/auth/types/authtypes';
import OtpForm from '../modules/auth/OtpForm';



const AuthPage = () => {
    const [decide  , setDecide] = useState<decideType>({
        showLogin:false, 
        showSignUp:false,
        showOtp : false,
    })
    const [notifObject , setNotifObject] = useState({
        message:"" ,
        type:"",
        triggered: false,
      })
    

    return (
        <div className={styles.container}>

            {decide.showLogin ? <LogForm notifObject ={notifObject}  setNotifObject ={setNotifObject} setDecide= {setDecide} /> 
            : decide.showSignUp ? <SignForm notifObject ={notifObject} setNotifObject ={setNotifObject} setDecide= {setDecide}  /> 
            : decide.showOtp ? <OtpForm notifObject ={notifObject} setNotifObject ={setNotifObject}  setDecide= {setDecide} /> 
            :    
             <div className={styles.buttonContainer}>
                <h5>registeration option</h5>
                <button onClick={()=> setDecide({showSignUp:true})}>Sign up <GiArchiveRegister /> </button>
                <button onClick={()=>setDecide({showLogin:true})}>Log in <FiLogIn /> </button>
                <button onClick={()=>setDecide({showOtp: true})}> One-time password Login<TbPasswordUser/> </button>
                {/* <GoogleSignButton /> */}

            </div>
             }
            <Notification type={notifObject.type} message={notifObject.message} triggered={notifObject.triggered} />
        </div>
    );
};

export default AuthPage;
