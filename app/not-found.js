
import Link from 'next/link';
import styles from './page.module.css';
import bg from '../public/images/not-found.webp'

export default function NotFound() {
    return (
        <div className={styles.container}>
            <h1
                className={styles.code}
                style={{
                    backgroundImage: `url(${bg.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}
            >
                404
            </h1>
            <h2 className={styles.title}>Oops! Page Not Found</h2>
            <p className={styles.message}>
                The page you're looking for cannot be found. <br/>
                take a break before trying again.
            </p>
            <Link href="/" className={styles.button}>
                Go to Home Page
            </Link>
        </div>
    );
}