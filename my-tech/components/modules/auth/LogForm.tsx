import styles from './LogForm.module.css'
import { MouseEvent, useState, ChangeEvent, FormEventHandler } from 'react';
import { CancelButton, SubmitButton } from '../../constants/buttons/Button';
import CheckButton from '../../constants/buttons/CheckButton';
import { useRouter } from 'next/navigation';
import { AuthPropType, ErrorResponse, TokenResponse, elemntStyle, LogType } from './types/authtypes';
import api from '@/configs/axios.config';
import { saveCookie } from '@/utils/authentication/cookieHandling';



const LogForm = ({setDecide ,notifObject , setNotifObject}:AuthPropType) => {
   const [data , setData]  = useState<LogType>({
    info:"",
    password:"",
    remember:false,
   })

   const router = useRouter()

  const changeHandler:FormEventHandler = (e: ChangeEvent<HTMLInputElement>):void=>{
    const {name , value} = e.target 
    setData({...data , [name]: value })
  }

  const loginHandler =(e: MouseEvent)=>{
    e.preventDefault()
    api.post('/auth/login' , data).then(({data}:{data:TokenResponse})=>{
      const tokens = data.data.tokens
      saveCookie(tokens?.accessToken , tokens?.refreshToken)
      setNotifObject({type:'success' , message:"welcome back" , triggered:!notifObject.triggered})
      setTimeout(() => {
        router.refresh()
        router.push('/')
      }, 2000);
    }).catch((err:ErrorResponse)=>{ 
      setNotifObject({
      type:"error",
      message:err?.response?.data?.data?.message || 'something went wrong try again later',
       triggered:!notifObject.triggered})
      console.log(err);
    })

  }
  const cancelHandler = (e:MouseEvent)=>{
    e.preventDefault()
    setDecide({})
  }

  const rememberStyle:elemntStyle = {
    '--borderColor':data.remember ? 'chartreuse' : "pink"
  }

    return (
      <form onChange={changeHandler}  noValidate className={styles.formContainer}>
        <div className={styles.svg}>
           <img src='/images/techSvg.png' />
           <h4>welcome back</h4>
           <h3>Login form</h3>
        </div>
      <div className={styles.inputContainer}>
        <input   id='info' name='info' required type='text' />
        <label htmlFor='info'>email or mobile</label>
      </div>

      <div className={styles.inputContainer}>
        <input  id='pass' name='password' required type='password' />
        <label htmlFor='pass'>password</label>
      </div>
      <div style={rememberStyle}  className={styles.remember}>
        <label >Remeber me: </label> <CheckButton data={data} setData={setData}/>
      </div>
      <div className={styles.buttonContainer}>
      <CancelButton text='back' handler={cancelHandler}/>
      <SubmitButton text='Login' handler={loginHandler}/>
      </div>
    </form>

    );
};

export default LogForm;