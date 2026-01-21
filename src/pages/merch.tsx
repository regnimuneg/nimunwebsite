import Head from 'next/head'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from '@/styles/Merch.module.scss'

// All products for display with images
// Product Types for logic and display
type ProductType = 'playing-cards' | 'laptop-sleeve' | 'thermal-mug' | 'stress-ball' | 'poster' | 'fridge-magnet'

// Base Products (with prices and types)
const PRODUCTS = [
    { id: 'playing-cards', name: 'Playing Cards', type: 'playing-cards', price: 50, image: '/image/png/merch/Playing Cards.png' },
    { id: 'laptop-sleeve', name: 'Laptop Sleeve (17")', type: 'laptop-sleeve', price: 150, image: '/image/png/merch/laptop sleeve.jpg' },
    { id: 'thermal-mug', name: 'Thermal Mug', type: 'thermal-mug', price: 100, image: '/image/png/merch/thermal flask.jpeg' },
    { id: 'stress-ball', name: 'Stress Ball', type: 'stress-ball', price: 35, image: '/image/png/merch/stress ball.png' },
    // Posters
    { id: 'poster-1', name: 'Poster 1 (A4 Framed)', type: 'poster', price: 100, image: '/image/png/merch/1.png' },
    { id: 'poster-2', name: 'Poster 2 (A4 Framed)', type: 'poster', price: 100, image: '/image/png/merch/2.png' },
    { id: 'poster-3', name: 'Poster 3 (A4 Framed)', type: 'poster', price: 100, image: '/image/png/merch/3.png' },
    { id: 'poster-4', name: 'Poster 4 (A4 Framed)', type: 'poster', price: 100, image: '/image/png/merch/4.png' },
    // Magnets
    { id: 'fridge-magnet-design1', name: 'Fridge Magnet (Design 1)', type: 'fridge-magnet', price: 35, image: '/image/png/merch/Fridge Magnet.png' },
    { id: 'fridge-magnet-design2', name: 'Fridge Magnet (Design 2)', type: 'fridge-magnet', price: 35, image: '/image/png/merch/Fridge magnet 2.png' },
]

// Map ID to Type for quick lookups
const PRODUCT_TYPE_MAP: Record<string, string> = PRODUCTS.reduce((acc, p) => ({ ...acc, [p.id]: p.type }), {})

// Bundles with requirements configuration
const BUNDLES = [
    {
        id: 'all-items',
        name: 'All Items Bundle',
        price: 400,
        description: 'Everything included! Choose your preferred poster & magnet design.',
        includes: ['Playing Cards', 'Laptop Sleeve', 'Thermal Mug', 'Fridge Magnet', 'Stress Ball', 'Poster'],
        requirements: { 'playing-cards': 1, 'laptop-sleeve': 1, 'thermal-mug': 1, 'fridge-magnet': 1, 'stress-ball': 1, 'poster': 1 }
    },
    {
        id: 'essentials',
        name: 'Essentials Bundle',
        price: 200,
        description: 'Playing Cards + Stress Ball + 1 Fridge Magnet + 1 Poster. Choose your preferred designs!',
        includes: ['Playing Cards', 'Stress Ball', 'Fridge Magnet ×1', 'Poster ×1'],
        requirements: { 'playing-cards': 1, 'stress-ball': 1, 'fridge-magnet': 1, 'poster': 1 }
    },
    {
        id: 'sleeve-mug',
        name: 'Sleeve + Mug Bundle',
        price: 200,
        description: 'Laptop Sleeve + Thermal Mug',
        includes: ['Laptop Sleeve', 'Thermal Mug'],
        requirements: { 'laptop-sleeve': 1, 'thermal-mug': 1 }
    },
    {
        id: 'sleeve-mug-poster',
        name: 'Sleeve + Mug + Poster Bundle',
        price: 300,
        description: 'Laptop Sleeve + Thermal Mug + 1 Poster. Choose your preferred poster design!',
        includes: ['Laptop Sleeve', 'Thermal Mug', 'Poster ×1'],
        requirements: { 'laptop-sleeve': 1, 'thermal-mug': 1, 'poster': 1 }
    },
]

const COUNCILS = ['PRESS', 'HRC', 'DISEC', 'ICJ']

