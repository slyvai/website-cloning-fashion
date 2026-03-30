import styles from './Newsletter.module.css';
import { IoMail } from "react-icons/io5";
export default function Newsletter() {
    return (
        <div className={styles.newsletterContainer}>
            <div className={styles.textContainer}>
                <div className={styles.subtitle}>
                    <p>Our Newsletter</p>
                </div>
                <div className={styles.title}>
                    <h1>Subscribe to Our Newsletter to Get <br/> Updates to Our Latest Collection</h1>
                </div>
                <div className={styles.desc}>
                    <p>Get 20% off on your first order just by subscribing to our newsletter</p>
                </div>
                <div className={styles.input}>
                    <div className={styles.inputContainer}>
                        <div className={styles.mailIcon}>
                            <IoMail />
                        </div>
                        <input type="email" placeholder="Enter email address" />
                    </div>
                    <div className={styles.buttonContainer}>
                        <button>Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
