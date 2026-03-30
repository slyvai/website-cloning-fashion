"use client"
import styles from './Questions.module.css';
import {PlusOutlined, MinusOutlined} from '@ant-design/icons';
import {Collapse} from 'antd';
export default function Questions() {
    const items = panelStyle => [
        {
            key: '1',
            label: 'How can i place an order?',
            children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            style: panelStyle,
        },
        {
            key: '2',
            label: 'What payment methods do you accept?',
            children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            style: panelStyle,
        },
        {
            key: '3',
            label: 'Can I track my order after its been placed?',
            children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            style: panelStyle,
        },
        {
            key: '4',
            label: 'Do you offer costumer support?',
            children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            style: panelStyle,
        },
        {
            key: '5',
            label: 'What is your return policy?',
            children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            style: panelStyle,
        },
        {
            key: '6',
            label: 'How to Create Account?',
            children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            style: panelStyle,
        }
    ]
    const panelStyle = {
        background: '#ffffff',
        overflow: 'hidden',
    }
    return (
        <>
            <div className={styles.questionContainer}>
                <div className={styles.textContainer}>
                    <div className={styles.subtitle}>
                        <p>FAQ</p>
                    </div>
                    <div className={styles.title}>
                        <h1>Questions? Look here.</h1>
                    </div>
                </div>
                <div className={styles.content}>
                    <Collapse
                        items={items(panelStyle)}
                        defaultActiveKey={['1']}
                        expandIcon={({isActive}) => (isActive ? <MinusOutlined /> : <PlusOutlined />)}
                        expandIconPosition="end"
                    />
                </div>
            </div>
        </>
    )
}