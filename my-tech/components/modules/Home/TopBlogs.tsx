'use client'
import styles from './TopBlogs.module.css'
import TopBlogCard from '../subModules/TopBlogCard';
import {useState , useRef , WheelEvent } from 'react'

const TopBlogs = () => {
    let blogIndex = useRef(0) 

    const [transferY , setTransferY] = useState(0)

    const wheelHandler = (e:WheelEvent)=>{
            blogIndex.current += e.deltaY/100
            setTransferY((prev)=>{
                    if(blogIndex.current < 1){
                        blogIndex.current = 0
                        return 0
                    }
                    if(blogIndex.current>3){
                        blogIndex.current = 0
                        return blogIndex.current
                    } 
                    let diff = e.deltaY > 0 ?10 : -10
                    return prev -= ((e.deltaY)*3 + diff )
            })
    }


    const dotHandler = (index:number , transfer:number)=>{
        blogIndex.current = index
        setTransferY(transfer)
    }
    const scrollTransform:Record<string , string> = {
        '--scrollY': `${transferY}px`
    }

    return (
    <div className={styles.whole}>
        <h2>Latest Blogs</h2>
        <div  style={scrollTransform}  onWheel={wheelHandler} className={styles.container}>
        {[...Array(4)].map((_,index)=>(
            <TopBlogCard key={index} index ={index} />
        ))
        }
        <div className={styles.dots}>
            {[...Array(4)].map((_, index)=>(
                <span key={index} style={blogIndex.current == index ?{background:"aqua" } : undefined} onClick={()=>dotHandler(index , index*(-310))}>{index + 1}</span>
            ))}
        </div>
        </div>
    </div>
    
    );
};

export default TopBlogs;