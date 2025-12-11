import type { NextApiRequest, NextApiResponse } from 'next'

// This API route sends the file URL to Apps Script which handles the Drive upload
// The actual Drive upload is handled in Apps Script for simplicity and security
const DRIVE_WEBHOOK_URL = process.env.NEXT_PUBLIC_DRIVE_WEBHOOK_URL

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  // If Drive webhook is not configured, just return success (optional feature)
  if (!DRIVE_WEBHOOK_URL) {
    console.log('Google Drive webhook not configured, skipping Drive upload')
    return res.status(200).json({ ok: true, message: 'Drive not configured' })
  }

  try {
    const { fileUrl, fileName, fileType } = req.body

    if (!fileUrl || !fileName) {
      console.error('Missing fileUrl or fileName:', { fileUrl: !!fileUrl, fileName: !!fileName })
      return res.status(400).json({ ok: false, error: 'Missing fileUrl or fileName' })
    }

    console.log('Attempting to save to Drive:', { fileName, fileType, fileUrl: fileUrl.substring(0, 50) + '...' })

    // Send file info to Apps Script webhook which will download and save to Drive
    const response = await fetch(DRIVE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileUrl,
        fileName,
        fileType: fileType || 'application/octet-stream',
      }),
    })

    const responseText = await response.text()
    console.log('Drive webhook response status:', response.status)
    console.log('Drive webhook response:', responseText.substring(0, 200))

    if (!response.ok) {
      console.error('Drive webhook error:', response.status, responseText)
      // Don't fail the request if Drive save fails
      return res.status(200).json({ 
        ok: false, 
        message: 'File uploaded to Cloudinary, but Drive save failed',
        error: responseText.substring(0, 200)
      })
    }

    let responseData
    try {
      responseData = JSON.parse(responseText)
    } catch {
      responseData = { ok: true, message: responseText }
    }

    console.log('Drive save successful:', responseData)
    return res.status(200).json({ ok: true, data: responseData })
  } catch (error) {
    console.error('Drive webhook error:', error)
    // Don't fail the request if Drive save fails
    return res.status(200).json({
      ok: false,
      message: 'File uploaded to Cloudinary, but Drive save failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

