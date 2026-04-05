import { NextRequest, NextResponse } from "next/server";

/**
 * Server-side proxy → Google Apps Script
 * GOOGLE_SCRIPT_URL lives in .env.local — never sent to the browser.
 *
 * Apps Script (paste into Extensions → Apps Script, deploy as Web App):
 *
 * function doPost(e) {
 *   const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *   const d = JSON.parse(e.postData.contents);
 *   sheet.appendRow([new Date(), d.prenom, d.nom, d.email, d.tel, d.projet, d.surface, d.ville]);
 *   return ContentService.createTextOutput(JSON.stringify({ok:true}))
 *     .setMimeType(ContentService.MimeType.JSON);
 * }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const url = process.env.GOOGLE_SCRIPT_URL;
 
    if (!url) {
      console.warn("[submit-form] GOOGLE_SCRIPT_URL is not set.");
      return NextResponse.json(
        { ok: false, error: "GOOGLE_SCRIPT_URL not configured" },
        { status: 500 }
      );
    }
 
    console.log("[submit-form] Sending to Google Script...");
 
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      redirect: "follow", // ← Google Apps Script does a 302 redirect — must follow it
    });
 
    const responseText = await res.text();
    console.log("[submit-form] Google Script status:", res.status, "body:", responseText);
 
    if (!res.ok) {
      throw new Error(`Google Script returned HTTP ${res.status}: ${responseText}`);
    }
 
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[submit-form] Error:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
