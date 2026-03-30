'use client'
import styles from './Section6.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import 'swiper/css';

import SlideImage1 from '../image/slide1.webp';
import SlideImage2 from '../image/slide2.jpg';
import SlideImage3 from '../image/slide3.webp';
import SlideImage4 from '../image/slide4.webp';
import SlideImage5 from '../image/slide5.webp';
import SlideImage6 from '../image/slide6.webp';

const slides = [
    { src: SlideImage1, alt: 'Slide 1' },
    { src: SlideImage2, alt: 'Slide 2' },
    { src: SlideImage3, alt: 'Slide 3' },
    { src: SlideImage4, alt: 'Slide 4' },
    { src: SlideImage5, alt: 'Slide 5' },
    { src: SlideImage6, alt: 'Slide 6' },
];

export default function Section6() {
    return (
        <div className={styles.section6}>
            <div className={styles.container}>
                <div className={styles.textContainer}>
                    <p>Follow Us</p>
                    <h1>Follow Us On Instagram</h1>
                </div>

                <Swiper
                    slidesPerView={4.2}
                    spaceBetween={5}
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className={styles.dummyImg}>
                                <Image
                                    src={slide.src}
                                    alt={slide.alt}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}