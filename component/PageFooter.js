'use client'
import {usePathname} from 'next/navigation'
import styles from './style/PageFooter.module.css'
import { BsBoxSeam } from "react-icons/bs";
import { PiWallet, PiHeadphones } from "react-icons/pi";

const services = [
    {
        icon : <BsBoxSeam />,
        title : "Free Shipping",
        description : "Free Shipping for order above $180"
    },
    {
        icon: <PiWallet />,
        title: "Flexible Payment",
        description: "Multiple secure payment options"
    },
    {
        icon: <PiHeadphones />,
        title: "24x7 Support",
        description: "We support online all days"
    }
]

export default function PageFooter() {
    const pathname = usePathname()

    const isHomePage = pathname === '/';
    const isCareer = pathname ==='/career';
    const isComingSoon = pathname === '/coming-soon'
    const isSignUp = pathname === '/login/sign-up'
    const isSignIn = pathname === '/login/sign-in'
    const isCompleteProfile = pathname === '/login/complete-profile'
    const isPassword = pathname === '/login/password'
    if (isHomePage || isCareer || isComingSoon || isSignUp || isSignIn || isCompleteProfile | isPassword) return null;

    return (
        <>
            <div className={styles.icons}>
                {services.map((service, index) => (
                    <div key={index} className={styles.container}>
                        <div className={styles.iconContent}>
                            {service.icon}
                            <div className={styles.iconBoxInner}></div>
                        </div>
                        <div className={styles.text}>
                            <div className={styles.title}>
                                <h3>{service.title}</h3>
                            </div>
                            <div className={styles.desc}>
                                <p>{service.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}