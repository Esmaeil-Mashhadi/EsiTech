'use client'
import { Dispatch, SetStateAction, useState } from 'react';
import styles from './CheckButton.module.css'
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { DynamicStylesType, checkStyle } from '@/utils/dynamicStyles/CheckStyle';
import { LogType } from '@/components/modules/auth/types/authtypes';


interface CheckPropsType {
    data: LogType,
    setData : Dispatch<SetStateAction<LogType>>
}


const CheckButton = ({data ,setData}:CheckPropsType) => {


    
    const [style , setStyle] = useState<DynamicStylesType>(()=>{
        const dynamicStyles = checkStyle('cross') 
        return {...dynamicStyles , choice:'cross'}
    })


    const clickHandler = (choice:string)=>{
        if(choice == 'cross'){
            const dynamicStyles = checkStyle(choice)
            setStyle({...dynamicStyles , choice})
            setData({...data , remember:false})
        }else if(choice=='check'){
            const dynamicStyles = checkStyle(choice)
            setStyle({...dynamicStyles , choice})
            setData({...data , remember:true})
        }
    }

    const myStyle:Record<string , string> = style[style.choice || 'cross'];
    return (
        <div style={myStyle} className={styles.container}>
            <div onClick={()=>clickHandler('cross')} className={styles.side}>       
            </div>
            <div onClick={()=>clickHandler('check')} className={styles.side}>
            </div>
            <div  className={styles.svgContainer}>
                <FaCheck style={style.svgCheckStyle} /> <IoClose style={style.svgCrossStyle}/>
            </div>
        </div>
    );
};

export default CheckButton;