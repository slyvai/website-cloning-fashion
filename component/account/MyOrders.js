'use client'
import { useEffect, useState } from 'react'
import styles from './MyOrders.module.css'
import {toast, ToastContainer} from "react-toastify";
import {useRouter} from 'next/navigation'
import 'react-toastify/dist/ReactToastify.css'

const STATUS_LABELS = {
    confirmed: 'Order Placed',
    processing: 'Accepted',
    shipped: 'In Progress',
    out_for_delivery: 'On The Way',
    delivered: 'Delivered',
}
const STATUS_DESC = {
    confirmed: 'Your order has been placed',
    processing: 'Your order has been accepted',
    shipped: 'Your order is in progress',
    out_for_delivery: 'Your order is on the way',
    delivered: 'Your order has been delivered',
}

export default function MyOrders() {
    const [orders, setOrders] = useState([])

    const router = useRouter()

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('orders') || '[]')
        setOrders(saved)
    }, [])

    if (orders.length === 0) return <p>No orders yet.</p>

    const handleDownload = (order) => {
        const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        const shipping = subtotal > 100 ? 0 : 10
        const tax = subtotal * 0.1
        const total = subtotal + shipping + tax

        const invoice = `
        INVOICE
        =======
        Order Id : ${order.orderId}
        Transaction Id : ${order.transactionId}
        Name: ${order?.firstName} ${order?.lastName}
        Phone: ${order?.phone}
        Email : ${order.email}
        Address: ${order?.streetAddress}, ${order?.city}, ${order?.state}, ${order?.zipCode}
        Country: ${order?.country}
        Payment: ${order.payment}
        Delivery Address : ${order?.deliveryAddress}
        
        ITEMS
        -----
        ${order.items.map(item => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n')}
        
        Subtotal: $${subtotal.toFixed(2)}
        Shipping: $${shipping.toFixed(2)}
        Tax: $${tax.toFixed(2)}
        Total: $${total.toFixed(2)}
        `
        const blob = new Blob([invoice], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `invoice-${order.orderId}.txt`
        a.click()
        URL.revokeObjectURL(url)
    }
    const handleRemove = (orderId) => {
        const updated = orders.filter(order => order.id !== orderId)
        setOrders(updated)
        localStorage.setItem('orders', JSON.stringify(updated))
        toast.success("Order has been cancelled!")
    }
    return (
        <>
            <ToastContainer position="top-center"/>
        <div className={styles.container}>
            <h1>Orders ({orders.length})</h1>
            {orders.map(order => (
                <div key={order.id} className={styles.orderCard}>

                    <div className={styles.orderHeader}>
                        <div>
                            <p>Order ID:</p>
                            <strong>{order.orderId}</strong>
                        </div>
                        <div>
                            <p>Total: </p>
                            <strong>${order.total.toFixed(2)}</strong>
                        </div>
                        <div>
                            <p>Payment: </p>
                            <strong>{order.payment}</strong>
                        </div>
                        <div>
                            <p>Est. Delivery: </p>
                            <strong>{order.estimatedDate}</strong>
                        </div>
                    </div>

                    <div className={styles.orderItems}>
                        {order.items.map((item, index) => (
                            <div key={index} >
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
                        <div className={styles.bottom}>
                            <div className={styles.itemInfo}>
                                <div className={styles.itemInfo}>
                                    <div className={`${styles.tags} ${styles[order.status]}`}>
                                        <p>{STATUS_LABELS[order.status] || 'Order Placed'}</p>
                                    </div>
                                    <div className={styles.text}>
                                        <p>{STATUS_DESC[order.status] || 'Your order has been placed'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.buttonContainer}>
                                <div className={styles.buttonStart}>
                                    <div className={styles.buttonOrder}>
                                        <button onClick={() => router.push(`/track-order?orderId=${encodeURIComponent(order.orderId)}&email=${encodeURIComponent(order.email)}`)}>
                                            Track Order
                                        </button>
                                    </div>
                                    <div className={styles.buttonInvoice}>
                                        <button onClick={() => handleDownload(order)}>Invoice</button>
                                    </div>
                                </div>
                                <div className={styles.buttonEnd}>
                                    <div className={styles.buttonCancel}>
                                        <button onClick={() => handleRemove(order.id)}>Cancel Order</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                </div>
            ))}
        </div>
        </>
    )
}