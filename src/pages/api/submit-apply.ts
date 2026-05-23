import type { NextApiRequest, NextApiResponse } from 'next'

const WEBHOOK_URL = process.env.NEXT_PUBLIC_APPLY_WEBHOOK

export const maxDuration = 60

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  if (!WEBHOOK_URL) {
    return res.status(500).json({ ok: false, error: 'Webhook URL not configured' })
  }

  try {
    // Check current count before submitting to enforce the 200 limit
    try {
      const statusResponse = await fetch(`${WEBHOOK_URL}?t=${Date.now()}`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })
      if (statusResponse.ok) {
        const data = await statusResponse.json()
        if (data && typeof data.totalCount === 'number' && data.totalCount >= 200) {
          return res.status(400).json({
            ok: false,
            error: 'Applications have closed as we have reached the maximum limit of responses. Thank you for your interest!'
          })
        }
      }
    } catch (err) {
      console.error('Error pre-checking submission count limit:', err)
    }

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    })

    const data = await response.json().catch(() => ({} as any))

    if (!response.ok) {
      return res.status(response.status).json({ ok: false, error: data.error || 'Submission failed' })
    }

    if (data?.ok === false) {
      return res.status(400).json({ ok: false, error: data.error || 'Submission failed', data })
    }

    return res.status(200).json({ ok: true, data })
  } catch (error) {
    console.error('Webhook submission error:', error)
    return res.status(500).json({ ok: false, error: 'Failed to submit application' })
  }
}
