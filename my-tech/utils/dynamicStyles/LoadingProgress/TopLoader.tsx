'use client'

import NextTopLoader from "nextjs-toploader";


const NextLoader = () => {
    return (
        <NextTopLoader
          color="yellow"
          initialPosition={0.08}
          crawlSpeed={100}
          height={3}
          crawl={true}
          showSpinner={false} 
          easing="ease"
          speed={20}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
/>
        );
};

export default NextLoader;