export default function Merch() {
    const [cart, setCart] = useState<Record<string, number>>({})

    // Derived state: Detect matching bundle
    const detectedBundle = BUNDLES.find(bundle => {
        const reqs = bundle.requirements as Record<string, number>
        const reqKeys = Object.keys(reqs)

        // precise match of requirements (quantities must match exactly for the bundle deal)
        const countsByType = Object.entries(cart).reduce((acc, [id, qty]) => {
            const type = PRODUCT_TYPE_MAP[id]
            if (type) {
                acc[type] = (acc[type] || 0) + qty
            }
            return acc
        }, {} as Record<string, number>)

        const isMatch = reqKeys.every(key => (countsByType[key] || 0) === reqs[key])

        // Check for extra items not in the bundle
        const selectedTypes = Object.keys(countsByType).filter(k => (countsByType[k] ?? 0) > 0)
        const noExtraTypes = selectedTypes.every(t => reqKeys.includes(t))

        return isMatch && noExtraTypes
    })

    // Pricing Logic
    const baseTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
        const product = PRODUCTS.find(p => p.id === id)
        return sum + (product?.price || 0) * qty
    }, 0)

    const finalTotal = detectedBundle ? detectedBundle.price : baseTotal

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        council: '',
        paymentMethod: '',
    })
    const [paymentConfirmation, setPaymentConfirmation] = useState<{
        file: File | null
        url: string
        uploading: boolean
    }>({ file: null, url: '', uploading: false })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [orderId, setOrderId] = useState<string | null>(null)
    const [expandedImage, setExpandedImage] = useState<{ src: string, alt: string } | null>(null)

    const updateCart = (id: string, delta: number) => {
        setCart(prev => {
            const current = prev[id] || 0
            const next = Math.max(0, current + delta)
            if (next === 0) {
                const { [id]: _, ...rest } = prev
                return rest
            }
            return { ...prev, [id]: next }
        })
    }

    const selectBundle = (bundle: typeof BUNDLES[0]) => {
        const newCart: Record<string, number> = {}
        const reqs = bundle.requirements as Record<string, number>
        Object.entries(reqs).forEach(([type, count]) => {
            // Find products of this type
            const variants = PRODUCTS.filter(p => p.type === type)
            if (variants.length > 0) {
                // Default to first variant, but handle specific bundle cases
                if (type === 'fridge-magnet' && count === 2) {
                    newCart['fridge-magnet-design1'] = 1
                    newCart['fridge-magnet-design2'] = 1
                } else if (type === 'poster') {
                    newCart['poster-1'] = count
                } else if (type === 'fridge-magnet') {
                    newCart['fridge-magnet-design1'] = count
                } else if (variants[0]) {
                    newCart[variants[0].id] = count
                }
            }
        })
        setCart(newCart)

        document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' })
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }))
        }
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (!file.type.startsWith('image/')) {
            setErrors((prev) => ({ ...prev, paymentConfirmation: 'Please upload an image file' }))
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            setErrors((prev) => ({ ...prev, paymentConfirmation: 'File size must be less than 5MB' }))
            return
        }

        setPaymentConfirmation({ file, url: '', uploading: true })
        setErrors((prev) => ({ ...prev, paymentConfirmation: '' }))

        try {
            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
            const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

            if (!cloudName || !uploadPreset) {
                throw new Error('Cloudinary configuration missing')
            }

            const uploadFormData = new FormData()
            uploadFormData.append('file', file)
            uploadFormData.append('upload_preset', uploadPreset)
            uploadFormData.append('cloud_name', cloudName)

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                { method: 'POST', body: uploadFormData }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error?.message || 'Upload failed')
            }

            setPaymentConfirmation({ file, url: data.secure_url, uploading: false })
        } catch (error) {
            console.error('Upload error:', error)
            setPaymentConfirmation({ file: null, url: '', uploading: false })
            setErrors((prev) => ({
                ...prev,
                paymentConfirmation: 'Failed to upload file. Please try again.',
            }))
        }
    }

    const removeFile = () => {
        setPaymentConfirmation({ file: null, url: '', uploading: false })
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (Object.keys(cart).length === 0) {
            newErrors.cart = 'Please add items to your cart'
        }

        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format'
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required'
        }
        if (!formData.council) newErrors.council = 'Council is required'
        if (!formData.paymentMethod) newErrors.paymentMethod = 'Payment method is required'

        if (!paymentConfirmation.url) {
            newErrors.paymentConfirmation = 'Payment confirmation is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)

        try {
            // Build summary of items for the email
            // We need to pass the "Bundle Name" OR "Custom Order"
            // And also the specific Poster/Magnet choices as previously expected by API?
            // The API expects `posterChoice` string. We should join them if multiple?
            // Let's adapt the payload.

            const posterChoices = Object.entries(cart)
                .filter(([id]) => PRODUCT_TYPE_MAP[id] === 'poster')
                .map(([id, qty]) => {
                    const product = PRODUCTS.find(p => p.id === id)
                    return qty > 1 ? `${product?.name} (x${qty})` : product?.name
                })
                .filter(Boolean)
                .join(', ')

            const magnetChoices = Object.entries(cart)
                .filter(([id]) => PRODUCT_TYPE_MAP[id] === 'fridge-magnet')
                .map(([id, qty]) => {
                    const product = PRODUCTS.find(p => p.id === id)
                    return qty > 1 ? `${product?.name} (x${qty})` : product?.name
                })
                .filter(Boolean)
                .join(', ')

            // Other items
            const otherItems = Object.entries(cart)
                .filter(([id]) => !['poster', 'fridge-magnet'].includes(PRODUCT_TYPE_MAP[id] || ''))
                .map(([id, qty]) => {
                    const product = PRODUCTS.find(p => p.id === id)
                    return `${product?.name} (x${qty})`
                })
                .join(', ')

            const bundleName = detectedBundle ? detectedBundle.name : 'Custom Order'

            // Build cart items array for the API
            const cartItems = Object.entries(cart).map(([id, qty]) => {
                const product = PRODUCTS.find(p => p.id === id)
                return {
                    id,
                    name: product?.name || id,
                    type: product?.type || 'unknown',
                    quantity: qty,
                    image: product?.image || ''
                }
            })

            const orderData = {
                ...formData,
                bundle: detectedBundle ? detectedBundle.name : null, // null for custom orders
                bundlePrice: finalTotal,
                posterChoice: posterChoices || null,
                magnetChoice: magnetChoices || null,
                cartItems, // All items in cart
                total: finalTotal,
                paymentConfirmationUrl: paymentConfirmation.url,
                timestamp: new Date().toISOString(),
            }

            const response = await fetch('/api/submit-merch', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || 'Submission failed')
            }

            setOrderId(result.orderId)
            setSubmitted(true)
        } catch (error) {
            console.error('Submission error:', error)
            setErrors({
                submit: error instanceof Error ? error.message : 'Failed to submit order. Please try again.',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    if (submitted) {
        return (
            <>
                <Head>
                    <title>Order Confirmed | NIMUN Merch</title>
                </Head>
                <div className={`${styles.container} ${styles.successContainer}`}>
                    <div className={styles.card}>
                        <svg className={styles.successIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <h1 className={styles.title}>Order Confirmed!</h1>
                        {orderId && (
                            <p className={styles.orderId}>Order ID: <strong>{orderId}</strong></p>
                        )}
                        <p className={styles.subtitle}>
                            Thank you for your order! We&apos;ve sent a confirmation email to <strong>{formData.email}</strong>.
                        </p>
                        <p className={styles.subtitle}>
                            We&apos;ll verify your payment and get in touch soon.
                        </p>
                        <button className={styles.submitBtn} onClick={() => window.location.reload()}>
                            Place Another Order
                        </button>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Head>
                <title>NIMUN Merch Store</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.pageTitle}>NIMUN Merch Store</h1>
                    <p className={styles.pageSubtitle}>
                        Select items individually or pick a bundle for a great deal!<br></br><br></br>Click on any image to enlarge it!
                    </p>

                    {/* Products Grid */}
                    <section className={styles.productsSection} id="products-grid">
                        <h2 className={styles.sectionTitle}>Build Your Order</h2>
                        {/* <p className={styles.clickHint}>Click image to enlarge</p> */}
                        <div className={styles.productsGrid}>
                            {PRODUCTS.map((product) => {
                                const qty = cart[product.id] || 0
                                return (
                                    <div
                                        key={product.id}
                                        className={`${styles.productCard} ${qty > 0 ? styles.activeCard : ''}`}
                                    >
                                        <div
                                            className={styles.productImage}
                                            onClick={() => setExpandedImage({ src: product.image, alt: product.name })}
                                        >
                                            <img src={product.image} alt={product.name} />
                                            {qty > 0 && <div className={styles.qtyBadge}>{qty}</div>}
                                        </div>
                                        <div className={styles.productInfo}>
                                            <h3 className={styles.productName}>{product.name}</h3>
                                            <p className={styles.productPrice}>{product.price} EGP</p>

                                            <div className={styles.qtyControls}>
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.stopPropagation(); updateCart(product.id, -1) }}
                                                    disabled={qty === 0}
                                                    className={styles.qtyBtn}
                                                >
                                                    -
                                                </button>
                                                <span className={styles.qtyDisplay}>{qty}</span>
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.stopPropagation(); updateCart(product.id, 1) }}
                                                    className={styles.qtyBtn}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>

                    {/* Bundle Selection (Quick Add) */}
                    <section className={styles.bundleSection}>
                        <h2 className={styles.sectionTitle}>Quick Bundles</h2>
                        <div className={styles.bundleGrid}>
                            {BUNDLES.map((bundle) => {
                                const isDetected = detectedBundle?.id === bundle.id
                                return (
                                    <div
                                        key={bundle.id}
                                        className={`${styles.bundleOption} ${isDetected ? styles.selected : ''}`}
                                        onClick={() => selectBundle(bundle)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className={styles.bundleContent}>
                                            <div className={styles.bundleHeader}>
                                                <span className={styles.bundleName}>{bundle.name}</span>
                                                <span className={styles.bundlePrice}>{bundle.price} EGP</span>
                                            </div>
                                            <p className={styles.bundleDescription}>{bundle.description}</p>
                                            {isDetected && <span className={styles.activeBadge}>Active</span>}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>

                    {/* Order Summary */}
                    {(Object.keys(cart).length > 0) && (
                        <div className={styles.orderSummary}>
                            <h3>Order Summary</h3>
                            {detectedBundle ? (
                                <div className={styles.matchedBundle}>
                                    <span className={styles.bundleTag}>Bundle Unlocked!</span>
                                    <h4>{detectedBundle.name}</h4>
                                </div>
                            ) : (
                                <div className={styles.customOrder}>
                                    <h4>Custom Order</h4>
                                </div>
                            )}

                            <div className={styles.summaryItems}>
                                {Object.entries(cart).map(([id, qty]) => {
                                    const p = PRODUCTS.find(p => p.id === id)
                                    return (
                                        <div key={id} className={styles.summaryItemRow}>
                                            <span>{p?.name} x{qty}</span>
                                            {/* Show individual price only if no bundle or if we want detail? 
                                                If bundle is active, individual prices might be confusing if they sum to more.
                                                Let's show them but strike through if bundle? Or just hide prices in list.
                                            */}
                                        </div>
                                    )
                                })}
                            </div>

                            <div className={styles.summaryContent}>
                                {detectedBundle && baseTotal > finalTotal && (
                                    <span className={styles.originalPrice}>{baseTotal} EGP</span>
                                )}
                                <span className={styles.finalPrice}>{finalTotal} EGP</span>
                            </div>
                            {errors.cart && <div className={styles.error}>{errors.cart}</div>}
                        </div>
                    )}

                    {/* Payment Instructions */}
                    <section className={styles.paymentSection}>
                        <h2 className={styles.sectionTitle}>Payment Methods</h2>
                        <div className={styles.paymentMethods}>
                            <div className={styles.paymentCard}>
                                <h3>Instapay</h3>
                                <p className={styles.paymentDetail}>
                                    <a href="https://ipn.eg/S/belal3amer/instapay/4CFWsE" target="_blank" rel="noopener noreferrer">
                                        belal3amer@instapay (Click the link)
                                    </a>
                                </p>
                            </div>
                            <div className={styles.paymentCard}>
                                <h3>Telda</h3>
                                <p className={styles.paymentDetail}>@nimuneg</p>
                            </div>
                        </div>
                        <p className={styles.paymentNote}>
                            After transferring, please select your payment method and upload a screenshot below.
                        </p>
                        <div className={`${styles.field} ${errors.paymentMethod ? styles.fieldError : ''}`}>
                            <label htmlFor="paymentMethod">Which payment method did you use? *</label>
                            <select
                                id="paymentMethod"
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Payment Method</option>
                                <option value="Instapay">Instapay</option>
                                <option value="Telda">Telda</option>
                            </select>
                            {errors.paymentMethod && <span className={styles.errorText}>{errors.paymentMethod}</span>}
                        </div>
                    </section>

                    {/* Order Form */}
                    <form onSubmit={handleSubmit} className={styles.orderForm}>
                        <h2 className={styles.sectionTitle}>Your Information</h2>

                        <div className={styles.formGrid}>
                            <div className={`${styles.field} ${errors.firstName ? styles.fieldError : ''}`}>
                                <label htmlFor="firstName">First Name *</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                />
                                {errors.firstName && <span className={styles.errorText}>{errors.firstName}</span>}
                            </div>

                            <div className={`${styles.field} ${errors.lastName ? styles.fieldError : ''}`}>
                                <label htmlFor="lastName">Last Name *</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                />
                                {errors.lastName && <span className={styles.errorText}>{errors.lastName}</span>}
                            </div>
                        </div>

                        <div className={`${styles.field} ${errors.email ? styles.fieldError : ''}`}>
                            <label htmlFor="email">Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                        </div>

                        <div className={styles.formGrid}>
                            <div className={`${styles.field} ${errors.phone ? styles.fieldError : ''}`}>
                                <label htmlFor="phone">Phone Number *</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                                {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                            </div>

                            <div className={`${styles.field} ${errors.council ? styles.fieldError : ''}`}>
                                <label htmlFor="council">Council *</label>
                                <select id="council" name="council" value={formData.council} onChange={handleInputChange} required>
                                    <option value="">Select Council</option>
                                    {COUNCILS.map((council) => (
                                        <option key={council} value={council}>
                                            {council}
                                        </option>
                                    ))}
                                </select>
                                {errors.council && <span className={styles.errorText}>{errors.council}</span>}
                            </div>
                        </div>

                        {/* Payment Confirmation Upload */}
                        <div className={`${styles.field} ${errors.paymentConfirmation ? styles.fieldError : ''}`}>
                            <label>Payment Confirmation *</label>
                            <div
                                className={`${styles.fileUploadArea} ${paymentConfirmation.uploading ? styles.uploading : ''} ${paymentConfirmation.url ? styles.uploaded : ''
                                    } ${errors.paymentConfirmation ? styles.fieldError : ''}`}
                            >
                                {!paymentConfirmation.file && !paymentConfirmation.uploading && (
                                    <label htmlFor="paymentFile" className={styles.uploadPrompt}>
                                        <svg className={styles.uploadIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <p>Click to upload payment confirmation</p>
                                        <p className={styles.fileTypes}>PNG, JPG, JPEG (max 5MB)</p>
                                    </label>
                                )}

                                {paymentConfirmation.uploading && (
                                    <div className={styles.uploadStatus}>
                                        <div className={styles.spinner}></div>
                                        <span>Uploading...</span>
                                    </div>
                                )}

                                {paymentConfirmation.url && !paymentConfirmation.uploading && (
                                    <div className={styles.uploadStatus}>
                                        <svg className={styles.checkmark} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Payment confirmation uploaded</span>
                                        <p className={styles.fileName}>{paymentConfirmation.file?.name}</p>
                                        <button type="button" onClick={removeFile} className={styles.removeFileBtn}>
                                            Remove
                                        </button>
                                    </div>
                                )}

                                <input
                                    type="file"
                                    id="paymentFile"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className={styles.fileInput}
                                    disabled={paymentConfirmation.uploading || !!paymentConfirmation.url}
                                />
                            </div>
                            {errors.paymentConfirmation && <span className={styles.errorText}>{errors.paymentConfirmation}</span>}
                        </div>

                        {errors.submit && <div className={styles.error}>{errors.submit}</div>}

                        <div className={styles.submitSection}>
                            <button type="submit" className={styles.submitBtn} disabled={isSubmitting || Object.keys(cart).length === 0}>
                                {isSubmitting ? 'Submitting...' : `Submit Order${finalTotal > 0 ? ` (${finalTotal} EGP)` : ''}`}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Image Modal - Using Portal for proper fixed positioning */}
            {expandedImage && typeof document !== 'undefined' && createPortal(
                <div className={styles.imageModal} onClick={() => setExpandedImage(null)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeModal} onClick={() => setExpandedImage(null)}>×</button>
                        <img src={expandedImage.src} alt={expandedImage.alt} />
                        <p className={styles.modalCaption}>{expandedImage.alt}</p>
                    </div>
                </div>,
                document.body
            )}
        </>
    )
}
