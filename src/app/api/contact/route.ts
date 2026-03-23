import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  }
);

const MIN_SUBMIT_TIME_MS = 2500;
const RATE_LIMIT_WINDOW_MINUTES = 10;
const RATE_LIMIT_MAX_SUBMISSIONS = 3;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      subject,
      message,
      website = "",
      formStartedAt,
    } = body as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
      website?: string;
      formStartedAt?: number;
    };

    if (website && website.trim() !== "") {
      return NextResponse.json(
        { error: "Invalid submission" },
        { status: 400 }
      );
    }

    if (!formStartedAt || Date.now() - formStartedAt < MIN_SUBMIT_TIME_MS) {
      return NextResponse.json(
        { error: "Form submitted too quickly" },
        { status: 400 }
      );
    }

    const safeName = (name || "").trim();
    const safeEmail = (email || "").trim().toLowerCase();
    const safeSubject = (subject || "").trim();
    const safeMessage = (message || "").trim();

    if (!safeName || !safeEmail || !safeMessage) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (safeName.length > 120 || safeEmail.length > 200 || safeSubject.length > 200 || safeMessage.length > 5000) {
      return NextResponse.json(
        { error: "One or more fields are too long" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(safeEmail)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const windowStartIso = new Date(
      Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000
    ).toISOString();

    const { count: recentCount, error: rateLimitError } = await supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("source", "website_contact")
      .eq("email", safeEmail)
      .gte("created_at", windowStartIso);

    if (rateLimitError) {
      console.error("Rate limit check error:", rateLimitError);
      return NextResponse.json(
        { error: "Failed to process request" },
        { status: 500 }
      );
    }

    if ((recentCount || 0) >= RATE_LIMIT_MAX_SUBMISSIONS) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const { error: insertError } = await supabase.from("leads").insert({
      name: safeName,
      email: safeEmail,
      subject: safeSubject || null,
      message: safeMessage,
      source: "website_contact",
      status: "new",
    });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to store lead" },
        { status: 500 }
      );
    }

    const { error: emailError } = await resend.emails.send({
      from: "SKYNFORM <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL!,
      subject: safeSubject || "New SKYNFORM Inquiry",
      replyTo: safeEmail,
      html: `
        <div>
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(safeName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(safeEmail)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(safeSubject || "-")}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(safeMessage).replace(/\n/g, "<br />")}</p>
        </div>
      `,
    });

    if (emailError) {
      console.error("Resend error:", emailError);
      return NextResponse.json(
        { error: "Lead stored but email failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json(
      { error: "Failed to process contact form" },
      { status: 500 }
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}