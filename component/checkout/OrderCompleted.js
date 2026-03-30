'use client'
import {CheckOutlined} from '@ant-design/icons'
import { useEffect, useState } from 'react'
import styles from './OrderComplete.module.css'

export default function OrderComplete() {
    const [billing, setBilling] = useState(null)
    const [cart, setCart] = useState([])
    const [payment, setPayment] = useState('')

    useEffect(() => {
        const billingData = localStorage.getItem('checkout')
        const cartData = localStorage.getItem('cart')
        const paymentData = localStorage.getItem('payment')

        if (billingData) setBilling(JSON.parse(billingData))
        if (cartData) setCart(JSON.parse(cartData))
        if (paymentData) setPayment(paymentData)

        if (billingData && cartData) {
            const billing = JSON.parse(billingData)
            const cart = JSON.parse(cartData)
            const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
            const shipping = subtotal > 100 ? 0 : 10
            const tax = subtotal * 0.1
            const total = subtotal + shipping + tax

            const newOrder = {
                id: Date.now(),
                ...billing,
                payment: paymentData,
                items: cart,
                subtotal,
                shipping,
                tax,
                total,
                createdAt: new Date().toISOString(),
                status: 'confirmed',
                statusHistory: [
                    {status: 'confirmed', date: new Date().toISOString()}
                ]
            }

            const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')

            const alreadySaved = existingOrders.some(o => o.orderId === billing.orderId)
            if (!alreadySaved) {
                localStorage.setItem('orders', JSON.stringify([newOrder, ...existingOrders]))
            }
        }
    }, [])

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = subtotal > 100 ? 0 : 10
    const tax = subtotal * 0.1
    const total = subtotal + shipping + tax

    const handleDownload = (billing) => {
        const invoice = `
        INVOICE
        =======
        Order Id : ${billing.orderId}
        Transaction Id : ${billing.transactionId}
        Name: ${billing?.firstName} ${billing?.lastName}
        Phone: ${billing?.phone}
        Email : ${billing.email}
        Address: ${billing?.streetAddress}, ${billing?.city}, ${billing?.state}, ${billing?.zipCode}
        Country: ${billing?.country}
        Payment: ${payment}
        Delivery Address : ${billing?.deliveryAddress}
        
        ITEMS
        -----
        Product : 
        ${cart.map(item => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n')}
        
        Subtotal: $${(subtotal).toFixed(2)}
        Shipping: $${(shipping).toFixed(2)}
        Tax: $${(tax).toFixed(2)}
        Total: $${(total).toFixed(2)}
        `
        const blob = new Blob([invoice], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'invoice.txt'
        a.click()
        URL.revokeObjectURL(url)

    }

    return (
        <div className={styles.orderComplete}>
            <div className={styles.title}>
                <div className={styles.iconCompleted}>
                    <CheckOutlined />
                </div>
                <h1>Your order is completed!</h1>
                <p>Thank you. Your order has been received.</p>
            </div>

            <div className={styles.orderInformation}>
                <div className={styles.info}>
                    <div className={styles.infoTitle}>
                        <p>Order Id</p>
                    </div>
                    <div className={styles.desc}>
                        <p>{billing?.orderId}</p>
                    </div>
                </div>
                <div className={styles.info}>
                    <div className={styles.infoTitle}>
                        <p>Payment</p>
                    </div>
                    <div className={styles.desc}>
                        <p>{payment}</p>
                    </div>
                </div>
                <div className={styles.info}>
                    <div className={styles.infoTitle}>
                        <p>Transaction Id</p>
                    </div>
                    <div className={styles.desc}>
                        <p>{billing?.transactionId}</p>
                    </div>
                </div>
                <div className={styles.info}>
                    <div className={styles.infoTitle}>
                        <p>Estimated Delivery Date</p>
                    </div>
                    <div className={styles.desc}>
                        <p>{billing?.estimatedDate}</p>
                    </div>
                </div>
                <button onClick={() => handleDownload(billing)} className={styles.downloadButton}>
                    Download Invoice
                </button>
            </div>
            <div className={styles.summary}>
                <div className={styles.titleSummary}>
                    <h2>Order Details</h2>
                </div>
                {cart.map(carts => (
                    <div key={carts.id} className={styles.item}>
                        <div>
                            <div className={styles.productInfo}>
                                <div className={styles.container}>
                                    <div className={styles.imageContainer}>
                                        <div className={styles.dummyImg}></div>
                                    </div>
                                    <div className={styles.nameColorSize}>
                                        <div className={styles.name}>
                                            <div className={styles.name}>{carts.name}</div>
                                        </div>
                                        <div className={styles.colorSize}>
                                            <div className={styles.color}>
                                                <p>Color : {carts.selectedColor}</p>
                                            </div>
                                            <div className={styles.line}></div>
                                            <div className={styles.size}>
                                                <p>Size : {carts.selectedSize}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.price}>
                                    <span>${(carts.price * carts.quantity).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div className={styles.priceInfo}>
                    <div className={styles.shipping}>
                        <div className={styles.titleInfo}>
                            Shipping :
                        </div>
                       <div className={styles.shippingPrice}>
                           ${(shipping).toFixed(2)}
                       </div>
                    </div>
                    <div className={styles.taxes}>
                        <div className={styles.titleInfo}>
                            <p>Taxes:</p>
                        </div>
                        <div className={styles.taxesPrice}>
                            ${(tax).toFixed(2)}
                        </div>
                    </div>
                    <div className={styles.total}>
                        <div className={styles.titleInfo}>
                            <p>Total:</p>
                        </div>
                        <div className={styles.totalPrice}>
                            <p>${(total).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}