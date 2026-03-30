'use client'
import styles from './question.module.css'
import {PlusOutlined, MinusOutlined} from '@ant-design/icons';
import {Collapse} from 'antd';
import {useState} from "react";
const items = {
    general: [
        {
            key: '1',
            label: 'How can i place an order?',
            children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
            key: '2',
            label: 'What payment methods do you accept?',
            children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
            key: '3',
            label: 'Can I track my order after its been placed?',
            children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
            key: '4',
            label: 'Do you offer costumer support?',
            children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
            key: '5',
            label: 'What is your return policy?',
            children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
            key: '6',
            label: 'How to Create Account?',
            children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        }
    ],
    order: [
        {
            key: '1',
            label: 'Can I track my order after its been placed?',
            children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
            key: '2',
            label: 'What payment methods do you accept?',
            children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
            key: '3',
            label: 'Can I track my order after its been placed?',
            children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
    ],
    returns: [
        {
            key: '1',
            label: 'What is your return policy?',
            children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
            key: '2',
            label: 'Do you offer costumer support?',
            children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
    ],
    payment: [
        {
            key: '1',
            label: 'What payment methods do you accept?',
            children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        }
    ],
    account: [
        {
            key: '1',
            label: 'How to Create Account?',
            children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        }
    ]

}

const menuItems = [
    {key: 'general', label: 'General Information'},
    {key: 'order', label: 'Ordering & Shipping'},
    {key: 'returns', label: 'Returns & Exchanges'},
    {key: 'payment', label: 'Payment & Discounts'},
    {key: 'account', label: 'Account & Profile'},
]
export default function faq() {
    const [selected, setSelected] = useState('general')

    return (
        <>
            <div className={styles.question}>
                <div className={styles.contentContainer}>
                    <div className={styles.selection}>
                        {menuItems.map(item => (
                            <button key={item.key}
                            onClick={() => setSelected(item.key)}
                            >{item.label}</button>
                        ))}
                    </div>
                    <div className={styles.rightContent}>
                        <Collapse
                            key={selected}
                            items={items[selected].map(item => ({
                               ...item
                            }))}
                            defaultActiveKey={['1']}
                            expandIcon={({isActive}) => (isActive ? <MinusOutlined /> : <PlusOutlined />)}
                            expandIconPosition="end"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}