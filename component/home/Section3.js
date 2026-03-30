import styles from './Section3.module.css';
import Image from 'next/image'
import {ArrowRightOutlined} from '@ant-design/icons'
import Section3Img from "../image/section3.png"
import Link from "next/link";
export default function Section3() {
    return (
        <>
            <div className={styles.section3}>
                <div className={styles.section3Content}>
                    <div className={styles.imageContainer}>
                        <Image src={Section3Img} alt="Section 3 Image" className={styles.section3Img} />
                    </div>
                    <div className={styles.textContainer}>
                        <div className={styles.subtitle}>
                            <p>Limited Time Offers</p>
                        </div>

                        <h1>25% Off All Fashion <br/> Favorites - Limited Time!</h1>
                        <div className={styles.description}>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel <br/> aliquam aliquet, nunc nisl aliquet nisl.</p>
                        </div>
                        <Link href="/shop">
                            <button>Shop Now <ArrowRightOutlined /></button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}