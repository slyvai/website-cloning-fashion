'use client'
import {useEffect, useState} from "react";
import styles from './RelatedProducts.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import {StarOutlined, HeartOutlined, FullscreenOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Link from "next/link";

export default function RelatedProduct({products}) {
    const [related, setRelated] = useState([])
    const [hoveredId, setHoveredId] = useState(null)
    useEffect(() => {
        fetch(`/api/products`)
            .then(res => res.json())
            .then(data => {
                const filtered = data
                    .filter(item =>
                        item.subCategory === products?.subCategory &&
                        item.id !== products.id
                    )
                    .slice(0,4)
                setRelated(filtered)
            })
    }, [products]);

    const handleWishlist = (e, products) => {
        e.preventDefault()
        e.stopPropagation()

        const existing = JSON.parse(localStorage.getItem('wishlist') || '[]')

        const alreadyAdded = existing.find(item => item.id === products.id)
        if(!alreadyAdded) {
            const updated = [...existing, {
                ...products,
                selectedColor: products.details?.color?.[0] || null,
                selectedSize: products.details?.size?.[0] || null,
                addedAt: new Date().toLocaleDateString('en-US', {
                    day: 'numeric',
                    year: 'numeric',
                    month: 'long'
                })
            } ]
            localStorage.setItem('wishlist', JSON.stringify(updated))
            toast.success('Added to wishlist!')
        } else {
            toast.warning('Already in wishlist')
        }
    }
    const handleCart = (e, products) => {
        e.preventDefault()
        e.stopPropagation()

        const existing = JSON.parse(localStorage.getItem('cart') || '[]')

        const alreadyAdded = existing.find(item => item.id === products.id)
        if(!alreadyAdded) {
            const updated = [...existing, {
                ...products,
                selectedColor: products.details?.color?.[0] || null,
                selectedSize: products.details?.size?.[0] || null,
            } ]
            localStorage.setItem('cart', JSON.stringify(updated))
            toast.success('Added to cart!')
        } else {
            toast.warning('Already in cart')
        }
    }
    return (
        <>
            <ToastContainer position="top-center" autoClose={3000}/>
            <div className={styles.relatedProducts}>
                <div className={styles.textContainer}>
                    <div className={styles.subtitle}>
                        <p>Related Products</p>
                    </div>
                    <div className={styles.title}>
                        <h1>Explore Related Products</h1>
                    </div>
                </div>
                <div className={styles.grid}>
                    {related.length === 0 ? (
                        <div className={styles.noRelated}>
                            <p>No related products found</p>
                        </div>
                    ):(
                        <Swiper
                            slidesPerView={3.4}
                        >
                            {related.map(products => (
                                <SwiperSlide key={products.id}
                                             onMouseEnter={() => setHoveredId(products.id)}
                                             onMouseLeave={() => setHoveredId(null)}
                                             className={styles.productCard}
                                >
                                    <div className={styles.dummyImg}>
                                        <div className={styles.productContainer}>
                                            <div className={styles.discount}>
                                                <div className={styles.discountText}>
                                                    <div className={styles.text}>
                                                        <p>{products.discount}% Off</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.iconContainer}>
                                                <div className={`${styles.icon} ${hoveredId === products.id ? styles.iconVisible : ''}`}>
                                                    <div className={styles.iconInner} onClick={(e) => handleWishlist(e, products)}>
                                                        <HeartOutlined />
                                                    </div>
                                                    <Link className={styles.productLink} href={`/product-details/${products.id}`} key={products.id}>
                                                        <div className={styles.iconInner} >
                                                            <FullscreenOutlined />
                                                        </div>
                                                    </Link>
                                                    <div className={styles.iconInner} onClick={(e) => handleCart(e, products)}>
                                                        <ShoppingCartOutlined />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Link className={styles.productLink} href={`/product-details/${products.id}`} key={products.id}>
                                        <div className={styles.textGrid}>
                                            <div className={styles.productInfo}>
                                                <div className={styles.variant}>
                                                    <p>{products.subCategory}</p>
                                                </div>
                                                <div className={styles.rating}>
                                                    <p><StarOutlined />{products.rating}</p>
                                                </div>
                                            </div>
                                            <h3>{products.name}</h3>
                                            <div className={styles.price}>
                                                <div className={styles.priceDiscount}>
                                                    <p>${products.price - products.discount}</p>
                                                </div>
                                                <div className={styles.priceFixed}>
                                                    <p>${products.price.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        )}
                </div>
            </div>
        </>
    )
}