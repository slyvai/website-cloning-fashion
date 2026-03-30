'use client';

import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './style/PageHeader.module.css';

const routeLabels = {
   contact: 'Contact Us',
    about: 'About Us',
    blog: 'Blog',
    shop: 'Shop',
    wishlist: 'Wishlist',
    account: 'Account',
    cart: 'Shopping Cart',
    faq: 'FAQs',
    ['product-details'] : "Products Detail",
    ['order-completed'] : "Order Completed",
    ['track-order'] : 'Track Your Order',
    checkout: "Checkout",
    men: 'Men',
    women: 'Women',
    accessories: 'Accessories',
};

function generateBreadcrumbs(pathname) {
    const segments = pathname.split('/').filter(Boolean);
    const items = [{ title: <Link href="/">Home</Link> }];

    if (pathname === '/checkout') {
        items.push({ title: <Link href="/cart">Shopping Cart</Link> })
        items.push({ title: 'Checkout' })
        return items
    }
    segments.forEach((segment, index) => {
        const href = '/' + segments.slice(0, index + 1).join('/')
        let label = routeLabels[segment];

        if (!label && index > 0 && segments[index - 1] === 'blog-details') {
            label = 'Blog Details';
        }

        if (!label && !isNaN(segment)) return

        items.push({ title: label ? <Link href={href}>{label}</Link> : label })
    });

    return items;
}

const pageTitles = {
   '/contact': 'Contact Us',
    '/about': 'About Us',
    '/blog': 'Our Blog',
    '/shop': 'Shop',
    '/wishlist': 'Wishlist',
    '/account': 'Account',
    '/cart': 'Shopping Cart',
    '/faq': 'FAQs',
    '/cart/checkout' : 'Checkout',
    '/order-completed' : 'Order Completed',
    '/product-details': 'Product Details',
    '/men': 'Men',
    '/women': 'Women',
    '/accessories': 'Accessories',
    '/track-order': 'Track Your Order'
};

export default function PageHeader() {
    const pathname = usePathname()

    const isHomePage = pathname === '/';
    const isCareer = pathname === '/career'
    const isPayment = pathname === '/cart/payment'
    const isComingSoon = pathname === '/coming-soon'
    const isSignUp = pathname === '/login/sign-up'
    const isSignIn = pathname === '/login/sign-in'
    const isCompleteProfile = pathname === '/login/complete-profile'
    const isPassword = pathname === '/login/password'
    if (isHomePage || isCareer || isComingSoon || isSignUp || isSignIn || isCompleteProfile || isPayment || isPassword) return null;


    const breadcrumbItems = generateBreadcrumbs(pathname);
    const title = pathname.startsWith('/blog-details/')
        ? 'Blog Details'
        :pathname.startsWith('/product-details/')
        ? 'Product Details'
        : pageTitles[pathname] ?? '';

    return (
        <div className={styles.textContainer}>
            <h1>{title}</h1>
            <Breadcrumb className={styles.breadcrumb} items={breadcrumbItems} />
        </div>
    );
}