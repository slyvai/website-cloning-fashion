'use client'
import {useState, useEffect} from "react";
import styles from './Personal.module.css'
import {useFormik} from "formik";
import * as Yup from "yup";
import {Upload} from 'antd'
import {UserOutlined, EditOutlined} from '@ant-design/icons'
import {toast, ToastContainer, toastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
export default function Personal() {
    const [imageUrl, setImageUrl] = useState(null)
    const [user, setUser] = useState(null)

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            gender: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('First Name is required'),
            lastName: Yup.string().required('Last Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            phone: Yup.string().required('Phone Number is required'),
            gender: Yup.string().required('Gender is required'),
        }),
        onSubmit: (values) => {
            const loggedIn = JSON.parse(localStorage.getItem('loggedInUser'))
            const updatedUser = {
                ...loggedIn,
                ...values,
                avatar: imageUrl || loggedIn?.avatar,
            }
            try {
                localStorage.setItem('loggedInUser', JSON.stringify(updatedUser))
                const users = JSON.parse(localStorage.getItem('users') || '[]')
                const updatedUsers = users.map(u =>
                    u.email === loggedIn.email ? updatedUser : u
                )
                localStorage.setItem('users', JSON.stringify(updatedUsers))
                setUser(updatedUser)
                toast.success('Profile updated!')
            } catch (e) {
                toast.error('Image too large! Try a smaller image.')
            }
        },
    })

    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedInUser')
        if (loggedIn) {
            const parsed = JSON.parse(loggedIn)
            setUser(parsed)
            setImageUrl(parsed.avatar || null)
            formik.setValues({
                firstName: parsed.firstName || '',
                lastName: parsed.lastName || '',
                email: parsed.email || '',
                phone: parsed.phone || '',
                gender: parsed.gender || '',
            })
        }
    }, [])
    const handleChange = (info) => {
        const file = info.file.originFileObj || info.file
        if (file.size > 2000 * 1024) {
            toast.error('Image must be smaller than 2MB!')
            return
        }
        const reader = new FileReader()
        reader.onloadend = () => setImageUrl(reader.result)
        reader.readAsDataURL(file)
    }

    return (
        <>
            <ToastContainer position="top-center" autoClose={3000}/>
            <Upload
                accept="image/*"
                maxCount={1}
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleChange}
            >
                <div className={styles.avatarWrapper}>
                    {imageUrl ? (
                            <div className={styles.imageContainer}>
                                <img src={imageUrl} alt="avatar" className={styles.avatar} />
                                <div className={styles.innerOverlay}>
                                    <div className={styles.overlay}>
                                        <EditOutlined style={{ fontSize: 32, color: '#fff' }} />
                                    </div>
                                </div>
                            </div>
                    ) : (
                        <div className={styles.avatarUpload}>
                            <div className={styles.placeholder}>
                                <UserOutlined style={{ fontSize: 90, color: '#aaa' }} />
                            </div>
                                <div className={styles.innerOverlay}>
                                    <div className={styles.overlay}>
                                    <EditOutlined style={{ fontSize: 32, color: '#fff' }} />
                                    </div>
                              </div>
                        </div>
                    )}
                </div>
            </Upload>
            <form onSubmit={formik.handleSubmit} className={styles.form}>
                <div className={styles.row}>
                    <div className={styles.input}>
                        <label htmlFor="firstName">First Name*</label>
                        <input
                            name="firstName"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Ex. John"
                        />
                        {formik.touched.firstName && formik.errors.firstName && (
                            <p className={styles.errorText}>{formik.errors.firstName}</p>
                        )}
                    </div>

                    <div className={styles.input}>
                        <label htmlFor="lastName">Last Name*</label>
                        <input
                            name="lastName"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Ex. Doe"
                        />
                        {formik.touched.lastName && formik.errors.lastName && (
                            <p className={styles.errorText}>{formik.errors.lastName}</p>
                        )}
                    </div>

                </div>
                <div className={styles.column}>
                    <div className={styles.input}>
                        <label htmlFor="email">Email*</label>
                        <input
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="example@gmail.com"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className={styles.errorText}>{formik.errors.email}</p>
                        )}
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="phone">Phone Number*</label>
                        <input
                            name="phone"
                            type="number"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter Phone Number"
                        />
                        {formik.touched.phone && formik.errors.phone && (
                            <p className={styles.errorText}>{formik.errors.phone}</p>
                        )}
                    </div>
                </div>
                        <div className={styles.genderOptions}>
                                <div className={styles.input}>
                                <label htmlFor="gender">Gender*</label>
                                <select
                                        id="gender"
                                        name="gender"
                                        value={formik.values.gender}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="female">Female</option>
                                        <option value="male">Male</option>
                                        <option value="other">Other</option>
                                </select>
                                {formik.touched.gender && formik.errors.gender && (
                                    <p className={styles.errorText}>{formik.errors.gender}</p>
                                )}
                        </div>
                    </div>
                <button type="submit" onClick={formik.submitForm}>Update Changes</button>
            </form>

        </>
    )
}