import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Simple validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email credentials not configured');
      return NextResponse.json(
        { error: 'Email service is not configured. Please try again later.' },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify connection
    await transporter.verify();

    // Email content
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: 'diary.of.a.black.man101@gmail.com',
      subject: `New Contact Form: ${subject}`,
      replyTo: email,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background: linear-gradient(135deg, #0a0a0f, #0d1b2a, #1b3a5c); color: #ffffff; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.5);">
          <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid rgba(96, 165, 250, 0.2);">
            <h1 style="font-size: 24px; font-weight: 700; background: linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0;">
              📬 New Contact Form Submission
            </h1>
            <p style="color: #94a3b8; font-size: 13px; margin-top: 5px;">From Changing The Mindset Of An African Child</p>
          </div>
          
          <div style="padding: 20px 0;">
            <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 12px; margin: 15px 0; border: 1px solid rgba(255,255,255,0.05);">
              <p style="margin: 8px 0;"><strong style="color: #60a5fa;">👤 Name:</strong> <span style="color: #e2e8f0;">${name}</span></p>
              <p style="margin: 8px 0;"><strong style="color: #60a5fa;">📧 Email:</strong> <a href="mailto:${email}" style="color: #a78bfa; text-decoration: none;">${email}</a></p>
              <p style="margin: 8px 0;"><strong style="color: #60a5fa;">📝 Subject:</strong> <span style="color: #e2e8f0;">${subject}</span></p>
            </div>
            
            <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; margin: 15px 0; border-left: 3px solid #60a5fa;">
              <p style="margin: 0 0 10px 0; color: #60a5fa; font-weight: 600; font-size: 14px;">💬 Message:</p>
              <p style="margin: 0; color: #e2e8f0; line-height: 1.8; white-space: pre-wrap; font-size: 14px;">${message}</p>
            </div>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.05); text-align: center; color: #64748b; font-size: 12px;">
            <p style="margin: 0;">📱 You can reply directly to this email to contact <span style="color: #94a3b8;">${name}</span>.</p>
            <p style="margin: 8px 0 0 0;">— Changing The Mindset Of An African Child</p>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission:
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
        
        You can reply directly to this email to contact ${name}.
        ---
        Changing The Mindset Of An African Child
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);

    return NextResponse.json(
      { message: 'Email sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again.' },
      { status: 500 }
    );
  }
}