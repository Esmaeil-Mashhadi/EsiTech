import Link from 'next/link';
import styles from './Header.module.css'
import { cookies } from 'next/headers';
// import { checkUserAccessibility } from '@/utils/authentication/checkUserAccessibility';

const Header = async() => {

    // const user = await checkUserAccessibility(cookies().get("accessToken"))
   let user = false
    return (
        <div className={styles.container}>
             <div className={styles.left}>
                 <p>EsiTech</p>
                 {user ? <Link href="/profile">Profile</Link> : 
                    <Link href="/registeration">Sign up/Login</Link>
                }
             </div>

             <div className={styles.right}>
                    <Link href="">Home</Link>
                    <Link href="">Shop</Link>
                    <Link href="">Blog</Link>
                    <Link href="">Sell</Link>
             </div>
        </div>
    );
};

export default Header;