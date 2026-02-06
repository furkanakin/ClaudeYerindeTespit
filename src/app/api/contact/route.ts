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
      selectedOptions,
      kvkkAccepted,
      source,
    } = data;

    // Save to database
    await prisma.contactSubmission.create({
      data: {
        source: source || "contact",
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
        selectedOptions: selectedOptions || null,
        kvkkAccepted: kvkkAccepted || true,
      },
    });

    // Try to send email notification, but don't fail the request if email fails
    // DISABLED: Email sending causes long timeout, temporarily disabled for better UX
    // TODO: Re-enable when SMTP is properly configured
    /*
    try {
      // Email code here...
    } catch (emailError) {
      console.warn("Failed to send email notification:", emailError);
    }
    */


    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
