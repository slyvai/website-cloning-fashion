'use client'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from "@/component/login/Password.module.css";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper/modules";
import 'swiper/css'
import 'swiper/css/pagination'
import Image from "next/image";
import SlideImage1 from "@/component/image/sign-in.jpg";
import SlideImage2 from "@/component/image/sign-in2.jpg";
import SlideImage3 from "@/component/image/sign-in3.jpg";
import SlideImage4 from "@/component/image/sign-in4.webp";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ChangePassword() {
    const [step, setStep] = useState(1)
    const [email, setEmail] = useState('')
    const [mockCode, setMockCode] = useState('')
    const [inputCode, setInputCode] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const router = useRouter()
    const slides = [
        { src: SlideImage1, alt: 'Slide 1' },
        { src: SlideImage2, alt: 'Slide 2' },
        { src: SlideImage3, alt: 'Slide 3' },
        { src: SlideImage4, alt: 'Slide 4' },
    ];

    const handleSendCode = () => {
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const user = users.find(u => u.email === email)

        if (!user) {
            toast.error('Email not found!')
            return
        }


        const code = Math.floor(100000 + Math.random() * 900000).toString()
        setMockCode(code)
        localStorage.setItem('verifyCode', code)

        toast.info(`Your verify code is: ${code}`, { autoClose: false, toastId: 'verifyCode' })
        setStep(2)
    }


    const handleVerifyCode = () => {
        const saved = localStorage.getItem('verifyCode')
        if (inputCode === saved) {
            toast.dismiss('verifyCode')
            toast.success('Code verified!')
            setStep(3)
        } else {
            toast.error('Invalid code!')
        }
    }


    const handleUpdatePassword = () => {
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match!')
            return
        }
        if (newPassword.length < 8) {
            toast.error('Password must be at least 8 characters!')
            return
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const updatedUsers = users.map(u =>
            u.email === email ? { ...u, password: newPassword } : u
        )
        localStorage.setItem('users', JSON.stringify(updatedUsers))
        localStorage.removeItem('verifyCode')
        router.push('/login/sign-in')
    }

    return (
        <>
            <ToastContainer position="top-center" autoClose={3000} />
            <div className={styles.password}>
                {step === 1 && (
                    <div className={styles.passwordContainer}>
                        <div className={styles.logo}>
                            <p>Clothing.</p>
                        </div>
                        <div className={styles.title}>
                            <h1>Forgot Password</h1>
                            <div className={styles.desc}>
                                <p>Don't worry, We'll send you reset instructions.</p>
                            </div>
                        </div>
                        <div className={styles.form}>
                            <form>
                                <div className={styles.column}>
                                    <div className={styles.email}>
                                        <label htmlFor="email">Email*</label>
                                        <input
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter Email Here"
                                        />
                                    </div>
                                </div>
                            </form>
                            <button onClick={handleSendCode}>Submit</button>
                            <p className={styles.login}>
                                Remember Password? <Link href="/login/sign-in">Sign In</Link>
                            </p>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <div className={styles.passwordContainer}>
                            <div className={styles.logo}>
                                <p>Clothing.</p>
                            </div>
                            <div className={styles.title}>
                                <h1>Verify Code</h1>
                                <div className={styles.desc}>
                                    <p>Please enter the code we just send to you.</p>
                                </div>
                            </div>
                            <div className={styles.form}>
                                <form>
                                    <div className={styles.column}>
                                        <div className={styles.email}>
                                            <label htmlFor="email">Code*</label>
                                            <input
                                                type="text"
                                                value={inputCode}
                                                onChange={(e) => setInputCode(e.target.value)}
                                                placeholder="Enter 6-digit code"
                                                maxLength={6}
                                            />
                                        </div>
                                    </div>
                                </form>
                                <button onClick={handleVerifyCode}>Verify</button>
                                <p className={styles.login}>
                                    Didn't receive code? <span onClick={handleSendCode}>Resend Code</span>
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <div className={styles.passwordContainer}>
                            <div className={styles.logo}>
                                <p>Clothing.</p>
                            </div>
                            <div className={styles.title}>
                                <h1>Set new password</h1>
                                <div className={styles.desc}>
                                    <p>Must be at least 8 character.</p>
                                </div>
                            </div>
                            <div className={styles.form}>
                                <form>
                                    <div className={styles.column}>
                                        <div className={styles.email}>
                                            <label htmlFor="email">New Password*</label>
                                            <input
                                                type="password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                placeholder="New Password"
                                            />
                                        </div>
                                        <div className={styles.email}>
                                            <label htmlFor="email">Confirm Password*</label>
                                            <input
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="Confirm Password"
                                            />
                                        </div>
                                    </div>
                                </form>
                               <button onClick={handleUpdatePassword}>Update Password</button>
                            </div>
                        </div>
                    </div>
                )}
                <Swiper
                    slidesPerView={1}
                    autoplay={true}
                    modules={[Pagination]} pagination={true}
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}
                                     className={styles.slideImage}
                        >
                            <div className={styles.dummyImg}>
                                <Image
                                    src={slide.src}
                                    alt={slide.alt}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className={styles.containerDesc}>
                                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. dolor sit amet, consectetur elit. sit amet, consectetur adipiscing."</p>
                                    <div className={styles.text}>
                                        <span className={styles.nameText}>Leslie Alexander</span>
                                        <span className={styles.position}>Fashion Enthusiast</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>


        </>
    )
}