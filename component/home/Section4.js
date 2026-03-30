'use client'
import { useState, useEffect } from 'react';
import styles from './Section4.module.css';
import {Swiper, SwiperSlide} from "swiper/react";
import {StarOutlined, ArrowRightOutlined} from '@ant-design/icons';
import Link from "next/link";
export default function Section4() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('api/products')
            .then(res => res.json())
            .then(data => {
                    setProducts(data)
                }
            )
    }, [])

    return (
        <div className={styles.section4}>
            <div className={styles.container}>
                <div className={styles.textContainer}>
                    <div className={styles.subtitle}>
                        <p>Today Deals</p>
                    </div>
                    <div className={styles.title}>
                        <h1>Deals of the Day</h1>
                        <div></div>
                    </div>
                </div>
                <div className={styles.desc}>
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem <br/> accusantium doloremque laudantium, totam rem aperiam.</p>
                </div>
            </div>
            <div className={styles.grid}>
                <Swiper
                    slidesPerView={3}
                >
                    {products.map(products => (
                        <SwiperSlide>
                            <div key={products.id} className={styles.productCard}>
                                <div className={styles.imageContainer}>
                                    <div className={styles.dummyImg}></div>
                                </div>
                                <div className={styles.textGrid}>
                                    <div className={styles.productInfo}>
                                        <div className={styles.variant}>
                                            <p>{products.subCategory}</p>
                                        </div>
                                    </div>
                                    <div className={styles.title}>
                                        <h3>{products.name}</h3>
                                    </div>
                                    <div className={styles.price}>
                                        <p>${products.price}</p>
                                    </div>
                                    <div className={styles.rating}>
                                        <p><StarOutlined />{products.rating}</p>
                                    </div>
                                    <div className={styles.desc}>
                                        <p>{products.details.desc}</p>
                                    </div>
                                    <div className={styles.button}>
                                       <Link href={`/product-details/${products.id}`}>
                                           <button>Shop Now <ArrowRightOutlined /></button>
                                       </Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}