import { indexProp } from '@/components/constants/types/PropeTypes';
import styles from './TopSalesCard.module.css'

const TopSalesCard = ({index}:indexProp) => {
    return (
        <div className={styles.container}>
            {index} 
            <p className={styles.hoverDesc}>
            
            </p>
        </div>
    
    );
};

export default TopSalesCard;