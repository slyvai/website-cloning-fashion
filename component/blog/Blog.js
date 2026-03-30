'use client'
import styles from "./Blog.module.css";
import axios from "axios";
import Link from "next/link";
import {Pagination} from 'antd';
import {useEffect, useState} from "react";

export default function Blog() {
    const [blogs, setBlogs] = useState([])
    const [current, setCurrent] = useState(1)
    const ITEMS_PER_PAGE = 9
    useEffect(() => {
        axios({
            method: 'get',
            url: '/api/posts'
        }).then(res => {
            setBlogs(res.data)
        }
        )
    }, [])

    const currentPosts = blogs.slice(
        (current - 1) * ITEMS_PER_PAGE,
        current * ITEMS_PER_PAGE
    )

    return (
        <>
            <div className={styles.containerBlog}>
                {currentPosts.map(blog => (
                    <div key={blog.id}>
                        <div className={styles.imageContainer}>
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
                    </div>
                ))}
            </div>
            <div className={styles.pagination}>
                <Pagination
                    current={current}
                    total={blogs.length}
                    pageSize={ITEMS_PER_PAGE}
                    onChange={(page) => setCurrent(page)}
                />
            </div>
        </>
    )
}