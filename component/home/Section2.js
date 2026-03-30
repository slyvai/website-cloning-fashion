'use client'
import styles from "./Section2.module.css";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import {useState, useEffect} from 'react';
import {StarOutlined, HeartOutlined, FullscreenOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import Link from "next/link";
import {toast} from "react-toastify";
export default function Section2() {
    const [products, setProducts] = useState([])
    const [filter, setFilter] = useState([])
    const [hoveredId, setHoveredId] = useState(null)
    const [activeCategory, setActiveCategory] = useState('All')

    useEffect(() => {
        fetch('api/products')
        .then(res => res.json())
        .then(data => {
                setProducts(data)
                setFilter(data)
            }
        )
    }, [])

    const filterCategory = (category) => {
        setActiveCategory(category)
        if (category === 'All') {
            setFilter(products)
        } else {
            setFilter(products.filter(p => p.category === category))
        }
    }
    const handleWishlist = (e, products) => {
        e.preventDefault()
        e.stopPropagation()
        const existing = JSON.parse(localStorage.getItem('wishlist') || '[]')
        const alreadyAdded = existing.find(item => item.id === products.id)
        if (!alreadyAdded) {
            localStorage.setItem('wishlist', JSON.stringify([...existing, {
                ...products,
                selectedColor: products.details?.color?.[0] || null,
                selectedSize: products.details?.size?.[0] || null,
                addedAt: new Date().toLocaleDateString('en-US', {day: 'numeric', year: 'numeric', month: 'long'})
            }]))
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
        if (!alreadyAdded) {
            localStorage.setItem('cart', JSON.stringify([...existing, {
                ...products,
                selectedColor: products.details?.color?.[0] || null,
                selectedSize: products.details?.size?.[0] || null,
            }]))
            toast.success('Added to cart!')
        } else {
            toast.warning('Already in cart')
        }
    }

    return (
        <>
        <div className={styles.section2}>
            <div className={styles.products}>
                <div className={styles.textContainer}>
                    <div className={styles.subtitle}>
                        <p>Our Products</p>
                    </div>
                    <div className={styles.title}>
                        <h1>Our Top Seller Products</h1>
                        <div></div>
                    </div>
                </div>
                <div className={styles.filters}>
                    {['All', 'Women', 'Men', 'Accessories'].map(cat => (
                        <button className={styles.button}  key={cat}  onClick={() => filterCategory(cat)}>
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
            <div className={styles.grid}>
                <Swiper
                    slidesPerView={3.5}
                >
                    {filter.map(products => (
                        <SwiperSlide>
                        <div key={products.id}
                             onMouseEnter={() => setHoveredId(products.id)}
                             onMouseLeave={() => setHoveredId(null)}
                             className={styles.productCard}>
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
                                        <div
                                            className={`${styles.icon} ${hoveredId === products.id ? styles.iconVisible : ''}`}>
                                            <div className={styles.iconInner}
                                                 onClick={(e) => handleWishlist(e, products)}>
                                                <HeartOutlined/>
                                            </div>
                                            <Link className={styles.productLink}
                                                  href={`/product-details/${products.id}`}>
                                                <div className={styles.iconInner}>
                                                    <FullscreenOutlined/>
                                                </div>
                                            </Link>
                                            <div className={styles.iconInner}
                                                 onClick={(e) => handleCart(e, products)}>
                                                <ShoppingCartOutlined/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Link className={styles.productLink} href={`/product-details/${products.id}`}>
                                <div className={styles.textGrid}>
                                    <div className={styles.productInfo}>
                                        <div className={styles.variant}>
                                            <p>{products.subCategory}</p>
                                        </div>
                                        <div className={styles.rating}>
                                            <p><StarOutlined/>{products.rating}</p>
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
                        </div>
                        </SwiperSlide>
                        ))}
                </Swiper>
        </div>
        </div>
        </>
    )
}