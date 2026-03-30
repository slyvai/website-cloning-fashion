"use client"
import styles from './ContactUs.module.css';
import {FacebookOutlined, YoutubeOutlined, TwitterOutlined, InstagramOutlined} from '@ant-design/icons';
import { FaBlogger } from "react-icons/fa";
import {useFormik} from "formik";
import * as Yup from "yup";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

export default function ContactUs() {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            message: '',
            subject: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            subject: Yup.string().required('Subject is required'),
            message: Yup.string().required('Message is required'),
        }),
        onSubmit: (values, {resetForm}) => {
            console.log(values);
            toast.success('Your message has been sent!')
            resetForm()
        },
    })
    return (
        <>
            <ToastContainer position="top-center"/>
            <div className={styles.contactUs}>
                <div className={styles.content}>
                    <div className={styles.contactForm}>
                        <div className={styles.title}>
                            <h1>Get in Touch</h1>
                            <p>Your email address will not be published. Required fields are marked*</p>
                        </div>
                        <form onSubmit={formik.handleSubmit} className={styles.inputForm}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">Your Name*</label>
                                <input
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Ex. John Doe"
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <p>{formik.errors.name}</p>
                                )}
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email*</label>
                                <input
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="example@gmail.com"
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <p>{formik.errors.email}</p>
                                )}
                            </div>

                        </form>
                        <form onSubmit={formik.handleSubmit} className={styles.formSubject}>
                            <label htmlFor="subject">Subject*</label>
                            <input
                                name="subject"
                                value={formik.values.subject}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter Subject"
                            />
                            {formik.touched.subject && formik.errors.subject && (
                                <p>{formik.errors.subject}</p>
                            )}
                        </form>
                        <form onSubmit={formik.handleSubmit} className={styles.formMessage}>
                            <label htmlFor="message">Your Message*</label>
                            <textarea
                                name="message"
                                value={formik.values.message}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter Here..."
                            />
                            {formik.touched.message && formik.errors.message && (
                                <p>{formik.errors.message}</p>
                            )}
                        </form>
                        <button type="submit" onClick={formik.handleSubmit}>Send Message</button>
                    </div>
                    <div className={styles.contactInfo}>
                        <div className={styles.backgroundGray}>
                            <div className={styles.address}>
                                <h1>Address</h1>
                                <p>123 Washington Ave, Manchester, Kentucky, 39495</p>
                            </div>
                            <div className={styles.contact}>
                                <h1>Contact</h1>
                                <p>Phone: +0123-456-789</p>
                                <p>Email: example@example.com</p>
                            </div>
                            <div className={styles.openTime}>
                                <h1>Open Time</h1>
                                <p>Monday - Friday: 10:00 AM - 20:00 PM</p>
                                <p>Saturday - Sunday: 11:00 AM - 18:00 PM</p>
                            </div>
                            <div className={styles.mediaSocial}>
                                <h1>Stay Connected</h1>
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
                        </div>
                    </div>
                </div>
                <div className={styles.maps}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.3067638640505!2d106.70560408512263!3d-6.223221544856302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fb49384283cb%3A0xcd71b9e1946c31e9!2sClothing%20%26%20Scarf!5e0!3m2!1sid!2sid!4v1772437019268!5m2!1sid!2sid"
                        allowFullScreen="" loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </>
    )
}
