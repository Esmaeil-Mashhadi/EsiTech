import { FormDataType } from "@/components/modules/auth/types/authtypes"

interface ErrorType {
  emailError?:string 
  mobileError?:string
  passwordError?:string 
  confirmError?:string 
  checkError?:string 
}
const formValidation = (data:FormDataType)=>{
    const ErrorMessages:ErrorType = {}
  if(!data.email || !data.email.trim()){
    ErrorMessages.emailError  ="email field is empty !"
  }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)){
    ErrorMessages.emailError = "its not valid yet"
  }else{
    delete ErrorMessages.emailError
  }

  if(!data.mobile || !data.mobile.trim()){
    ErrorMessages.mobileError  = 'waiting for the mobile !'
  }else if(!/^\d{10,11}$/.test(data.mobile)){
    ErrorMessages.mobileError = "mobile field is empty!"
  }else{
    delete ErrorMessages.mobileError
  }

  if(!data.password || !data.password.trim()){
    ErrorMessages.passwordError = 'password field is empty !'
  }else if(data.password.length < 6 || data.password.length >25){
    ErrorMessages.passwordError ="password must be between 4 - 25 long !"
  }else{
    delete ErrorMessages.passwordError
  }

  if(!data.confirm || !data.confirm.trim()){
    ErrorMessages.confirmError = "please confirm the password !"
  }else if (data.password !== data.confirm){
    ErrorMessages.confirmError = "they are not matched yet !"
  }

  if(!data.check){
    ErrorMessages.checkError = "please accept our terms and conditions !"
  }else{
    delete ErrorMessages.checkError
  }

  return ErrorMessages
}

export default formValidation