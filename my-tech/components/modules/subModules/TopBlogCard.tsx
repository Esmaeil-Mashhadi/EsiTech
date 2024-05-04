import { indexProp } from '@/components/constants/types/PropeTypes';
import styles from './TopBlogCard.module.css'

const TopBlogCard = ({index}:indexProp) => {
    return (
        <div className={styles.container}>
            {`blog${index}`}
        </div>
    );
};

export default TopBlogCard;