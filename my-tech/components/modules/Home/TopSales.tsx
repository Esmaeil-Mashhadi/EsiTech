'use client'
import TopSalesCard from '../subModules/TopSalesCard';
import styles from './TopSales.module.css';
import { useState, useRef, MouseEvent } from 'react';

const TopSales = () => {
  const [mouseDown, setMouseDown] = useState(false);
  const [start, setStart] = useState(0);
  const [scrollLeft, setScrollLeft] = useState<number | undefined>(0); 
  const [scrollStyle, setScrollStyle] = useState<Record<string, string>>({});
  const itemRef = useRef<HTMLDivElement | null>(null) 

  const startHandler = (e:MouseEvent) => {
    setMouseDown(true);
    setStart(e.pageX); 
    setScrollLeft(itemRef.current?.scrollLeft); 
  };


  const moveHandler = (e:MouseEvent) => {
    if (!mouseDown) return;
    e.preventDefault();
    setScrollStyle({
        '--scaleUp':'1.05',
        '--boxShadow':"inset 0px 0px 20px darkcyan"
    })
    const walk = (e.pageX - start)

    itemRef.current ? itemRef.current.scrollLeft = (scrollLeft ?? 0)  - walk : null
    // if mouse goes to right it means the walk is position so we have to scroll back so we substact it 
    // if it goes to left it mean were going forward so walk is minus and minus * minus is euqla so it incrases the scroll
  };

  const endHandler = () => {
    setMouseDown(false);
    setScrollStyle({})
  };


  return (
  <div className={styles.whole}>
      <h2>popular products</h2>
    <div className={styles.container} 
         ref={itemRef}
         style={scrollStyle}
         onMouseDown={startHandler}
         onMouseMove={moveHandler}
         onMouseLeave={endHandler}
         onMouseUp={endHandler}>
        
        {[...Array(12)].map((_, index) => ( 
          <TopSalesCard key={index} index={index} />
        ))}
    </div>
  </div>
  )

};

export default TopSales;
