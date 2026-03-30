'use client'
import {useState} from "react";
import Link from 'next/link'
import Personal from "./Personal";
import styles from './Account.module.css'
import MyOrders from "@/component/account/MyOrders";
import AddAddress from "@/component/account/Address";
import Payment from "@/component/account/Payment";
import PasswordManage from "@/component/account/PasswordManage";
export default function Account() {
    const [activeTab, setActiveTab] = useState('personal')
    return (
        <>
            <div className={styles.accountContainer}>
                <div className={styles.tabButtons}>
                    <button
                        className={activeTab === 'personal' ? styles.activeTab : ''}
                        onClick={() => setActiveTab('personal')}
                    >
                        Personal Information
                    </button>
                    <button
                        className={activeTab === 'orders' ? styles.activeTab : ''}
                        onClick={() => setActiveTab('orders')}
                    >
                        My Orders
                    </button>
                    <button
                        className={activeTab === 'manage' ? styles.activeTab : ''}
                        onClick={() => setActiveTab('manage')}
                    >
                        Manage Address
                    </button>
                    <button
                        className={activeTab === 'payment' ? styles.activeTab : ''}
                        onClick={() => setActiveTab('payment')}
                    >
                        Payment Method
                    </button>
                    <button
                        className={activeTab === 'password' ? styles.activeTab : ''}
                        onClick={() => setActiveTab('password')}
                    >
                        Password Manager
                    </button>
                    <button
                        className={activeTab === 'logout' ? styles.activeTab : ''}
                        onClick={() => setActiveTab('logout')}
                    >
                        Logout
                    </button>
                </div>

                <div className={styles.line}></div>
                <div className={styles.tabContent}>
                    {activeTab === 'personal' && (
                        <div>
                            <Personal />
                        </div>
                    )}
                    {activeTab === 'orders' && (
                        <div>
                            <MyOrders />
                        </div>
                    )}
                    {activeTab === 'manage' && (
                        <div>
                            <AddAddress/>
                        </div>
                    )}
                    {activeTab === 'payment' && (
                        <div>
                            <Payment />
                        </div>
                    )}
                    {activeTab === 'password' && (
                        <div>
                            <PasswordManage />
                        </div>
                    )}
                    {activeTab === 'logout' && (
                        <div className={styles.logout}>
                            <div className={styles.title}>
                                <h1>Logout</h1>
                                <p>Are you sure you want to log out?</p>
                            </div>
                            <div className={styles.button}>
                                <Link href="/login/sign-in">
                                    <button>Yes, Logout</button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </>
    )
}