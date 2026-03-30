'use client'
import styles from './CompleteProfile.module.css'
import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LuImagePlus } from "react-icons/lu";
import { Upload } from 'antd'
import SlideImage1 from "@/component/image/sign-in.jpg";
import SlideImage2 from "@/component/image/sign-in2.jpg";
import SlideImage3 from "@/component/image/sign-in3.jpg";
import SlideImage4 from "@/component/image/sign-in4.webp";
import Image from "next/image";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper/modules";
import 'swiper/css'
import 'swiper/css/pagination'
import {useState, useEffect} from "react";

const { Dragger } = Upload

export default function CompleteProfile() {
    const [imageUrl, setImageUrl] = useState(null)
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            phone: '',
            gender: '',
        },
        validationSchema: Yup.object({
            phone: Yup.string().required('Phone is required'),
            gender: Yup.string().required('Gender is required'),
        }),
        onSubmit: (values, { resetForm }) => {
            const loggedIn = JSON.parse(localStorage.getItem('loggedInUser'))

            const updatedUser = {
                ...loggedIn,
                ...values,
                avatar: imageUrl || null,
                profileComplete: true,
            }
                localStorage.setItem('loggedInUser', JSON.stringify({ ...updatedUser, avatar: imageUrl }))

            const users = JSON.parse(localStorage.getItem('users') || '[]')
            const updatedUsers = users.map(u =>
                u.email === loggedIn.email ? updatedUser : u
            )
            localStorage.setItem('users', JSON.stringify(updatedUsers))

            toast.success('Profile completed!')
            resetForm()
            router.push('/account')
        },
    })
    const handleChange = (info) => {
        const file = info.file.originFileObj || info.file
        if (file.size > 1000 * 1024) {
            toast.error('Image must be smaller than 1MB!')
            return
        }
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => setImageUrl(e.target.result)
            reader.readAsDataURL(file)
        }
    }

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
                        <h1>Complete Your Profile</h1>
                        <div className={styles.desc}>
                            <p>Don't worry, only you can see your personal data</p>
                        </div>
                    </div>
                    <div className={styles.form}>
                        <form onSubmit={formik.handleSubmit} className={styles.inputForm}>
                            <div className={styles.avatarProfile}>
                                <label>Profile Photo (Optional)</label>
                                <Dragger
                                    accept="image/*"
                                    maxCount={1}
                                    showUploadList={false}
                                    beforeUpload={() => false}
                                    onChange={handleChange}
                                    className={styles.dragger}
                                >
                                    <div className={styles.avatarWrapper}>
                                        {imageUrl ? (
                                            <>
                                                <img src={imageUrl} alt="avatar" className={styles.avatar} />
                                            </>
                                        ) : (
                                            <>
                                                <LuImagePlus style={{fontSize: 42, color: '#888'}}/>
                                                <div className={styles.overlay}>
                                                    <p>Drag a Photo</p>
                                                    <b>Browse</b>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </Dragger>
                            </div>

                            <label htmlFor="phone">Phone Number*</label>
                            <input
                                name="phone"
                                type="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter Phone Number"
                            />
                            {formik.touched.phone && formik.errors.phone && (
                                <p className={styles.errorText}>{formik.errors.phone}</p>
                            )}

                            <div className={styles.genderOptions}>
                                <label htmlFor="gender">Gender*</label>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={formik.values.gender}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={formik.touched.gender && formik.errors.gender ? styles.inputError : ''}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <button type="submit" onClick={() => formik.submitForm()} className={styles.submitButton}>
                                Complete Profile
                            </button>

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