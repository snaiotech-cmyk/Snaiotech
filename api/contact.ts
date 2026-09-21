import type { VercelRequest, VercelResponse } from '@vercel/node'
import nodemailer from 'nodemailer'

interface ContactBody {
  name?: string
  email?: string
  company?: string
  service?: string
  message?: string
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' })

  const { name, email, company, service, message } = (request.body || {}) as ContactBody
  if (!name?.trim() || !email?.trim() || !message?.trim()) return response.status(400).json({ error: 'Name, email, and message are required.' })

  const user = process.env.SMTP_USER
  const password = process.env.SMTP_PASSWORD
  if (!user || !password) return response.status(500).json({ error: 'Email delivery is not configured.' })

  try {
    const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user, pass: password } })
    await transporter.sendMail({
      from: `Snaiotech website <${user}>`,
      to: process.env.CONTACT_TO || 'sales@snaiotech.com',
      replyTo: email,
      subject: `New Snaiotech enquiry from ${name}`,
      text: [`Name: ${name}`, `Email: ${email}`, `Company: ${company || 'Not provided'}`, `Service: ${service || 'Not selected'}`, '', message].join('\n'),
    })
    return response.status(200).json({ ok: true })
  } catch (error) {
    console.error('Contact email failed', error)
    return response.status(502).json({ error: 'Unable to deliver your message right now.' })
  }
}
