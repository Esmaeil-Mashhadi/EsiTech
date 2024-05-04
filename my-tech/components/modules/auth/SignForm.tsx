import { useEffect, useState } from 'react';
import styles from './SignForm.module.css'

import Terms from './Terms';
//icons
import { RiEyeCloseLine } from "react-icons/ri";
import { HiEye } from "react-icons/hi2";
import formValidation from '@/utils/authentication/formValidation';
import { dynamicFormStyleHandler } from '@/utils/dynamicStyles/Form';
import { CancelButton, SubmitButton } from '../../constants/buttons/Button';
import api from '@/config/axios.config';
import { saveCookie } from '@/utils/authentication/cookieHandling';
import { useRouter } from 'next/navigation';


const SignForm = ({ setDecide , setNotifObject , notifObject}) => {
  const [terms,  setTerms] = useState(false)
  const [showPass , setShowPass] = useState(false)
  const [submit , setSubmit] = useState(false)

  const [formData , setFormData] = useState({
    email:"",
    password:"",
    confirm :"",
    mobile:"",
    check:false ,
  })

  const [errors , setErrors] = useState({})
  const router = useRouter()
  const changeHandler = (e)=>{
    const {value , name} = e.target
    if(name == 'check'){
      setFormData({
        ...formData , [name] : e.target.checked
      })
    }else{
      setFormData({
        ...formData,
        [name] :value
      })
    }
  }


  const signUpHandler = async(e:MouseEvent)=>{
    e.preventDefault()
    setSubmit(true)
    setTimeout(() => {
      setSubmit(false)
    }, 1000); 

    if(!Object.keys(errors).length){
      api.post('/auth/register' , formData)
      .then(({data : {data : {accessToken }}}) => {
        saveCookie(accessToken)
        setNotifObject({
          type:"success",
          message:"welcome to Esi Tech",
          triggered:!notifObject.triggered
        })
        setTimeout(() => {
          router.refresh()
          router.push('/')
        }, 2000);
      }) 
      .catch(err=>{
        setNotifObject({
          type:"error",
          message:err.response.data.data.message,
          triggered:!notifObject.triggered
        })
      })
    }

  }


  const cancelHandler = (e)=>{
    e.preventDefault()
    setDecide({})
  }

  useEffect(()=>{
    const result = formValidation(formData)
    setErrors({...result})

  },[formData]) 

  

  const {
    emailValidationStyle , mobileValidationStyle ,
    passwordValidationStyle , confirmValidationStyle ,
    emailMessageStyle , confirmMessageStyle , mobileMessageStyle,
    passwordMessageStyle  } = dynamicFormStyleHandler(errors , submit)

 
 
    return (
      <div>

        <form style={{'--validationColor':"rgb(223, 68, 37)"}}  onSubmit={signUpHandler} noValidate onChange={changeHandler} className={styles.formContainer}>

            <div className={styles.leftSide}>
                  <h4>Welcome to ESI TECH</h4>
                   <img src='/images/icon.png' /> 
            </div>

          <div className={styles.rightSide}>

            <h4>Sign up form</h4>
            <div style={emailValidationStyle}  className={styles.inputContainer}>
              <input name='email' required type='text' />
              <label>email</label>
               <p style={emailMessageStyle}>{errors.emailError}</p>
              </div>
  
            <div style={mobileValidationStyle} className={styles.inputContainer}>
              <input name='mobile' required  />
              <label>mobile</label>
              <p style={mobileMessageStyle}>{errors.mobileError}</p>
  
            </div>
  
            <div style={passwordValidationStyle} className={styles.inputContainer}>
              <input name='password' required type={showPass ? 'text' :"password"} />
              <label onClick={()=>setShowPass(!showPass)} >
               {showPass ? <HiEye/> : <RiEyeCloseLine />}password</label>
              <p style={passwordMessageStyle}>{errors.passwordError}</p>
  
            </div>
  
            <div style={confirmValidationStyle} className={styles.inputContainer}>
              <input name='confirm' required type='password' />
              <label>confirm password</label>
              <p style={confirmMessageStyle}>{errors.confirmError}</p>
  
            </div>
  
            <div className={styles.checkBoxContainer}>
              <input name='check'  type="checkbox" checked ={formData.check} />
              <label onClick={()=>setTerms(true)} className={errors.checkError && submit ? styles.conditionsError : null}>accept our terms and conditions</label>
            </div>
  
            <div className={styles.buttonContainer}>
              <CancelButton text={'Back'} Handler={cancelHandler} />
              <SubmitButton  text={'Sign up'}  />
            </div>
 
           </div>

        </form>
          {terms && <div className={styles.terms}>
             <Terms formData= {formData} setFormData ={setFormData} setTerms = {setTerms} />
         </div>}

    </div>

    );
};

export default SignForm;