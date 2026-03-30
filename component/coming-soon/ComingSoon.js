'use client'
import bg from '../image/bg-coming-soon.jpg'
import Image from "next/image";
import {FacebookOutlined, YoutubeOutlined, TwitterOutlined, InstagramOutlined} from '@ant-design/icons'
import { FaBlogger } from "react-icons/fa";
import Countdown from "react-countdown";
import styles from './ComingSoon.module.css'

const renderer = ({ days, hours, minutes, seconds }) => (
    <div className={styles.countdown}>
        <div className={styles.countItem}>
            <span className={styles.number}>{days}</span>
            <span className={styles.label}>Days</span>
        </div>
        <div className={styles.countItem}>
            <span className={styles.number}>{String(hours).padStart(2, '0')}</span>
            <span className={styles.label}>Hours</span>
        </div>
        <div className={styles.countItem}>
            <span className={styles.number}>{String(minutes).padStart(2, '0')}</span>
            <span className={styles.label}>Minutes</span>
        </div>
        <div className={styles.countItem}>
            <span className={styles.number}>{String(seconds).padStart(2, '0')}</span>
            <span className={styles.label}>Seconds</span>
        </div>
    </div>
)
export default function ComingSoon() {
    return (
        <>
            <div className={styles.comingSoon}>
                <div className={styles.whiteContainer}>
                    <div className={styles.textContainer}>
                        <h1>Coming Soon</h1>
                    </div>
                    <div className={styles.countdown}>
                        <Countdown date={new Date('10000-12-31')} renderer={renderer} />
                    </div>
                    <div className={styles.labelEmail}>
                        <p>Get notified when site goes live</p>
                    </div>
                    <div className={styles.inputEmail}>
                        <div className={styles.input}>
                            <input type="email" placeholder="Enter email address" />
                        </div>
                        <div className={styles.buttonContainer}>
                            <button>Subscribe</button>
                        </div>
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
                    <div className={styles.bottom}>
                        <div className={styles.copyright}>
                            <p>Copyright &copy; 2026 Clothing Website Design. All rights reserved.</p>
                        </div>
                    </div>
                </div>
                <Image src={bg} alt="background-coming-soon"/>
            </div>
        </>
    )
}