'use client'
import styles from "./style/Footer.module.css";
import {FacebookOutlined, YoutubeOutlined, TwitterOutlined, InstagramOutlined} from '@ant-design/icons'
import { FaBlogger } from "react-icons/fa";
import Link from 'next/link';
import {usePathname} from "next/navigation";
export default function Footer() {
    const pathname = usePathname()

    const isSignIn = pathname === ('/login/sign-in')
    const isSignUp= pathname === ('/login/sign-up')
    const isCompleteProfile = pathname === ('/login/complete-profile')
    const isPassword = pathname === ('/login/password')
    if(isSignIn || isSignUp || isCompleteProfile || isPassword) return null

    return (
        <>
            <footer className={styles.footer}>
                <div className={styles.container}>
                    <div className={styles.left}>
                        <div className={styles.logoFooter}>
                            <p>Clothing.</p>
                        </div>
                        <div className={styles.desc}>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. <br/> Aenean commodo ligula eget dolor. Aenean massa. <br/> Cum sociis natoque penatibus et magnis dis parturient montes.</p>
                        </div>
                        <div className={styles.iconSocial}>
                            <div className={styles.facebook}>
                                <FacebookOutlined />
                            </div>
                            <div className={styles.blogger}>
                                <FaBlogger />
                            </div>
                            <div className={styles.youtube}>
                                <YoutubeOutlined />
                            </div>
                            <div className={styles.twitter}>
                                <TwitterOutlined />
                            </div>
                            <div className={styles.instagram}>
                                <InstagramOutlined />
                            </div>
                        </div>
                    </div>
                        <div className={styles.company}>
                            <p>Company</p>
                            <nav>
                                <Link href="/about">About Us</Link>
                                <Link href="/blog">Blog</Link>
                                <Link href="/contact">Contact Us</Link>
                                <Link href="/career">Career</Link>
                            </nav>
                        </div>
                        <div className={styles.costumer}>
                            <p>Costumer Services</p>
                            <nav>
                                <Link href="/account">My Account</Link>
                                <Link href="/track-order">Track Your Order</Link>
                                <Link href="/return">Return</Link>
                                <Link href="/faq">FAQ</Link>
                            </nav>
                        </div>
                        <div className={styles.information}>
                            <p>Our Information</p>
                            <nav>
                                <Link href="/privacy">Privacy</Link>
                                <Link href="/terms">User Terms & Conditions</Link>
                                <Link href="/policy">Return Policy</Link>
                            </nav>
                        </div>
                        <div className={styles.contact}>
                            <p>Contact Info</p>
                            <nav>
                                <Link href="/">+0123-456-789</Link>
                                <Link href="/">example@gmail.com</Link>
                                <Link href="/">8520 Preston Rd. <br/> Inglewood, Maine <br/> 98380</Link>
                            </nav>
                        </div>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.copyright}>
                        <p>Copyright &copy; 2026 Clothing Website Design. All rights reserved.</p>
                    </div>
                   <div className={styles.itemBottom}>
                       <div className={styles.language}>
                           <p>English</p>
                       </div>
                       <div className={styles.currency}>
                           <p>USD</p>
                       </div>
                   </div>
                </div>
            </footer>
        </>
    )
}