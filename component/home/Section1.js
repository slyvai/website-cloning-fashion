import styles from "./Section1.module.css";
import { BsBoxSeam } from "react-icons/bs";
import { PiWallet, PiHeadphones } from "react-icons/pi";
import Image from 'next/image'
import ImageWoman from "../image/gridWoman.png"
import ImageMan from "../image/grid-man.webp"
import ImageAccessories from "../image/accessories-grid.webp"
export default function Section1() {
    return (
        <>
            <div className={styles.section1}>
                <div className={styles.icons}>
                    <div className={styles.box}>
                        <div className={styles.iconBox}>
                            <BsBoxSeam />
                            <div className={styles.iconBoxInner}></div>
                        </div>
                        <div className={styles.text}>
                            <div className={styles.title}>
                                <h3>Free Shipping</h3>
                            </div>
                            <div className={styles.desc}>
                                <p>Free shipping for order above $180</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.payment}>
                        <div className={styles.iconWallet}>
                            <PiWallet/>
                            <div className={styles.iconBoxInner}></div>
                        </div>
                        <div className={styles.text}>
                            <div className={styles.title}>
                                <h3>Flexible Payment</h3>
                            </div>
                            <div className={styles.desc}>
                                <p>Multiple secure payment options</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.headphones}>
                        <div className={styles.iconHeadphones}>
                            <PiHeadphones/>
                            <div className={styles.iconBoxInner}></div>
                        </div>
                        <div className={styles.text}>
                            <div className={styles.title}>
                                <h3>24x7 Support</h3>
                            </div>
                            <div className={styles.desc}>
                                <p>We support online all days</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.gridContainer}>
                    <div className={styles.gridWoman}>
                        <div className={styles.textContainer}>
                            <div className={styles.subtitle}>
                                <p>2500+ Items</p>
                            </div>
                            <div className={styles.title}>
                                <h1>For Women</h1>
                            </div>
                            <div className={styles.desc}>
                                <p>Lorem ipsum dolor sit amet, <br/> consectetuer adipiscing elit.</p>
                            </div>
                            <div className={styles.list}>
                                <ul>
                                    <li>Blazers</li>
                                    <li>T-shirts</li>
                                    <li>Dresses</li>
                                    <li>Jackets & Coats</li>
                                    <li>Jeans</li>
                                    <li>Knit</li>
                                    <li>Sarees</li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.imageContainer}>
                            <Image src={ImageWoman} alt="Grid Woman" objectFit="cover" />
                        </div>
                    </div>
                    <div className={styles.gridMan}>
                        <div className={styles.textContainer}>
                            <div className={styles.subtitle}>
                                <p>1500+ Items</p>
                            </div>
                            <div className={styles.title}>
                                <h1>For Men</h1>
                            </div>
                            <div className={styles.list}>
                                <ul>
                                    <li>Blazers</li>
                                    <li>T-shirts</li>
                                    <li>Jackets & Coats</li>
                                    <li>Jeans</li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.imageContainer}>
                            <Image src={ImageMan} alt="Grid Man" objectFit="cover" />
                        </div>
                    </div>
                    <div className={styles.accessories}>
                        <div className={styles.textContainer}>
                            <div className={styles.subtitle}>
                                <p>800+ Items</p>
                            </div>
                            <div className={styles.title}>
                                <h1>Accessories</h1>
                            </div>
                            <div className={styles.list}>
                                <ul>
                                    <li>Handbags</li>
                                    <li>Watches</li>
                                    <li>Sunglasses</li>
                                    <li>Hat</li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.imageContainer}>
                            <Image src={ImageAccessories} alt="Grid Accessories" objectFit="cover" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}