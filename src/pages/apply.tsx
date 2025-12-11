import { type FormEvent, useMemo, useState, useRef } from 'react'
import Head from 'next/head'
import styles from '@/styles/Apply.module.scss'
import { uploadFile } from '@/lib/cloudinary'

type YesNo = 'Yes' | 'No'
type CouncilOption = 'HRC' | 'DISEC' | 'ICJ'
type CouncilSecondOption = 'PRESS' | 'HRC' | 'DISEC' | 'ICJ'

const COUNCIL_OPTIONS: CouncilOption[] = ['HRC', 'DISEC', 'ICJ']
const SECOND_CHOICES: CouncilSecondOption[] = ['PRESS', 'HRC', 'DISEC', 'ICJ']

const SECOND_PREF_ENTRY: Record<CouncilOption, string> = {
  HRC: '380010027',
  DISEC: '786866403',
  ICJ: '2026186254',
}

const ELEVEN_DIGITS = /^\d{11}$/
const NINE_DIGITS = /^\d{9}$/

interface FormValues {
  firstName: string
  lastName: string
  phone: string
  gender: 'Male' | 'Female'
  dob: string
  email: string
  emergencyName: string
  emergencyRelation: string
  emergencyPhone: string
  isNuStudent: YesNo | ''
  nuId: string
  nuEmail: string
  universityName: string
  nationalIdLink: string
  hasExperience: YesNo | ''
  experienceDetails: string
  firstPreference: CouncilOption | ''
  secondPreference: CouncilSecondOption | ''
  hasMedical: YesNo | ''
  medicalDetails: string
}

