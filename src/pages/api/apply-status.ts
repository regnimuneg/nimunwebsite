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

  // If webhook URL is missing, fall back to environment variable status
  if (!WEBHOOK_URL) {
    const defaultIsOpen = process.env.NEXT_PUBLIC_FORM_IS_OPEN !== 'false'
    return res.status(200).json({
      ok: true,
      isOpen: defaultIsOpen,
      activeWave: 'Wave 1',
      limit: 18,
      totalCount: 0,
      amounts: ['650', '1300'],
      policyImage: '/image/png/JNIMUN%2726/Form%20Docs/Wave%201.png',
      source: 'env-fallback'
    })
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'GET',
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
    
    // In case of any error querying Google Sheets, fall back to local settings
    // This ensures registration availability is NEVER completely blocked due to external downtime
    const defaultIsOpen = process.env.NEXT_PUBLIC_FORM_IS_OPEN !== 'false'
    return res.status(200).json({
      ok: false,
      isOpen: defaultIsOpen,
      activeWave: 'Wave 1',
      limit: 18,
      totalCount: 0,
      amounts: ['650', '1300'],
      policyImage: '/image/png/JNIMUN%2726/Form%20Docs/Wave%201.png',
      source: 'local-fallback',
      error: error instanceof Error ? error.message : 'Unknown network error'
    })
  }
}
