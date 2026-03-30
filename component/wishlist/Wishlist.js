'use client'
import {useState, useEffect} from "react";
import {Table, Button} from 'antd'
import {CloseOutlined} from '@ant-design/icons'
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import styles from "./Wishlist.module.css";

export default function Wishlist() {
    const [wishlist, setWishlist] = useState([])

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('wishlist') || '[]')
        setWishlist(saved)
    }, []);

    const handleCart = (e, wishlist) => {
        e.preventDefault()
        e.stopPropagation()

        const existing = JSON.parse(localStorage.getItem('cart') || '[]')

        const alreadyAdded = existing.find(item => item.id === wishlist.id)
        if(!alreadyAdded) {
            const updated = [...existing, wishlist ]
            localStorage.setItem('cart', JSON.stringify(updated))
            toast.success('Added to cart!')
        } else {
            toast.warning('Already in cart')
        }
    }

    const handleAddAllToCart = () => {
        const existing = JSON.parse(localStorage.getItem('cart') || '[]')

        const newItems = wishlist.filter(
            item => !existing.find(cart => cart.id === item.id)
        )
            const updated = [...existing, ...newItems ]
            setWishlist([])
            localStorage.removeItem('wishlist')
            localStorage.setItem('cart', JSON.stringify(updated))
            toast.success('All products added to cart!')
    }

    const handleRemoveAll = (id) => {
        setWishlist([])
        localStorage.removeItem('wishlist')
        toast.success('Wishlist Cleared!')
    }

    const handleRemove = (id) => {
        const updated = wishlist.filter(item => item.id !== id)
        setWishlist(updated)
        localStorage.setItem('wishlist', JSON.stringify(updated))
        toast.success('Removed from wishlist!')
    }

    const columns = [
        {
            title: '',
            key: 'remove',
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
            title: 'Date Added',
            dataIndex: 'addedAt',
            key: 'addedAt'
        },
        {
            title: 'Stock Status',
            dataIndex: 'stock',
            key: 'stock',
            render: (stock) => (
                <div style={{color:"green"}}>{stock}</div>
            )
        },
        {
            title: '',
            key: 'cart',
            render: (_, record) => (
                <Button
                    onClick={(e) => handleCart(e, record)}
                >
                   Add to Cart
                </Button>
            )
        }
    ]
    return (
        <>
            <div className={styles.wishlist}>
                <ToastContainer position='top-center' autoClose={3000}/>
                <Table
                    columns={columns}
                    dataSource={wishlist}
                    rowKey="id"
                    pagination=""
                    locale={{ emptyText: 'Your wishlist is empty' }}
                />
                <div className={styles.button}>
                    <div className={styles.innerButton}>
                        <div className={styles.clear}>
                            <button onClick={handleRemoveAll}>Clear Wishlist</button>
                        </div>
                        <div className={styles.addAll}>
                            <button onClick={handleAddAllToCart}>Add All to Cart</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}