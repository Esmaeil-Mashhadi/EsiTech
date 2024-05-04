import HomeBanner from '../modules/Home/HomeBanner';
import Sell from '../modules/Home/Sell';
import TopBlogs from '../modules/Home/TopBlogs';
import TopSales from '../modules/Home/TopSales';
import styles from './HomePage.module.css'

const HomePage = () => {

    return (
            <div  className={styles.homeContainer}>
                  <HomeBanner />
                  <TopSales />
                  <Sell />
                  <TopBlogs />
            </div>
    );
};

export default HomePage;