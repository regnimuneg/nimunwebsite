interface CloudinaryUploadResponse {
  secure_url: string
  public_id: string
  [key: string]: any
}

export async function uploadFile(
  file: File,
  cloudName: string,
  uploadPreset: string
): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)

  // Use 'auto' resource type to handle both images and PDFs automatically
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    {
      method: 'POST',
      body: formData,
    }
  )

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Upload failed: ${error}`)
  }

  const data: CloudinaryUploadResponse = await response.json()
  return data.secure_url
}

