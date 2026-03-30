'use client'

import styles from './OrderSummary.module.css'

export default function OrderSummary({ cart = [], onPayment, onCheckoutConfirm, onConfirmPayment, showCheckoutButton = false, showPaymentButton= false, showConfirmPaymentButton = false }) {
    const itemTotal = cart.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = 0
    const tax = subtotal * 0.1
    const total = subtotal + shipping + tax

    return (
            <div className={styles.textContainer}>
                <div className={styles.orderSummary}>
                    <div className={styles.title}>
                        <h2>Order Summary</h2>
                        <div className={styles.line}></div>
                    </div>

                    <div className={styles.totalContainer}>
                        <div className={styles.totalItem}>
                            <h3>Items</h3>
                            <p>{itemTotal}</p>
                        </div>
                        <div className={styles.subtotal}>
                            <h3>Sub Total</h3>
                            <p>${subtotal.toFixed(2)}</p>
                        </div>
                        <div className={styles.shipping}>
                            <h3>Shipping</h3>
                            <p>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</p>
                        </div>
                        <div className={styles.taxes}>
                            <h3>Taxes</h3>
                            <p>${tax.toFixed(2)}</p>
                        </div>
                    </div>

                    <div className={styles.total}>
                        <h3>Total</h3>
                        <p>${total.toFixed(2)}</p>
                    </div>

                    {showCheckoutButton && (
                        <div className={styles.buttonCheckout}>
                            <button onClick={onCheckoutConfirm}>Proceed to Checkout</button>
                        </div>
                    )}
                    {showPaymentButton && (
                        <div className={styles.buttonPayment}>
                            <button type="submit" form="submitForm" onClick={onPayment}>Proceed to Payment</button>
                        </div>
                    )}
                    {showConfirmPaymentButton && (
                        <div className={styles.buttonPayment}>
                            <button onClick={onConfirmPayment}>Confirm to Payment</button>
                        </div>
                    )}
                </div>
            </div>
    )
}