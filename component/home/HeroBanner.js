import styles from "./HeroBanner.module.css";
import { RiDiscountPercentFill } from "react-icons/ri";
import {ArrowRightOutlined} from '@ant-design/icons'
import Image from 'next/image'
import Link from 'next/link'
import HeroImg from "../image/hero-banner.png"
export default function HeroBanner() {
    return (
        <>
            <div className={styles.heroBanner}>
                <div className={styles.textContainer}>
                    <div className={styles.subtitle}>
                        <RiDiscountPercentFill/>
                        <p><span>50% OFF</span> Summer Super Sale</p>
                    </div>
                    <div className={styles.title}>
                        <h1>Step into Style: Your <br/> Ultimate Fashion Destination</h1>
                    </div>
                    <div className={styles.desc}>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.  Aenean commodo ligula eget  <br/> dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.</p>
                    </div>
                    <div className={styles.button}>
                        <Link href="/shop">
                            <button>Shop Now <ArrowRightOutlined /></button>
                        </Link>
                    </div>
                </div>
                <Image className={styles.heroImg} src={HeroImg} alt="Hero Banner" objectFit="cover" />
            </div>
        </>
    )
}