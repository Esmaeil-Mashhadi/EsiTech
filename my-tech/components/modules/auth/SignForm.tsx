import { ChangeEvent, FormEventHandler, MouseEvent ,useEffect, useState } from 'react';
import styles from './SignForm.module.css'
import { RiEyeCloseLine } from "react-icons/ri";
import { HiEye } from "react-icons/hi2";
import formValidation from '@/utils/authentication/formValidation';
import { CancelButton, SubmitButton } from '../../constants/buttons/Button';
import { useRouter } from 'next/navigation';
import { AuthPropType, ErrorResponse, ErrorType, FormDataType, TokenResponse, decideType, elemntStyle } from './types/authtypes';
import { dynamicFormStyleHandler } from '@/utils/dynamicStyles/Form';
import Terms from './Terms';
import { saveCookie } from '@/utils/authentication/cookieHandling';
import api from '@/configs/axios.config';



const SignForm = ({ setDecide , setNotifObject , notifObject}:AuthPropType) => {
  const [terms,  setTerms] = useState(false)
  const [showPass , setShowPass] = useState(false)
  const [submit , setSubmit] = useState(false)

  const [formData , setFormData] = useState<FormDataType>({
    email:"",
    password:"",
    confirm :"",
    mobile:"",
    check:false ,
  })


  const [errors , setErrors] = useState<ErrorType>({})
  const router = useRouter()


  const signUpHandler:FormEventHandler= async(e):Promise<void>=>{
    e.preventDefault()
    setSubmit(true)
    setTimeout(() => {
      setSubmit(false)
    }, 1000); 

    if(!Object.keys(errors).length){
      api.post('/auth/register' , formData)
      .then(({data}:{data:TokenResponse}) => {
        const accessToken = data.data.tokens.accessToken
        if(accessToken){
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
        }else{
          throw new Error("failed to save cookie try again ")
        }
      }).catch((err:ErrorResponse)=>{
        console.log(err);
        setNotifObject({
          type:"error",
          message:err?.response?.data?.data?.message ,
          triggered:!notifObject.triggered
        })
      })
    }

  }


  const cancelHandler = (e:MouseEvent)=>{
    e.preventDefault()
    setDecide({})
  }

  useEffect(()=>{
    const result = formValidation(formData)
    setErrors({...result})

  },[formData]) 

  const changeHandler:FormEventHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    const {name , value , checked} = e.target 
    console.log(name);
    if (name === 'check') {
      setFormData({
        ...formData,
        [name]: checked, 
      });
    } else {
      setFormData({
        ...formData,
        [name]: value, 
      });
    }
  }
  

  

  const {
    emailValidationStyle , mobileValidationStyle ,
    passwordValidationStyle , confirmValidationStyle ,
    emailMessageStyle , confirmMessageStyle , mobileMessageStyle,
    passwordMessageStyle  } = dynamicFormStyleHandler(errors , submit)

    const formValidationColor:elemntStyle ={
      '--validationColor':"rgb(223, 68, 37)"
    }
    return (
      <div>
        <form style={formValidationColor}  onSubmit={signUpHandler} noValidate onChange={changeHandler}  className={styles.formContainer}>

            <div className={styles.leftSide}>
                  <h4>Welcome to ESI TECH</h4>
                   <img src='/images/icon.png' /> 
            </div>

          <div className={styles.rightSide}>

            <h4>Sign up form</h4>
            <div style={emailValidationStyle}  className={styles.inputContainer}>
              <input  name='email' required type='text' />
              <label>email</label>
               <p style={emailMessageStyle}>{errors.emailError}</p>
              </div>
  
            <div style={mobileValidationStyle} className={styles.inputContainer}>
              <input  name='mobile' required  />
              <label>mobile</label>
              <p style={mobileMessageStyle}>{errors.mobileError}</p>
  
            </div>
  
            <div style={passwordValidationStyle} className={styles.inputContainer}>
              <input  name='password' required type={showPass ? 'text' :"password"} />
              <label onClick={()=>setShowPass(!showPass)} >
               {showPass ? <HiEye/> : <RiEyeCloseLine />}password</label>
              <p style={passwordMessageStyle}>{errors.passwordError}</p>
  
            </div>
  
            <div style={confirmValidationStyle} className={styles.inputContainer}>
              <input  name='confirm' required type='password' />
              <label>confirm password</label>
              <p style={confirmMessageStyle}>{errors.confirmError}</p>
  
            </div>
  
            <div className={styles.checkBoxContainer}>
              <input  name='check'  type="checkbox" checked ={formData.check} />
              <label onClick={()=>setTerms(true)} className={errors.checkError && submit ? styles.conditionsError : undefined}>accept our terms and conditions</label>
            </div>
  
            <div className={styles.buttonContainer}>
              <CancelButton text={'Back'} handler={cancelHandler} />
              <SubmitButton  text={'Sign up'} handler={signUpHandler} />
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