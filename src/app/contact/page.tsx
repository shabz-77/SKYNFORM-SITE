"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ToastState = {
  type: "success" | "error";
  message: string;
} | null;

export default function ContactPage() {
  const DISPLAY_FONT =
    "allumi-std-extended, allumi, var(--font-display), ui-sans-serif, system-ui";

  const GOLD = "#A38560";

  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
  });

  const [formStartedAt, setFormStartedAt] = useState<number>(Date.now());

  useEffect(() => {
    const onScroll = () => setMenuOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true });

    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);

    return () => {
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener?.("change", apply);
    };
  }, []);

  useEffect(() => {
    if (!toast) return;

    const timer = window.setTimeout(() => {
      setToast(null);
    }, 3500);

    return () => window.clearTimeout(timer);
  }, [toast]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    });
    setFormStartedAt(Date.now());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setToast(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          formStartedAt,
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        resetForm();
        setToast({
          type: "success",
          message: "Message sent successfully.",
        });
      } else {
        setToast({
          type: "error",
          message: data?.error || "Something went wrong.",
        });
      }
    } catch {
      setToast({
        type: "error",
        message: "Failed to send message.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const primaryButtonStyle = {
    background:
      "linear-gradient(90deg, rgba(163,133,96,0.18) 0%, rgba(255,255,255,0.04) 100%)",
    boxShadow:
      "0 0 30px rgba(163,133,96,0.14), 0 0 10px rgba(163,133,96,0.08), inset 0 0 16px rgba(255,255,255,0.04)",
  } as const;

  const heroTitleSize = isMobile
    ? "clamp(28px, 7.4vw, 36px)"
    : "clamp(34px, 4.2vw, 58px)";

  return (
    <main className="relative min-h-[100svh] overflow-x-hidden bg-[#0E0F13] text-white">
      {toast && (
        <div className="pointer-events-none fixed right-4 top-24 z-[70]">
          <div
            className={`rounded-2xl border px-4 py-3 text-sm backdrop-blur ${
              toast.type === "success"
                ? "border-white/10 bg-[#13211d]/90 text-white"
                : "border-white/10 bg-[#2a1717]/90 text-white"
            }`}
            style={{
              boxShadow: "0 0 24px rgba(0,0,0,0.28)",
            }}
          >
            {toast.message}
          </div>
        </div>
      )}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.016] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:88px_88px]" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_50%,transparent_0%,rgba(0,0,0,0.14)_52%,rgba(0,0,0,0.36)_100%)]" />
      </div>

      <header className="fixed left-0 top-0 z-50 w-full pointer-events-none">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div
            className="pointer-events-auto mt-4 flex items-center justify-between rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 backdrop-blur md:px-8 md:py-3.5"
            style={{ boxShadow: "0 0 30px rgba(0,0,0,0.28)" }}
          >
            <Link
              href="/"
              className="text-xs tracking-[0.22em] text-white/80 hover:text-white/95"
              style={{ fontFamily: DISPLAY_FONT, fontWeight: 500 }}
            >
              HOME
            </Link>

            <nav className="hidden items-center md:flex" style={{ gap: "36px" }}>
              <Link
                href="/features"
                className="text-xs tracking-[0.16em] text-white/72 hover:text-white/92"
              >
                FEATURES
              </Link>
              <a
                href="https://configurator.skynform.com"
                className="text-xs tracking-[0.16em] text-white/72 hover:text-white/92"
              >
                CONFIGURATOR
              </a>
              <Link
                href="/contact"
                className="text-xs tracking-[0.16em] text-white/90 hover:text-white"
              >
                CONTACT
              </Link>
            </nav>

            <div className="relative md:hidden pointer-events-auto">
              <button
                type="button"
                aria-label="Menu"
                onClick={() => setMenuOpen((v) => !v)}
                className="-m-2 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full px-4 py-3 text-white/65 hover:text-white"
              >
                <span className="inline-flex gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-white/62" />
                  <span className="h-1 w-1 rounded-full bg-white/62" />
                  <span className="h-1 w-1 rounded-full bg-white/62" />
                </span>
              </button>

              {menuOpen && (
                <div
                  className="absolute right-0 top-12 w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#0E0F13]/95 backdrop-blur"
                  style={{ boxShadow: "0 0 34px rgba(0,0,0,0.45)" }}
                >
                  <Link
                    href="/features"
                    className="block px-4 py-3 text-sm text-white/85 hover:bg-white/[0.06]"
                  >
                    Features
                  </Link>
                  <a
                    href="https://configurator.skynform.com"
                    className="block px-4 py-3 text-sm text-white/85 hover:bg-white/[0.06]"
                  >
                    Configurator
                  </a>
                  <Link
                    href="/contact"
                    className="block px-4 py-3 text-sm text-white/85 hover:bg-white/[0.06]"
                  >
                    Contact
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <section className="relative z-10 flex min-h-[100svh] items-center">
        <div className="mx-auto w-full max-w-6xl px-6 pt-28 pb-20">
          <div className="mx-auto max-w-6xl text-center">
            <div className="text-xs tracking-[0.18em]" style={{ color: GOLD }}>
              GET IN TOUCH
            </div>

            <h1
              className="mx-auto mt-5 max-w-[22ch] text-white"
              style={{
                fontFamily: DISPLAY_FONT,
                fontWeight: 300,
                lineHeight: 0.96,
                fontSize: heroTitleSize,
              }}
            >
              Bring your vision to life
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
              Built for wrap shops, custom builds, and one-off projects.
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-3xl rounded-[28px] border border-white/10 bg-white/[0.02] p-7 md:p-8">
            <div className="text-xs tracking-[0.18em]" style={{ color: GOLD }}>
              SEND A MESSAGE
            </div>

            <h2
              className="mt-5 max-w-[22ch] text-white"
              style={{
                fontFamily: DISPLAY_FONT,
                fontWeight: 400,
                lineHeight: 1.02,
                fontSize: "clamp(28px, 4vw, 42px)",
              }}
            >
              Tell us about your project.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
              Share a few details and our team will reach out.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-4 text-left">
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={handleChange}
                autoComplete="off"
                tabIndex={-1}
                className="hidden"
              />

              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full rounded-2xl border border-white/10 bg-[#111318] px-4 py-3 text-white outline-none placeholder:text-white/38 focus:border-white/20 disabled:opacity-60"
              />

              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={form.email}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full rounded-2xl border border-white/10 bg-[#111318] px-4 py-3 text-white outline-none placeholder:text-white/38 focus:border-white/20 disabled:opacity-60"
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full rounded-2xl border border-white/10 bg-[#111318] px-4 py-3 text-white outline-none placeholder:text-white/38 focus:border-white/20 disabled:opacity-60"
              />

              <textarea
                name="message"
                placeholder="Tell us what you need"
                value={form.message}
                onChange={handleChange}
                rows={7}
                disabled={isSubmitting}
                className="w-full resize-none rounded-2xl border border-white/10 bg-[#111318] px-4 py-3 text-white outline-none placeholder:text-white/38 focus:border-white/20 disabled:opacity-60"
              />

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white backdrop-blur disabled:cursor-not-allowed disabled:opacity-70"
                  style={primaryButtonStyle}
                >
                  {isSubmitting ? "Sending..." : "Send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}