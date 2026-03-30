'use client'
import { useState, useEffect } from "react";
import styles from './checkout.module.css'
import OrderSummary from "@/component/cart/OrderSummary";
import {useFormik} from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const COUNTRIES = ['Indonesia', 'United States', 'United Kingdom', 'Singapore', 'Malaysia', 'Australia']

const CITIES = {
    Indonesia: ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Bali'],
    'United States': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'],
    'United Kingdom': ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow'],
    Singapore: ['Singapore'],
    Malaysia: ['Kuala Lumpur', 'Johor Bahru', 'Penang', 'Kota Kinabalu'],
    Australia: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
}

const STATES = {
    Indonesia: ['DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Bali'],
    'United States': ['New York', 'California', 'Texas', 'Florida', 'Illinois'],
    'United Kingdom': ['England', 'Scotland', 'Wales', 'Northern Ireland'],
    Singapore: ['Central Region', 'East Region', 'West Region'],
    Malaysia: ['Selangor', 'Johor', 'Penang', 'Sabah', 'Sarawak'],
    Australia: ['New South Wales', 'Victoria', 'Queensland', 'Western Australia'],
}

export default function Checkout() {
    const [cart, setCart] = useState([])
    const router = useRouter()
    useEffect(() => {
        const saved = localStorage.getItem('cart')
        if (saved) {
            const parsed = JSON.parse(saved)
            const withQty = parsed.map(item => ({...item, quantity: Number(item.quantity) || 1}))
            setCart(withQty)
        }
    }, [])

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            company: '',
            country: '',
            streetAddress: '',
            city: '',
            state: '',
            zipCode: '',
            phone: '',
            email: '',
            deliveryAddress: ''
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('First name is required'),
            lastName: Yup.string().required('Last name is required'),
            company: Yup.string(),
            country: Yup.string().required('Select the country'),
            streetAddress: Yup.string().required('Street address is required'),
            city: Yup.string().required('Select the city'),
            state: Yup.string().required('Select the state'),
            zipCode: Yup.string().required('Zip code is required'),
            phone: Yup.string().required('Phone is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            deliveryAddress: Yup.string().required('Select the Delivery Address'),
        }),
        onSubmit: (values, { resetForm }) => {
            const orderData = {
                ...values,
                orderId: '#' + Date.now(),
                transactionId: 'TR' + crypto.randomUUID(),
                estimatedDate: new Date().toLocaleDateString(),
            }
            localStorage.setItem('checkout', JSON.stringify(orderData))
            resetForm()
            router.push('/cart/payment')
        },
    })

    return (
        <>
            <div className={styles.checkout}>
                <div className={styles.form}>
                    <div className={styles.title}>
                        <h1>Billing Details</h1>
                    </div>
                    <form id="submitForm" onSubmit={formik.handleSubmit} className={styles.inputForm}>
                        <div className={styles.row}>
                            <div className={styles.name}>
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

                            <div className={styles.name}>
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
                            <label htmlFor="company">Company (Optional)</label>
                            <input
                                name="company"
                                value={formik.values.company}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter Company Name"
                            />
                            {formik.touched.company && formik.errors.company && (
                                <p className={styles.errorText}>{formik.errors.company}</p>
                            )}

                            <div className={styles.formGroup}>
                                <label htmlFor="country">Country*</label>
                                <select
                                    id="country"
                                    name="country"
                                    value={formik.values.country}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={formik.touched.country && formik.errors.country ? styles.inputError : ''}
                                >
                                    <option value="">Select Country</option>
                                    {COUNTRIES.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                                {formik.touched.country && formik.errors.country && (
                                    <p className={styles.errorText}>{formik.errors.country}</p>
                                )}
                            </div>

                            <label htmlFor="streetAddress">Street Address*</label>
                            <input
                                name="streetAddress"
                                value={formik.values.streetAddress}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter Street Address"
                            />
                            {formik.touched.streetAddress && formik.errors.streetAddress && (
                                <p className={styles.errorText}>{formik.errors.streetAddress}</p>
                            )}

                            <label htmlFor="city">City*</label>
                            <select
                                id="city"
                                name="city"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={formik.touched.city && formik.errors.city ? styles.inputError : ''}
                            >
                                <option value="">Select City</option>
                                {(CITIES[formik.values.country] || []).map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                            {formik.touched.city && formik.errors.city && (
                                <p className={styles.errorText}>{formik.errors.city}</p>
                            )}

                            <label htmlFor="state">State*</label>
                            <select
                                id="state"
                                name="state"
                                value={formik.values.state}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={formik.touched.state && formik.errors.state ? styles.inputError : ''}
                            >
                                <option value="">Select State</option>
                                {(STATES[formik.values.country] || []).map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                            {formik.touched.state && formik.errors.state && (
                                <p className={styles.errorText}>{formik.errors.state}</p>
                            )}

                            <label htmlFor="zipCode">Zip Code*</label>
                            <input
                                name="zipCode"
                                value={formik.values.zipCode}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="number"
                                placeholder="Enter Zip Code"
                            />
                            {formik.touched.zipCode && formik.errors.zipCode && (
                                <p className={styles.errorText}>{formik.errors.zipCode}</p>
                            )}
                            <label htmlFor="phone">Phone Number*</label>
                            <input
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="number"
                                placeholder="Enter Phone Number"
                            />
                            {formik.touched.phone && formik.errors.phone && (
                                <p className={styles.errorText}>{formik.errors.phone}</p>
                            )}
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
                            <label htmlFor="deliveryAddress">Delivery Address*</label>
                            <div className={styles.deliveryAddress}>
                                <div className={styles.sameAddress}>
                                    <label>
                                        <input
                                            name="deliveryAddress"
                                            value="Same as shipping address"
                                            onChange={formik.handleChange}
                                            checked={formik.values.deliveryAddress === 'Same as shipping address'}
                                            type="radio"
                                        />
                                        <div className={styles.text}>
                                            <p>Same as shipping address</p>
                                        </div>
                                    </label>
                                </div>
                                <div className={styles.differentAddress}>
                                    <label>
                                        <input
                                            name="deliveryAddress"
                                            value="Different billing address"
                                            onChange={formik.handleChange}
                                            checked={formik.values.deliveryAddress === 'Different billing address'}
                                            type="radio"
                                        />
                                        <p>Use a different billing address</p>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className={styles.orderSummary}>
                    <OrderSummary cart={cart} showPaymentButton={true} onPayment={() => formik.submitForm()} />
                </div>

            </div>
        </>
    )
}