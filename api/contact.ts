import type { VercelRequest, VercelResponse } from '@vercel/node'
import nodemailer from 'nodemailer'

interface ContactBody {
  name?: string
  email?: string
  company?: string
  service?: string
  message?: string
}

const SERVICE_LABELS: Record<string, string> = {
  webdev: 'Web Dev & SEO/AEO/GEO',
  pdf: 'PDF Accessibility & WCAG',
  zoho: 'Zoho Deployment & Customization',
  multiple: 'Multiple services',
  other: 'Not sure yet',
}

function htmlEmail(name: string, email: string, company: string, service: string, message: string): string {
  const serviceLabel = SERVICE_LABELS[service] || service || 'Not selected'
  const companyLabel = company || 'Not provided'
  const safeMsg = message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New enquiry from ${name}</title></head>
<body style="margin:0;padding:0;background:#0A0E1A;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0E1A;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#1565C0,#00B4D8);padding:32px 40px;border-radius:16px 16px 0 0;">
          <h1 style="margin:0;color:#fff;font-size:24px;font-weight:800;letter-spacing:-0.02em;">New Enquiry</h1>
          <p style="margin:6px 0 0;color:rgba(255,255,255,0.75);font-size:14px;">via Snaiotech website contact form</p>
        </td></tr>
        <!-- Body -->
        <tr><td style="background:rgba(255,255,255,0.055);border:1px solid rgba(255,255,255,0.09);border-top:none;border-radius:0 0 16px 16px;padding:36px 40px;">
          <!-- Fields -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            ${[
              ['Name', name],
              ['Email', `<a href="mailto:${email}" style="color:#00B4D8;text-decoration:none;">${email}</a>`],
              ['Company', companyLabel],
              ['Service', serviceLabel],
            ].map(([label, val]) => `
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);">
                <p style="margin:0;font-size:11px;color:rgba(247,249,252,0.4);text-transform:uppercase;letter-spacing:0.1em;">${label}</p>
                <p style="margin:4px 0 0;font-size:15px;color:#F7F9FC;">${val}</p>
              </td>
            </tr>`).join('')}
          </table>
          <!-- Message -->
          <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px;">
            <p style="margin:0 0 8px;font-size:11px;color:rgba(247,249,252,0.4);text-transform:uppercase;letter-spacing:0.1em;">Message</p>
            <p style="margin:0;font-size:14px;color:rgba(247,249,252,0.85);line-height:1.6;">${safeMsg}</p>
          </div>
          <!-- Reply CTA -->
          <div style="text-align:center;margin-top:32px;">
            <a href="mailto:${email}?subject=Re: Your Snaiotech enquiry" style="display:inline-block;background:linear-gradient(135deg,#1565C0,#00B4D8);color:#fff;text-decoration:none;padding:14px 32px;border-radius:50px;font-size:14px;font-weight:600;">Reply to ${name}</a>
          </div>
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:20px 0;text-align:center;">
          <p style="margin:0;font-size:12px;color:rgba(247,249,252,0.25);">© ${new Date().getFullYear()} Snaiotech · Choolaimedu, Chennai - 600094</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' })

  const { name, email, company = '', service = '', message } = (request.body || {}) as ContactBody

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return response.status(400).json({ error: 'Name, email, and message are required.' })
  }

  const user = process.env.SMTP_USER
  const password = process.env.SMTP_PASSWORD
  if (!user || !password) return response.status(500).json({ error: 'Email delivery is not configured on the server.' })

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass: password },
    })

    await transporter.sendMail({
      from: `"Snaiotech Website" <${user}>`,
      to: process.env.CONTACT_TO || 'sales@snaiotech.com',
      replyTo: `"${name}" <${email}>`,
      subject: `New enquiry from ${name} — Snaiotech`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || 'Not provided'}`,
        `Service: ${SERVICE_LABELS[service] || service || 'Not selected'}`,
        '',
        message,
      ].join('\n'),
      html: htmlEmail(name.trim(), email.trim(), company, service, message.trim()),
    })

    return response.status(200).json({ ok: true })
  } catch (err) {
    console.error('Contact email failed:', err)
    return response.status(502).json({ error: 'Unable to deliver your message right now. Please try again.' })
  }
}
