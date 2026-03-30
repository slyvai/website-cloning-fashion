'use client'
import styles from './Blog.module.css';
import { useState, useEffect } from 'react';
import Link from "next/link";

export default function Blog() {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        fetch('/api/posts')
            .then(res => res.json())
            .then(data => {
                setBlogs(data.slice(0,3))
            })
    }, [])
    return (
        <div className={styles.blogContainer}>
            <div className={styles.titleText}>
                <div className={styles.subtitle}>
                    <p>News & Blog</p>
                </div>
                <div className={styles.title}>
                    <h1>Our Latest News & Blogs</h1>
                </div>
            </div>
            <div className={styles.containerBlog}>
                {blogs.map(blog => (
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
        </div>
    );
}