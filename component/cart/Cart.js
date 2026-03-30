'use client'
import {useState, useEffect} from "react";
import OrderSummary from "./OrderSummary";
import {Table, InputNumber} from 'antd'
import {CloseOutlined} from "@ant-design/icons"
import styles from './Cart.module.css'
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {useRouter} from "next/navigation";

export default function Cart() {
    const [cart, setCart] = useState([])
    const router = useRouter()

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('cart') || '[]')
        const withQty = saved.map(item => ({...item, quantity: Number(item.quantity) || 1}))
        setCart(withQty)
    }, []);

    const handleRemove = (id) => {
        const updated = cart.filter(item => item.id !== id)
        setCart(updated)
        localStorage.setItem('cart', JSON.stringify(updated))
        toast.success('Removed from cart!')
    }

    const updateLocalStorage = (updated) => {
        localStorage.setItem('cart', JSON.stringify(updated))
    }

    const handleQuantityChange = (id, value) => {
        const updated = cart.map(item =>
            item.id === id ? {...item, quantity: value} : item
        )
        setCart(updated)
        updateLocalStorage(updated)
    }
    const handleRemoveAll = () => {
        setCart([])
        localStorage.removeItem('cart')
        toast.success('Cart Cleared!')
    }
    const handleCheckout = () => {
        if (cart.length > 0) {
            router.push('/cart/checkout')
        } else {
            toast.warning('Add product to cart!')
        }
    }
    const columns = [
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <button
                    onClick={() =>handleRemove(record.id)}
                >
                    <CloseOutlined />
                </button>
            )
        },
        {
            title: 'Products',
            dataIndex: 'name',
            key: 'name',
            render: (name, record) => (
                <div className={styles.productInfo}>
                    <div className={styles.container}>
                        <div className={styles.imageContainer}>
                            <div className={styles.dummyImg}></div>
                        </div>
                        <div className={styles.nameColorSize}>
                            <div className={styles.name}>
                                <div className={styles.name}>{name}</div>
                            </div>
                            <div className={styles.colorSize}>
                                <div className={styles.color}>
                                    <p>Color : {record.selectedColor}</p>
                                </div>
                                <div className={styles.line}></div>
                                <div className={styles.size}>
                                    <p>Size : {record.selectedSize}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `$${price.toFixed(2)}`
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            render: (_, record) => (
                <InputNumber
                    mode="spinner"
                    min={1}
                    max={99}
                    value={record.quantity}
                    onChange={(value) => handleQuantityChange(record.id, value)}
                />
            )
        },
        {
            title: 'Subtotal',
            dataIndex: 'Subtotal',
            render: (_, record) => `$${(record.price * record.quantity).toFixed(2)}`
        }
    ]
    return (
        <>
             <div className={styles.cart}>
                 <div className={styles.cartTable}>
                     <ToastContainer position='top-center' autoClose={3000}/>
                     <Table
                         columns={columns}
                         dataSource={cart}
                         rowKey='id'
                         pagination={{ pageSize: 10 }}
                         locale={{ emptyText: 'Your cart is empty' }}
                     />
                     <div className={styles.button}>
                         <div className={styles.innerButton}>
                             <div className={styles.clear}>
                                 <button onClick={handleRemoveAll}>Clear Shopping Cart</button>
                             </div>
                         </div>
                     </div>

                 </div>
                 <div className={styles.orderSummary}>
                     <OrderSummary onCheckoutConfirm={() => handleCheckout()} cart={cart} showCheckoutButton={true}/>
                 </div>
             </div>
        </>
    )
}