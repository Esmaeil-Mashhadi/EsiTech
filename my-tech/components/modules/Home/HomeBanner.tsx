'use client'
import  { useState , MouseEvent} from 'react';
import styles from './HomeBanner.module.css'
import Link from 'next/link';
import { FaChevronRight } from "react-icons/fa";



const HomeBanner = () => {
    const [direction , setDirection] = useState({
        x:0,
        y:0
    })
        const moveHandler = ( e: MouseEvent)=>{
        const clientX = e.clientX
        const clientY = e.clientY
        const {width , height} = e.currentTarget.getBoundingClientRect() 
        const x = (clientX / width - 0.5) *100
        const y = (clientY /height - 0.5) *50
        setDirection({x , y})
    }

    
    const positionStyle:Record<string , string> = {
        '--x': `${direction.x}px`,
        '--y': `${direction.y}px`
    }
    return (
        <div  style={positionStyle} onMouseMove={moveHandler} className={styles.container}>
            <div className={styles.textContainer}>
                 <div className={styles.text}>
                    <h1>welcome to Esi tech</h1>
                    <p>Welcome to our tech-centric website, where you'll find a vast selection of <Link href="">PC parts</Link> and components for your computing needs.
                    Explore our informative <Link href="">blogs</Link>, brimming with the latest advancements in technology and AI. Additionally,
                    enjoy our exceptional customer service, ensuring a seamless and satisfying <Link href="">selling</Link> experience.</p>
                 </div>

                <Link href="" className={styles.more}>
                 <div className={styles.flash}>
                         <span><FaChevronRight /></span>
                         <span></span>
                 </div>
                  <p>Discover Our Story & website guidance</p>
                </Link>

            </div>
        </div>
    );
};

export default HomeBanner;