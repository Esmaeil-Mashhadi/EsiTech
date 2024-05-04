
import styles from './Layout.module.css';
import Header from './Header';
import Footer from './Footer';
import { ReactNode } from 'react';

interface LayoutPropType {
    children : ReactNode
}
const Layout = ({children}:LayoutPropType) => {

    return (
        <div className={styles.whole} >
            <Header />
            <div className={styles.body}>
                 {children}
            </div>
            <Footer />
        </div>

    );
};

export default Layout;