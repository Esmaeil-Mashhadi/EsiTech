import { Dispatch, SetStateAction } from 'react';


type decideType = Record<string , boolean>;

interface TermPropType {
  setTerms:Dispatch<SetStateAction<boolean>>
  setFormData:Dispatch<SetStateAction<FormDataType>>
  formData:FormDataType
}

interface FormDataType {
  email: string;
  password: string;
  confirm: string;
  mobile: string;
  check: boolean;
}

type LogProps ={
  info:string ,
  password:string,
}

type OtpProps ={
  mobile:string ,
  code:number|string
}


type LogType =(LogProps|OtpProps)&{
  remember:boolean,
}



interface AuthPropType {
    setDecide:Dispatch<SetStateAction<decideType>>
    notifObject:{triggered: boolean , message:string , type :string }
    setNotifObject:Function
  }

interface TokenResponse{
    data : {
      tokens :{
          accessToken:string , 
          refreshToken:string
      }
    }
    }
    
interface ErrorResponse{
      response:{
        data:{
          data:{
            message:string
          }
        }
      }
}

interface ErrorType {
    [index: string]: string | undefined;
    email?: string;
    password?: string;
    confirm?: string;
    mobile?: string;
  }

type elemntStyle = Record<string , string>


export type {
    decideType , AuthPropType , 
    TokenResponse , ErrorResponse ,
    elemntStyle , ErrorType ,
    FormDataType , TermPropType,
    LogType , OtpProps , LogProps
}

