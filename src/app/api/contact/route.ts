import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import prisma from "@/lib/prisma";

const packageNames: Record<string, string> = {
  "on-analiz": "Ön Analiz",
  "yerinde-analiz": "Yerinde Analiz",
  "ozel-danismanlik": "Premium Analiz / Danışmanlık",
};

const propertyTypes: Record<string, string> = {
  arazi: "Arazi",
  konut: "Konut",
  diger: "Diğer",
};

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const {
      firstName,
      lastName,
      phone,
      email,
      package: packageType,
      propertyType,
      purpose,
      parcelInfo,
      listingUrl,
      notes,
      kvkkAccepted,
    } = data;

    // Save to database
    await prisma.contactSubmission.create({
      data: {
        firstName,
        lastName,
        phone,
        email,
        package: packageType,
        propertyType,
        purpose: purpose || null,
        parcelInfo: parcelInfo || null,
        listingUrl: listingUrl || null,
        notes: notes || null,
        kvkkAccepted: kvkkAccepted || true,
      },
    });

    // Create email content
    const emailContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #8CC63F; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e5e7eb; }
    .field:last-child { border-bottom: none; }
    .label { font-weight: bold; color: #8CC63F; font-size: 14px; }
    .value { margin-top: 5px; }
    .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">Yeni Talep Formu</h1>
      <p style="margin: 10px 0 0;">Yerinde Analiz</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Ad Soyad</div>
        <div class="value">${firstName} ${lastName}</div>
      </div>
      <div class="field">
        <div class="label">Telefon</div>
        <div class="value">${phone}</div>
      </div>
      <div class="field">
        <div class="label">E-posta</div>
        <div class="value">${email}</div>
      </div>
      <div class="field">
        <div class="label">Seçilen Paket</div>
        <div class="value">${packageNames[packageType] || packageType}</div>
      </div>
      <div class="field">
        <div class="label">Gayrimenkul Türü</div>
        <div class="value">${propertyTypes[propertyType] || propertyType}</div>
      </div>
      ${purpose
        ? `<div class="field">
        <div class="label">Satın Alma Amacı</div>
        <div class="value">${purpose}</div>
      </div>`
        : ""
      }
      ${parcelInfo
        ? `<div class="field">
        <div class="label">Ada/Parsel Bilgileri</div>
        <div class="value">${parcelInfo}</div>
      </div>`
        : ""
      }
      ${listingUrl
        ? `<div class="field">
        <div class="label">İlan Linki</div>
        <div class="value"><a href="${listingUrl}">${listingUrl}</a></div>
      </div>`
        : ""
      }
      ${notes
        ? `<div class="field">
        <div class="label">Ek Notlar</div>
        <div class="value">${notes}</div>
      </div>`
        : ""
      }
      <div class="field">
        <div class="label">KVKK Onayı</div>
        <div class="value">${kvkkAccepted ? "Onaylandı ✓" : "Onaylanmadı"}</div>
      </div>
    </div>
    <div class="footer">
      <p>Bu e-posta yerindeanaliz.com üzerinden gönderilmiştir.</p>
    </div>
  </div>
</body>
</html>
`;

    // Email sending is optional - don't block form submission if it fails
    let emailSent = false;
    try {
      // Configure nodemailer (update with your SMTP settings)
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Send email
      await transporter.sendMail({
        from: process.env.SMTP_FROM || "noreply@yerindeanaliz.com",
        to: "info@yerindeanaliz.com",
        replyTo: email,
        subject: `Yeni Talep: ${firstName} ${lastName} - ${packageNames[packageType] || packageType}`,
        html: emailContent,
      });
      emailSent = true;
    } catch (emailError) {
      // Log email error but don't fail the request
      console.error("Email sending failed (submission was saved):", emailError);
    }

    return NextResponse.json({ success: true, emailSent });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
