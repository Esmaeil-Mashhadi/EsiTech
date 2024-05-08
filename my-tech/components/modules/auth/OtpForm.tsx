
import styles from './LogForm.module.css'
import { ChangeEvent, FormEventHandler, MouseEventHandler, useState } from 'react';
import { CancelButton, SubmitButton } from '../../constants/buttons/Button';
import CheckButton from '../../constants/buttons/CheckButton';
import { saveCookie } from '@/utils/authentication/cookieHandling';
import { useRouter } from 'next/navigation';
import { AuthPropType, ErrorResponse, LogType, OtpProps, elemntStyle } from './types/authtypes';
import api from '@/configs/axios.config';
import { AxiosResponse } from 'axios';

const OtpForm = ({setDecide , setNotifObject ,notifObject}:AuthPropType) => {
   const [data , setData]  = useState<LogType>({
    mobile:"",
    code:"", 
    remember:false
   })

   const [showCodeInput , setShowCodeInput] = useState(false)
   const router = useRouter()

  const changeHandler:FormEventHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    const {name , value} = e.target 
    setData({...data , [name]: value})
  }

 
  const loginHandler:MouseEventHandler = (e)=>{
    e.preventDefault()
    api.post("/auth/OTP" , data).then((res:AxiosResponse)=>{
      if(res?.data?.tokens){
        const {accessToken , refreshToken} = res?.data.tokens
        saveCookie(accessToken , refreshToken)
         setNotifObject({
          message:"welcome back" , type:"success" , triggered:!notifObject.triggered
         })
         router.refresh() 
         setTimeout(() => {
           router.push('/')
         }, 2000);
      }
      setShowCodeInput(true)
      setData({...data, code: res?.data.code})
    }).catch((err:ErrorResponse)=>{
      setNotifObject({
        message:err?.response?.data?.data?.message || 'something went wrong try again later',
         type:"error" , 
        triggered:!notifObject.triggered})
      console.log(err.response.data); 
    })
  }

  const cancelHandler:MouseEventHandler = (e)=>{
    e.preventDefault()
    setDecide({})
  }
  
  const rememberStyle:elemntStyle = {
    '--borderColor':data.remember ? 'chartreuse' : "pink"
  }

    return (
      <form onChange={changeHandler} noValidate className={styles.formContainer}>
        <div className={styles.svg}>
           <img src='/images/techSvg.png' />
           <h4>welcome</h4>
        </div>

      <div className={styles.inputContainer}>
        <input id='mobile' name='mobile' required type='text' />
        <label htmlFor='mobile'> mobile</label>
      </div>
      <div style={showCodeInput ? {opacity:1, pointerEvents:"all"} : {opacity:.5 , pointerEvents:"none"}} className={styles.inputContainer}>
          <input value={(data as OtpProps).code} id='code' name='code' required type='text' />
          <label htmlFor='code'>code</label>
        </div>

    
      <div style={rememberStyle}  className={styles.remember}>
        <label >Remeber me: </label> <CheckButton data={data} setData ={setData}/>
      </div>

      <div className={styles.buttonContainer}>
      <CancelButton text='back' handler={cancelHandler}/>
      <SubmitButton text={(data as OtpProps).code ? 'Login' : 'send Code'} handler={loginHandler}/>
      </div>
    </form>

    );
};

export default OtpForm;


