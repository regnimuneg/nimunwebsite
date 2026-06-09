import Head from 'next/head'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from '@/styles/Merch.module.scss'
import ApplyNavbar from '@/components/apply/ApplyNavbar'
import JNIMUNFooter from '@/components/jnimun/JNIMUNFooter'
import ApplyDecorations from '@/components/apply/ApplyDecorations'

// All products for display with images
// Product Types for logic and display
type ProductType = 'playing-cards' | 'laptop-sleeve' | 'thermal-mug' | 'fridge-magnet' | 'makeup-pouch' | 'poster' | 'racket-set' | 'frisbee' | 'washed-cap'

// Base Products (with prices and types)
const PRODUCTS = [
    { id: 'laptop-sleeve', name: 'Laptop Sleeve', type: 'laptop-sleeve', price: 300, image: "/image/png/merch/JNIMUN'26/Laptop Sleeve.jpeg" },
    { id: 'playing-cards', name: 'Playing Cards', type: 'playing-cards', price: 175, image: "/image/png/merch/JNIMUN'26/Cards Cover.jpeg" },
    { id: 'thermal-mug', name: 'Thermal Mug', type: 'thermal-mug', price: 300, image: "/image/png/merch/JNIMUN'26/Mug.jpeg" },
    { id: 'fridge-magnet-1', name: 'J\'26 Magnet', type: 'fridge-magnet', price: 75, image: "/image/png/merch/JNIMUN'26/J'26 Magnet.jpeg" },
    { id: 'fridge-magnet-2', name: 'JNIMUN 2026 Magnet', type: 'fridge-magnet', price: 75, image: "/image/png/merch/JNIMUN'26/JNIMUN 2026 Magnet.jpeg" },
    { id: 'fridge-magnet-3', name: 'NIMUN Magnet', type: 'fridge-magnet', price: 75, image: "/image/png/merch/JNIMUN'26/NIMUN Magnet.jpeg" },
    { id: 'fridge-magnet-4', name: 'Nefertiti Magnet', type: 'fridge-magnet', price: 75, image: "/image/png/merch/JNIMUN'26/Nefertiti Magnet.jpeg" },
    { id: 'makeup-pouch', name: 'Makeup Pouch / Pencil Case', type: 'makeup-pouch', price: 200, image: "/image/png/merch/JNIMUN'26/Pencil Case.jpeg" },
    { id: 'poster-1', name: '10 Years Poster', type: 'poster', price: 30, image: "/image/png/merch/JNIMUN'26/10 Years Poster.jpeg" },
    { id: 'poster-2', name: 'Nefertiti Poster', type: 'poster', price: 30, image: "/image/png/merch/JNIMUN'26/Nefertiti Poster.jpeg" },
    { id: 'racket-set', name: 'Racket Set', type: 'racket-set', price: 330, image: "/image/png/merch/JNIMUN'26/Raquet.jpeg" },
    { id: 'frisbee', name: 'Frisbee', type: 'frisbee', price: 100, image: "/image/png/merch/JNIMUN'26/Frisbee.jpeg" },
    { id: 'washed-cap', name: 'Limited quantity Washed Cap', type: 'washed-cap', price: 250, image: "/image/png/merch/JNIMUN'26/Cap.jpeg" },
]

// Map ID to Type for quick lookups
const PRODUCT_TYPE_MAP: Record<string, string> = PRODUCTS.reduce((acc, p) => ({ ...acc, [p.id]: p.type }), {})

// Bundles with requirements configuration
const BUNDLES = [
    {
        id: 'committee-kit',
        name: 'The Committee Kit',
        price: 700,
        description: 'Includes Laptop Sleeve, Thermal Mug, and Makeup Pouch / Pencil Case.',
        includes: ['Laptop Sleeve', 'Thermal Mug', 'Makeup Pouch / Pencil Case'],
        requirements: { 'laptop-sleeve': 1, 'thermal-mug': 1, 'makeup-pouch': 1 }
    },
    {
        id: 'socials-pack',
        name: 'The Socials Pack',
        price: 500,
        description: 'Includes Racket Set, Frisbee, and Limited quantity Washed Cap.',
        includes: ['Racket Set', 'Frisbee', 'Limited quantity Washed Cap'],
        requirements: { 'racket-set': 1, 'frisbee': 1, 'washed-cap': 1 }
    },
    {
        id: 'icebreaker-bundle',
        name: 'The Icebreaker Bundle',
        price: 250,
        description: 'Includes Playing Cards, Fridge Magnet, and Poster. Choose your preferred design!',
        includes: ['Playing Cards', 'Fridge Magnet ×1', 'Poster ×1'],
        requirements: { 'playing-cards': 1, 'fridge-magnet': 1, 'poster': 1 }
    },
    {
        id: 'complete-collector',
        name: 'The Complete Collector',
        price: 1500,
        description: 'Includes one of every single item! Choose your preferred poster and magnet designs.',
        includes: ['Laptop Sleeve', 'Playing Cards', 'Thermal Mug', 'Fridge Magnet ×1', 'Makeup Pouch / Pencil Case', 'Poster ×1', 'Racket Set', 'Frisbee', 'Washed Cap'],
        requirements: {
            'laptop-sleeve': 1,
            'playing-cards': 1,
            'thermal-mug': 1,
            'fridge-magnet': 1,
            'makeup-pouch': 1,
            'poster': 1,
            'racket-set': 1,
            'frisbee': 1,
            'washed-cap': 1
        }
    }
]

