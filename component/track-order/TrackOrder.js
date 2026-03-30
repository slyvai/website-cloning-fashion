'use client'
import { useEffect, useState } from 'react'
import styles from './TrackOrder.module.css'
import { useSearchParams } from 'next/navigation'
import { CheckCircleFilled, ClockCircleFilled } from '@ant-design/icons'
import { HiOutlineClipboardList, HiOutlineClipboardCheck } from "react-icons/hi";
import { FiBox } from "react-icons/fi";
import { TbTruckDelivery } from "react-icons/tb";

const STEPS = ['confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered']


const STEP_LABELS = {
    confirmed: 'Order Placed',
    processing: 'Accepted',
    shipped: 'In Progress',
    out_for_delivery: 'On The Way',
    delivered: 'Delivered',
}
const STEP_ICONS = {
    confirmed: <HiOutlineClipboardList />,
    processing: <HiOutlineClipboardCheck />,
    shipped: <FiBox/>,
    out_for_delivery: <TbTruckDelivery/>,
    delivered: <TbTruckDelivery/>
}

export default function TrackOrder() {
    const searchParams = useSearchParams()
    const [step, setStep] = useState(1)
    const [order, setOrder] = useState(null)
    const [orderId, setOrderId] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [searched, setSearched] = useState(false)

    const handleTrack = () => {
        setError('')
        setOrder(null)
        setSearched(true)

        if (!orderId || !email) {
            setError('Please fill in both Order ID and Email.')
            return
        }

        const orders = JSON.parse(localStorage.getItem('orders') || '[]')
        const found = orders.find(
            o => o.orderId === orderId && o.email?.toLowerCase() === email.toLowerCase()
        )

        if (!found) {
            setError('No order found. Please check your Order ID and Email.')
            return
        }

        setOrder(found)
        setStep(2)
    }

    useEffect(() => {
        if (!order) return

        const createdAt = new Date(order.createdAt).getTime()
        const now = Date.now()
        const minutesPassed = (now - createdAt) / 600000

        let autoStatus = 'confirmed'
        if (minutesPassed >= 10) autoStatus = 'processing'
        if (minutesPassed >= 20) autoStatus = 'shipped'
        if (minutesPassed >= 30) autoStatus = 'out_for_delivery'
        if (minutesPassed >= 40) autoStatus = 'delivered'

        if (autoStatus !== order.status) {
            const newIndex = STEPS.indexOf(autoStatus)

            const statusHistory = STEPS.slice(0, newIndex + 1).map((s, i) => {

                const existing = order.statusHistory?.find(h => h.status === s)
                return existing || {
                    status: s,
                    date: new Date(createdAt + i * 60 * 1000).toISOString()
                }
            })

            const updatedOrder = { ...order, status: autoStatus, statusHistory }


            const orders = JSON.parse(localStorage.getItem('orders') || '[]')
            const updatedOrders = orders.map(o =>
                o.orderId === order.orderId ? updatedOrder : o
            )
            localStorage.setItem('orders', JSON.stringify(updatedOrders))
            setOrder(updatedOrder)
        }
    }, [order])

    useEffect(() => {
        const id = searchParams.get('orderId')
        const emailParam = searchParams.get('email')

        if (!id || !emailParam) return

        setOrderId(id)
        setEmail(emailParam)

        const orders = JSON.parse(localStorage.getItem('orders') || '[]')
        const found = orders.find(
            o => o.orderId === id && o.email?.toLowerCase() === emailParam.toLowerCase()
        )

        setOrder(found)
        setStep(2)
    }, [searchParams])

    const currentIndex = order ? STEPS.indexOf(order.status) : -1

    return (
        <div className={styles.container}>
            {step === 1 && (
                <>
                    <div className={styles.formContainer}>
                        <p className={styles.subtitle}>
                            To track your order please enter your Order ID in the box below and press the "Track Order" button.
                            This was given to you on your receipt and in the confirmation email you should have received.
                        </p>
                        <div className={styles.searchForm}>
                            <div className={styles.inputGroup}>
                                <label>Order ID*</label>
                                <input
                                    type="text"
                                    placeholder="Enter Your Order ID"
                                    value={orderId}
                                    onChange={e => setOrderId(e.target.value)}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Billing Email*</label>
                                <input
                                    type="email"
                                    placeholder="Enter Email Address"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <button className={styles.trackButton} onClick={handleTrack}>
                                Track Order
                            </button>
                        </div>

                        {searched && error && (
                            <p className={styles.error}>{error}</p>
                        )}
                    </div>

                </>
            )}

            {step === 2 && order && (
                <>
                    <div className={styles.orderMeta}>
                        <h1>Order Status</h1>
                        <p>Order ID: {order.orderId}</p>
                    </div>

                    <div className={styles.stepper}>
                        {STEPS.map((stepItem, index) => {
                            const isDone = index <= currentIndex
                            const isActive = index === currentIndex

                            return (
                                <div key={stepItem} className={styles.stepWrapper}>
                                    <div className={`${styles.stepIcon} ${isDone ? styles.iconDone : ''} ${isActive ? styles.iconActive : ''}`}>
                                        {STEP_ICONS[stepItem]}
                                        <div className={`${styles.circleInner} ${isDone ? styles.circleDone : ''} ${isActive ? styles.circleActive : ''}`}></div>
                                    </div>

                                    <div className={styles.dotRow}>
                                        <div className={`${styles.line} ${index > 0 && isDone ? styles.lineDone : ''} ${index === 0 ? styles.lineHidden : ''}`} />

                                        <div className={`${styles.dot} ${isDone ? styles.dotDone : ''} ${isActive ? styles.dotActive : ''}`}>
                                            {isDone
                                                ? <CheckCircleFilled />
                                                : <ClockCircleFilled />
                                            }
                                        </div>

                                        <div className={`${styles.line} ${index < currentIndex ? styles.lineDone : ''} ${index === STEPS.length - 1 ? styles.lineHidden : ''}`} />
                                    </div>

                                    <div className={`${styles.stepInfo} ${!isDone ? styles.pending : ''} ${isActive ? styles.activeText : ''}`}>
                                        <p className={styles.stepLabel}>{STEP_LABELS[stepItem]}</p>
                                        {order.statusHistory?.find(h => h.status === stepItem) && (
                                            <p className={styles.stepDate}>
                                                {new Date(order.statusHistory.find(h => h.status === stepItem).date).toLocaleString()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className={styles.items}>
                        <h2>Products</h2>
                        {order.items.map((item, index) => (
                            <div key={index} className={styles.itemRow}>
                                <div className={styles.productInfo}>
                                    <div className={styles.containerInfo}>
                                        <div className={styles.imageContainer}>
                                            <div className={styles.dummyImg}></div>
                                        </div>
                                        <div className={styles.nameColorSize}>
                                            <div className={styles.name}>
                                                <div className={styles.name}>{item.name}</div>
                                            </div>
                                            <div className={styles.colorSize}>
                                                <div className={styles.color}>
                                                    <p>Color : {item.selectedColor}</p>
                                                </div>
                                                <div className={styles.line}></div>
                                                <div className={styles.size}>
                                                    <p>Size : {item.selectedSize}</p>
                                                </div>
                                                <div className={styles.lineQuantity}></div>
                                                <div className={styles.quantity}>
                                                    <p>Qty : {item.quantity}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </>
            )}
        </div>
    )
}