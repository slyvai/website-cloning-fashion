import styles from "@/component/about/AboutPage.module.css";
import { GiCottonFlower } from "react-icons/gi";
import { GiRolledCloth } from "react-icons/gi";
import {FacebookFilled, YoutubeFilled, TwitterOutlined, InstagramOutlined} from "@ant-design/icons"
import ImageGrid from "../image/about-us-grid.webp"
import ImageGrid2 from "../image/about-us-grid2.webp"
import ImageGrid3 from "../image/about-us-grid3.webp"
import ImageProducts from "../image/aboutus-sec2.webp"
import ImageTeam from "../image/team-image1.webp"
import ImageTeam2 from "../image/team-image2.webp"
import ImageTeam3 from "../image/team-image3.webp"
import Image from 'next/image'

export default function AboutPage() {
    return (
        <>
            <div className={styles.containerAbout}>
                <div className={styles.textContent}>
                    <div className={styles.subtitle}>
                        <p>Our Story</p>
                    </div>
                    <h1>Crafted with Care: Fine <br/> Materials, Thoughtful Design</h1>
                    <div className={styles.desc}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel aliquam bibendum, <br/> nisl nunc aliquet nisl, vel aliquam nisl nunc vel aliquam nisl.</p>
                    </div>
                    <span className={styles.textSpan}>
                        <p>Jenny Alexander</p>
                    </span>
                    <span className={styles.textSpan1}>
                        <p>Jenny Alexander * CEO</p>
                    </span>
                </div>
                <div className={styles.gridContainer}>
                    <div className={styles.gridItem1}>
                        <div className={styles.imageContainer}>
                            <Image src={ImageGrid} alt="About 1" />
                        </div>
                    </div>
                    <div className={styles.gridItem2}>
                        <div className={styles.imageContainer}>
                            <Image src={ImageGrid2} alt="About 1" />
                        </div>
                    </div>
                    <div className={styles.gridItem3}>
                        <div className={styles.imageContainer}>
                            <Image src={ImageGrid3} alt="About 1" />
                        </div>
                    </div>
                </div>
                <div className={styles.yellowContainer}>
                    <div className={styles.yellowContainerItem}>
                        <h4>25+</h4>
                        <p>Years</p>
                    </div>
                    <div className={styles.yellowContainerItem}>
                        <h4>180+</h4>
                        <p>Stores</p>
                    </div>
                    <div className={styles.yellowContainerItem}>
                        <h4>100k</h4>
                        <p>Customers</p>
                    </div>
                    <div className={styles.yellowContainerItem}>
                        <h4>35+</h4>
                        <p>Awards</p>
                    </div>
                    <div className={styles.yellowContainerItem}>
                        <h4>98+</h4>
                        <p>Satisfied</p>
                    </div>
                </div>
                <div className={styles.grayContainer}>
                    <div className={styles.imageContainer}>
                        <div className={styles.innerImageContainer}>
                            <Image src={ImageProducts} alt="About 1" />
                        </div>
                    </div>
                    <div className={styles.textGrayContainer}>
                        <div className={styles.titleGrayContainer}>
                            <div className={styles.subtitle}>
                                <p>Our Product Quality</p>
                            </div>

                            <h1>We Make Things Comfy, <br/> Pretty and Fancy</h1>
                            <div className={styles.desc}>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel aliquam bibendum, nisl nunc aliquet nisl.</p>
                            </div>
                        </div>

                        <div className={styles.iconContainer}>
                            <div className={styles.cotton}>
                                <div className={styles.iconCotton}>
                                    <GiCottonFlower />
                                    <div className={styles.iconBoxInner}></div>
                                </div>
                                <div className={styles.text}>
                                    <div className={styles.title}>
                                        <p>100% Cotton</p>
                                    </div>
                                    <div className={styles.subtitle}>
                                        <p>Lorem ipsum dolor sit amet <br/> Sed euismod, nunc vel aliquam</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.fabric}>
                                <div className={styles.iconFabric}>
                                    <GiRolledCloth />
                                    <div className={styles.iconBoxInner}></div>
                                </div>
                                <div className={styles.text}>
                                    <div className={styles.title}>
                                        <p>Breathable Fabric</p>
                                    </div>
                                    <div className={styles.subtitle}>
                                        <p>Lorem ipsum dolor sit amet <br/> Sed euismod, nunc vel aliquam</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.ourTeam}>
                    <div className={styles.textTeamContainer}>
                        <div className={styles.subtitle}>
                            <p>Our Team</p>
                        </div>
                        <div className={styles.title}>
                            <h1>Meet Our Team</h1>
                        </div>
                    </div>
                    <div className={styles.teamContainer}>
                        <div className={styles.teamItem}>
                            <div className={styles.imageContainer}>
                                <div className={styles.innerImageContainer}>
                                    <Image src={ImageTeam} alt="About 1" />
                                </div>
                                <div className={styles.mediaSocial}>
                                    <div className={styles.socialIcon}>
                                        <div className={styles.socialIconInner}>
                                            <FacebookFilled />
                                        </div>
                                        <div className={styles.socialIconInner}>
                                            <YoutubeFilled />
                                        </div>
                                        <div className={styles.socialIconInner}>
                                            <TwitterOutlined />
                                        </div>
                                        <div className={styles.socialIconInner}>
                                            <InstagramOutlined />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.text}>
                                <div className={styles.name}>
                                    <h3>Arlene McCoy</h3>
                                </div>
                                <div className={styles.position}>
                                    <p>Fashion Designer</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.teamItem}>
                            <div className={styles.imageContainer}>
                                <div className={styles.innerImageContainer}>
                                    <Image src={ImageTeam2} alt="About 1" />
                                </div>
                                <div className={styles.mediaSocial}>
                                    <div className={styles.socialIcon}>
                                        <div className={styles.socialIconInner}>
                                            <FacebookFilled />
                                        </div>
                                        <div className={styles.socialIconInner}>
                                            <YoutubeFilled />
                                        </div>
                                        <div className={styles.socialIconInner}>
                                            <TwitterOutlined />
                                        </div>
                                        <div className={styles.socialIconInner}>
                                            <InstagramOutlined />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.text}>
                                <div className={styles.name}>
                                    <h3>Bessie Copper</h3>
                                </div>
                                <div className={styles.position}>
                                    <p>Founder& CEO</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.teamItem}>
                            <div className={styles.imageContainer}>
                                <div className={styles.innerImageContainer}>
                                    <Image src={ImageTeam3} alt="About 1" />
                                </div>
                                    <div className={styles.mediaSocial}>
                                        <div className={styles.socialIcon}>
                                            <div className={styles.socialIconInner}>
                                                <FacebookFilled />
                                            </div>
                                            <div className={styles.socialIconInner}>
                                                <YoutubeFilled />
                                            </div>
                                            <div className={styles.socialIconInner}>
                                                <TwitterOutlined />
                                            </div>
                                            <div className={styles.socialIconInner}>
                                                <InstagramOutlined />
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <div className={styles.text}>
                                <div className={styles.name}>
                                    <h3>Jenny Wilson</h3>
                                </div>
                                <div className={styles.position}>
                                    <p>Fashion Designer</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}