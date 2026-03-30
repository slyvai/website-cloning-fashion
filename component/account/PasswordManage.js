'use client'
import { useFormik } from 'formik'
import Link from 'next/link'
import * as Yup from 'yup'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from './PasswordManage.module.css'

export default function PasswordManage() {
    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            currentPassword: Yup.string().required('Current password is required'),
            newPassword: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .required('New password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('newPassword')], 'Passwords do not match')
                .required('Please confirm your new password'),
        }),
        onSubmit: (values, { resetForm }) => {

            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
            if (!loggedInUser) {
                toast.error('No user logged in!')
                return
            }

            if (loggedInUser.password !== values.currentPassword) {
                toast.error('Current password is incorrect!')
                return
            }

            const users = JSON.parse(localStorage.getItem('users') || '[]')
            const updatedUsers = users.map(u =>
                u.email === loggedInUser.email
                    ? { ...u, password: values.newPassword }
                    : u
            )
            localStorage.setItem('users', JSON.stringify(updatedUsers))

            const updatedUser = { ...loggedInUser, password: values.newPassword }
            localStorage.setItem('loggedInUser', JSON.stringify(updatedUser))

            toast.success('Password changed successfully!')
            resetForm()
        },
    })

    return (
        <>
            <ToastContainer position="top-center" autoClose={3000} />
            <div className={styles.containerPassword}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.input}>
                        <label>Password*</label>
                        <input
                            name="currentPassword"
                            type="password"
                            placeholder="Enter Current Password"
                            value={formik.values.currentPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.currentPassword && formik.errors.currentPassword && (
                            <p>{formik.errors.currentPassword}</p>
                        )}
                        <div className={styles.link}>
                            <Link href="/login/password">Forgot Password?</Link>
                        </div>
                    </div>

                    <div className={styles.input}>
                        <label>New Password*</label>
                        <input
                            name="newPassword"
                            type="password"
                            placeholder="Enter New Password"
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.newPassword && formik.errors.newPassword && (
                            <p>{formik.errors.newPassword}</p>
                        )}
                    </div>

                    <div className={styles.input}>
                        <label>Confirm New Password*</label>
                        <input
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm New Password"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                            <p>{formik.errors.confirmPassword}</p>
                        )}
                    </div>

                    <button type="submit">Update Password</button>
                </form>
            </div>
        </>
    )
}