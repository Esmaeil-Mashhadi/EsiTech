'use client'
import {  ReactNode, useEffect, useState } from "react";
import styles from './ProfileSideBar.module.css'
//icons 
import { ImCart } from "react-icons/im";
import { GiNotebook } from "react-icons/gi";
import { MdSell } from "react-icons/md";
import { IoBookmarks } from "react-icons/io5";
import { MdOutlineFavorite } from "react-icons/md";
import { SiBookstack } from "react-icons/si";
import { RiAdminFill } from "react-icons/ri";
import { BsPersonVcardFill } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { elemntStyle } from "../auth/types/authtypes";

//types 

interface ItemListType {
    name:string , href:string , svg:ReactNode
}
const ProfileSideBar = () => {

    const router = useRouter()

    const [select , setSelect] = useState(0)
    const itemsList:ItemListType[] = [
        {name :"info" , href:"info" , svg:  <BsPersonVcardFill />},
        {name :"cart" , href:"cart" , svg:  <ImCart />},
        {name :"orders" , href:"orders" , svg:  <GiNotebook />},
        {name :"selling posters" , href:"sell" , svg:  <MdSell />},
        {name :"Blog bookmarks" , href:"bookMarks" , svg:  <IoBookmarks />},
        {name :"Favorites" , href:"favorites" , svg:  <MdOutlineFavorite />},
        {name :"Contribution" , href:"contribution" , svg:  <SiBookstack />},
        {name :"Admin panel" , href:"admin" , svg:  <RiAdminFill />},
    ]


    useEffect(()=>{
        router.push('/user?info=info')
    },[])

    const selectHandler = (index:number)=>{
        setSelect(index)
    }

    const bgColor:elemntStyle = {
        '--color': ' rgba(54, 56, 57, 0.442)'
    }
    const selectedBgColor:elemntStyle ={
        '--color': ' darkcyan'
    }
  
    return (
    
        <div className={styles.container}>
            <ul className={styles.menuContainer}>
                {itemsList.map((item ,index)=>(
                        <li key={index}>
                            <Link 
                            style={select == index ? selectedBgColor : bgColor} 
                            onClick={()=>selectHandler(index)} 
                            href={{pathname:"/user", query:{'info':item.href}}}>
                                <p>
                                    {item.name}
                                </p>
                                <span>
                                    {item.svg}
                                </span>
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default ProfileSideBar;