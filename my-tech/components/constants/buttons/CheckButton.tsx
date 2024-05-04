'use client'
import { useState } from 'react';
import styles from './CheckButton.module.css'
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { checkStyle } from '@/utils/dynamicStyles/CheckStyle';

const CheckButton = ({data ,setData}) => {

    const [style , setStyle] = useState(()=>{
        const dynamicStyles = checkStyle('cross')
        return {...dynamicStyles , choice:'cross'}
    })


    const clickHandler = (choice)=>{
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

    return (
        <div style={style[style.choice]} className={styles.container}  >
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