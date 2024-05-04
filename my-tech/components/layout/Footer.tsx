import Link from 'next/link';
import styles from './Footer.module.css'
import { RiInstagramFill } from "react-icons/ri";
import { FaTelegram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { BsPersonArmsUp } from "react-icons/bs";



const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.subContainer}>
                <div className={styles.socialMedia}>
                    <h4>Social media accounts</h4>
                    <div className={styles.icons}>
                    <Link href=""><RiInstagramFill/></Link>
                    <Link href=""><FaLinkedin/></Link>
                    <Link href=""><FaGithub/></Link>
                    <Link href=""><FaTelegram/></Link>
                    </div>
                </div>

                <div className={styles.contacts}>
                    <p><FaPhoneSquareAlt/> phone : +989136038055</p>
                    <p><FaAddressBook/> Address: Iran Esfahan</p>
                    <p> <span><BsPersonArmsUp/></span> About me : Ambitious full-stack developer specializing in React Native and MERN stack, 
                    actively pursuing AI studies to enhance problem-solving capabilities. </p>
                </div>
            </div>

            <div className={styles.rightReserverd}>
                <p>&copy; 2024 <Link href=""> Esmaeil Mashhadi</Link> tech website all right reserved</p>
            </div>
        </div>
    );
};

export default Footer;