'use client'
import { useState } from 'react';



import styles from './Info.module.css'
import { CancelButton, NeutralButton, SubmitButton } from '@/components/constants/buttons/Button';

interface UserPropType {
    email : string , 
    phone : string , 
    fullName?:string , 
    country?:string, 

    
}
const Info = ({user}:any) => {

    console.log(user);

    const [edit , setEdit] = useState(false)

    const leftSideInfo = [
        {lable:'Full name' , p:'Esmaeil Mashhadi'},
        {lable:'Country' , p:'Iran'},
        {lable:'Email Address', p:`${user.email}`},
        {lable:'phone' , p:`${user.mobile}`},
    ]

    const rightSideInfo = [
        {lable:'state' , p:'Esfahan'},
        {lable:'city' , p:'Ghahderijan'},
        {lable:'street' , p:'Modares'},
        {lable:'Postal/Zip Code' , p:'70'},
    ]
    const changeHandler = ()=>{

    }

    const submitHandler = ()=>{

    }


    return (
        <div className={styles.container}>
            <img title='upload profile' src='/images/profile.png' className={styles.profilePic} />
            <div className={styles.infoContainer}>
                    <div className={styles.card}>
                            {leftSideInfo.map((item, index) =>(
                                <div key={index}>
                                    <label>{item.lable}</label>
                                    {edit ? <input onChange={changeHandler} value={item.p} /> :  
                                    <p> {item.p}</p>}
                                </div>
                            ))}
                    </div>

                    <div className={styles.card}>
                            {rightSideInfo.map((item, index)=>(
                                    <div key={index}>
                                       <label>{item.lable}</label>
                                       {edit ? <input onChange={changeHandler} value={item.p} /> :  
                                       <p> {item.p}</p>}
                                   </div>
                            ))}

                    </div>
  
            </div>
            <p className={styles.edit}>
               {edit ? 
               <div>
                   <SubmitButton text='Submit' handler={submitHandler} />
                   <CancelButton text='Cancel' handler={()=>setEdit(false)} />
               </div> : 
                   <NeutralButton text='Edit Profile' handler={()=>setEdit(true)} />
               }
            </p>
        </div>
    );
};

export default Info;