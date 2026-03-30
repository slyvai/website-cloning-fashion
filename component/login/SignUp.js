'use client'
import styles from './SignUp.module.css'
import { useFormik } from "formik";
import * as Yup from "yup";
import {useRouter} from "next/navigation";
import {Divider} from 'antd'
import Image from 'next/image'
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Link from "next/link";
import SlideImage1 from "@/component/image/sign-in.jpg";
import SlideImage2 from "@/component/image/sign-in2.jpg";
import SlideImage3 from "@/component/image/sign-in3.jpg";
import SlideImage4 from "@/component/image/sign-in4.webp";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper/modules";
import 'swiper/css/pagination'
import 'swiper/css';

export default function SignUp() {
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            agreeTerms: ''
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('First Name is required'),
            lastName: Yup.string().required('Last Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
            agreeTerms: Yup.boolean().oneOf([true], 'You must agree with terms & condition and privacy policy!').required('You must agree with terms & condition and privacy policy!')
        }),
        onSubmit: (values, { resetForm }) => {
            const users = JSON.parse(localStorage.getItem('users') || '[]')

            const emailExists = users.find(user => user.email === values.email)
            if (emailExists) {
                toast.error('Email already registered!')
                return
            }
            const newUser = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
                profileComplete: false,
            }
            users.push(newUser)
            localStorage.setItem('users', JSON.stringify(users))
            localStorage.setItem('loggedInUser', JSON.stringify(newUser))
            toast.success('Account created successfully!')
            resetForm()
            router.push('/login/complete-profile')
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
            <div className={styles.signUp}>
                <div className={styles.formSignUp}>
                    <div className={styles.logo}>
                        <p>Clothing.</p>
                    </div>
                    <div className={styles.title}>
                        <h1>Sign Up</h1>
                        <div className={styles.desc}>
                            <p>Fill your information below or register with your social account.</p>
                        </div>
                    </div>
                    <div className={styles.form}>
                        <form onSubmit={formik.handleSubmit}>

                            <div className={styles.row}>
                                <div className={styles.name}>
                                    <label htmlFor="firstName">First Name*</label>
                                    <input
                                        name="firstName"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter First Name"
                                    />
                                    {formik.touched.firstName && formik.errors.firstName && (
                                        <p className={styles.errorText}>{formik.errors.firstName}</p>
                                    )}
                                </div>

                                <div className={styles.name}>
                                    <label htmlFor="lastName">Last Name*</label>
                                    <input
                                        name="lastName"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter Last Name"
                                    />
                                    {formik.touched.lastName && formik.errors.lastName && (
                                        <p className={styles.errorText}>{formik.errors.lastName}</p>
                                    )}
                                </div>
                            </div>

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
                                        Agree with <Link href="/term-condition">Terms & Condition</Link> and <Link href="/privacy-policy">Privacy Policy</Link>
                                    </div>
                                </label>
                                {formik.touched.agreeTerms && formik.errors.agreeTerms && (
                                    <p className={styles.errorText}>{formik.errors.agreeTerms}</p>
                                )}
                            </div>
                            <button type="submit">Sign Up</button>
                            <Divider>or Sign Up with</Divider>
                            <div className={styles.buttonGoogle}>
                                <button><Image width={40} height={40} src="/icons/google-color-svgrepo-com.svg" alt="google"/>Sign up with Google</button>
                            </div>
                            <p className={styles.login}>
                                Already have an account? <Link href="/login/sign-in">Sign In</Link>
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