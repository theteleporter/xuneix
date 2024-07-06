import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { kv } from '@vercel/kv'; // Import Vercel KV
import { ADMIN_BASE_PATH, ROTATED_URLS_KEY, MAX_ROTATED_URLS } from "@/app/constants";

export async function GET() {
    const newUrlSegment = crypto.randomBytes(5).toString("hex");
    const newAdminUrl = `${ADMIN_BASE_PATH}/${newUrlSegment}`; // Base path for all admin pages
    const newToken = crypto
    .randomBytes(64) // You can adjust the token length as needed
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

    try {
        // Store in Vercel KV with 24-hour expiration
        await kv.set("adminUrl", newAdminUrl, { ex: 60 * 60 * 24 }); // 24 hours in seconds
        await kv.set("token", newToken, { ex: 60 * 60 * 24 });
    // Add new URL to rotatedUrls, limiting size
        let rotatedUrls: string[] = (await kv.get(ROTATED_URLS_KEY)) || []; 
        rotatedUrls.push(newAdminUrl);
        if (rotatedUrls.length > MAX_ROTATED_URLS) {
            rotatedUrls.shift(); // Remove the oldest URL
        }
        await kv.set(ROTATED_URLS_KEY, rotatedUrls);
  
    //Construct the email HTML with the generated variables
    const emailHtml = `
          <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Admin URL and Token</title>
  <style>
    .font-sans {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    }

    .text-sm {
      font-size: 14px;
    }

    .bg-gray-100 {
      background-color: #f7fafc; /* Tailwind bg-gray-100 */
    }

    .p-6 {
      padding: 1.5rem;
    }

    .rounded-lg {
      border-radius: 0.5rem;
    }

    .text-2xl {
      font-size: 1.5rem;
    }

    .font-semibold {
      font-weight: 600;
    }

    .text-gray-800 {
      color: #2d3748; /* Tailwind text-gray-800 */
    }

    .mb-2 {
      margin-bottom: 0.5rem;
    }

    .mb-4 {
      margin-bottom: 1rem;
    }

    .w-full {
      width: 100%;
    }

    .font-medium {
      font-weight: 500;
    }

    .text-gray-700 {
      color: #4a5568; /* Tailwind text-gray-700 */
    }

    .text-blue-600 {
      color: #2563eb; /* Tailwind text-blue-600 */
    }

    .underline {
      text-decoration: underline;
    }

    .break-all {
      word-break: break-all;
    }

    .whitespace-normal {
      white-space: normal;
    }

    .mt-4 {
      margin-top: 1rem;
    }

    .text-center {
      text-align: center;
    }

    .bg-red-500 {
      background-color: #f56565; /* Tailwind bg-red-500 */
    }

    .hover\:bg-red-700:hover {
      background-color: #c53030; /* Tailwind hover:bg-red-700 */
    }

    .text-white {
      color: white;
    }

    .font-bold {
      font-weight: bold;
    }

    .py-2 {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }

    .px-4 {
      padding-left: 1rem;
      padding-right: 1rem;
    }

    .rounded {
      border-radius: 0.25rem;
    }

    .text-gray-600 {
      color: #718096; /* Tailwind text-gray-600 */
    }

    .mt-8 {
      margin-top: 2rem;
    }

    @media (max-width: 640px) {
      .container {
        width: 100% !important;
        padding: 1rem;
      }
    }
  </style>
</head>
<body style="background-color: #ffffff; color: #24292e; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';">
  <div class="container mx-auto p-6 rounded-lg bg-gray-100" style="max-width: 480px; margin: 0; padding: 20px 10px 48px;">
    <div class="flex justify-center items-center mb-4">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}">
        <img src="${process.env.NEXT_PUBLIC_APP_URL}/icon.jpeg" width="32" height="32" alt="Xuneix, Inc">
      </a>
    </div>
    <div style="font-size: 24px; line-height: 1.25;">
      A new admin url and token have been generated
    </div>

    <div style="padding: 24px; border: solid 1px #dedede; border-radius: 5px; text-align: center;">
      <p style="margin: 0 0 10px 0; text-align: left;">Hey <strong>The Teleporter</strong>!</p>
      <p style="margin: 0 0 10px 0; text-align: left;">A new admin url and token have been generated. Below are the details:</p>
      
      <p style="margin: 0 0 10px 0; text-align: left;"><strong>New Url:</strong> ${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}${newAdminUrl}</p>
      <p style="margin: 0 0 10px 0; text-align: left;"><strong>Token:</strong> <span class="break-all">${newToken}</span></p>

      <a style="color: #0366d6; font-size: 12px; text-decoration: none;" href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}${newAdminUrl}?token=${newToken}">
        <button style="font-size: 14px; background-color: #628CF5; color: #fff; line-height: 1.5; border-radius: 0.5em; border: 0px; padding: 12px 24px;">Go to admin panel</button>
      </a>
    </div>

    <div style="text-align: center;">
      <a style="color: #0366d6; font-size: 12px;" href="${process.env.NEXT_PUBLIC_APP_URL}">Visit official website</a>
    </div>

    <p style="color: #6a737d; font-size: 12px; text-align: center; margin-top: 60px;">Crept, Inc. ・57 Space Xuneix, Inc ・Los Angels, CA 90020</p>
  </div>
</body>
</html>

    `;

    // Send email with Nodemailer and embedded image
    const transporter = nodemailer.createTransport({
      host: "smtp.mailgun.org",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAILGUN_SMTP_LOGIN,
        pass: process.env.MAILGUN_SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `Xuneix Inc <support@${process.env.COMPANY_EMAIL}>`,
      to: process.env.ADMIN_EMAIL, // Replace with your admin email
      subject: "New Admin Panel Access",
      html: emailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error generating/saving admin auth data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