const COUNCILS = ['Crisis Committee', 'IMO', 'UNHCR', 'International Press', 'UNSC', 'UNODC']
const COMMITTEES = ['Registration Affairs', 'Socials & Events', 'Operations & Logistics', 'Media & Design', 'Public Relations', 'NIMUN Executive']
const ROLES = ['Delegate', 'NIMUN Member', 'Waitlisted Delegate'] as const
type Role = typeof ROLES[number]

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
        role: '' as Role | '',
        council: '',
        paymentMethod: '',
    })
    const [paymentConfirmation, setPaymentConfirmation] = useState<{
        file: File | null
        url: string
        uploading: boolean
        progress?: number
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
                    newCart['fridge-magnet-1'] = 1
                    newCart['fridge-magnet-2'] = 1
                } else if (type === 'poster') {
                    newCart['poster-1'] = count
                } else if (type === 'fridge-magnet') {
                    newCart['fridge-magnet-1'] = count
                } else if (variants[0]) {
                    newCart[variants[0].id] = count
                }
            }
        })
        setCart(newCart)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        // If role changes, reset council selection
        if (name === 'role') {
            setFormData((prev) => ({ ...prev, role: value as Role | '', council: '' }))
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }))
        }
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }))
        }
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (!formData.paymentMethod) {
            setErrors((prev) => ({ ...prev, paymentConfirmation: 'Please select your payment method before uploading' }))
            e.target.value = ''
            return
        }

        if (!file.type.startsWith('image/')) {
            setErrors((prev) => ({ ...prev, paymentConfirmation: 'Please upload an image file' }))
            return
        }

        if (file.size > 10 * 1024 * 1024) {
            setErrors((prev) => ({ ...prev, paymentConfirmation: 'File size must be less than 10MB' }))
            return
        }

        setPaymentConfirmation({ file, url: '', uploading: true, progress: 0 })
        setErrors((prev) => ({ ...prev, paymentConfirmation: '' }))

        try {
            let base64Data = ''
            base64Data = await new Promise<string>((resolve, reject) => {
                const img = new Image()
                img.onload = () => {
                    const canvas = document.createElement('canvas')
                    let width = img.width
                    let height = img.height
                    const maxDim = 1200

                    if (width > height && width > maxDim) {
                        height = Math.round(height * (maxDim / width))
                        width = maxDim
                    } else if (height > maxDim) {
                        width = Math.round(width * (maxDim / height))
                        height = maxDim
                    }

                    canvas.width = width
                    canvas.height = height

                    const ctx = canvas.getContext('2d')
                    if (!ctx) return reject(new Error('Canvas not supported'))

                    ctx.drawImage(img, 0, 0, width, height)
                    resolve(canvas.toDataURL('image/jpeg', 0.6).split(',')[1] || '')
                }
                img.onerror = () => reject(new Error('Failed to process image'))

                const reader = new FileReader()
                reader.onload = (event) => {
                    img.src = event.target?.result as string
                }
                reader.readAsDataURL(file)
            })

            const cleanFirstName = formData.firstName.trim().replace(/[^a-zA-Z0-9]/g, '')
            const cleanLastName = formData.lastName.trim().replace(/[^a-zA-Z0-9]/g, '')
            const customerName = cleanFirstName && cleanLastName ? `${cleanFirstName}_${cleanLastName}` : 'customer'
            const finalFileName = `payment_${customerName}_${Date.now()}.jpg`
            const folderKey = formData.paymentMethod === 'Instapay' ? 'merch_instapay_proofs' : 'merch_telda_proofs'

            const driveResult = await new Promise<any>((resolve, reject) => {
                const xhr = new XMLHttpRequest()
                xhr.open('POST', '/api/save-to-drive', true)
                xhr.setRequestHeader('Content-Type', 'application/json')

                xhr.upload.onprogress = (event) => {
                    if (event.lengthComputable) {
                        const percentComplete = Math.round((event.loaded / event.total) * 95)
                        setPaymentConfirmation((previous) => ({
                            ...previous,
                            progress: percentComplete,
                        }))
                    }
                }

                xhr.onload = () => {
                    try {
                        const result = JSON.parse(xhr.responseText)
                        if (xhr.status >= 200 && xhr.status < 300) {
                            resolve(result)
                        } else {
                            reject(new Error(result?.error || result?.message || 'Failed to save file to Drive'))
                        }
                    } catch (err) {
                        reject(new Error('Invalid response from server'))
                    }
                }

                xhr.onerror = () => {
                    reject(new Error('Network error during upload'))
                }

                xhr.send(JSON.stringify({
                    fileContent: base64Data,
                    fileName: finalFileName,
                    fileType: 'image/jpeg',
                    folderKey: folderKey,
                    fieldTitle: 'Payment Confirmation',
                }))
            })

            const finalFileUrl = driveResult?.data?.fileUrl || driveResult?.data?.data?.fileUrl || driveResult?.fileUrl

            if (driveResult?.ok === false || !finalFileUrl) {
                throw new Error(driveResult?.error || driveResult?.message || 'Failed to save file to Drive')
            }

            setPaymentConfirmation({ file, url: finalFileUrl, uploading: false, progress: 100 })
        } catch (error) {
            console.error('Upload error:', error instanceof Error ? error.message : error)
            setPaymentConfirmation({ file: null, url: '', uploading: false })

            let userFriendlyMessage = 'Failed to upload file. Please try again.'
            if (error instanceof Error) {
                if (error.message.includes('DriveApp') || error.message.includes('تم رفض الدخول') || error.message.includes('Access Denied')) {
                    userFriendlyMessage = 'Unable to save receipt. Please contact the administrator or try again later.'
                } else {
                    userFriendlyMessage = error.message
                }
            }

            setErrors((prev) => ({
                ...prev,
                paymentConfirmation: userFriendlyMessage,
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
        if (!formData.role) newErrors.role = 'Role is required'
        if (formData.role !== 'Waitlisted Delegate' && !formData.council) newErrors.council = formData.role === 'Delegate' ? 'Council is required' : 'Committee is required'
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
                    <title>Order Confirmed | JNIMUN&apos;26 Merch</title>
                </Head>
                <ApplyNavbar />
                <div className={styles.pageShell}>
                    <ApplyDecorations />
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
                    <JNIMUNFooter />
                </div>
            </>
        )
    }

    return (
        <>
            <Head>
                <title>JNIMUN&apos;26 Merch Store</title>
            </Head>
            <ApplyNavbar />
            <div className={styles.pageShell}>
                <ApplyDecorations />
                <div className={styles.container}>
                    <div className={styles.content}>
                        <h1 className={styles.pageTitle}>JNIMUN&apos;26 Merch Store</h1>
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
                                            <div className={styles.productImageWrapper}>
                                                <div
                                                    className={styles.productImage}
                                                    onClick={() => product.image ? setExpandedImage({ src: product.image, alt: product.name }) : null}
                                                    style={!product.image ? { cursor: 'default' } : {}}
                                                >
                                                    {product.image ? (
                                                        <img src={product.image} alt={product.name} loading="eager" fetchPriority="high" />
                                                    ) : (
                                                        <div className={styles.comingSoonBadge}>
                                                            <span>IMAGE<br />COMING<br />SOON</span>
                                                        </div>
                                                    )}
                                                    {qty > 0 && <div className={styles.qtyBadge}>{qty}</div>}
                                                </div>
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
                                        <a href="https://ipn.eg/S/belalmf/instapay/1KiSwO" target="_blank" rel="noopener noreferrer">
                                            belalmf@instapay (Click the link)
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

                                <div className={`${styles.field} ${errors.role ? styles.fieldError : ''}`}>
                                    <label htmlFor="role">I am a... *</label>
                                    <select id="role" name="role" value={formData.role} onChange={handleInputChange} required>
                                        <option value="">Select Role</option>
                                        {ROLES.map((role) => (
                                            <option key={role} value={role}>
                                                {role}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.role && <span className={styles.errorText}>{errors.role}</span>}
                                </div>
                            </div>

                            {formData.role && formData.role !== 'Waitlisted Delegate' && (
                                <div className={`${styles.field} ${errors.council ? styles.fieldError : ''}`}>
                                    <label htmlFor="council">
                                        {formData.role === 'Delegate' ? 'Council' : 'Committee'} *
                                    </label>
                                    <select id="council" name="council" value={formData.council} onChange={handleInputChange} required>
                                        <option value="">
                                            Select {formData.role === 'Delegate' ? 'Council' : 'Committee'}
                                        </option>
                                        {(formData.role === 'Delegate' ? COUNCILS : COMMITTEES).map((item) => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.council && <span className={styles.errorText}>{errors.council}</span>}
                                </div>
                            )}

                            {/* Non-Refundable Note */}
                            <div className={styles.warningNote}>
                                <strong>Please note:</strong> All orders are final and non-refundable.
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
                                            <span>Uploading... {paymentConfirmation.progress ? `${paymentConfirmation.progress}%` : ''}</span>
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
                    </div >
                </div >

                {/* Image Modal - Using Portal for proper fixed positioning */}
                {
                    expandedImage && typeof document !== 'undefined' && createPortal(
                        <div className={styles.imageModal} onClick={() => setExpandedImage(null)}>
                            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                                <button className={styles.closeModal} onClick={() => setExpandedImage(null)}>×</button>
                                <img src={expandedImage.src} alt={expandedImage.alt} loading="eager" fetchPriority="high" />
                                <p className={styles.modalCaption}>{expandedImage.alt}</p>
                            </div>
                        </div>,
                        document.body
                    )
                }
                <JNIMUNFooter />
            </div>
        </>
    )
}