export default function Apply() {
  const [values, setValues] = useState<FormValues>({
    firstName: '',
    lastName: '',
    phone: '',
    gender: 'Male',
    dob: '',
    email: '',
    emergencyName: '',
    emergencyRelation: '',
    emergencyPhone: '',
    isNuStudent: '',
    nuId: '',
    nuEmail: '',
    universityName: '',
    nationalIdLink: '',
    hasExperience: '',
    experienceDetails: '',
    firstPreference: '',
    secondPreference: '',
    hasMedical: '',
    medicalDetails: '',
  })

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [uploading, setUploading] = useState(false)
  const [uploadUrl, setUploadUrl] = useState<string>('')
  const [uploadError, setUploadError] = useState<string>('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Field refs for scrolling to errors
  const fieldRefs = {
    firstName: useRef<HTMLInputElement>(null),
    lastName: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    dob: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    emergencyName: useRef<HTMLInputElement>(null),
    emergencyRelation: useRef<HTMLInputElement>(null),
    emergencyPhone: useRef<HTMLInputElement>(null),
    isNuStudent: useRef<HTMLSelectElement>(null),
    nuId: useRef<HTMLInputElement>(null),
    nuEmail: useRef<HTMLInputElement>(null),
    universityName: useRef<HTMLInputElement>(null),
    nationalId: useRef<HTMLDivElement>(null),
    hasExperience: useRef<HTMLSelectElement>(null),
    experienceDetails: useRef<HTMLTextAreaElement>(null),
    firstPreference: useRef<HTMLSelectElement>(null),
    secondPreference: useRef<HTMLSelectElement>(null),
    hasMedical: useRef<HTMLSelectElement>(null),
    medicalDetails: useRef<HTMLTextAreaElement>(null),
  }

  const filteredSecondOptions = useMemo(
    () => SECOND_CHOICES.filter(opt => opt !== values.firstPreference),
    [values.firstPreference]
  )

  const handleChange = (field: keyof FormValues) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value
    setValues(prev => ({ ...prev, [field]: value }))
    // Clear error for this field when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: false }))
    }
  }

  const handleBlur = (field: keyof FormValues) => () => {
    // Validate individual field on blur
    const newFieldErrors: Record<string, boolean> = {}
    
    if (field === 'firstName' && !values.firstName.trim()) {
      newFieldErrors.firstName = true
    }
    if (field === 'lastName' && !values.lastName.trim()) {
      newFieldErrors.lastName = true
    }
    if (field === 'email' && !values.email.trim()) {
      newFieldErrors.email = true
    }
    if (field === 'dob' && !values.dob.trim()) {
      newFieldErrors.dob = true
    }
    if (field === 'phone' && (!values.phone.trim() || !ELEVEN_DIGITS.test(values.phone.trim()))) {
      newFieldErrors.phone = true
    }
    if (field === 'emergencyPhone' && (!values.emergencyPhone.trim() || !ELEVEN_DIGITS.test(values.emergencyPhone.trim()))) {
      newFieldErrors.emergencyPhone = true
    }
    if (field === 'emergencyName' && !values.emergencyName.trim()) {
      newFieldErrors.emergencyName = true
    }
    if (field === 'emergencyRelation' && !values.emergencyRelation.trim()) {
      newFieldErrors.emergencyRelation = true
    }
    if (field === 'isNuStudent' && !values.isNuStudent) {
      newFieldErrors.isNuStudent = true
    }
    if (field === 'nuId' && values.isNuStudent === 'Yes' && (!values.nuId.trim() || !NINE_DIGITS.test(values.nuId.trim()))) {
      newFieldErrors.nuId = true
    }
    if (field === 'nuEmail' && values.isNuStudent === 'Yes' && !values.nuEmail.trim()) {
      newFieldErrors.nuEmail = true
    }
    if (field === 'universityName' && values.isNuStudent === 'No' && !values.universityName.trim()) {
      newFieldErrors.universityName = true
    }
    if (field === 'hasExperience' && !values.hasExperience) {
      newFieldErrors.hasExperience = true
    }
    if (field === 'experienceDetails' && values.hasExperience === 'Yes' && !values.experienceDetails.trim()) {
      newFieldErrors.experienceDetails = true
    }
    if (field === 'firstPreference' && !values.firstPreference) {
      newFieldErrors.firstPreference = true
    }
    if (field === 'secondPreference' && !values.secondPreference) {
      newFieldErrors.secondPreference = true
    }
    if (field === 'hasMedical' && !values.hasMedical) {
      newFieldErrors.hasMedical = true
    }
    if (field === 'medicalDetails' && values.hasMedical === 'Yes' && !values.medicalDetails.trim()) {
      newFieldErrors.medicalDetails = true
    }

    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(prev => ({ ...prev, ...newFieldErrors }))
    }
  }

  const handleFileSelect = async (file: File) => {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf']
    if (!validTypes.includes(file.type)) {
      setUploadError('Please upload an image (JPEG, PNG, GIF) or PDF file.')
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size must be less than 10MB.')
      return
    }

    setSelectedFile(file)
    setUploadError('')
    setUploading(true)
    // Clear error for national ID field
    if (fieldErrors.nationalId) {
      setFieldErrors(prev => ({ ...prev, nationalId: false }))
    }

    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

      if (!cloudName || !uploadPreset) {
        throw new Error('Cloudinary configuration is missing. Please contact support.')
      }

      // Upload to Cloudinary only (Drive upload happens on form submission)
      const cloudinaryUrl = await uploadFile(file, cloudName, uploadPreset)

      setUploadUrl(cloudinaryUrl)
      setValues(prev => ({ ...prev, nationalIdLink: cloudinaryUrl }))
    } catch (err) {
      console.error('Upload error:', err)
      setUploadError(err instanceof Error ? err.message : 'Upload failed. Please try again.')
      setSelectedFile(null)
      setUploadUrl('')
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } finally {
      setUploading(false)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Prevent selecting a new file if one is already uploaded
    if (uploadUrl || uploading) {
      e.preventDefault()
      e.stopPropagation()
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      return
    }
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    // Prevent dropping if file is already uploaded or uploading
    if (uploadUrl || uploading) {
      return
    }
    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setUploadUrl('')
    setUploadError('')
    setValues(prev => ({ ...prev, nationalIdLink: '' }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const validate = (): { errors: string[], firstErrorField: string | null } => {
    const errors: string[] = []
    const newFieldErrors: Record<string, boolean> = {}
    let firstErrorField: string | null = null

    if (!values.firstName.trim()) {
      errors.push('First Name is required.')
      newFieldErrors.firstName = true
      if (!firstErrorField) firstErrorField = 'firstName'
    }
    if (!values.lastName.trim()) {
      errors.push('Last Name is required.')
      newFieldErrors.lastName = true
      if (!firstErrorField) firstErrorField = 'lastName'
    }
    if (!values.email.trim()) {
      errors.push('E-mail is required.')
      newFieldErrors.email = true
      if (!firstErrorField) firstErrorField = 'email'
    }
    if (!values.dob.trim()) {
      errors.push('Date of Birth is required.')
      newFieldErrors.dob = true
      if (!firstErrorField) firstErrorField = 'dob'
    }
    if (!values.phone.trim() || !ELEVEN_DIGITS.test(values.phone.trim())) {
      errors.push('Phone Number must be 11 digits.')
      newFieldErrors.phone = true
      if (!firstErrorField) firstErrorField = 'phone'
    }
    if (!values.emergencyPhone.trim() || !ELEVEN_DIGITS.test(values.emergencyPhone.trim())) {
      errors.push('Emergency Contact Number must be 11 digits.')
      newFieldErrors.emergencyPhone = true
      if (!firstErrorField) firstErrorField = 'emergencyPhone'
    }
    if (!values.emergencyName.trim()) {
      errors.push('Emergency Contact Name is required.')
      newFieldErrors.emergencyName = true
      if (!firstErrorField) firstErrorField = 'emergencyName'
    }
    if (!values.emergencyRelation.trim()) {
      errors.push('Emergency Relationship is required.')
      newFieldErrors.emergencyRelation = true
      if (!firstErrorField) firstErrorField = 'emergencyRelation'
    }

    if (!values.isNuStudent) {
      errors.push('Please select if you are a Nile University student.')
      newFieldErrors.isNuStudent = true
      if (!firstErrorField) firstErrorField = 'isNuStudent'
    }
    if (values.isNuStudent === 'Yes') {
      if (!values.nuId.trim() || !NINE_DIGITS.test(values.nuId.trim())) {
        errors.push('NU ID must be 9 digits.')
        newFieldErrors.nuId = true
        if (!firstErrorField) firstErrorField = 'nuId'
      }
      if (!values.nuEmail.trim()) {
        errors.push('NU E-mail is required.')
        newFieldErrors.nuEmail = true
        if (!firstErrorField) firstErrorField = 'nuEmail'
      }
    } else if (values.isNuStudent === 'No') {
      if (!values.universityName.trim()) {
        errors.push('University Name is required.')
        newFieldErrors.universityName = true
        if (!firstErrorField) firstErrorField = 'universityName'
      }
    }

    if (!values.firstPreference) {
      errors.push('First preference is required.')
      newFieldErrors.firstPreference = true
      if (!firstErrorField) firstErrorField = 'firstPreference'
    }
    if (!values.secondPreference) {
      errors.push('Second preference is required.')
      newFieldErrors.secondPreference = true
      if (!firstErrorField) firstErrorField = 'secondPreference'
    }
    if (
      values.firstPreference &&
      values.secondPreference &&
      values.firstPreference === values.secondPreference
    ) {
      errors.push('Second preference must be different from first preference.')
      newFieldErrors.secondPreference = true
      if (!firstErrorField) firstErrorField = 'secondPreference'
    }

    const nationalIdUrl = uploadUrl || values.nationalIdLink.trim()
    if (!nationalIdUrl) {
      errors.push('National ID upload is required.')
      newFieldErrors.nationalId = true
      if (!firstErrorField) firstErrorField = 'nationalId'
    }

    if (!values.hasExperience) {
      errors.push('Please answer the experience question.')
      newFieldErrors.hasExperience = true
      if (!firstErrorField) firstErrorField = 'hasExperience'
    }
    if (values.hasExperience === 'Yes' && !values.experienceDetails.trim()) {
      errors.push('Please describe your previous MUN experience.')
      newFieldErrors.experienceDetails = true
      if (!firstErrorField) firstErrorField = 'experienceDetails'
    }

    if (!values.hasMedical) {
      errors.push('Please answer the medical question.')
      newFieldErrors.hasMedical = true
      if (!firstErrorField) firstErrorField = 'hasMedical'
    }
    if (values.hasMedical === 'Yes' && !values.medicalDetails.trim()) {
      errors.push('Please provide your medical details/allergies.')
      newFieldErrors.medicalDetails = true
      if (!firstErrorField) firstErrorField = 'medicalDetails'
    }

    setFieldErrors(newFieldErrors)
    return { errors, firstErrorField }
  }

  const buildFormData = () => {
    const entries: Record<string, string> = {}
    entries['entry.828105202'] = values.firstName.trim()
    entries['entry.1987124113'] = values.lastName.trim()
    entries['entry.65033571'] = values.phone.trim()
    entries['entry.655757607'] = values.gender
    entries['entry.1544800612'] = values.dob.trim()
    entries['entry.510479275'] = values.email.trim()
    if (values.emergencyName) entries['entry.1206770724'] = values.emergencyName.trim()
    if (values.emergencyRelation) entries['entry.1006162298'] = values.emergencyRelation.trim()
    if (values.emergencyPhone) entries['entry.589948682'] = values.emergencyPhone.trim()

    if (values.isNuStudent) entries['entry.1747482760'] = values.isNuStudent
    if (values.isNuStudent === 'Yes') {
      entries['entry.577032053'] = values.nuId.trim()
      entries['entry.7653303'] = values.nuEmail.trim()
    } else if (values.isNuStudent === 'No') {
      entries['entry.708616032'] = values.universityName.trim()
    }

    const nationalIdUrl = uploadUrl || values.nationalIdLink.trim()
    if (nationalIdUrl) {
      entries['entry.816407361'] = nationalIdUrl
    }

    if (values.hasExperience) entries['entry.425536960'] = values.hasExperience
    if (values.hasExperience === 'Yes' && values.experienceDetails.trim()) {
      entries['entry.28021578'] = values.experienceDetails.trim()
    }

    if (values.firstPreference) entries['entry.321846360'] = values.firstPreference
    if (values.secondPreference && values.firstPreference) {
      const entryId = SECOND_PREF_ENTRY[values.firstPreference]
      entries[`entry.${entryId}`] = values.secondPreference
    }

    if (values.hasMedical) entries['entry.1094557964'] = values.hasMedical
    if (values.hasMedical === 'Yes' && values.medicalDetails.trim()) {
      entries['entry.1231177621'] = values.medicalDetails.trim()
    }

    return entries
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    console.log('Form submit handler called')
    setErrorMsg('')
    
    if (uploading) {
      setErrorMsg('Please wait for the file upload to complete.')
      return
    }
    
    const { errors, firstErrorField } = validate()
    if (errors.length) {
      console.log('Validation errors:', errors)
      setErrorMsg(errors.join(' '))
      
      // Scroll to first error field
      if (firstErrorField && fieldRefs[firstErrorField as keyof typeof fieldRefs]) {
        const fieldRef = fieldRefs[firstErrorField as keyof typeof fieldRefs]
        if (fieldRef?.current) {
          fieldRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
          fieldRef.current.focus()
        }
      }
      return
    }

    setStatus('submitting')
    const entries = buildFormData()

    console.log('Submitting entries to webhook:', entries)

    try {
      const response = await fetch('/api/submit-apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ entries }),
      })

      const data = await response.json().catch(() => ({} as any))

      if (!response.ok || data?.ok === false) {
        throw new Error(`Submit failed${data?.error ? `: ${data.error}` : ` (${response.status})`}`)
      }

      // After successful form submission, save file to Google Drive
      if (uploadUrl && selectedFile) {
        try {
          console.log('Saving file to Google Drive after form submission:', { 
            fileName: selectedFile.name, 
            fileType: selectedFile.type 
          })
          const driveResponse = await fetch('/api/save-to-drive', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fileUrl: uploadUrl,
              fileName: selectedFile.name,
              fileType: selectedFile.type,
            }),
          })
          
          const driveResult = await driveResponse.json()
          console.log('Drive save result:', driveResult)
          
          if (!driveResponse.ok || !driveResult.ok) {
            console.warn('Form submitted successfully, but Drive save failed:', driveResult)
            // Don't fail the form submission if Drive save fails
          } else {
            console.log('File successfully saved to Google Drive')
          }
        } catch (driveErr) {
          console.warn('Google Drive save error (form still submitted successfully):', driveErr)
          // Don't fail the form submission if Drive save fails
        }
      }

      setStatus('success')
    } catch (err) {
      console.error('Submission error:', err)
      setStatus('error')
      setErrorMsg('Submission failed. Please try again in a moment.')
    }
  }

  if (status === 'success') {
    return (
      <>
        <Head>
          <title>Apply | NIMUN</title>
        </Head>
        <div className={`${styles.container} ${styles.successContainer}`}>
          <div className={styles.card}>
            <h1 className={styles.title}>Thank you for applying!</h1>
            <p className={styles.subtitle}>
              We received your submission. We will reach out via email with next steps.
            </p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Apply | NIMUN</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>IC’26 Application</h1>
          <p className={styles.subtitle}>
            Submit your details. Required fields are marked with *.
          </p>

          {errorMsg && <div className={styles.error}>{errorMsg}</div>}

          <form className={styles.form} onSubmit={handleSubmit}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Personal Information</h2>
              <div className={styles.grid2}>
                <label className={`${styles.field} ${fieldErrors.firstName ? styles.fieldError : ''}`}>
                  <span>First Name *</span>
                  <input
                    ref={fieldRefs.firstName}
                    required
                    value={values.firstName}
                    onChange={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                  />
                </label>
                <label className={`${styles.field} ${fieldErrors.lastName ? styles.fieldError : ''}`}>
                  <span>Last Name *</span>
                  <input
                    ref={fieldRefs.lastName}
                    required
                    value={values.lastName}
                    onChange={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                  />
                </label>
              </div>
              <div className={styles.grid2}>
                <label className={`${styles.field} ${fieldErrors.phone ? styles.fieldError : ''}`}>
                  <span>Phone Number * (11 digits)</span>
                  <input
                    ref={fieldRefs.phone}
                    required
                    type="text"
                    inputMode="numeric"
                    pattern="\d{11}"
                    value={values.phone}
                    onChange={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                  />
                </label>
                <label className={styles.field}>
                  <span>Gender</span>
                  <select value={values.gender} onChange={handleChange('gender')}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </label>
              </div>
              <div className={styles.grid2}>
                <label className={`${styles.field} ${fieldErrors.dob ? styles.fieldError : ''}`}>
                  <span>Date of Birth *</span>
                  <input
                    ref={fieldRefs.dob}
                    type="date"
                    value={values.dob}
                    onChange={handleChange('dob')}
                    onBlur={handleBlur('dob')}
                  />
                </label>
                <label className={`${styles.field} ${fieldErrors.email ? styles.fieldError : ''}`}>
                  <span>E-mail *</span>
                  <input
                    ref={fieldRefs.email}
                    required
                    type="email"
                    value={values.email}
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                  />
                </label>
              </div>
              <div className={styles.grid2}>
                <label className={`${styles.field} ${fieldErrors.emergencyName ? styles.fieldError : ''}`}>
                  <span>Emergency Contact Name *</span>
                  <input
                    ref={fieldRefs.emergencyName}
                    required
                    value={values.emergencyName}
                    onChange={handleChange('emergencyName')}
                    onBlur={handleBlur('emergencyName')}
                  />
                </label>
                <label className={`${styles.field} ${fieldErrors.emergencyRelation ? styles.fieldError : ''}`}>
                  <span>Emergency Relationship *</span>
                  <input
                    ref={fieldRefs.emergencyRelation}
                    required
                    value={values.emergencyRelation}
                    onChange={handleChange('emergencyRelation')}
                    onBlur={handleBlur('emergencyRelation')}
                  />
                </label>
              </div>
              <label className={`${styles.field} ${fieldErrors.emergencyPhone ? styles.fieldError : ''}`}>
                <span>Emergency Contact Number * (11 digits)</span>
                <input
                  ref={fieldRefs.emergencyPhone}
                  required
                  type="text"
                  inputMode="numeric"
                  pattern="\d{11}"
                  value={values.emergencyPhone}
                  onChange={handleChange('emergencyPhone')}
                  onBlur={handleBlur('emergencyPhone')}
                />
              </label>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Academic Info</h2>
              <label className={`${styles.field} ${fieldErrors.isNuStudent ? styles.fieldError : ''}`}>
                <span>Nile University student? *</span>
                <select
                  ref={fieldRefs.isNuStudent}
                  required
                  value={values.isNuStudent}
                  onChange={handleChange('isNuStudent')}
                  onBlur={handleBlur('isNuStudent')}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </label>

              {values.isNuStudent === 'Yes' && (
                <div className={styles.grid2}>
                  <label className={`${styles.field} ${fieldErrors.nuId ? styles.fieldError : ''}`}>
                    <span>NU ID * (9 digits)</span>
                    <input
                      ref={fieldRefs.nuId}
                      required
                      type="text"
                      inputMode="numeric"
                      pattern="\d{9}"
                      value={values.nuId}
                      onChange={handleChange('nuId')}
                      onBlur={handleBlur('nuId')}
                    />
                  </label>
                  <label className={`${styles.field} ${fieldErrors.nuEmail ? styles.fieldError : ''}`}>
                    <span>NU E-mail *</span>
                    <input
                      ref={fieldRefs.nuEmail}
                      required
                      type="email"
                      value={values.nuEmail}
                      onChange={handleChange('nuEmail')}
                      onBlur={handleBlur('nuEmail')}
                    />
                  </label>
                </div>
              )}

              {values.isNuStudent === 'No' && (
                <label className={`${styles.field} ${fieldErrors.universityName ? styles.fieldError : ''}`}>
                  <span>University Name *</span>
                  <input
                    ref={fieldRefs.universityName}
                    required
                    value={values.universityName}
                    onChange={handleChange('universityName')}
                    onBlur={handleBlur('universityName')}
                  />
                </label>
              )}
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Documents</h2>
              <div className={styles.field}>
                <span>National ID Upload *</span>
                <div
                  ref={fieldRefs.nationalId}
                  className={`${styles.fileUploadArea} ${uploading ? styles.uploading : ''} ${uploadUrl ? styles.uploaded : ''} ${fieldErrors.nationalId ? styles.fieldError : ''}`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={(e) => {
                    // Prevent any clicks when file is uploaded or uploading
                    if (uploading || uploadUrl) {
                      e.preventDefault()
                      e.stopPropagation()
                      return false
                    }
                    // Only allow click if no file is uploaded
                    if (!uploadUrl && !uploading && fileInputRef.current) {
                      fileInputRef.current.click()
                    }
                  }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileInputChange}
                    className={styles.fileInput}
                    disabled={uploading || !!uploadUrl}
                    onClick={(e) => {
                      if (uploadUrl) {
                        e.preventDefault()
                        e.stopPropagation()
                      }
                    }}
                  />
                  {uploading ? (
                    <div className={styles.uploadStatus}>
                      <div className={styles.spinner}></div>
                      <span>Uploading...</span>
                    </div>
                  ) : uploadUrl ? (
                    <div className={styles.uploadStatus}>
                      <svg className={styles.checkmark} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span>File Uploaded Successfully</span>
                      {selectedFile && (
                        <span className={styles.fileName}>{selectedFile.name}</span>
                      )}
                      <button
                        type="button"
                        className={styles.removeFileBtn}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRemoveFile()
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className={styles.uploadPrompt}>
                      <svg className={styles.uploadIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      <p>Drag & drop your file here, or click to browse</p>
                      <p className={styles.fileTypes}>Accepts: Images (JPEG, PNG, GIF) and PDF files (Max 10MB)</p>
                    </div>
                  )}
                </div>
                {uploadError && <div className={styles.uploadError}>{uploadError}</div>}
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Experience</h2>
              <label className={`${styles.field} ${fieldErrors.hasExperience ? styles.fieldError : ''}`}>
                <span>Do you have any previous experience with MUN? *</span>
                <select
                  ref={fieldRefs.hasExperience}
                  required
                  value={values.hasExperience}
                  onChange={handleChange('hasExperience')}
                  onBlur={handleBlur('hasExperience')}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </label>
              {values.hasExperience === 'Yes' && (
                <label className={`${styles.field} ${fieldErrors.experienceDetails ? styles.fieldError : ''}`}>
                  <span>Briefly state your experience *</span>
                  <textarea
                    ref={fieldRefs.experienceDetails}
                    required
                    rows={3}
                    value={values.experienceDetails}
                    onChange={handleChange('experienceDetails')}
                    onBlur={handleBlur('experienceDetails')}
                  />
                </label>
              )}
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Council Preferences</h2>
              <div className={styles.grid2}>
                <label className={`${styles.field} ${fieldErrors.firstPreference ? styles.fieldError : ''}`}>
                  <span>1st Preference *</span>
                  <select
                    ref={fieldRefs.firstPreference}
                    required
                    value={values.firstPreference}
                    onChange={handleChange('firstPreference')}
                    onBlur={handleBlur('firstPreference')}
                  >
                    <option value="">Select</option>
                    {COUNCIL_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </label>
                <label className={`${styles.field} ${fieldErrors.secondPreference ? styles.fieldError : ''}`}>
                  <span>2nd Preference *</span>
                  <select
                    ref={fieldRefs.secondPreference}
                    required
                    value={values.secondPreference}
                    onChange={handleChange('secondPreference')}
                    onBlur={handleBlur('secondPreference')}
                  >
                    <option value="">Select</option>
                    {filteredSecondOptions.map(opt => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {/* <small className={styles.help}>
                    We submit the 2nd preference to the entry ID that matches your 1st preference.
                  </small> */}
                </label>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Medical</h2>
              <label className={`${styles.field} ${fieldErrors.hasMedical ? styles.fieldError : ''}`}>
                <span>Do you have any Allergies/Health Conditions? *</span>
                <select
                  ref={fieldRefs.hasMedical}
                  required
                  value={values.hasMedical}
                  onChange={handleChange('hasMedical')}
                  onBlur={handleBlur('hasMedical')}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </label>
              {values.hasMedical === 'Yes' && (
                <label className={`${styles.field} ${fieldErrors.medicalDetails ? styles.fieldError : ''}`}>
                  <span>Please state them *</span>
                  <textarea
                    ref={fieldRefs.medicalDetails}
                    required
                    rows={3}
                    value={values.medicalDetails}
                    onChange={handleChange('medicalDetails')}
                    onBlur={handleBlur('medicalDetails')}
                  />
                </label>
              )}
            </section>

            <div className={styles.actions}>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={status === 'submitting' || uploading}
                onClick={(e) => {
                  console.log('Button clicked, status:', status, 'uploading:', uploading)
                  if (status === 'submitting' || uploading) {
                    e.preventDefault()
                  }
                }}
              >
                {uploading ? 'Uploading file...' : status === 'submitting' ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
            <div className={styles.googleFormLink}>
              <p>
                Having trouble with this form?{' '}
                <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSd4iHO0GIu-0dkY88yTVUvm495-ge8g0z7PreroUnr3-rkqsg/viewform" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Use the original Google Form instead
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

