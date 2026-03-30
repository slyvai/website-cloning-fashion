'use client'
import { useState, useEffect } from 'react'
import Description from "./Description";
import RelatedProduct from "./RelatedProduct";
import styles from './Details.module.css'
import {Rate, InputNumber} from 'antd'
import {HeartOutlined, FacebookFilled, PinterestFilled, LinkedinFilled, TwitterOutlined, CloseOutlined} from '@ant-design/icons'
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

export default function PageDetails({ id }) {
    const [products, setProducts] = useState([])
    const [selectedColor, setSelectedColor] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [selectedSize, setSelectedSize] = useState(null)

    useEffect(() => {
        fetch(`/api/products/${id}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [id])


    const handleCart = (e) => {
        e.preventDefault()

        if(!selectedColor || !selectedSize) {
            toast.warning('Select a color and size!')
            return
        }

        const existing = JSON.parse(localStorage.getItem('cart') || '[]')

        const alreadyAdded = existing.find(item => item.id === products.id)
        if(alreadyAdded) {
           const updated = existing.map(item =>
            item.id === products.id
                ? {...item,
                    quantity: 1,
                    price: Number(products.price),
                    selectedSize,
                    selectedColor,
                    addedAt: new Date().toLocaleDateString('en-US', {
                        day: 'numeric',
                        year: 'numeric',
                        month: 'long'
                    })}
                :item
           )
            localStorage.setItem('cart', JSON.stringify(updated))
            toast.success('Added to cart!')
        } else {
            const updated = [...existing, {
                ...products,
                quantity: 1,
                price: Number(products.price),
                selectedSize,
                selectedColor,
            } ]
            localStorage.setItem('cart', JSON.stringify(updated))
            toast.success('Added to cart!')
        }
    }
    const handleWishlist = (e, products) => {
        e.preventDefault()
        e.stopPropagation()

        const existing = JSON.parse(localStorage.getItem('wishlist') || '[]')

        const alreadyAdded = existing.find(item => item.id === products.id)
        if(alreadyAdded) {
            const updated = existing.map(item =>
                item.id === products.id
                    ? {...item,
                        quantity: 1,
                        price: Number(products.price),
                        selectedSize,
                        selectedColor,
                        addedAt: new Date().toLocaleDateString('en-US', {
                            day: 'numeric',
                            year: 'numeric',
                            month: 'long'
                        })}
                    :item
            )
            localStorage.setItem('wishlist', JSON.stringify(updated))
            toast.success('Added to wishlist!')
        } else {
            const updated = [...existing, {
                ...products,
                quantity: 1,
                price: Number(products.price),
                selectedSize,
                selectedColor,
            } ]
            localStorage.setItem('wishlist', JSON.stringify(updated))
            toast.success('Added to wishlist!')
        }
    }

    const handleClear = () => {
        setQuantity(1)
        setSelectedColor(null)
        setSelectedSize(null)
    }


    return (
      <>
          <ToastContainer position="top-center" autoClose={3000}/>
        <div className={styles.container}>
            <div className={styles.productContainer}>
                <div className={styles.dummyImg}></div>
                <div className={styles.textContainer}>
                    <div className={styles.productTitle}>
                        <div className={styles.category}>
                            <p>{products.subCategory}</p>
                        </div>
                       <div className={styles.productName}>
                           <h1>{products.name}</h1>
                       </div>
                        <Rate disable defaultValue={products.rating}/>
                        <div className={styles.price}>
                            <div className={styles.priceDiscount}>
                                <p>${products.price - products.discount}</p>
                            </div>
                            <div className={styles.priceFixed}>
                                <p>${products.price}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.desc}>
                        <p>{products?.details?.desc}</p>
                    </div>
                    <div>
                        <div className={styles.containerInfo}>
                            <div className={styles.colorContainer}>
                                <div className={styles.selectColor}>
                                    <p><span>Color:</span> {selectedColor}</p>
                                </div>
                                <div className={styles.colors}>
                                    {products?.details?.color.map(color => (
                                        <div
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            style={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: '50%',
                                                backgroundColor: color,
                                                cursor: 'pointer',
                                                border: selectedColor === color ? '3px solid #000' : '2px solid #ddd',
                                                transition: 'border 0.2s',
                                            }}
                                        >
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.sizeContainer}>
                                <div className={styles.selectSize}>
                                    <p><span>Size:</span> {selectedSize}</p>
                                </div>
                                <div className={styles.size}>
                                    {products?.details?.size.map(size => (
                                        <div
                                            className={styles.sizeButton}
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            style={{
                                                padding: '7px 20px',
                                                border: selectedSize === size ? '2px solid #000' : '2px solid #ddd',
                                                borderRadius: 6,
                                                fontSize: 23,
                                                fontWeight: selectedSize === size ? 700 : 400,
                                                cursor: 'pointer',
                                                transition: 'border 0.2s'
                                            }}
                                        >{size} </div>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.clear}>
                                <button onClick={handleClear}>Clear <CloseOutlined/></button>
                                <div className={styles.inStock}>
                                    <p>{products?.stock}</p>
                                </div>
                            </div>
                            <div className={styles.buttons}>
                                <div className={styles.quantity}>
                                    <InputNumber
                                        mode="spinner"
                                        min={1}
                                        max={99}
                                        value={quantity}
                                        onChange={(value) => setQuantity(value)}
                                    />
                                </div>
                                <div className={styles.addCart}>
                                    <button onClick={(e) => handleCart(e, products)}>Add to Cart</button>
                                </div>
                                <div className={styles.buyNow}>
                                    <button>Buy Now</button>
                                </div>
                                <div className={styles.iconWish} onClick={(e) => handleWishlist(e, products)}>
                                    <HeartOutlined />
                                </div>
                            </div>
                        </div>
                        <div className={styles.lineContainer}></div>
                        <div className={styles.bottomContainer}>
                            <div className={styles.stockKeep}>
                                <h3>SKU :</h3>
                                <p>{products?.sku}</p>
                            </div>
                            <div className={styles.tags}>
                                <h3>Tags :</h3>
                                <p>{products.tags?.join(', ')}</p>
                            </div>
                            <div className={styles.share}>
                                <h3>Share :</h3>
                                <div className={styles.mediaSocial}>
                                    <div className={styles.icon}>
                                        <FacebookFilled />
                                    </div>
                                    <div className={styles.icon}>
                                        <PinterestFilled/>
                                    </div>
                                    <div className={styles.icon}>
                                        <LinkedinFilled />
                                    </div>
                                    <div className={styles.icon}>
                                        <TwitterOutlined />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Description id={id}/>
            <RelatedProduct products={products}/>
        </div>
      </>
    )
}