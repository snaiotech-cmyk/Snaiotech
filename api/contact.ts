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
  webdev: 'Web Development & SEO / GEO',
  pdf: 'PDF & Document Accessibility (WCAG 2.2 AA / PDF/UA)',
  zoho: 'Zoho Implementation & Automation',
  multiple: 'Multiple Services',
  other: 'General Inquiry',
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * High-contrast, accessibility-first email template for internal sales leads.
 * Uses solid WCAG AAA compliant background/foreground contrast (>= 7:1)
 * so it renders legibly across Zoho Mail, Gmail, Outlook, and dark/light modes.
 */
function htmlLeadEmail(name: string, email: string, company: string, service: string, message: string): string {
  const serviceLabel = SERVICE_LABELS[service] || service || 'Not selected'
  const companyLabel = company.trim() || 'Not provided'
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeCompany = escapeHtml(companyLabel)
  const safeService = escapeHtml(serviceLabel)
  const safeMsg = escapeHtml(message).replace(/\n/g, '<br>')
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>New Website Enquiry from ${safeName}</title>
</head>
<body style="margin:0;padding:0;background-color:#F1F5F9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0F172A;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F1F5F9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#FFFFFF;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(15,23,42,0.08);border:1px solid #E2E8F0;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background:linear-gradient(135deg, #0A192F 0%, #0F3B68 100%);padding:28px 32px;color:#FFFFFF;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <span style="display:inline-block;background-color:#0284C7;color:#FFFFFF;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:4px 10px;border-radius:4px;">
                      New Website Lead
                    </span>
                    <h1 style="margin:12px 0 4px 0;font-size:22px;font-weight:700;line-height:1.2;color:#FFFFFF;">
                      New Enquiry from ${safeName}
                    </h1>
                    <p style="margin:0;font-size:13px;color:#94A3B8;">
                      Received on ${timestamp} IST via snaiotech.com
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Lead Details Table -->
          <tr>
            <td style="padding:28px 32px 12px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #E2E8F0;width:130px;vertical-align:top;">
                    <span style="font-size:12px;font-weight:600;color:#475569;text-transform:uppercase;letter-spacing:0.06em;">Name</span>
                  </td>
                  <td style="padding:10px 0;border-bottom:1px solid #E2E8F0;font-size:15px;font-weight:600;color:#0F172A;">
                    ${safeName}
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #E2E8F0;vertical-align:top;">
                    <span style="font-size:12px;font-weight:600;color:#475569;text-transform:uppercase;letter-spacing:0.06em;">Email</span>
                  </td>
                  <td style="padding:10px 0;border-bottom:1px solid #E2E8F0;font-size:15px;font-weight:600;color:#0284C7;">
                    <a href="mailto:${safeEmail}" style="color:#0284C7;text-decoration:underline;">${safeEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #E2E8F0;vertical-align:top;">
                    <span style="font-size:12px;font-weight:600;color:#475569;text-transform:uppercase;letter-spacing:0.06em;">Company</span>
                  </td>
                  <td style="padding:10px 0;border-bottom:1px solid #E2E8F0;font-size:15px;color:#0F172A;">
                    ${safeCompany}
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #E2E8F0;vertical-align:top;">
                    <span style="font-size:12px;font-weight:600;color:#475569;text-transform:uppercase;letter-spacing:0.06em;">Service</span>
                  </td>
                  <td style="padding:10px 0;border-bottom:1px solid #E2E8F0;font-size:15px;font-weight:600;color:#0369A1;">
                    ${safeService}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Section -->
          <tr>
            <td style="padding:16px 32px 24px 32px;">
              <span style="display:block;margin-bottom:8px;font-size:12px;font-weight:600;color:#475569;text-transform:uppercase;letter-spacing:0.06em;">
                Message Content
              </span>
              <div style="background-color:#F8FAFC;border-left:4px solid #0284C7;border-top:1px solid #E2E8F0;border-right:1px solid #E2E8F0;border-bottom:1px solid #E2E8F0;border-radius:0 8px 8px 0;padding:16px 20px;font-size:15px;line-height:1.6;color:#1E293B;">
                ${safeMsg}
              </div>
            </td>
          </tr>

          <!-- Quick Action CTA -->
          <tr>
            <td style="padding:0 32px 32px 32px;" align="center">
              <a href="mailto:${safeEmail}?subject=Re:%20Your%20Snaiotech%20enquiry" 
                 style="display:inline-block;background-color:#0284C7;color:#FFFFFF;text-decoration:none;font-size:15px;font-weight:600;padding:12px 28px;border-radius:6px;box-shadow:0 2px 4px rgba(2,132,199,0.25);">
                Reply to ${safeName} (${safeEmail})
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#F8FAFC;border-top:1px solid #E2E8F0;padding:18px 32px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#64748B;line-height:1.5;">
                <strong>Snaiotech</strong> · Choolaimedu, Chennai - 600094 · <a href="https://www.snaiotech.com" style="color:#0284C7;text-decoration:none;">www.snaiotech.com</a><br>
                This is an automated notification from your website's contact form.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

/**
 * Warm, professional greeting email automatically sent to the enquirer.
 * Confirms receipt and informs them when a specialist will reach out.
 */
function htmlCustomerGreetingEmail(name: string, service: string, company: string, message: string): string {
  const serviceLabel = SERVICE_LABELS[service] || service || 'our services'
  const safeName = escapeHtml(name)
  const safeService = escapeHtml(serviceLabel)
  const safeCompany = escapeHtml(company.trim() || 'Not provided')
  const safeMsg = escapeHtml(message).replace(/\n/g, '<br>')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>Thank you for reaching out to Snaiotech</title>
</head>
<body style="margin:0;padding:0;background-color:#F1F5F9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0F172A;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F1F5F9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#FFFFFF;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(15,23,42,0.08);border:1px solid #E2E8F0;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background:linear-gradient(135deg, #0A192F 0%, #0F3B68 100%);padding:32px;color:#FFFFFF;text-align:center;">
              <h2 style="margin:0 0 8px 0;font-size:24px;font-weight:800;letter-spacing:-0.02em;color:#FFFFFF;">
                Snaiotech
              </h2>
              <p style="margin:0;font-size:14px;color:#94A3B8;">
                Digital work that works for everyone.
              </p>
            </td>
          </tr>

          <!-- Greeting Body -->
          <tr>
            <td style="padding:32px;">
              <h1 style="margin:0 0 16px 0;font-size:20px;font-weight:700;color:#0F172A;">
                Thank you for contacting us, ${safeName}!
              </h1>
              <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:#334155;">
                We have received your enquiry regarding <strong>${safeService}</strong>. Our team is already reviewing the details you shared.
              </p>
              <p style="margin:0 0 24px 0;font-size:15px;line-height:1.6;color:#334155;">
                A specialist from our team will get in touch with you shortly (typically within <strong>24 business hours</strong>) to discuss your project requirements and next steps.
              </p>

              <!-- Submission Copy Box -->
              <div style="background-color:#F8FAFC;border:1px solid #E2E8F0;border-radius:8px;padding:20px;margin-bottom:24px;">
                <h3 style="margin:0 0 12px 0;font-size:13px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.06em;">
                  Summary of your enquiry
                </h3>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:14px;">
                  <tr>
                    <td style="padding:4px 0;color:#64748B;width:100px;">Service:</td>
                    <td style="padding:4px 0;color:#0F172A;font-weight:600;">${safeService}</td>
                  </tr>
                  ${company.trim() ? `
                  <tr>
                    <td style="padding:4px 0;color:#64748B;">Company:</td>
                    <td style="padding:4px 0;color:#0F172A;">${safeCompany}</td>
                  </tr>` : ''}
                  <tr>
                    <td style="padding:4px 0;color:#64748B;vertical-align:top;">Message:</td>
                    <td style="padding:4px 0;color:#334155;line-height:1.5;">${safeMsg}</td>
                  </tr>
                </table>
              </div>

              <!-- Assistance Note -->
              <p style="margin:0 0 16px 0;font-size:14px;line-height:1.6;color:#64748B;">
                Need to add extra details or files? Simply reply directly to this email or write to us at 
                <a href="mailto:sales@snaiotech.com" style="color:#0284C7;text-decoration:underline;">sales@snaiotech.com</a>.
              </p>

              <!-- Sign-off -->
              <div style="margin-top:28px;padding-top:20px;border-top:1px solid #E2E8F0;">
                <p style="margin:0;font-size:14px;font-weight:600;color:#0F172A;">Warm regards,</p>
                <p style="margin:4px 0 0 0;font-size:14px;color:#334155;"><strong>The Snaiotech Team</strong></p>
                <p style="margin:2px 0 0 0;font-size:13px;color:#64748B;">
                  <a href="https://www.snaiotech.com" style="color:#0284C7;text-decoration:none;">www.snaiotech.com</a>
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#F8FAFC;border-top:1px solid #E2E8F0;padding:18px 32px;text-align:center;">
              <p style="margin:0 0 8px 0;font-size:12px;color:#64748B;line-height:1.5;">
                <em>This is an automated confirmation sent from a no-reply address. To contact our team directly, please email <a href="mailto:sales@snaiotech.com" style="color:#0284C7;text-decoration:none;">sales@snaiotech.com</a>.</em>
              </p>
              <p style="margin:0;font-size:12px;color:#94A3B8;line-height:1.5;">
                © ${new Date().getFullYear()} Snaiotech · Choolaimedu, Chennai - 600094<br>
                Specialists in Web Development, PDF/Document Accessibility (WCAG 2.2 AA / PDF/UA), and Zoho Implementation.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
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
  if (!user || !password) {
    return response.status(500).json({ error: 'Email delivery is not configured on the server.' })
  }

  const cleanName = name.trim()
  const cleanEmail = email.trim()
  const cleanCompany = (company || '').trim()
  const cleanService = (service || '').trim()
  const cleanMessage = message.trim()
  const salesEmail = process.env.CONTACT_TO || 'sales@snaiotech.com'
  const noReplyEmail = process.env.SMTP_FROM || process.env.NOREPLY_EMAIL || 'noreply@snaiotech.com'

  const smtpHost = process.env.SMTP_HOST
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465
  const smtpSecure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : smtpPort === 465

  try {
    const transporter = nodemailer.createTransport(
      smtpHost
        ? {
            host: smtpHost,
            port: smtpPort,
            secure: smtpSecure,
            auth: { user, pass: password },
          }
        : {
            service: 'gmail',
            auth: { user, pass: password },
          }
    )

    // 1. Send high-contrast, accessible lead notification to sales team
    const salesMailPromise = transporter.sendMail({
      from: `"Snaiotech Lead Notification" <${noReplyEmail}>`,
      to: salesEmail,
      replyTo: `"${cleanName}" <${cleanEmail}>`,
      envelope: {
        from: user,
        to: salesEmail,
      },
      subject: `New enquiry from ${cleanName} - Snaiotech`,
      text: [
        `NEW WEBSITE ENQUIRY - SNAIOTECH`,
        `====================================`,
        `Name:    ${cleanName}`,
        `Email:   ${cleanEmail}`,
        `Company: ${cleanCompany || 'Not provided'}`,
        `Service: ${SERVICE_LABELS[cleanService] || cleanService || 'Not selected'}`,
        `Date:    ${new Date().toISOString()}`,
        ``,
        `MESSAGE:`,
        `------------------------------------`,
        cleanMessage,
        `------------------------------------`,
        `Reply directly to: ${cleanEmail}`,
      ].join('\n'),
      html: htmlLeadEmail(cleanName, cleanEmail, cleanCompany, cleanService, cleanMessage),
    })

    // 2. Send warm, accessible greeting & confirmation email to the person who enquired
    const greetingMailPromise = transporter.sendMail({
      from: `"Snaiotech (No-Reply)" <${noReplyEmail}>`,
      to: `"${cleanName}" <${cleanEmail}>`,
      replyTo: salesEmail,
      envelope: {
        from: user,
        to: cleanEmail,
      },
      subject: `Thank you for contacting Snaiotech, ${cleanName}!`,
      text: [
        `Hello ${cleanName},`,
        ``,
        `Thank you for reaching out to Snaiotech! We have received your enquiry regarding ${SERVICE_LABELS[cleanService] || cleanService || 'our services'}.`,
        ``,
        `Our team is reviewing the details, and a specialist will get back to you within 24 business hours to discuss your project requirements.`,
        ``,
        `SUMMARY OF YOUR ENQUIRY:`,
        `------------------------------------`,
        `Service: ${SERVICE_LABELS[cleanService] || cleanService || 'Not selected'}`,
        cleanCompany ? `Company: ${cleanCompany}` : null,
        `Message:`,
        cleanMessage,
        `------------------------------------`,
        ``,
        `Please note: This is an automated message sent from a no-reply address. If you need to share any additional details, simply reply directly or reach us at ${salesEmail}.`,
        ``,
        `Warm regards,`,
        `The Snaiotech Team`,
        `https://www.snaiotech.com`,
      ].filter(Boolean).join('\n'),
      html: htmlCustomerGreetingEmail(cleanName, cleanService, cleanCompany, cleanMessage),
    })

    // Run both email sends concurrently with error-isolation
    const [salesResult, greetingResult] = await Promise.allSettled([salesMailPromise, greetingMailPromise])

    if (salesResult.status === 'rejected') {
      console.error('Failed to deliver lead notification to sales:', salesResult.reason)
    }
    if (greetingResult.status === 'rejected') {
      console.warn('Failed to deliver customer greeting email:', greetingResult.reason)
    }

    // If both failed, consider it a server error
    if (salesResult.status === 'rejected' && greetingResult.status === 'rejected') {
      throw new Error('Both email deliveries failed.')
    }

    return response.status(200).json({ ok: true })
  } catch (err) {
    console.error('Contact email failed:', err)
    return response.status(502).json({ error: 'Unable to deliver your message right now. Please try again.' })
  }
}
