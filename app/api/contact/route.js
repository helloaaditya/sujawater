import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getSiteConfig } from '@/lib/data-source';
import { createServerClient } from '@/lib/supabase';

function validateBody(body) {
  const { name, mobile, email, message } = body || {};
  const e = {};
  if (!name || !String(name).trim()) e.name = 'Name is required';
  if (!mobile || !String(mobile).trim()) e.mobile = 'Mobile is required';
  else if (!/^[6-9]\d{9}$/.test(String(mobile).replace(/\s/g, ''))) e.mobile = 'Enter a valid 10-digit mobile number';
  if (!email || !String(email).trim()) e.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) e.email = 'Enter a valid email';
  if (!message || !String(message).trim()) e.message = 'Message is required';
  return { errors: e, name: String(name).trim(), mobile: String(mobile).trim(), email: String(email).trim(), message: String(message).trim() };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { errors, name, mobile, email, message } = validateBody(body);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    const siteConfig = await getSiteConfig();
    const toEmail = process.env.CONTACT_EMAIL_TO || siteConfig.email;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      console.error('Contact API: SMTP_USER and SMTP_PASS must be set in .env');
      return NextResponse.json(
        { ok: false, message: 'Email is not configured. Please set SMTP credentials in .env' },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const companyName = siteConfig?.fullName || siteConfig?.name;
    const subject = `Enquiry from ${name} (${email})`;
    const html = `
      <h2>New enquiry – from ${name} to ${companyName}</h2>
      <p><strong>From (customer):</strong> ${name} &lt;<a href="mailto:${email}">${email}</a>&gt;</p>
      <p><strong>Mobile:</strong> ${mobile}</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space: pre-wrap; font-family: inherit;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
      <hr />
      <p><strong>Reply to this email to respond directly to the customer.</strong></p>
      <p><small>Sent via ${companyName} contact form → delivered to sujawps@gmail.com</small></p>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM || `"${companyName}" <${smtpUser}>`,
      to: toEmail,
      replyTo: `"${name}" <${email}>`,
      subject,
      text: `Enquiry from ${name} (${email}) to ${companyName}\n\nMobile: ${mobile}\n\nMessage:\n${message}\n\n--- Reply to this email to respond to the customer. ---`,
      html,
    });

    const supabase = createServerClient();
    if (supabase) {
      await supabase.from('leads').insert({ name, email, mobile, message });
    }

    return NextResponse.json({ ok: true, message: 'Enquiry sent successfully.' });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { ok: false, message: err.message || 'Failed to send email. Please try again or call us.' },
      { status: 500 }
    );
  }
}
