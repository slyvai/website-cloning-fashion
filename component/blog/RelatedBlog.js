'use client'
import {useState, useEffect} from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import styles from "./RelatedBlog.module.css";
import Link from "next/link";

export default function RelatedBlog({blog}) {
    const [related, setRelated] = useState([])
    useEffect(() => {
        axios({
            method: 'get',
            url: `/api/posts`,
        }).then(res => {
            const filtered = res.data
                .filter(item =>
                    item.tags?.some (tag => blog?.tags?.includes(tag)) &&
                    item.id !== blog.id
                )
                .slice(0,4)
            setRelated(filtered)
        })

    }, [blog])
    return (
        <>
            <div className={styles.containerBlog}>
                    <div className={styles.textContainerBlog}>
                        <div className={styles.subtitle}>
                            <p>Related Blogs</p>
                        </div>
                        <div className={styles.title}>
                            <h1>Latest Related Blogs</h1>
                        </div>
                    </div>
                    <div className={styles.cardBlog}>
                        {related.length === 0 ? (
                            <div className={styles.noRelated}>
                                <p>No related blogs found</p>
                            </div>
                        ) : (
                            <Swiper
                                slidesPerView="auto"
                                spaceBetween={10}
                            >
                                {related.map(blog => (
                                    <SwiperSlide
                                        key={blog.id}
                                        className={styles.card}
                                    >
                                        <div className={styles.imageContainer} >
                                            <div className={styles.dummyImg}>
                                                <div className={styles.date}>
                                                    <div className={styles.dateContent}>
                                                        <p>{blog.date}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.textContainer}>
                                            <h2>{blog.title}</h2>
                                            <p>{blog.subtitle}</p>
                                        </div>
                                        <div className={styles.linkContainer}>
                                            <Link href={`/blog-details/${blog.id}`}>
                                                Read More
                                            </Link>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </div>
                </div>
            </>
    )
}