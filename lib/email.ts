import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendDonationReceipt(donation: {
  donorName: string;
  donorEmail: string;
  amount: number;
  campaignTitle: string;
  paymentId: string;
  orderId?: string;
}) {
  const formatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(donation.amount);

  await transporter.sendMail({
    from: `"Community Base Advancement Foundation" <${process.env.EMAIL_FROM}>`,
    to: donation.donorEmail,
    subject: `Donation Receipt — ${formatted} | CBAF`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="font-family:Arial,sans-serif;background:#f9fafb;margin:0;padding:24px;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#16a34a,#2563eb);padding:32px;text-align:center;">
      <h1 style="color:white;margin:0;font-size:24px;">Thank You, ${donation.donorName}!</h1>
      <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;">Your generosity creates real change.</p>
    </div>
    <div style="padding:32px;">
      <p style="color:#374151;line-height:1.7;">Your donation has been received and will directly support <strong>${donation.campaignTitle}</strong>.</p>
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;margin:20px 0;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="color:#6b7280;padding:6px 0;font-size:14px;">Amount</td><td style="font-weight:700;color:#111827;text-align:right;">${formatted}</td></tr>
          <tr><td style="color:#6b7280;padding:6px 0;font-size:14px;">Campaign</td><td style="color:#111827;text-align:right;font-size:14px;">${donation.campaignTitle}</td></tr>
          <tr><td style="color:#6b7280;padding:6px 0;font-size:14px;">Payment ID</td><td style="color:#111827;text-align:right;font-size:13px;font-family:monospace;">${donation.paymentId}</td></tr>
        </table>
      </div>
      <p style="color:#6b7280;font-size:13px;line-height:1.6;">This receipt is valid for 80G tax exemption under the Income Tax Act, 1961.</p>
      <div style="margin-top:24px;padding-top:24px;border-top:1px solid #e5e7eb;text-align:center;">
        <p style="color:#374151;font-size:14px;margin:0;"><strong>Community Base Advancement Foundation</strong></p>
        <p style="color:#6b7280;font-size:13px;margin:4px 0;">+91 85297 16474 | info@communityfoundation.in</p>
      </div>
    </div>
  </div>
</body>
</html>`,
  });
}

export async function sendVolunteerConfirmation(volunteer: {
  name: string;
  email: string;
}) {
  await transporter.sendMail({
    from: `"CBAF" <${process.env.EMAIL_FROM}>`,
    to: volunteer.email,
    subject: "Welcome to the CBAF Volunteer Family!",
    html: `<p>Dear ${volunteer.name}, thank you for signing up as a volunteer! We will review your application and get back to you within 3-5 working days. — CBAF Team</p>`,
  });
}

export async function sendNewsletterConfirmation(email: string) {
  await transporter.sendMail({
    from: `"CBAF" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "You're subscribed to CBAF updates!",
    html: `<p>Thank you for subscribing to Community Base Advancement Foundation's newsletter. You will receive monthly impact stories, campaign updates, and ways to get involved.</p>`,
  });
}

export async function sendContactConfirmation(name: string, email: string) {
  await transporter.sendMail({
    from: `"CBAF" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "We received your message — CBAF",
    html: `<p>Dear ${name}, thank you for reaching out to us. Our team will respond within 24-48 hours. — CBAF Team</p>`,
  });
}
