import type { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const ADMIN_EMAIL = 'reg.nimun.eg@gmail.com'
const MERCH_WEBHOOK_URL = process.env.MERCH_WEBHOOK_URL
const DRIVE_WEBHOOK_URL = process.env.DRIVE_WEBHOOK_URL

interface CartItem {
  id: string
  name: string
  type: string
  quantity: number
  image: string
}

interface OrderData {
  firstName: string
  lastName: string
  email: string
  phone: string
  council: string
  paymentMethod: string
  bundle: string | null
  bundlePrice: number
  posterChoice: string | null
  magnetChoice: string | null
  cartItems: CartItem[]
  total: number
  paymentConfirmationUrl: string
  timestamp: string
}

// Generate a unique 6-digit order ID
function generateOrderId(): string {
  const randomNum = Math.floor(100000 + Math.random() * 900000)
  return randomNum.toString()
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const orderData: OrderData = req.body

    if (
      !orderData.firstName ||
      !orderData.lastName ||
      !orderData.email ||
      !orderData.phone ||
      !orderData.council ||
      !orderData.cartItems ||
      orderData.cartItems.length === 0 ||
      !orderData.paymentConfirmationUrl
    ) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' })
    }

    // Generate unique order ID
    const orderId = generateOrderId()

    // Build order details
    const orderDetails = [
      `Bundle: ${orderData.bundle}`,
      orderData.posterChoice ? `Poster Choice: ${orderData.posterChoice}` : null,
      orderData.magnetChoice ? `Fridge Magnet: ${orderData.magnetChoice}` : null,
      // orderData.magnetChoice2 ? `Second Fridge Magnet: ${orderData.magnetChoice2}` : null,
    ].filter(Boolean).join('\n')
    // Build items list for email display
    const itemsListHtml = orderData.cartItems.map(item =>
      `${item.name}${item.quantity > 1 ? ` (x${item.quantity})` : ''}`
    ).join(', ')

    // Send confirmation email to delegate
    const delegateEmail = await resend.emails.send({
      from: 'NIMUN Merch <merch@nimuneg.org>',
      to: orderData.email,
      // replyTo: ADMIN_EMAIL,
      subject: `Order Confirmation #${orderId} - NIMUN Merch`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff !important; color: #000000 !important; padding: 20px;">
          <h1 style="color: #0037c0; border-bottom: 3px solid #0037c0; padding-bottom: 10px;">
            Order Confirmation
          </h1>
          
          <p style="background: #f0f4ff; padding: 12px 16px; border-radius: 8px; font-size: 14px; color: #0037c0;">
            <strong>Order ID:</strong> ${orderId}
          </p>
          
          <p>Dear <strong>${orderData.firstName}</strong>,</p>
          
          <p>Thank you for your order! We've received your payment confirmation.</p>
          
          <h2 style="color: #0037c0; margin-top: 24px;">Order Details</h2>
          
          <div style="background: #f7f9ff; padding: 16px; border-radius: 8px; margin: 16px 0;">
            ${orderData.bundle ? `<p style="margin: 0 0 8px;"><strong>Bundle:</strong> ${orderData.bundle}</p>` : ''}
            <p style="margin: 0 0 8px;"><strong>Items:</strong> ${itemsListHtml}</p>
            <hr style="border: none; border-top: 2px solid #0037c0; margin: 16px 0;">
            <p style="font-size: 18px; font-weight: bold; margin: 0;">
              Total: ${orderData.total} EGP
            </p>
          </div>
          
          <h3 style="color: #0037c0;">Your Information</h3>
          <ul style="line-height: 1.8;">
            <li><strong>Email:</strong> ${orderData.email}</li>
            <li><strong>Phone:</strong> ${orderData.phone}</li>
            <li><strong>Council:</strong> ${orderData.council}</li>
          </ul>
          
          <p style="margin-top: 24px;">
            We'll verify your payment and get in touch soon.
          </p>
          
          <p style="margin-top: 32px; color: #666;">
            Best regards,<br>
            <strong style="color: #0037c0;">NIMUN'26 Team</strong>
          </p>
        </div>
      `,
    })

    // Send notification email to admin
    const adminEmail = await resend.emails.send({
      from: 'NIMUN Merch <merch@nimuneg.org>',
      to: ADMIN_EMAIL,
      replyTo: orderData.email,
      subject: `New Merch Order #${orderId} - ${orderData.firstName} ${orderData.lastName} (${orderData.total} EGP)`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff !important; color: #000000 !important; padding: 20px;">
          <h1 style="color: #0037c0; border-bottom: 3px solid #0037c0; padding-bottom: 10px;">
            New Merch Order Received
          </h1>
          
          <p style="background: #f0f4ff; padding: 12px 16px; border-radius: 8px; font-size: 16px; color: #0037c0; font-weight: bold;">
            Order ID: ${orderId}
          </p>
          
          <h2 style="color: #0037c0; margin-top: 24px;">Customer Information</h2>
          <ul style="line-height: 1.8;">
            <li><strong>Name:</strong> ${orderData.firstName} ${orderData.lastName}</li>
            <li><strong>Email:</strong> <a href="mailto:${orderData.email}">${orderData.email}</a></li>
            <li><strong>Phone:</strong> <a href="tel:${orderData.phone}">${orderData.phone}</a></li>
            <li><strong>Council:</strong> ${orderData.council}</li>
          </ul>
          
          <h2 style="color: #0037c0; margin-top: 24px;">Order Details</h2>
          
          <div style="background: #f7f9ff; padding: 16px; border-radius: 8px; margin: 16px 0;">
            ${orderData.bundle ? `<p style="margin: 0 0 8px;"><strong>Bundle:</strong> ${orderData.bundle}</p>` : '<p style="margin: 0 0 8px;"><strong>Order Type:</strong> Custom Order</p>'}
            <p style="margin: 0 0 8px;"><strong>Items:</strong> ${itemsListHtml}</p>
            <hr style="border: none; border-top: 2px solid #0037c0; margin: 16px 0;">
            <p style="font-size: 18px; font-weight: bold; margin: 0;">
              Total: ${orderData.total} EGP
            </p>
          </div>
          
          <h2 style="color: #0037c0; margin-top: 24px;">Payment Confirmation</h2>
          <p>
            <a href="${orderData.paymentConfirmationUrl}" target="_blank" 
               style="display: inline-block; background: #0037c0; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 6px; font-weight: bold;">
              View Payment Confirmation
            </a>
          </p>
          
          <p style="margin-top: 24px; padding: 12px; background: #fef3c7; border-left: 4px solid #fbbf24; border-radius: 4px;">
            <strong>Action Required:</strong> Verify the payment and contact the custome.
          </p>
          
          <hr style="margin: 32px 0; border: none; border-top: 1px solid #ddd;">
          
          <p style="font-size: 12px; color: #999;">
            Order submitted at: ${new Date(orderData.timestamp).toLocaleString('en-US', {
        timeZone: 'Africa/Cairo',
        dateStyle: 'full',
        timeStyle: 'long',
      })}
          </p>
        </div>
      `,
    })

    // Log to Google Sheets via webhook
    if (MERCH_WEBHOOK_URL) {
      try {
        await fetch(MERCH_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'merch_order',
            timestamp: orderData.timestamp,
            orderId: orderId,
            firstName: orderData.firstName,
            lastName: orderData.lastName,
            email: orderData.email,
            phone: orderData.phone,
            council: orderData.council,
            bundle: orderData.bundle || 'Custom Order',
            posterChoice: orderData.posterChoice || '',
            magnetChoice: orderData.magnetChoice || '',
            items: itemsListHtml, // Full list of items
            total: orderData.total,
            paymentMethod: orderData.paymentMethod,
            paymentConfirmationUrl: orderData.paymentConfirmationUrl,
          }),
        })
      } catch (webhookError) {
        console.error('Webhook error:', webhookError)
      }
    } else {
      console.warn('MERCH_WEBHOOK_URL not configured')
    }

    // Save payment confirmation to Google Drive
    if (DRIVE_WEBHOOK_URL) {
      try {
        await fetch(DRIVE_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileUrl: orderData.paymentConfirmationUrl,
            fileName: `payment_${orderId}_${orderData.firstName}_${orderData.lastName}.jpg`,
            fileType: 'image/jpeg',
          }),
        })
      } catch (driveError) {
        console.error('Drive upload error:', driveError)
      }
    } else {
      console.warn('DRIVE_WEBHOOK_URL not configured')
    }

    return res.status(200).json({
      ok: true,
      message: 'Order submitted successfully',
      orderId: orderId,
      delegateEmailId: delegateEmail.data?.id,
      adminEmailId: adminEmail.data?.id,
    })
  } catch (error) {
    console.error('Order submission error:', error)
    return res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Failed to submit order',
    })
  }
}
