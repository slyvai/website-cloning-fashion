'use client'
import {CloseOutlined, SearchOutlined, HeartOutlined, ShoppingCartOutlined, UserOutlined} from '@ant-design/icons';
import styles from "./style/Header.module.css";
import {usePathname} from 'next/navigation'
import Link from 'next/link';
export default function Header() {
    const pathname = usePathname()

    const isSignIn = pathname === ('/login/sign-in')
    const isSignUp= pathname === ('/login/sign-up')
    const isCompleteProfile = pathname === ('/login/complete-profile')
    const isPassword = pathname === ('/login/password')
    if(isSignIn || isSignUp || isCompleteProfile || isPassword) return null

    return(
        <>
            <div className={styles.offer}>
                <div className={styles.support}>
                    <p>Support (406) 555-0120</p>
                </div>
                <div className={styles.text}>
                    <p> Sign up and <span className={styles.textSpan1}>GET 25% OFF</span> for your first order. <span className={styles.textSpan2}><Link href="/login/sign-up">Sign up now.</Link></span></p>
                </div>
                <div className={styles.iconClose}>
                    <CloseOutlined />
                </div>
            </div>
            <header className={styles.header}>
                <div className={styles.logo}>
                    <p>Clothing.</p>
                </div>
                <div className={styles.nav}>
                        <nav>
                            <Link href="/">Home</Link>
                            <div className={styles.whiteContainer}>
                                <Link href="/shop">Shop</Link>
                                <div className={styles.menuDropdown}>
                                    <div>
                                        <h1>Women</h1>
                                        <div className={styles.navDropdown}>
                                            <Link href={`/shop?category=Women&sub=${encodeURIComponent('T-Shirts and Blouses')}`}>T-Shirts and Blouses</Link>
                                            <Link href={`/shop?category=Women&sub=${encodeURIComponent('Dresses')}`}>Dresses</Link>
                                            <Link href={`/shop?category=Women&sub=${encodeURIComponent('Jackets & Coats')}`}>Jackets & Coats</Link>
                                            <Link href={`/shop?category=Women&sub=${encodeURIComponent('Jeans')}`}>Jeans</Link>
                                            <Link href={`/shop?category=Women&sub=${encodeURIComponent('Knit')}`}>Knit</Link>
                                            <Link href={`/shop?category=Women&sub=${encodeURIComponent('Skirts')}`}>Skirts</Link>
                                            <Link href={`/shop?category=Women&sub=${encodeURIComponent('Hoodies')}`}>Hoodies</Link>
                                            <Link href={`/shop?category=Women&sub=${encodeURIComponent('Blazers')}`}>Blazers</Link>
                                            <Link href={`/shop?category=Women&sub=${encodeURIComponent('Activewear')}`}>Activewear</Link>
                                            <Link href={`/shop?category=Women&sub=${encodeURIComponent('Sleepwear')}`}>Sleepwear</Link>
                                            <Link href={`/shop?category=Women&sub=${encodeURIComponent('Trousers')}`}>Trousers</Link>
                                        </div>
                                    </div>
                                    <div>
                                        <h1>Men</h1>
                                        <div className={styles.navDropdown}>
                                            <Link href={`/shop?category=Men&sub=${encodeURIComponent('Blazers')}`}>Blazer</Link>
                                            <Link href={`/shop?category=Men&sub=${encodeURIComponent('T-Shirts and Shirts')}`}>T-Shirts and Shirts</Link>
                                            <Link href={`/shop?category=Men&sub=${encodeURIComponent('Jackets & Coats')}`}>Jackets & Coats</Link>
                                            <Link href={`/shop?category=Men&sub=${encodeURIComponent('Jeans')}`}>Jeans</Link>
                                            <Link href={`/shop?category=Men&sub=${encodeURIComponent('Trousers')}`}>Trousers</Link>
                                            <Link href={`/shop?category=Men&sub=${encodeURIComponent('Hoodies')}`}>Hoodies</Link>
                                            <Link href={`/shop?category=Men&sub=${encodeURIComponent('Activewear')}`}>Activewear</Link>
                                            <Link href={`/shop?category=Men&sub=${encodeURIComponent('Knit')}`}>Knit</Link>
                                            <Link href={`/shop?category=Men&sub=${encodeURIComponent('Shorts')}`}>Shorts</Link>
                                            <Link href={`/shop?category=Men&sub=${encodeURIComponent('Suits')}`}>Suits</Link>
                                        </div>
                                    </div>
                                    <div>
                                        <h1>Accessories</h1>
                                        <div className={styles.navDropdown}>
                                            <Link href={`/shop?category=Accessories&sub=${encodeURIComponent('Handbags')}`}>Handbags</Link>
                                            <Link href={`/shop?category=Accessories&sub=${encodeURIComponent('Watches')}`}>Watches</Link>
                                            <Link href={`/shop?category=Accessories&sub=${encodeURIComponent('Sunglasses')}`}>Sunglasses</Link>
                                            <Link href={`/shop?category=Accessories&sub=${encodeURIComponent('Hat')}`}>Hat</Link>
                                            <Link href={`/shop?category=Accessories&sub=${encodeURIComponent('Scarves')}`}>Scarves</Link>
                                            <Link href={`/shop?category=Accessories&sub=${encodeURIComponent('Belts')}`}>Belts</Link>
                                            <Link href={`/shop?category=Accessories&sub=${encodeURIComponent('Jewelry')}`}>Jewelry</Link>
                                            <Link href={`/shop?category=Accessories&sub=${encodeURIComponent('Bags')}`}>Bags</Link>
                                            <Link href={`/shop?category=Accessories&sub=${encodeURIComponent('Gloves')}`}>Gloves</Link>
                                        </div>
                                    </div>
                                    <div className={styles.imgContainer}>
                                        <div className={styles.imgDummy}></div>
                                    </div>
                                </div>
                            </div>


                            <div className={styles.whiteContainer}>
                                <Link href="/women">Women</Link>
                                <div className={styles.menuDropdown}>
                                    <div>
                                        <h1>Women</h1>
                                        <div className={styles.navDropdown}>
                                            <Link href={`/women?sub=${encodeURIComponent('T-Shirts and Blouses')}`}>T-Shirts and Blouses</Link>
                                            <Link href={`/women?sub=${encodeURIComponent('Dresses')}`}>Dresses</Link>
                                            <Link href={`/women?sub=${encodeURIComponent('Jackets & Coats')}`}>Jackets & Coats</Link>
                                            <Link href={`/women?sub=${encodeURIComponent('Jeans')}`}>Jeans</Link>
                                            <Link href={`/women?sub=${encodeURIComponent('Knit')}`}>Knit</Link>
                                            <Link href={`/women?sub=${encodeURIComponent('Skirts')}`}>Skirts</Link>
                                            <Link href={`/women?sub=${encodeURIComponent('Hoodies')}`}>Hoodies</Link>
                                            <Link href={`/women?sub=${encodeURIComponent('Blazers')}`}>Blazers</Link>
                                            <Link href={`/women?sub=${encodeURIComponent('Activewear')}`}>Activewear</Link>
                                            <Link href={`/women?sub=${encodeURIComponent('Sleepwear')}`}>Sleepwear</Link>
                                            <Link href={`/women?sub=${encodeURIComponent('Trousers')}`}>Trousers</Link>
                                        </div>
                                    </div>
                                    <div className={styles.imgContainer}>
                                        <div className={styles.imgDummy}></div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.whiteContainer}>
                                <Link href="/men">Men</Link>
                                <div className={styles.menuDropdown}>
                                    <div>
                                        <h1>Men</h1>
                                        <div className={styles.navDropdown}>
                                            <Link href={`/men?sub=${encodeURIComponent('Blazers')}`}>Blazer</Link>
                                            <Link href={`/men?sub=${encodeURIComponent('T-Shirts and Shirts')}`}>T-Shirts and Shirts</Link>
                                            <Link href={`/men?sub=${encodeURIComponent('Jackets & Coats')}`}>Jackets & Coats</Link>
                                            <Link href={`/men?sub=${encodeURIComponent('Jeans')}`}>Jeans</Link>
                                            <Link href={`/men?sub=${encodeURIComponent('Trousers')}`}>Trousers</Link>
                                            <Link href={`/men?sub=${encodeURIComponent('Hoodies')}`}>Hoodies</Link>
                                            <Link href={`/men?sub=${encodeURIComponent('Activewear')}`}>Activewear</Link>
                                            <Link href={`/men?sub=${encodeURIComponent('Knit')}`}>Knit</Link>
                                            <Link href={`/men?sub=${encodeURIComponent('Shorts')}`}>Shorts</Link>
                                            <Link href={`/men?sub=${encodeURIComponent('Suits')}`}>Suits</Link>
                                        </div>
                                    </div>
                                    <div className={styles.imgContainer}>
                                        <div className={styles.imgDummy}></div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.whiteContainer}>
                                <Link href="/accessories">Accessories</Link>
                                <div className={styles.menuDropdown}>
                                    <div>
                                        <h1>Accessories</h1>
                                        <div className={styles.navDropdown}>
                                            <Link href={`/accessories?sub=${encodeURIComponent('Handbags')}`}>Handbags</Link>
                                            <Link href={`/accessories?sub=${encodeURIComponent('Watches')}`}>Watches</Link>
                                            <Link href={`/accessories?sub=${encodeURIComponent('Sunglasses')}`}>Sunglasses</Link>
                                            <Link href={`/accessories?sub=${encodeURIComponent('Hat')}`}>Hat</Link>
                                            <Link href={`/accessories?sub=${encodeURIComponent('Scarves')}`}>Scarves</Link>
                                            <Link href={`/accessories?sub=${encodeURIComponent('Belts')}`}>Belts</Link>
                                            <Link href={`/accessories?sub=${encodeURIComponent('Jewelry')}`}>Jewelry</Link>
                                            <Link href={`/accessories?sub=${encodeURIComponent('Bags')}`}>Bags</Link>
                                            <Link href={`/accessories?sub=${encodeURIComponent('Gloves')}`}>Gloves</Link>
                                        </div>
                                    </div>
                                    <div className={styles.imgContainer}>
                                        <div className={styles.imgDummy}></div>
                                    </div>
                                </div>
                            </div>
                            <Link href="/about">About Us</Link>
                            <Link href="/contact">Contact Us</Link>
                            <Link href="/blog">Blog</Link>
                        </nav>
                </div>
                <div className={styles.icons}>
                    <SearchOutlined />
                    <Link href="/wishlist"><HeartOutlined /></Link>
                    <Link href="/cart"><ShoppingCartOutlined /></Link>
                    <Link href="/account"><UserOutlined /></Link>
                </div>
            </header>
        </>
    )
}