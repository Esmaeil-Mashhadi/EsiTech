import styles from './LogForm.module.css'
import { useState } from 'react';
import { CancelButton, SubmitButton } from '../../constants/buttons/Button';
import CheckButton from '../../constants/buttons/CheckButton';
import api from '@/config/axios.config';
import { saveCookie } from '@/utils/authentication/cookieHandling';
import { useRouter } from 'next/navigation';

const LogForm = ({setDecide ,notifObject , setNotifObject}) => {
   const [data , setData]  = useState({
    info:"",
    password:"",
    remember:false
   })

   const router = useRouter()

  const changeHandler = (e)=>{
    const {name , value} = e.target
    setData({...data , [name]: value })
  }

  const loginHandler =(e)=>{
    e.preventDefault()
    api.post('/auth/login' , data).then(({data:{data:{tokens}}})=>{
      saveCookie(tokens?.accessToken , tokens?.refreshToken)
      setNotifObject({type:'success' , message:"welcome back" , triggered:!notifObject.triggered})
      setTimeout(() => {
        router.refresh()
        router.push('/')
      }, 2000);
    }).catch((err)=>{ 
      setNotifObject({type:"error", message:err.response.data.data.message , triggered:!notifObject.triggered})
      console.log(err);
    })

    
  }
  const cancelHandler = (e)=>{
    e.preventDefault()
    setDecide({})
  }

    return (
      <form onChange={changeHandler} noValidate className={styles.formContainer}>
        <div className={styles.svg}>
           <img src='/images/techSvg.png' />
           <h4>welcome back</h4>
           <h3>Login form</h3>
        </div>
      <div className={styles.inputContainer}>
        <input id='info' name='info' required type='text' />
        <label htmlFor='info'>email or mobile</label>
      </div>

      <div className={styles.inputContainer}>
        <input id='pass' name='password' required type='password' />
        <label htmlFor='pass'>password</label>
      </div>
      <div style={{'--borderColor':data.remember ? 'chartreuse' : "pink"}}  className={styles.remember}>
        <label >Remeber me: </label> <CheckButton data={data} setData ={setData}/>
      </div>
      <div className={styles.buttonContainer}>
      <CancelButton text='back' Handler={cancelHandler}/>
      <SubmitButton text='Login' Handler={loginHandler}/>
      </div>
    </form>

    );
};

export default LogForm;