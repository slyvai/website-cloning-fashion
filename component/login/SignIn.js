'use client'
import styles from './SignIn.module.css'
import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import {Divider} from 'antd'
import SlideImage1 from "@/component/image/sign-in.jpg";
import SlideImage2 from "@/component/image/sign-in2.jpg";
import SlideImage3 from "@/component/image/sign-in3.jpg";
import SlideImage4 from "@/component/image/sign-in4.webp";
import Image from "next/image";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper/modules";
import 'swiper/css'
import 'swiper/css/pagination'

export default function SignIn() {
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email').required('Email is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: (values, { resetForm }) => {
            const users = JSON.parse(localStorage.getItem('users') || '[]')
            const user = users.find(
                u => u.email === values.email && u.password === values.password
            )
            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify(user))
                toast.success('Logged in!')
                resetForm()
                if (!user.profileComplete) {
                    router.push('/login/complete-profile')
                } else {
                    router.push('/account')
                }
            } else {
                toast.error('Invalid email or password!')
            }
        },
    })

    const slides = [
        { src: SlideImage1, alt: 'Slide 1' },
        { src: SlideImage2, alt: 'Slide 2' },
        { src: SlideImage3, alt: 'Slide 3' },
        { src: SlideImage4, alt: 'Slide 4' },
    ];

    return (
        <>
            <ToastContainer position="top-center" autoClose={3000}/>
            <div className={styles.signIn}>
                <div className={styles.formSignIn}>
                    <div className={styles.logo}>
                        <p>Clothing.</p>
                    </div>
                    <div className={styles.title}>
                        <h1>Sign In</h1>
                        <div className={styles.desc}>
                            <p>Please fill your detail to access your account</p>
                        </div>
                    </div>
                    <div className={styles.form}>
                        <form onSubmit={formik.handleSubmit}>
                            <div className={styles.column}>
                                <div className={styles.email}>
                                    <label htmlFor="email">Email*</label>
                                    <input
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter Email Address"
                                    />
                                    {formik.touched.email && formik.errors.email && (
                                        <p className={styles.errorText}>{formik.errors.email}</p>
                                    )}
                                </div>

                                <div className={styles.password}>
                                    <label htmlFor="password">Password*</label>
                                    <input
                                        name="password"
                                        type="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter Password"
                                    />
                                    {formik.touched.password && formik.errors.password && (
                                        <p className={styles.errorText}>{formik.errors.password}</p>
                                    )}

                                </div>

                            </div>
                            <div className={styles.agree}>
                                <label htmlFor="agreeTerms">
                                    <div className={styles.checkbox}>
                                        <input
                                            name="agreeTerms"
                                            type="checkbox"
                                            value={formik.values.agreeTerms}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        Remember me
                                    </div>
                                </label>
                                {formik.touched.agreeTerms && formik.errors.agreeTerms && (
                                    <p className={styles.errorText}>{formik.errors.agreeTerms}</p>
                                )}
                                <div className={styles.forgotPassword}>
                                    <Link href="/login/password">Forgot Password?</Link>
                                </div>
                            </div>
                            <button type="submit">Sign In</button>
                            <Divider>or Sign In with</Divider>
                            <div className={styles.buttonGoogle}>
                                <button><Image width={40} height={40} src="/icons/google-color-svgrepo-com.svg" alt="google"/>Sign in with Google</button>
                            </div>
                            <p className={styles.login}>
                                Dont have an account? <Link href="/login/sign-up">Sign Up</Link>
                            </p>

                        </form>
                    </div>
                </div>
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