"use client"
import styles from './Payment.module.css'
import {useState, useEffect, useRef} from "react";
import Image from 'next/image'
import {useFormik} from "formik";
import * as Yup from "yup";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { FaCreditCard } from "react-icons/fa";

export default function Payment() {
    const [typeCard, setTypeCard] = useState('')
    const [savedCard, setSavedCard] = useState([])

    const formik = useFormik({
        initialValues: {
            cardName: '',
            cardNumber: '',
            expiryDate: '',
            CVV: '',
        },
        validationSchema: Yup.object({
            cardName: Yup.string().required('Card name is required'),
            cardNumber: Yup.string().required('Card number is required').max(19, 'Too long!').min(19, 'Too Short!'),
            expiryDate: Yup.string().required('Expiry Date is required').max(5, 'Too long!').min(5, 'Too Short!').matches(/^\d{2}\/\d{2}$/, "Expiry date must be in MM/YY format"),
            CVV: Yup.string().required('CVV is required').max(3),
        }),
        onSubmit: (values, {resetForm}) => {
            const card = {...values, typeCard}
            setSavedCard(prev => [...prev, card])
            toast.success('Successfully adding the card!')
            resetForm()
        },
    })

    useEffect(() => {
        const value = formik.values.cardNumber
        if (value.startsWith('4')) setTypeCard('Visa')
        else if (value.startsWith('5') || value.startsWith('2')) setTypeCard('Mastercard')
        else setTypeCard('')
    }, [formik.values.cardNumber])

    const isFirstRender = useRef(true)

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('savedCard') || '[]')
        if (saved) {
            setSavedCard(saved)
        }
    }, [])

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        if (savedCard) {
            localStorage.setItem('savedCard', JSON.stringify(savedCard))
        }
    }, [savedCard])

    const handleDelete = (index) => {
        const updated = savedCard.filter((_, i) => i !== index)
        setSavedCard(updated)
    }

    return (
        <>
            <ToastContainer position="top-center" autoClose={3000}/>
            <div className={styles.payment}>
                <div className={styles.paymentContainer}>
                    <div className={styles.paypal}>
                        <label>
                                <div className={styles.paypalText}>
                                    <div className={styles.icon}>
                                        <Image width={40} height={40} src="/icons/paypal-svgrepo-com.svg" alt="paypal"/>
                                    </div>
                                    <div className={styles.text}>
                                        <p>Paypal</p>
                                    </div>
                                </div>

                                <div className={styles.link}>
                                    <a href="https://www.paypal.com/id/home">Link Account</a>
                                </div>
                        </label>
                    </div>
                    {savedCard.map((card, index) => (
                        <div key={index} className={styles.savedCardOption}>
                            <label>
                                <div className={styles.creditCardText}>
                                    <div className={styles.icon}>
                                        {card.typeCard === 'Visa' ? (
                                            <Image width={80} height={80} src="/icons/visa-svgrepo-com.svg" alt="visa" />
                                        ) : (
                                            <Image width={60} height={60} src="/icons/mastercard-svgrepo-com.svg" alt="mastercard" />
                                        )}
                                    </div>
                                    <div className={styles.text}>
                                        <p>**** **** **** {String(card.cardNumber).slice(-4)}</p>
                                    </div>
                                </div>
                                <div className={styles.button}>
                                    <button style={{ color: 'red' }} onClick={() => handleDelete(index)}>Delete</button>
                                </div>
                            </label>
                        </div>
                    ))}
                    <div className={styles.googlePay}>
                        <label>
                            <div className={styles.googlePayText}>
                                <div className={styles.icon}>
                                    <Image width={40} height={40} src="/icons/google-color-svgrepo-com.svg" alt="googlepay"/>
                                </div>
                                <div className={styles.text}>
                                    <p>Google Pay</p>
                                </div>
                            </div>

                            <div className={styles.link}>
                                <a href="https://www.paypal.com/id/home">Link Account</a>
                            </div>
                        </label>
                    </div>
                    <div className={styles.debitCard}>
                        <div className={styles.labelCredit}>
                            <label>
                                <div className={styles.icon}>
                                    <FaCreditCard />
                                </div>
                                <div className={styles.text}>
                                    <p>Add New Credit Debit Card</p>
                                </div>
                            </label>
                        </div>

                        <div className={styles.form}>
                            <form onSubmit={formik.handleSubmit}>
                                <div className={styles.column}>
                                    <label htmlFor="cardName">Card Name*</label>
                                    <input
                                        name="cardName"
                                        value={formik.values.cardName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Ex. John doe"
                                    />
                                    {formik.touched.cardName && formik.errors.cardName && (
                                        <p className={styles.errorText}>{formik.errors.cardName}</p>
                                    )}
                                    <label htmlFor="cardNumber">Card Number*</label>
                                    <input
                                        name="cardNumber"
                                        value={formik.values.cardNumber}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        maxLength={19}
                                        type="text"
                                        placeholder="4721 9092 7897 8742"
                                    />
                                    {formik.touched.cardNumber && formik.errors.cardNumber && (
                                        <p className={styles.errorText}>{formik.errors.cardNumber}</p>
                                    )}
                                </div>

                                <div className={styles.row}>
                                    <div className={styles.numberInput}>
                                        <label htmlFor="cardName">Expiry Date*</label>
                                        <input
                                            name="expiryDate"
                                            value={formik.values.expiryDate}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            maxLength={5}
                                            placeholder="02/30"
                                        />
                                        {formik.touched.expiryDate && formik.errors.expiryDate && (
                                            <p className={styles.errorText}>{formik.errors.expiryDate}</p>
                                        )}
                                    </div>
                                    <div className={styles.numberInput}>
                                        <label htmlFor="cardName">CVV*</label>
                                        <input
                                            name="CVV"
                                            value={formik.values.CVV}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            maxLength={3}
                                            type="number"
                                            placeholder="000"
                                        />
                                        {formik.touched.CVV && formik.errors.CVV && (
                                            <p className={styles.errorText}>{formik.errors.CVV}</p>
                                        )}
                                    </div>
                                </div>
                                <button type="submit" onClick={formik.submitForm}>Add Card</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}