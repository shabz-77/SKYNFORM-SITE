"use client";

import { useEffect, useState } from "react";

export default function ContactPage() {
  const DISPLAY_FONT =
    "allumi-std-extended, allumi, var(--font-display), ui-sans-serif, system-ui";

  const GOLD = "#A38560";

  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form integration will be connected next.");
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
            <a
              href="/"
              className="text-xs tracking-[0.22em] text-white/80 hover:text-white/95"
              style={{ fontFamily: DISPLAY_FONT, fontWeight: 500 }}
            >
              HOME
            </a>

            <nav className="hidden items-center md:flex" style={{ gap: "36px" }}>
              <a
                href="/features"
                className="text-xs tracking-[0.16em] text-white/72 hover:text-white/92"
              >
                FEATURES
              </a>
              <a
                href="https://configurator.skynform.com"
                className="text-xs tracking-[0.16em] text-white/72 hover:text-white/92"
              >
                CONFIGURATOR
              </a>
              <a
                href="/contact"
                className="text-xs tracking-[0.16em] text-white/90 hover:text-white"
              >
                CONTACT
              </a>
            </nav>

            <div className="relative md:hidden pointer-events-auto">
              <button
                type="button"
                aria-label="Menu"
                onClick={() => setMenuOpen((v) => !v)}
                className="inline-flex items-center justify-center rounded-full px-2.5 py-1.5 text-white/65 hover:text-white"
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
                  <a
                    href="/features"
                    className="block px-4 py-3 text-sm text-white/85 hover:bg-white/[0.06]"
                  >
                    Features
                  </a>
                  <a
                    href="https://configurator.skynform.com"
                    className="block px-4 py-3 text-sm text-white/85 hover:bg-white/[0.06]"
                  >
                    Configurator
                  </a>
                  <a
                    href="/contact"
                    className="block px-4 py-3 text-sm text-white/85 hover:bg-white/[0.06]"
                  >
                    Contact
                  </a>
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
              Let’s build the right
              <br />
              experience for you.
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
              Whether you want a premium sales tool, a branded configurator, or a custom workflow for
              your shop, SKYNFORM is open to building around your needs.
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-3xl rounded-[28px] border border-white/10 bg-white/[0.02] p-7 md:p-8">
            <div className="text-xs tracking-[0.18em]" style={{ color: GOLD }}>
              SEND A MESSAGE
            </div>

            <h2
              className="mt-5 max-w-[16ch] text-white"
              style={{
                fontFamily: DISPLAY_FONT,
                fontWeight: 400,
                lineHeight: 1.02,
                fontSize: "clamp(28px, 4vw, 42px)",
              }}
            >
              Start the conversation.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
              Share what you need and SKYNFORM will shape the right premium experience around it.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-4 text-left">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-[#111318] px-4 py-3 text-white outline-none placeholder:text-white/38 focus:border-white/20"
              />

              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-[#111318] px-4 py-3 text-white outline-none placeholder:text-white/38 focus:border-white/20"
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-[#111318] px-4 py-3 text-white outline-none placeholder:text-white/38 focus:border-white/20"
              />

              <textarea
                name="message"
                placeholder="Tell us what you need"
                value={form.message}
                onChange={handleChange}
                rows={7}
                className="w-full resize-none rounded-2xl border border-white/10 bg-[#111318] px-4 py-3 text-white outline-none placeholder:text-white/38 focus:border-white/20"
              />

              <div className="pt-2">
                <button
                  type="submit"
                  className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white backdrop-blur"
                  style={primaryButtonStyle}
                >
                  Send
                </button>
              </div>
            </form>

            <p className="mt-5 text-xs leading-relaxed text-white/45">
              Form delivery can be connected to Formspree or Resend next.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}