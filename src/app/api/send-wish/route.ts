import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configure email transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Configure Next.js for file uploads
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const fileAttachments = formData.getAll('attachments') as File[];

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Prepare attachments
    const attachments: any[] = [];
    for (const file of fileAttachments) {
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        attachments.push({
          filename: file.name,
          content: buffer,
        });
      }
    }

    // Custom email template
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              border-radius: 15px;
              overflow: hidden;
              box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            }
            .header {
              background: linear-gradient(45deg, #ff6b6b, #feca57);
              color: white;
              padding: 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }
            .content {
              padding: 30px;
            }
            .sender-info {
              background: #f8f9fa;
              border-radius: 10px;
              padding: 20px;
              margin-bottom: 20px;
              border-left: 5px solid #ff6b6b;
            }
            .message {
              background: #fff5f5;
              border-radius: 10px;
              padding: 20px;
              border: 2px solid #fed7d7;
              font-style: italic;
              font-size: 16px;
              line-height: 1.6;
            }
            .footer {
              background: #2d3748;
              color: white;
              padding: 20px;
              text-align: center;
              font-size: 14px;
            }
            .emoji {
              font-size: 24px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Happy Birthday! 🎂</h1>
              <p>You have received a wonderful birthday wish!</p>
            </div>
            <div class="content">
              <div class="sender-info">
                <h3>From: ${name}</h3>
                <p>Email: ${email}</p>
              </div>
              <div class="message">
                <h3>Birthday Message:</h3>
                <p>${message.replace(/\n/g, '<br>')}</p>
              </div>
              ${attachments.length > 0 ? '<p><strong>Attachments:</strong> ' + attachments.length + ' file(s) included</p>' : ''}
            </div>
            <div class="footer">
              <p>Sent with ❤️ from the Birthday Wish App</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL, // The birthday person's email
      subject: `🎂 Birthday Wish from ${name}`,
      html: emailHtml,
      attachments: attachments,
    });

    // No cleanup needed for in-memory attachments

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
