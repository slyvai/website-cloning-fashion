'use client'
import styles from "./WomanPage.module.css";
import {useState, useEffect} from 'react';
import {StarOutlined, HeartOutlined, FullscreenOutlined, ShoppingCartOutlined} from '@ant-design/icons'
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {Checkbox, Pagination, Slider, Select} from 'antd'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link';

export default function WomanPage() {
    const [products, setProducts] = useState([])
    const [filter, setFilter] = useState([])
    const [hoveredId, setHoveredId] = useState(null)
    const [current, setCurrent] = useState(1)
    const [activeSubCategory, setActiveSubCategory] = useState([])
    const [activeColors, setActiveColors] = useState([])
    const [activeSizes, setActiveSizes] = useState([])
    const [sortBy, setSortBy] = useState('default')
    const [priceRange, setPriceRange] = useState([0, 300])

    const ITEMS_PER_PAGE = 12

    const searchParams = useSearchParams()

    useEffect(() => {
        const sub = searchParams.get('sub')
        if (sub) setActiveSubCategory([sub])
    }, [searchParams])

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                const women = data.filter(p => p.category === 'Women')
                setProducts(women)
                setFilter(women)
            })
    }, [])

    const allSubCategories = [...new Set(products.map(p => p.subCategory))]
    const allColors = [...new Set(products.flatMap(p => p.details?.color || []))]
    const allSizes = [...new Set(products.flatMap(p => p.details?.size || []))]

    useEffect(() => {
        let result = products


        if (activeSubCategory.length > 0) {
            result = result.filter(p => activeSubCategory.includes(p.subCategory))
        }
        if (activeColors.length > 0) {
            result = result.filter(p =>
                p.details?.color?.some(c => activeColors.includes(c))
            )
        }
        if (activeSizes.length > 0) {
            result = result.filter(p =>
                p.details?.size?.some(s => activeSizes.includes(s))
            )
        }
        result = result.filter(p =>
            p.price >= priceRange[0] && p.price <= priceRange[1]
        )

        if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price)
        if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price)
        if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating)
        if (sortBy === 'name-asc') result.sort((a, b) => a.name.localeCompare(b.name))
        if (sortBy === 'name-desc') result.sort((a, b) => b.name.localeCompare(a.name))
        if (sortBy === 'discount') result.sort((a, b) => b.discount - a.discount)

        setCurrent(1)
        setFilter(result)
    }, [activeSubCategory, activeColors, activeSizes, priceRange, sortBy, products])

    const toggleFilter = (value, state, setState) => {
        setState(prev =>
            prev.includes(value)
                ? prev.filter(v => v !== value)
                : [...prev, value]
        )
    }

    const currentProducts = filter.slice(
        (current - 1) * ITEMS_PER_PAGE,
        current * ITEMS_PER_PAGE
    )

    const handleWishlist = (e, products) => {
        e.preventDefault()
        e.stopPropagation()
        const existing = JSON.parse(localStorage.getItem('wishlist') || '[]')
        const alreadyAdded = existing.find(item => item.id === products.id)
        if (!alreadyAdded) {
            localStorage.setItem('wishlist', JSON.stringify([...existing, {
                ...products,
                selectedColor: products.details?.color?.[0] || null,
                selectedSize: products.details?.size?.[0] || null,
                addedAt: new Date().toLocaleDateString('en-US', {day: 'numeric', year: 'numeric', month: 'long'})
            }]))
            toast.success('Added to wishlist!')
        } else {
            toast.warning('Already in wishlist')
        }
    }

    const handleCart = (e, products) => {
        e.preventDefault()
        e.stopPropagation()
        const existing = JSON.parse(localStorage.getItem('cart') || '[]')
        const alreadyAdded = existing.find(item => item.id === products.id)
        if (!alreadyAdded) {
            localStorage.setItem('cart', JSON.stringify([...existing, {
                ...products,
                quantity: 1,
                selectedColor: products.details?.color?.[0] || null,
                selectedSize: products.details?.size?.[0] || null,
            }]))
            toast.success('Added to cart!')
        } else {
            toast.warning('Already in cart')
        }
    }
    const clearFilters = () => {
        setActiveSubCategory([])
        setActiveColors([])
        setActiveSizes([])
        setPriceRange([0, 300])
        setCurrent(1)
    }

    return (
        <>
            <ToastContainer position="top-center" autoClose={3000}/>
            <div className={styles.containerShop}>
                <div className={styles.shopContent}>
                    <div className={styles.sideBar}>
                        <div className={styles.titleSide}>
                            <h3>Filter Options</h3>
                        </div>

                        <div className={styles.filterGroup}>

                            <h3>Category</h3>
                            <div className={styles.scrollable}>
                                {allSubCategories.map(sub => (
                                    <Checkbox
                                        key={sub}
                                        checked={activeSubCategory.includes(sub)}
                                        onChange={() => toggleFilter(sub, activeSubCategory, setActiveSubCategory)}
                                    >{sub}</Checkbox>
                                ))}
                            </div>

                        </div>
                        <div className={styles.filterGroup}>
                            <h3>Price</h3>
                            <div className={styles.priceCategory}>
                                <p>${priceRange[0]} — ${priceRange[1]}</p>
                                <Slider
                                    range
                                    min={0}
                                    max={300}
                                    value={priceRange}
                                    onChange={(val) => setPriceRange(val)}
                                />
                            </div>


                        </div>

                        <div className={styles.filterGroup}>
                            <h3>Color</h3>
                            <div className={styles.colorOptions}>
                                {allColors.map(color => (
                                    <div
                                        key={color}
                                        onClick={() => toggleFilter(color, activeColors, setActiveColors)}
                                        style={{
                                            width: 28,
                                            height: 28,
                                            borderRadius: '50%',
                                            backgroundColor: color.toLowerCase(),
                                            cursor: 'pointer',
                                            border: activeColors.includes(color) ? '3px solid #000' : '2px solid #ddd',
                                            transition: 'border 0.2s'
                                        }}
                                        title={color}
                                    >
                                        <div style={{
                                            transform: 'translateX(2vw)'
                                        }}><p>{color}</p></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.filterGroup}>
                            <h3>Size</h3>
                            <div className={styles.sizeOptions}>
                                {allSizes.map(size => (
                                    <Checkbox
                                        key={size}
                                        checked={activeSizes.includes(size)}
                                        onChange={() => toggleFilter(size, activeSizes, setActiveSizes)}
                                    >{size}</Checkbox>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={styles.contentProducts}>
                        <div className={styles.filterTags}>
                            <div className={styles.filterTitle}>
                                <div className={styles.showingResult}>
                                    <h2>Showing result {' '}
                                        <strong>{(current - 1) * ITEMS_PER_PAGE + 1}</strong>{' '}-{' '}
                                        <strong>{Math.min(current * ITEMS_PER_PAGE, filter.length)}</strong> {' '}of{' '}{filter.length}
                                    </h2>
                                </div>
                                <div className={styles.sorting}>
                                    <h2>Sort by :</h2>
                                    <Select
                                        value={sortBy}
                                        onChange={(val) => setSortBy(val)}
                                        options={[
                                            {value: 'default', label: 'Default'},
                                            {value: 'price-asc', label: 'Price: Low to High'},
                                            {value: 'price-desc', label: 'Price: High to Low'},
                                            {value: 'rating', label: 'Top Rated'},
                                            {value: 'name-asc', label: 'Name: A to Z'},
                                            {value: 'name-desc', label: 'Name: Z to A'},
                                            {value: 'discount', label: 'Biggest Discount'},
                                        ]}
                                    />
                                </div>
                            </div>

                            <div className={styles.activeTags}>
                                <div><p>Active Filter :</p></div>
                                <div className={styles.tagsFilter}>
                                    {activeSubCategory.map(sub => (
                                        <span key={sub} className={styles.tag}>
                                                {sub}
                                            <button
                                                onClick={() => toggleFilter(sub, activeSubCategory, setActiveSubCategory)}>×</button>
                                             </span>
                                    ))}
                                    {activeColors.map(color => (
                                        <span key={color} className={styles.tag}>
                                                {color}
                                            <button
                                                onClick={() => toggleFilter(color, activeColors, setActiveColors)}>×</button>
                                            </span>
                                    ))}
                                    {activeSizes.map(size => (
                                        <span key={size} className={styles.tag}>
                                                {size}
                                            <button
                                                onClick={() => toggleFilter(size, activeSizes, setActiveSizes)}>×</button>
                                            </span>
                                    ))}
                                    {(priceRange[0] > 0 || priceRange[1] < 300) && (
                                        <span className={styles.tag}>
                                                Price: ${priceRange[0]} — ${priceRange[1]}
                                            <button onClick={() => setPriceRange([0, 300])}>×</button>
                                            </span>
                                    )}

                                    {(activeSubCategory !== 'All' || activeSubCategory.length > 0 || activeColors.length > 0 || activeSizes.length > 0 || priceRange[0] > 0 || priceRange[1] < 300) && (
                                        <button className={styles.clearAll} onClick={clearFilters}>
                                            Clear All
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={styles.grid}>
                            {currentProducts.map(products => (
                                <div key={products.id}
                                     onMouseEnter={() => setHoveredId(products.id)}
                                     onMouseLeave={() => setHoveredId(null)}
                                     className={styles.productCard}
                                >
                                    <div className={styles.dummyImg}>
                                        <div className={styles.productContainer}>
                                            <div className={styles.discount}>
                                                <div className={styles.discountText}>
                                                    <div className={styles.text}>
                                                        <p>{products.discount}% Off</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.iconContainer}>
                                                <div
                                                    className={`${styles.icon} ${hoveredId === products.id ? styles.iconVisible : ''}`}>
                                                    <div className={styles.iconInner}
                                                         onClick={(e) => handleWishlist(e, products)}>
                                                        <HeartOutlined/>
                                                    </div>
                                                    <Link className={styles.productLink}
                                                          href={`/product-details/${products.id}`}>
                                                        <div className={styles.iconInner}>
                                                            <FullscreenOutlined/>
                                                        </div>
                                                    </Link>
                                                    <div className={styles.iconInner}
                                                         onClick={(e) => handleCart(e, products)}>
                                                        <ShoppingCartOutlined/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Link className={styles.productLink} href={`/product-details/${products.id}`}>
                                        <div className={styles.textGrid}>
                                            <div className={styles.productInfo}>
                                                <div className={styles.variant}>
                                                    <p>{products.subCategory}</p>
                                                </div>
                                                <div className={styles.rating}>
                                                    <p><StarOutlined/>{products.rating}</p>
                                                </div>
                                            </div>
                                            <h3>{products.name}</h3>
                                            <div className={styles.priceInfo}>
                                                <div className={styles.priceDiscount}>
                                                    <p>${products.price - products.discount}</p>
                                                </div>
                                                <div className={styles.priceFixed}>
                                                    <p>${products.price.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.pagination}>
                    <Pagination
                        current={current}
                        total={filter.length}
                        pageSize={ITEMS_PER_PAGE}
                        onChange={(page) => setCurrent(page)}
                    />
                </div>
            </div>
        </>
    )
}