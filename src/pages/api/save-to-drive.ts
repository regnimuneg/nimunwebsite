import type { NextApiRequest, NextApiResponse } from 'next'

// This API route sends the file URL to Apps Script which handles the Drive upload
// The actual Drive upload is handled in Apps Script for simplicity and security
const DRIVE_WEBHOOK_URL = process.env.NEXT_PUBLIC_DRIVE_WEBHOOK_URL

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  if (!DRIVE_WEBHOOK_URL) {
    return res.status(500).json({ ok: false, error: 'Drive webhook URL not configured' })
  }

  try {
    const { fileContent, fileName, fileType, folderKey, fieldTitle } = req.body

    if (!fileContent || !fileName || !folderKey) {
      console.error('Missing Drive upload fields:', { fileContent: !!fileContent, fileName: !!fileName, folderKey: !!folderKey })
      return res.status(400).json({ ok: false, error: 'Missing fileContent, fileName, or folderKey' })
    }

    console.log('Attempting to save to Drive:', { fileName, fileType })

    // Send file info and base64 content to Apps Script webhook which will save directly to Drive
    const response = await fetch(DRIVE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileContent,
        fileName,
        fileType: fileType || 'application/octet-stream',
        folderKey,
        fieldTitle,
      }),
    })

    const responseText = await response.text()
    console.log('Drive webhook response status:', response.status)
    console.log('Drive webhook response:', responseText.substring(0, 200))

    if (!response.ok) {
      console.error('Drive webhook error:', response.status, responseText)
      return res.status(response.status).json({
        ok: false,
        error: responseText.substring(0, 200) || 'Drive save failed',
      })
    }

    let responseData
    try {
      responseData = JSON.parse(responseText)
    } catch {
      responseData = { ok: true, message: responseText }
    }

    if (responseData?.ok === false) {
      return res.status(400).json({
        ok: false,
        error: responseData.error || 'Drive save failed',
      })
    }

    console.log('Drive save successful:', responseData)
    return res.status(200).json(responseData)
  } catch (error) {
    console.error('Drive webhook error:', error)
    return res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

