"use client"
import styles from './Payment.module.css'
import {useState, useEffect, useRef} from "react";
import {Breadcrumb} from 'antd'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from "next/navigation";
import {useFormik} from "formik";
import * as Yup from "yup";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { FaMoneyBill, FaCreditCard } from "react-icons/fa";
import OrderSummary from "@/component/cart/OrderSummary";

export default function Payment() {
    const [cart, setCart] = useState([])
    const [selectPayment, setSelectPayment] = useState('')
    const [typeCard, setTypeCard] = useState('')
    const [savedCard, setSavedCard] = useState([])
    const router = useRouter()
    const isFirstRender = useRef(true)

    useEffect(() => {
        const raw = localStorage.getItem('savedCard')
        if (!raw) return
        const saved = JSON.parse(raw)
        if (Array.isArray(saved)) setSavedCard(saved)
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
        onSubmit: (values, { resetForm }) => {
            const card = { ...values, typeCard }
            setSavedCard(prev => {
                const updated = Array.isArray(prev) ? [...prev, card] : [card]
                localStorage.setItem('savedCard', JSON.stringify(updated))
                return updated
            })
            setSelectPayment(`${card.typeCard} **** ${String(card.cardNumber).slice(-4)}`)
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

    const handleConfirm = () => {
        if (selectPayment) {
            localStorage.setItem('payment', selectPayment)
            router.push('/order-completed')
        } else {
            toast.warning('Please select the payment!')
        }
    }

    return (
        <>
            <ToastContainer position="top-center" autoClose={3000}/>
            <div className={styles.textContainer}>
                <h1>Checkout</h1>
                <Breadcrumb className={styles.breadcrumb} items ={[{title: <Link href="/">Home</Link>},{title: <Link href="/cart">Shopping Cart</Link>}, {title: <Link href="/checkout">Checkout</Link>}]} />
            </div>
            <div className={styles.payment}>
                <div className={styles.paymentContainer}>
                    <div className={styles.title}>
                        <h1>Select Payment Method</h1>
                    </div>
                        <div className={styles.paypal}>
                            <label>
                               <input
                                type="radio"
                                value="Paypal"
                                name="payment"
                                onChange={() => setSelectPayment('Paypal')}
                               />
                                <div className={styles.icon}>
                                    <Image width={40} height={40} src="/icons/paypal-svgrepo-com.svg" alt="paypal"/>
                                </div>
                                <div className={styles.text}>
                                    <p>Paypal</p>
                                </div>
                            </label>
                        </div>
                    {savedCard.map((card, index) => (
                        <div key={index} className={styles.savedCardOption}>
                            <label>
                                <input
                                    type="radio"
                                    value={card.typeCard}
                                    name="payment"
                                    onChange={() => setSelectPayment(`${card.typeCard}`)}
                                />
                                <div className={styles.icon}>
                                    {card.typeCard === 'Visa' ? (
                                        <Image width={80} height={80} src="/icons/visa-svgrepo-com.svg" alt="visa" />
                                    ) : card.typeCard === 'Mastercard' ? (
                                        <Image width={60} height={60} src="/icons/mastercard-svgrepo-com.svg" alt="mastercard" />
                                    ) : null}
                                </div>
                                <div className={styles.text}>
                                    <p>**** **** **** {String(card.cardNumber).slice(-4)}</p>
                                </div>
                            </label>
                        </div>
                    ))}
                        <div className={styles.googlePay}>
                            <label>
                                <input
                                    type="radio"
                                    value="Google Pay"
                                    name="payment"
                                    onChange={() => setSelectPayment('Google Pay')}
                                />
                                <div className={styles.icon}>
                                    <Image width={40} height={40} src="/icons/google-color-svgrepo-com.svg" alt="googlepay"/>
                                </div>
                                <div className={styles.text}>
                                    <p>Google Pay</p>
                                </div>
                            </label>
                        </div>
                        <div className={styles.cashOnDelivery}>
                            <label>
                                <input
                                    type="radio"
                                    value="Cash On Delivery"
                                    name="payment"
                                    onChange={() => setSelectPayment('Cash On Delivery')}
                                />
                                <div className={styles.icon}>
                                    <FaMoneyBill />
                                </div>
                                <div className={styles.text}>
                                    <p>Cash On Delivery</p>
                                </div>
                            </label>
                        </div>
                        <div className={styles.debitCard}>
                            <div className={styles.labelCredit}>
                                <label>
                                    <input
                                        type="radio"
                                        value="Debit Card"
                                        name="payment"
                                        onChange={() => setSelectPayment('Debit Card')}
                                    />
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
                <div className={styles.orderSummary}>
                    <OrderSummary cart={cart} showConfirmPaymentButton={true} onConfirmPayment={() => handleConfirm()} />
                </div>
            </div>
        </>
    )
}