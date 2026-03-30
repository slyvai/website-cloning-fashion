import styles from './Section5.module.css'
import {ArrowRightOutlined} from '@ant-design/icons'
import Image from 'next/image'
import Section5Img from "../image/section5.png"
import Section5Img2 from "../image/Section5-2.png"
import Link from 'next/link'
export default function Section5() {
    return (
        <>
            <div className={styles.section5}>
                <div className={styles.container}>
                    <div className={styles.man}>
                        <div className={styles.textContainer}>
                            <div className={styles.text}>
                                <p>Flat 20% Discount</p>
                                <h1>Men's Latest <br/> Collection</h1>
                                <p>Lorem ipsum dolor sit amet consectetur <br/>  adipisicing elit. Quisquam, voluptatum.</p>
                                <Link href="/men">
                                    <button>Shop Now <ArrowRightOutlined /></button>
                                </Link>
                            </div>

                            <div className={styles.imageContainer1}>
                                <Image src={Section5Img} fill alt="section5" style={{left: '17%', top: '-5%'}} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.woman}>
                        <div className={styles.textContainer}>
                            <div className={styles.text}>
                            <p>Flat 25% Discount</p>
                            <h1>Woman's <br/> Latest Collection</h1>
                            <p>Lorem ipsum dolor sit amet consectetur <br/> adipisicing elit. Quisquam, voluptatum.</p>
                            <Link href="/women">
                                <button>Shop Now <ArrowRightOutlined /></button>
                            </Link>
                            </div>
                        </div>
                        <div className={styles.imageContainer2}>
                            <Image src={Section5Img2} alt="section5" style={{position: "absolute", left: '40%', width: '80%', top: '-15%'}} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}