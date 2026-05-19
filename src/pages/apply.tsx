import ApplyDecorations from '@/components/apply/ApplyDecorations'
import ApplyNavbar from '@/components/apply/ApplyNavbar'
import Head from 'next/head'
import { useMemo, useState, useEffect } from 'react'
import styles from '@/styles/Apply.module.scss'

type QuestionType =
  | 'TEXT'
  | 'PARAGRAPH_TEXT'
  | 'DATE'
  | 'MULTIPLE_CHOICE'
  | 'FILE_UPLOAD'
  | 'GRID'
  | 'IMAGE'

type Option = {
  text: string
  branchesTo?: string
}

type Question = {
  title: string
  type: QuestionType
  isRequired: boolean
  options?: Option[]
  rows?: string[]
  columns?: string[]
  imageSrc?: string
  imageAlt?: string
  driveFolderKey?: string
  allowOther?: boolean
}

type Section = {
  sectionTitle: string
  sectionDescription: React.ReactNode
  nextAction: 'CONTINUE' | 'SUBMIT'
  branchesTo?: string
  questions: Question[]
}

type FileUploadState = {
  file: File | null
  url: string
  uploading: boolean
}

const FORM_TITLE = "JNIMUN'26 Delegate Application"

const FORM_DESCRIPTION = `Hello Everybody!

JNIMUN'26 is almost Here!

Apply now as a delegate! In this form, you'll find all the information needed for the Conference Councils. Please select your preferences (1st and 2nd) according to the council you feel will suit you best.

NIMUN Delegate Package Includes:
    - 4 days of intensive training sessions
    - Opening Ceremony and Performance Day
    - 3 full days of conference sessions
    - Entry to the Closing Ceremony
    - Dinners throughout the event
    - Breakfast provided on all conference days
    - Giveaways!`

