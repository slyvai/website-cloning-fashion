'use client'
import axios from 'axios';
import styles from './BlogDetails.module.css';
import {FacebookOutlined, TwitterOutlined, LinkedinOutlined} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import RelatedBlog from "./RelatedBlog";
export default function BlogDetails({ id }) {
    const [blog, setBlog] = useState([]);
    useEffect(() => {
        axios({
            method: 'get',
            url: `/api/posts/${id}`,
        }).then(res => {
            setBlog(res.data)
        })

    }, [id])

    return (
        <>
            <div>
                <div className={styles.detailsBlog}>
                    <div className={styles.blogImg}>
                        <div className={styles.dummyImg}></div>
                    </div>

                    <div className={styles.textContainer}>
                        <div className={styles.tags}>
                            {blog.tags?.map((tag, index )=> (
                                <div className={styles.tagItem} key={index}>
                                    <p>{tag}</p>
                                </div>
                            ))}
                        </div>
                        <div className={styles.titleContainer}>
                            <h1>{blog.title}</h1>
                        </div>
                        <div className={styles.addInfo}>
                            <div className={styles.author}>
                                <div className={styles.authorInfo}>
                                    <div className={styles.authorImg}></div>
                                    <div className={styles.dateRead}>
                                        <div className={styles.name}>
                                            <p>Written By {blog.author}</p>
                                        </div>
                                        <div className={styles.info}>
                                            <div className={styles.date}>
                                                <p>{blog.date}</p>
                                            </div>
                                            <p>{blog.minRead} min read</p>
                                        </div>
                                     </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.mediaSocial}>
                            <div className={styles.share}>
                                <p>SHARE</p>
                            </div>
                            <div className={styles.facebook}>
                                <FacebookOutlined />
                            </div>
                            <div className={styles.twitter}>
                                <TwitterOutlined />
                            </div>
                            <div className={styles.linkedin}>
                                <LinkedinOutlined />
                            </div>
                        </div>
                        <div className={styles.contentText}>
                            <div className={styles.contentIntro}>
                                <div className={styles.capital}>
                                    <p>L</p>
                                </div>
                                <p>{blog.content}</p>
                            </div>
                            <div className={styles.introAdd}>
                                <p>{blog.content}</p>
                            </div>
                            <div id="content1" className={styles.content1}>
                                <h2>Fashion Trends Throughout the Year</h2>
                                <p>{blog.content}</p>
                                <div className={styles.imageContainer}>
                                    <div className={styles.dummyImg}></div>
                                    <div className={styles.dummyImg}></div>
                                </div>
                            </div>
                            <div id="content2" className={styles.content2}>
                                <h2>The Latest Trends in Fashion</h2>
                                <ul>
                                    <li>{blog.list}</li>
                                    <li>{blog.list}</li>
                                    <li>{blog.list}</li>
                                    <li>{blog.list}</li>
                                </ul>
                            </div>
                            <div className={styles.alsoRead}>
                                <h2>Also Read :</h2>
                                <div>{blog.title}</div>
                            </div>
                            <div id="content3" className={styles.content3}>
                                <h2>Crafting Your Own Fashion</h2>
                                <p>{blog.content}</p>
                                <div className={styles.imageContainer}>
                                    <div className={styles.dummyImg}></div>
                                </div>
                            </div>
                            <div id="content4" className={styles.content4}>
                                <h2>The Future of Fashion</h2>
                                <p>{blog.content}</p>
                            </div>
                                <div className={styles.content5}>
                                    <div className={styles.author}>
                                        <div className={styles.authorInfo}>
                                            <div className={styles.authorImg}></div>
                                            <div className={styles.dateRead}>
                                                <div className={styles.name}>
                                                    <p>Written By {blog.author}</p>
                                                </div>
                                                <div className={styles.info}>
                                                  <p>{blog.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <div className={styles.tableContent}>
                            <h2>Table Of Content</h2>
                            <ul>
                                <li>
                                    <a href="#content1">Fashion Trends Throughout the Year</a>
                                </li>
                                <li>
                                    <a href="#content2">The Latest Trends in Fashion</a>
                                </li>
                                <li>
                                    <a href="#content3">Crafting Your Own Fashion</a>
                                </li>
                                <li>
                                    <a href="#content4">The Future of Fashion</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <RelatedBlog blog={blog}/>
            </div>
        </>
    )
}