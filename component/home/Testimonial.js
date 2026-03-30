'use client'
import styles from "./Testimonial.module.css";
import { FaQuoteLeft } from "react-icons/fa";
import { useRef } from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules'
import {ArrowRightOutlined, ArrowLeftOutlined} from '@ant-design/icons'
import ImageSlide from "../image/team-image1.webp";
import Image from "next/image";
import {Rate} from 'antd'
export default function Testimonial() {
    const prevBtnRef = useRef(null)
    const nextBtnRef = useRef(null)
    const reviews = [
        {id: 1, name: 'Leslie Alexander', profession: 'Fashion Enthusiast', rating: 5, review: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'},
        {id: 2, name: 'Leslie Alexander', profession: 'Fashion Enthusiast', rating: 5, review: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'},
        {id: 3, name: 'Leslie Alexander', profession: 'Fashion Enthusiast', rating: 5, review: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'},
        {id: 4, name: 'Leslie Alexander', profession: 'Fashion Enthusiast', rating: 5, review: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'},
        {id: 5, name: 'Leslie Alexander', profession: 'Fashion Enthusiast', rating: 5, review: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'},

    ]
    return (
        <>
        <div className={styles.testimonial}>
            <div className={styles.textContainer}>
                <div className={styles.subtitle}>
                    <p>Testimonial</p>
                    <div className={styles.title}>
                        <h1>What Our Clients Say</h1>
                    </div>
                </div>
                <div className={styles.navigation}>
                    <button ref={prevBtnRef} className={styles.prevBtn}><ArrowLeftOutlined /></button>
                    <button ref={nextBtnRef} className={styles.nextBtn}><ArrowRightOutlined /></button>
                </div>
            </div>
            <Swiper
                modules={[Navigation]}
                slidesPerView={1}
                navigation={{
                    nextEl: nextBtnRef.current,
                    prevEl: prevBtnRef.current,
                }}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevBtnRef.current
                    swiper.params.navigation.nextEl = nextBtnRef.current
                }}
            >
                {reviews.map(review => (
                <SwiperSlide >
                    <div key={review.id} className={styles.container}>
                        <div className={styles.subContainer}>
                            <div className={styles.subContent}>
                                <div className={styles.image}>
                                    <div className={styles.containerIcon}>
                                        <div className={styles.quotesIcon}>
                                            <FaQuoteLeft />
                                        </div>
                                    </div>
                                    <div className={styles.imageContainer}>
                                        <Image src={ImageSlide} alt="Image" fill objectFit="cover" />
                                    </div>
                                </div>
                                <div className={styles.text}>
                                    <div className={styles.rating}><Rate style={{fontSize: '1.7vw'}} disable defaultValue={review.rating}/>5.0</div>
                                    <div className={styles.review}>{review.review}</div>
                                    <div className={styles.name}>
                                        <div className={styles.nameText}>
                                            {review.name}
                                        </div>
                                        <div className={styles.professionText}>
                                            {review.profession}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </SwiperSlide>
                ))}
            </Swiper>

        </div>
        </>
    )
}