const SECTIONS: Section[] = [
  {
    sectionTitle: 'Start / Section 1',
    sectionDescription: '',
    nextAction: 'CONTINUE',
    questions: [
      { title: 'First Name', type: 'TEXT', isRequired: true },
      { title: 'Last Name', type: 'TEXT', isRequired: true },
      {
        title: 'Gender',
        type: 'MULTIPLE_CHOICE',
        isRequired: true,
        options: [
          { text: 'Male', branchesTo: 'Next Section' },
          { text: 'Female', branchesTo: 'Next Section' },
        ],
      },
      { title: 'Date of Birth', type: 'DATE', isRequired: false },
      { title: 'Phone Number', type: 'TEXT', isRequired: true },
      { title: 'Email Address', type: 'TEXT', isRequired: true },
      {
        title: "Please Upload your National ID\n(If you don't have one, please upload your Birth Certificate)",
        type: 'FILE_UPLOAD',
        isRequired: true,
        driveFolderKey: 'delegate_national_id',
      },
      { title: 'Guardian personal Name ', type: 'TEXT', isRequired: true },
      {
        title: "Guardian's Relation ",
        type: 'MULTIPLE_CHOICE',
        isRequired: true,
        options: [
          { text: 'Mother', branchesTo: 'Next Section' },
          { text: 'Father', branchesTo: 'Next Section' },
        ],
        allowOther: true,
      },
      { title: 'Guardian Phone Number', type: 'TEXT', isRequired: true },
      { title: "Guardian's National ID", type: 'FILE_UPLOAD', isRequired: true, driveFolderKey: 'guardian_national_id' },
      { title: 'School Name', type: 'TEXT', isRequired: true },
      {
        title: 'Education Type',
        type: 'MULTIPLE_CHOICE',
        isRequired: true,
        options: [
          { text: 'IGCSE', branchesTo: 'Next Section' },
          { text: 'American', branchesTo: 'Next Section' },
          { text: 'IB', branchesTo: 'Next Section' },
          { text: 'National', branchesTo: 'Next Section' },
        ],
        allowOther: true,
      },
      {
        title: 'Grade Year',
        type: 'MULTIPLE_CHOICE',
        isRequired: true,
        options: [
          { text: '8', branchesTo: 'Next Section' },
          { text: '9', branchesTo: 'Next Section' },
          { text: '10', branchesTo: 'Next Section' },
          { text: '11', branchesTo: 'Next Section' },
          { text: '12', branchesTo: 'Next Section' },
        ],
      },
      {
        title: 'Your Age',
        type: 'MULTIPLE_CHOICE',
        isRequired: true,
        options: [
          { text: '13', branchesTo: 'Next Section' },
          { text: '14', branchesTo: 'Next Section' },
          { text: '15', branchesTo: 'Next Section' },
          { text: '+16', branchesTo: 'Next Section' },
        ],
      },
    ],
  },
  {
    sectionTitle: 'MUN Experience',
    sectionDescription: '',
    nextAction: 'CONTINUE',
    questions: [
      {
        title: 'Do you have past MUN experience?',
        type: 'MULTIPLE_CHOICE',
        isRequired: true,
        options: [
          { text: 'Yes', branchesTo: 'GO_TO_PAGE: Has MUN Experience' },
          { text: 'No', branchesTo: 'GO_TO_PAGE: Conference Timeline' },
        ],
      },
    ],
  },
  {
    sectionTitle: 'Has MUN Experience',
    sectionDescription: '',
    nextAction: 'CONTINUE',
    questions: [{ title: 'Briefly State your experience', type: 'PARAGRAPH_TEXT', isRequired: true }],
  },
  {
    sectionTitle: 'Conference Timeline',
    sectionDescription: '',
    nextAction: 'CONTINUE',
    questions: [
      { title: '', type: 'IMAGE', isRequired: false, imageSrc: "/image/png/JNIMUN%2726/Form%20Docs/JNIMUN%2726%20Timeline_page-0001.jpg", imageAlt: 'Timeline Page 1' },
      { title: '', type: 'IMAGE', isRequired: false, imageSrc: "/image/png/JNIMUN%2726/Form%20Docs/JNIMUN%2726%20Timeline_page-0002.jpg", imageAlt: 'Timeline Page 2' },
      { title: '', type: 'IMAGE', isRequired: false, imageSrc: "/image/png/JNIMUN%2726/Form%20Docs/JNIMUN%2726%20Timeline_page-0003.jpg", imageAlt: 'Timeline Page 3' },
    ],
  },
  {
    sectionTitle: 'Councils',
    sectionDescription:
      'Councils description:\n\nAdvanced:\n\n- United Nations Security Council (UNSC): The UNSC focuses on maintaining international peace and security, addressing urgent global conflicts and threats through decisive measures like economic sanctions and peacekeeping operations.\n\n- Crisis Committee: This specialized, fast-paced committee simulates a rapidly evolving emergency in real time, where delegates must respond to live updates, shifting alliances, and unexpected intelligence by issuing directives that take immediate effect.\n\nIntermediate:\n\n- United Nations Office on Drugs and Crime (UNODC): UNODC tackles global challenges related to illicit drug trafficking, transnational organized crime, corruption, and terrorism through international legal cooperation and policy framework development.\n\n- International Maritime Organization (IMO): The IMO regulates global shipping by establishing international standards for ship safety, security, and environmental protection to prevent marine pollution and ensure sustainable maritime transport.\n\nBeginner:\n\n- United Nations High Commissioner for Refugees (UNHCR): UNHCR focuses on protecting and supporting people forced to flee conflict, persecution, or disaster, working to provide life-saving aid and secure long-term solutions like resettlement and integration.\n\n- International Press Committee: Serving as the voice and lens of the conference, delegates act as journalists who document debates, conduct interviews, and utilize creative storytelling across media platforms to capture the diplomatic atmosphere.',
    nextAction: 'CONTINUE',
    questions: [
      {
        title: 'Council Preferences',
        type: 'GRID',
        isRequired: true,
        rows: ['1st Preference', '2nd Preference'],
        columns: [
          'United Nations Security Council (UNSC) (Advanced)',
          'Crisis Committee (Advanced)',
          'United Nations Office on Drugs and Crime (UNODC) (Intermediate)',
          'International Maritime Organization (IMO) (Intermediate)',
          'United Nations High Commissioner for Refugees (UNHCR) (Beginner)',
          'International Press Committee (Beginner)',
        ],
      },
    ],
  },
  {
    sectionTitle: 'Health conditions or allergies',
    sectionDescription: '',
    nextAction: 'CONTINUE',
    questions: [
      {
        title: 'Do you have any Allergies/Health Conditions we should be aware of?',
        type: 'MULTIPLE_CHOICE',
        isRequired: true,
        options: [
          { text: 'Yes', branchesTo: 'GO_TO_PAGE: Health & Allergies' },
          { text: 'No', branchesTo: 'GO_TO_PAGE: Transportation' },
        ],
      },
    ],
  },
  {
    sectionTitle: 'Health & Allergies',
    sectionDescription: '',
    nextAction: 'CONTINUE',
    questions: [{ title: 'Please state them', type: 'TEXT', isRequired: true }],
  },
  {
    sectionTitle: 'Transportation',
    sectionDescription: '',
    nextAction: 'CONTINUE',
    questions: [
      {
        title: 'Do you need transportation?',
        type: 'MULTIPLE_CHOICE',
        isRequired: true,
        options: [
          { text: 'Yes', branchesTo: 'GO_TO_PAGE: Transportation Routes' },
          { text: 'No', branchesTo: 'GO_TO_PAGE: Fees policy' },
        ],
      },
    ],
  },
  {
    sectionTitle: 'Transportation Routes',
    sectionDescription: '',
    nextAction: 'CONTINUE',
    questions: [
      {
        title: "What's your nearest Pickup location?",
        type: 'MULTIPLE_CHOICE',
        isRequired: true,
        options: [
          { text: '6th of October', branchesTo: 'Next Section' },
          { text: 'Sheikh Zayed', branchesTo: 'Next Section' },
          { text: 'Feisal', branchesTo: 'Next Section' },
          { text: 'Maadi', branchesTo: 'Next Section' },
          { text: '5th Settlement', branchesTo: 'Next Section' },
        ],
      },
    ],
  },
  {
    sectionTitle: 'Fees policy',
    sectionDescription: 'Kindly follow our payment policy and choose the payment method that suits you best. ',
    nextAction: 'CONTINUE',
    questions: [
      { title: '', type: 'IMAGE', isRequired: false, imageSrc: "/image/png/JNIMUN%2726/Form%20Docs/Wave%201.png", imageAlt: 'Fees policy' },
      { title: 'Terms and Conditions', type: 'IMAGE', isRequired: false, imageSrc: "/image/png/JNIMUN%2726/Form%20Docs/Back.png", imageAlt: 'Terms and Conditions' },
      {
        title: 'Amount Paid',
        type: 'MULTIPLE_CHOICE',
        isRequired: true,
        options: [
          { text: '650', branchesTo: 'Next Section' },
          { text: '1300', branchesTo: 'Next Section' },
        ],
      },
      {
        title: 'Choose your Payment Method',
        type: 'MULTIPLE_CHOICE',
        isRequired: true,
        options: [
          { text: 'Telda', branchesTo: 'GO_TO_PAGE: Telda' },
          { text: 'Instapay', branchesTo: 'GO_TO_PAGE: Instapay' },
        ],
      },
    ],
  },
  {
    sectionTitle: 'Telda',
    sectionDescription: 'Please send the payment to the account: @nimuneg',
    nextAction: 'SUBMIT',
    questions: [
      { title: 'Please upload proof of Payment', type: 'FILE_UPLOAD', isRequired: true, driveFolderKey: 'telda_payment_proofs' },
    ],
  },
  {
    sectionTitle: 'Instapay',
    sectionDescription: (
      <>
        Please scan the QR code to complete your payment, or use the link below.
        <br /><br />
        <a href="https://ipn.eg/S/belal3amer/instapay/4CFWsE" target="_blank" rel="noopener noreferrer" style={{ color: '#2e90cf', textDecoration: 'underline', fontWeight: 'bold' }}>
          InstaPay Payment Link
        </a>
      </>
    ),
    nextAction: 'SUBMIT',
    questions: [
      { title: 'Scan this QR code for payment', type: 'IMAGE', isRequired: false, imageSrc: "/image/png/JNIMUN%2726/Form%20Docs/InstaPay%20QR%20Code.jpg", imageAlt: 'Instapay QR code' },
      { title: 'Please upload proof of Payment ', type: 'FILE_UPLOAD', isRequired: true, driveFolderKey: 'instapay_payment_proofs' },
    ],
]

const allImagesToPreload: string[] = []
SECTIONS.forEach((section) => {
  section.questions.forEach((question) => {
    if (question.type === 'IMAGE' && question.imageSrc) {
      allImagesToPreload.push(question.imageSrc)
    }
  })
})

const sectionIndexByTitle = SECTIONS.reduce<Record<string, number>>((acc, section, index) => {
  acc[section.sectionTitle] = index
  return acc
}, {})

const fieldKey = (sectionTitle: string, questionTitle: string, row?: string) =>
  [sectionTitle, questionTitle || 'Image', row].filter(Boolean).join('::')

const getPlainKey = (questionTitle: string, row?: string) =>
  row ? `${questionTitle.trim()} [${row}]` : questionTitle.trim() || 'Image'

const getNextSectionIndex = (currentIndex: number, answers: Record<string, string | Record<string, string>>) => {
  const section = SECTIONS[currentIndex]
  if (!section) return currentIndex + 1

  for (const question of section.questions) {
    if (question.type === 'MULTIPLE_CHOICE') {
      const selectedAnswer = answers[fieldKey(section.sectionTitle, question.title)]
      const selectedOption = question.options?.find((option) => option.text === selectedAnswer)

      if (selectedOption?.branchesTo?.startsWith('GO_TO_PAGE:')) {
        const targetTitle = selectedOption.branchesTo.replace('GO_TO_PAGE:', '').trim()
        return sectionIndexByTitle[targetTitle] ?? currentIndex + 1
      }
    }
  }

  if (section.branchesTo?.startsWith('GO_TO_PAGE:')) {
    const targetTitle = section.branchesTo.replace('GO_TO_PAGE:', '').trim()
    return sectionIndexByTitle[targetTitle] ?? currentIndex + 1
  }

  return currentIndex + 1
}

export default function Apply() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [sectionHistory, setSectionHistory] = useState<number[]>([])
  const [answers, setAnswers] = useState<Record<string, string | Record<string, string>>>({})
  const [uploads, setUploads] = useState<Record<string, FileUploadState>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (errors.submit) {
      const timer = setTimeout(() => {
        setErrors((prev) => {
          const next = { ...prev }
          delete next.submit
          return next
        })
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errors.submit])

  const currentSection = (SECTIONS[currentSectionIndex] || SECTIONS[0]) as Section
  const progress = useMemo(() => {
    if (SECTIONS.length <= 1) return 0
    return Math.round((currentSectionIndex / (SECTIONS.length - 1)) * 100)
  }, [currentSectionIndex])

  const setAnswer = (key: string, value: string | Record<string, string>) => {
    setAnswers((previous) => ({ ...previous, [key]: value }))
    setErrors((previous) => {
      const next = { ...previous }
      delete next[key]
      return next
    })
  }

  const validateSection = () => {
    const nextErrors: Record<string, string> = {}

    currentSection.questions.forEach((question) => {
      if (!question.isRequired) return

      const key = fieldKey(currentSection.sectionTitle, question.title)

      if (question.type === 'FILE_UPLOAD') {
        if (!uploads[key]?.url) nextErrors[key] = 'This upload is required'
        return
      }

      if (question.type === 'GRID') {
        const gridAnswer = answers[key] as Record<string, string> | undefined
        const missingRows = question.rows?.filter((row) => !gridAnswer?.[row]) || []
        if (missingRows.length) nextErrors[key] = 'Please answer every required row'
        if (gridAnswer) {
          const selectedValues = Object.values(gridAnswer).filter(Boolean)
          if (new Set(selectedValues).size !== selectedValues.length) {
            nextErrors[key] = 'Please choose two different councils'
          }
        }
        return
      }

      if (!String(answers[key] || '').trim()) {
        nextErrors[key] = 'This field is required'
      }

      if (question.allowOther && answers[key] === 'Other') {
        const otherKey = fieldKey(currentSection.sectionTitle, question.title, 'Other')
        if (!String(answers[otherKey] || '').trim()) {
          nextErrors[otherKey] = 'Please specify'
        }
      }
    })

    const emailKey = fieldKey('Start / Section 1', 'Email Address')
    if (currentSection.sectionTitle === 'Start / Section 1') {
      const email = String(answers[emailKey] || '')
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        nextErrors[emailKey] = 'Please enter a valid email address'
      }
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setTimeout(() => {
        const firstErrorKey = Object.keys(nextErrors)[0]
        const element = document.getElementById(`${firstErrorKey}-container`)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          const input = element.querySelector('input, textarea, select') as HTMLElement
          if (input) input.focus()
        }
      }, 50)
      return false
    }

    return true
  }

  const uploadFile = async (key: string, file: File, question: Question) => {
    if (file.size > 10 * 1024 * 1024) {
      setErrors((previous) => ({ ...previous, [key]: 'File size must be less than 10MB' }))
      return
    }

    setUploads((previous) => ({ ...previous, [key]: { file, url: '', uploading: true } }))

    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

      if (!cloudName || !uploadPreset) {
        throw new Error('Cloudinary configuration missing')
      }

      // 1. Prepare Cloudinary Promise
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)
      uploadFormData.append('upload_preset', uploadPreset)
      uploadFormData.append('cloud_name', cloudName)

      const cloudinaryPromise = fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
        method: 'POST',
        body: uploadFormData,
      }).then(res => res.json().then(data => {
        if (!res.ok) throw new Error(data.error?.message || 'Upload failed')
        return data.secure_url as string
      }))

      // 2. Prepare Drive Promise
      let drivePromise: Promise<string | null> = Promise.resolve(null)

      if (question.driveFolderKey) {
        drivePromise = new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => resolve((reader.result as string).split(',')[1] || '')
          reader.onerror = (error) => reject(error)
        }).then(base64Data => fetch('/api/save-to-drive', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileContent: base64Data,
            fileName: file.name,
            fileType: file.type || 'application/octet-stream',
            folderKey: question.driveFolderKey,
            fieldTitle: question.title,
          }),
        })).then(res => res.json()).then(driveResult => {
          const finalFileUrl = driveResult?.data?.fileUrl || driveResult?.data?.data?.fileUrl
          if (driveResult?.ok !== false && finalFileUrl) {
            return finalFileUrl
          }
          console.warn('Drive save returned error, falling back to Cloudinary URL:', driveResult)
          return null
        }).catch(err => {
          console.warn('Drive save failed completely, falling back to Cloudinary URL:', err)
          return null
        })
      }

      // 3. Execute concurrently! (Cuts upload wait time in half)
      const [cloudinaryUrl, driveUrl] = await Promise.all([cloudinaryPromise, drivePromise])

      const uploadedUrl = driveUrl || cloudinaryUrl

      setUploads((previous) => ({ ...previous, [key]: { file, url: uploadedUrl, uploading: false } }))
      setAnswer(key, uploadedUrl)
    } catch (error) {
      console.error('Upload error:', error)
      setUploads((previous) => ({ ...previous, [key]: { file: null, url: '', uploading: false } }))
      setErrors((previous) => ({ ...previous, [key]: 'Failed to upload file. Please try again.' }))
    }
  }

  const removeFile = (key: string) => {
    setUploads((previous) => ({ ...previous, [key]: { file: null, url: '', uploading: false } }))
    setAnswer(key, '')
  }

  const goNext = async () => {
    if (!validateSection()) return

    if (currentSection.nextAction === 'SUBMIT') {
      await submitApplication()
      return
    }

    const nextIndex = getNextSectionIndex(currentSectionIndex, answers)

    if (nextIndex >= SECTIONS.length) {
      await submitApplication()
      return
    }

    setSectionHistory((previous) => [...previous, currentSectionIndex])
    setCurrentSectionIndex(nextIndex)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goBack = () => {
    const previousIndex = sectionHistory[sectionHistory.length - 1]
    if (previousIndex === undefined) return

    setCurrentSectionIndex(previousIndex)
    setSectionHistory((previous) => previous.slice(0, -1))
    setErrors({})
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const buildPayload = () => {
    const flatAnswers: Record<string, string> = {}

    SECTIONS.forEach((section) => {
      section.questions.forEach((question) => {
        const key = fieldKey(section.sectionTitle, question.title)

        if (question.type === 'GRID') {
          const gridAnswer = answers[key] as Record<string, string> | undefined
          question.rows?.forEach((row) => {
            flatAnswers[getPlainKey(question.title, row)] = gridAnswer?.[row] || ''
          })
          return
        }

        if (question.type === 'IMAGE') return

        const value = String(answers[key] || '')
        const otherKey = fieldKey(section.sectionTitle, question.title, 'Other')
        const otherValue = String(answers[otherKey] || '').trim()
        const finalValue = value === 'Other' && otherValue ? `Other: ${otherValue}` : value

        const plainKey = getPlainKey(question.title)
        if (finalValue !== '' || !flatAnswers[plainKey]) {
          flatAnswers[plainKey] = finalValue
        }
      })
    })

    return {
      source: 'website',
      answers: flatAnswers,
    }
  }

  const submitApplication = async () => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/submit-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload()),
      })
      const result = await response.json()

      if (!response.ok) {
        setErrors({ submit: result.error || 'Submission failed' })
        return
      }

      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      console.error('Application submission error:', error)
      setErrors({ submit: error instanceof Error ? error.message : 'Failed to submit application. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderQuestion = (question: Question, index: number) => {
    const baseKey = fieldKey(currentSection.sectionTitle, question.title)
    const key = `${baseKey}::${index}`
    const answer = answers[baseKey]

    if (question.type === 'IMAGE') {
      return (
        <div className={styles.imageQuestion} key={key} id={`${key}-container`}>
          {question.title && <h3>{question.title}</h3>}
          {question.imageSrc ? (
            <img src={question.imageSrc} alt={question.imageAlt || question.title} />
          ) : (
            <div className={styles.imagePlaceholder}>{question.imageAlt || question.title || 'Form image'}</div>
          )}
        </div>
      )
    }

    if (question.type === 'GRID') {
      const gridAnswer = (answer as Record<string, string>) || {}

      return (
        <div className={`${styles.field} ${errors[baseKey] ? styles.fieldError : ''}`} key={key} id={`${key}-container`}>
          <span>
            {question.title}
            {question.isRequired && ' *'}
          </span>
          <div className={styles.preferenceGrid}>
            {question.rows?.map((row) => (
              <label key={row} className={styles.preferenceRow}>
                <span>{row}</span>
                <select
                  value={gridAnswer[row] || ''}
                  onChange={(event) => {
                    const nextGridAnswer = { ...gridAnswer, [row]: event.target.value }
                    Object.keys(nextGridAnswer).forEach((otherRow) => {
                      if (otherRow !== row && nextGridAnswer[otherRow] === event.target.value) {
                        nextGridAnswer[otherRow] = ''
                      }
                    })
                    setAnswer(baseKey, nextGridAnswer)
                  }}
                  required={question.isRequired}
                >
                  <option value="">Choose council</option>
                  {question.columns
                    ?.filter((column) => {
                      const selectedInAnotherRow = Object.entries(gridAnswer).some(
                        ([selectedRow, selectedCouncil]) => selectedRow !== row && selectedCouncil === column
                      )
                      return !selectedInAnotherRow || gridAnswer[row] === column
                    })
                    .map((column) => (
                      <option key={column} value={column}>
                        {column}
                      </option>
                    ))}
                </select>
              </label>
            ))}
          </div>
          {errors[baseKey] && <small className={styles.errorText}>{errors[baseKey]}</small>}
        </div>
      )
    }

    if (question.type === 'MULTIPLE_CHOICE') {
      const otherKey = fieldKey(currentSection.sectionTitle, question.title, 'Other')

      return (
        <div className={`${styles.field} ${errors[baseKey] ? styles.fieldError : ''}`} key={key} id={`${key}-container`}>
          <span>
            {question.title}
            {question.isRequired && ' *'}
          </span>
          <div className={styles.choiceGroup}>
            {[...(question.options || []), ...(question.allowOther ? [{ text: 'Other' }] : [])].map((option) => (
              <label className={styles.choice} key={option.text}>
                <input
                  type="radio"
                  name={baseKey}
                  value={option.text}
                  checked={answer === option.text}
                  onChange={(event) => {
                    setAnswer(baseKey, event.target.value)
                    if (event.target.value !== 'Other') setAnswer(otherKey, '')
                  }}
                  required={question.isRequired}
                />
                <span>{option.text}</span>
              </label>
            ))}
          </div>
          {errors[baseKey] && <small className={styles.errorText}>{errors[baseKey]}</small>}
          {question.allowOther && answer === 'Other' && (
            <label className={`${styles.otherField} ${errors[otherKey] ? styles.fieldError : ''}`}>
              <span>Please specify</span>
              <input
                type="text"
                value={String(answers[otherKey] || '')}
                onChange={(event) => setAnswer(otherKey, event.target.value)}
                required
              />
              {errors[otherKey] && <small className={styles.errorText}>{errors[otherKey]}</small>}
            </label>
          )}
        </div>
      )
    }

    if (question.type === 'FILE_UPLOAD') {
      const upload = uploads[baseKey]

      return (
        <div className={`${styles.field} ${errors[baseKey] ? styles.fieldError : ''}`} key={key} id={`${key}-container`}>
          <span>
            {question.title}
            {question.isRequired && ' *'}
          </span>
          <div
            className={`${styles.fileUploadArea} ${upload?.uploading ? styles.uploading : ''} ${upload?.url ? styles.uploaded : ''
              } ${errors[baseKey] ? styles.fieldError : ''}`}
          >
            {!upload?.file && !upload?.uploading && (
              <label htmlFor={baseKey} className={styles.uploadPrompt}>
                <svg className={styles.uploadIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p>Click to upload</p>
                <p className={styles.fileTypes}>Images or PDF, max 10MB</p>
              </label>
            )}

            {upload?.uploading && (
              <div className={styles.uploadStatus}>
                <div className={styles.spinner}></div>
                <span>Uploading...</span>
              </div>
            )}

            {upload?.url && !upload.uploading && (
              <div className={styles.uploadStatus}>
                <svg className={styles.checkmark} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                <span>Upload complete</span>
                <p className={styles.fileName}>{upload.file?.name}</p>
                <button type="button" onClick={() => removeFile(baseKey)} className={styles.removeFileBtn}>
                  Remove
                </button>
              </div>
            )}

            <input
              id={baseKey}
              className={styles.fileInput}
              type="file"
              accept="image/*,.pdf"
              disabled={upload?.uploading || !!upload?.url}
              onChange={(event) => {
                const file = event.target.files?.[0]
                if (file) uploadFile(baseKey, file, question)
              }}
            />
          </div>
          {errors[baseKey] && <small className={styles.errorText}>{errors[baseKey]}</small>}
        </div>
      )
    }

    const inputType = question.type === 'DATE' ? 'date' : question.title.toLowerCase().includes('email') ? 'email' : 'text'

    return (
      <label className={`${styles.field} ${errors[baseKey] ? styles.fieldError : ''}`} key={key} id={`${key}-container`}>
        <span>
          {question.title}
          {question.isRequired && ' *'}
        </span>
        {question.type === 'PARAGRAPH_TEXT' ? (
          <textarea
            value={String(answer || '')}
            onChange={(event) => setAnswer(baseKey, event.target.value)}
            rows={5}
            required={question.isRequired}
          />
        ) : (
          <input
            type={inputType}
            value={String(answer || '')}
            onChange={(event) => setAnswer(baseKey, event.target.value)}
            required={question.isRequired}
          />
        )}
        {errors[baseKey] && <small className={styles.errorText}>{errors[baseKey]}</small>}
      </label>
    )
  }

  const pageTitle = (
    <>
      JNIMUN<span className={styles.accent}>&apos;26</span> Delegate Application
    </>
  )

  const isFormOpen = process.env.NEXT_PUBLIC_FORM_IS_OPEN !== 'false'

  if (!isFormOpen) {
    return (
      <div className={styles.pageShell}>
        <ApplyNavbar />
        <Head>
          <title>Applications Paused | JNIMUN&apos;26</title>
        </Head>
        <div className={`${styles.container} ${styles.successContainer}`}>
          <div className={styles.card}>
            <ApplyDecorations />
            <svg className={styles.successIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className={styles.title}>
              Applications <span className={styles.accent}>Paused</span>
            </h1>
            <p className={styles.subtitle}>
              Applications are temporarily paused as the current wave has reached its seat limit. Please check back soon!
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className={styles.pageShell}>
        <ApplyNavbar />
        <Head>
          <title>Application Submitted | JNIMUN&apos;26</title>
        </Head>
        <div className={`${styles.container} ${styles.successContainer}`}>
          <div className={styles.card}>
            <ApplyDecorations />
            <svg className={styles.successIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <h1 className={styles.title}>
              Application <span className={styles.accent}>Submitted</span>
            </h1>
            <p className={styles.subtitle}>
              Thank you for applying to JNIMUN&apos;26. We&apos;ve received your application and will review it soon.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.pageShell}>
      <ApplyNavbar />
      <Head>
        <title>{FORM_TITLE} | JNIMUN&apos;26</title>
        {allImagesToPreload.map((src) => (
          <link key={src} rel="preload" href={src} as="image" />
        ))}
      </Head>
      <div className={styles.container}>
        <div className={styles.card}>
          <ApplyDecorations />
          <div className={styles.formHeader}>
            <p className={styles.kicker}>Delegate Registration</p>
            <h1 className={styles.title}>{pageTitle}</h1>
            {currentSectionIndex === 0 && <p className={styles.description}>{FORM_DESCRIPTION}</p>}
          </div>

          <div className={styles.progressWrap} aria-label={`Form progress: ${progress}%`}>
            <div className={styles.progressMeta}>
              <span>{progress}%</span>
            </div>
            <div className={styles.progressTrack}>
              <div className={styles.progressBar} style={{ width: `${progress}%` }} />
            </div>
          </div>

          <form
            className={styles.form}
            onSubmit={(event) => {
              event.preventDefault()
              goNext()
            }}
          >
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{currentSection.sectionTitle}</h2>
              {currentSection.sectionDescription && (
                <p className={styles.sectionDescription}>{currentSection.sectionDescription}</p>
              )}

              {currentSection.questions.length ? (
                currentSection.questions.map(renderQuestion)
              ) : (
                <p className={styles.note}>Please continue to the next section.</p>
              )}
            </section>

            {errors.submit && (
              <div className={styles.toastPopup}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                {errors.submit}
              </div>
            )}

            <div className={styles.actions}>
              <button type="button" className={styles.secondaryBtn} onClick={goBack} disabled={!sectionHistory.length || isSubmitting}>
                Back
              </button>
              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : currentSection.nextAction === 'SUBMIT' ? 'Submit Application' : 'Continue'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
