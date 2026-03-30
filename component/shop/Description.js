'use client'
import {useState, useEffect} from 'react'
import styles from './Description.module.css'
import {Rate, Table} from 'antd'
export default function Description({id}) {
    const [activeTab, setActiveTab] = useState('desc')
    const [products, setProducts] = useState(null)
    useEffect(() => {
        fetch(`/api/products/${id}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [id])
    const infoColumns = [
        { title: 'Feature', dataIndex: 'feature', key: 'feature' },
        { title: 'Description', dataIndex: 'description', key: 'description' }
    ]
    const infoData = [
        { key: '1', feature: 'Material', description: products?.details?.material },
        { key: '2', feature: 'Size',    description: products?.details?.size?.join(',')},
        { key: '3', feature: 'Color',    description: products?.details?.color?.join(',') },
        { key: '4', feature: 'Country',  description: products?.details?.country },
        { key: '5', feature: 'Brand',    description: products?.details?.brand },
    ]
    return (
        <>
            <div className={styles.tabButtons}>
                <button
                    className={activeTab === 'desc' ? styles.activeTab : ''}
                    onClick={() => setActiveTab('desc')}
                >
                    Description
                </button>
                <button
                    className={activeTab === 'info' ? styles.activeTab : ''}
                    onClick={() => setActiveTab('info')}
                >
                    Information
                </button>
                <button
                    className={activeTab === 'review' ? styles.activeTab : ''}
                    onClick={() => setActiveTab('review')}
                >
                    Reviews
                </button>
            </div>
            <div className={styles.line}></div>
            <div className={styles.tabContent}>
                {activeTab === 'desc' && (
                    <div className={styles.desc}>
                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <ul>
                            <li>100% Lorem ipsum dolor sit amet, consectetur adipiscing elit. </li>
                            <li> Sed do eiusmod tempor incididunt ut labore.</li>
                            <li> Consectetur adipiscing elit.</li>
                            <li>Lorem ipsum dolor sit amet.</li>
                        </ul>
                    </div>

                )}

                {activeTab === 'info' && (
                    <div>
                        <Table
                            dataSource={infoData}
                            columns={infoColumns}
                            pagination={false}
                            bordered
                        />
                    </div>
                )}

                {activeTab === 'review' && (
                    <div>
                        <Rate disabled defaultValue={products?.rating} />
                        <p>{products?.review} reviews</p>
                    </div>
                )}
            </div>
        </>
    )
}