import type { NextApiRequest, NextApiResponse } from 'next'

const WEBHOOK_URL = process.env.NEXT_PUBLIC_APPLY_WEBHOOK

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
    // Log what we're sending, especially second preference entries
    const entries = req.body?.entries || {}
    const secondPrefEntries = Object.keys(entries).filter(key => 
      key.includes('54217108') || key.includes('380010027') || 
      key.includes('786866403') || key.includes('2026186254')
    )
    console.log('API: Second preference entries being sent:', secondPrefEntries.map(key => ({ [key]: entries[key] })))
    console.log('API: Full entries object:', entries)
    
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

    return res.status(200).json({ ok: true, data })
  } catch (error) {
    console.error('Webhook submission error:', error)
    return res.status(500).json({ ok: false, error: 'Failed to submit application' })
  }
}
