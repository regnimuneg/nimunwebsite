import type { NextApiRequest, NextApiResponse } from 'next'

const WEBHOOK_URL = process.env.NEXT_PUBLIC_APPLY_WEBHOOK

export const maxDuration = 60

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  // Set Cache-Control headers to prevent Next.js, Vercel, and browsers from caching this response
  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
  )
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')

  // If webhook URL is missing, fall back to Wave 5 details
  if (!WEBHOOK_URL) {
    const defaultIsOpen = process.env.NEXT_PUBLIC_FORM_IS_OPEN !== 'false'
    return res.status(200).json({
      ok: true,
      isOpen: defaultIsOpen,
      activeWave: 'Wave 5',
      limit: 22,
      totalCount: 0,
      amounts: ['850', '1700'],
      policyImage: '/image/png/JNIMUN%2726/Form%20Docs/Wave%205.png',
      source: 'env-fallback'
    })
  }

  try {
    // Append a unique timestamp to bypass any Google Apps Script proxy caching
    const response = await fetch(`${WEBHOOK_URL}?t=${Date.now()}`, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    })

    if (!response.ok) {
      throw new Error(`Google Webhook returned status ${response.status}`)
    }

    const data = await response.json()
    
    if (data && data.ok) {
      return res.status(200).json(data)
    } else {
      throw new Error(data.error || 'Invalid response from Google Webhook')
    }
  } catch (error) {
    console.error('Error fetching form status from webhook:', error)
    
    // Fallback to Wave 5 local settings in case of downtime
    const defaultIsOpen = process.env.NEXT_PUBLIC_FORM_IS_OPEN !== 'false'
    return res.status(200).json({
      ok: false,
      isOpen: defaultIsOpen,
      activeWave: 'Wave 5',
      limit: 22,
      totalCount: 0,
      amounts: ['850', '1700'],
      policyImage: '/image/png/JNIMUN%2726/Form%20Docs/Wave%205.png',
      source: 'local-fallback',
      error: error instanceof Error ? error.message : 'Unknown network error'
    })
  }
}
