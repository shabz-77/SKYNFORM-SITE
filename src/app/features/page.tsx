"use client";

import { useEffect, useMemo, useState } from "react";

export default function FeaturesPage() {
  const DISPLAY_FONT =
    "allumi-std-extended, allumi, var(--font-display), ui-sans-serif, system-ui";

  const GOLD = "#A38560";

  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  const pillars = useMemo(
    () => [
      {
        id: "PILLAR #1",
        title: "Immersive Presentation",
        tagline: "Turn your shop into a digital showroom.",
        bullets: [
          "Real-time rendering powered by Unreal Engine",
          "Runs live on any phone or laptop. No app, no download",
          "Premium lighting and material realism",
        ],
      },
      {
        id: "PILLAR #2",
        title: "Conversion Intelligence",
        tagline: "Know what they want before they walk in.",
        bullets: [
          "Save and share builds with unique links",
          "Lead capture with deal sheet previews",
          "Analytics: customer selections, session duration, revisit sessions",
        ],
      },
      {
        id: "PILLAR #3",
        title: "Operational Efficiency",
        tagline: "Helps shops close deals faster.",
        bullets: [
          "Custom identity deal packages",
          "Upsell builder",
          "A repeatable, premium sales flow for the team",
        ],
      },
    ],
    []
  );

  const primaryButtonStyle = {
    background:
      "linear-gradient(90deg, rgba(163,133,96,0.18) 0%, rgba(255,255,255,0.04) 100%)",
    boxShadow:
      "0 0 28px rgba(163,133,96,0.14), 0 0 10px rgba(163,133,96,0.08), inset 0 0 14px rgba(255,255,255,0.04)",
  } as const;

  const heroTitleSize = isMobile
    ? "clamp(28px, 7.4vw, 36px)"
    : "clamp(34px, 4.2vw, 58px)";

  return (
    <main className="relative w-full overflow-x-hidden bg-[#0E0F13] text-white">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(80%_65%_at_50%_18%,rgba(22,48,43,0.14),transparent_55%),linear-gradient(to_bottom,rgba(8,10,12,0.3),rgba(14,15,19,0.92)_32%,rgba(14,15,19,1)_100%)]" />
        <div className="absolute inset-0 opacity-[0.02] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:88px_88px]" />
        {!isMobile && (
          <div className="absolute left-[-12%] top-[6%] h-[24rem] w-[24rem] rounded-full bg-[#0C1614] opacity-18 blur-[110px]" />
        )}
        {!isMobile && (
          <div className="absolute right-[-10%] top-[32%] h-[22rem] w-[22rem] rounded-full bg-[#11161a] opacity-12 blur-[110px]" />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_50%,transparent_0%,rgba(0,0,0,0.18)_56%,rgba(0,0,0,0.42)_100%)]" />
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
                className="text-xs tracking-[0.16em] text-white/90 hover:text-white"
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
                className="text-xs tracking-[0.16em] text-white/72 hover:text-white/92"
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

      <section className="relative z-10 min-h-[100svh] w-full">
        <SectionDivider gold={GOLD} />
        <div className="mx-auto flex min-h-[100svh] max-w-7xl items-center justify-center px-6 pt-16 pb-24">
          <div className="w-full max-w-7xl text-center">
            <div className="text-xs tracking-[0.18em]" style={{ color: GOLD }}>
              BUSINESS POWER
            </div>

            <h1
              className="mx-auto mt-5 max-w-[22ch] text-white"
              style={{
                fontFamily: DISPLAY_FONT,
                fontWeight: 300,
                lineHeight: 0.96,
                letterSpacing: "normal",
                fontSize: heroTitleSize,
              }}
            >
              A premium sales tool
              <br />
              for wrap shops
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
              Built to help premium shops present better, close faster, and
              increase perceived value through real-time customer visualization.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://configurator.skynform.com"
                className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white backdrop-blur"
                style={primaryButtonStyle}
              >
                Open configurator
              </a>

              <a
                href="#how-you-win"
                className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/90 backdrop-blur hover:bg-white/10"
              >
                Explore features
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="how-you-win" className="relative z-10 min-h-[100svh] w-full">
        <SectionDivider gold={GOLD} />
        <div className="mx-auto flex min-h-[100svh] max-w-6xl items-center justify-center px-6 pt-24 pb-16">
          <div className="w-full max-w-5xl text-center">
            <div className="text-xs tracking-[0.18em]" style={{ color: GOLD }}>
              BUSINESS REALITY
            </div>

            <h2
              className="mt-6 text-white"
              style={{
                fontFamily: DISPLAY_FONT,
                fontWeight: 400,
                lineHeight: 1.06,
                letterSpacing: "normal",
                fontSize: "clamp(38px, 6vw, 66px)",
              }}
            >
              Here’s how you win
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
              The shift is simple: remove hesitation, improve visualization, and
              make the customer feel certain faster.
            </p>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 text-left">
                <div className="text-sm tracking-[0.14em]" style={{ color: GOLD }}>
                  OLD WAY
                </div>
                <ul className="mt-5 grid gap-3 text-sm text-white/70">
                  <li>• Static or offline renders</li>
                  <li>• Online references or PS preview</li>
                  <li>• Time consuming consultations</li>
                  <li>• Low commitment inquiries</li>
                  <li>• “I can’t picture it”</li>
                </ul>
              </div>

              <div
                className="rounded-3xl border border-white/10 p-7 text-left"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(163,133,96,0.08), rgba(255,255,255,0.02) 100%)",
                }}
              >
                <div className="text-sm tracking-[0.14em]" style={{ color: GOLD }}>
                  NEW WAY
                </div>
                <ul className="mt-5 grid gap-3 text-sm text-white/70">
                  <li>• Real-time interactive 3D configurator</li>
                  <li>• Identity-driven selections</li>
                  <li>• Seamless consultations in person or remote</li>
                  <li>• Emotional lock-in inquiries</li>
                  <li>• “That’s it. That’s mine!”</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 min-h-[100svh] w-full">
        <SectionDivider gold={GOLD} />
        <div className="mx-auto flex min-h-[100svh] max-w-6xl items-center justify-center px-6 py-24">
          <div className="w-full max-w-6xl">
            <div className="text-center">
              <div className="text-xs tracking-[0.18em]" style={{ color: GOLD }}>
                THREE PILLARS
              </div>

              <h2
                className="mt-6 text-white"
                style={{
                  fontFamily: DISPLAY_FONT,
                  fontWeight: 400,
                  lineHeight: 1.06,
                  fontSize: "clamp(34px, 5.6vw, 60px)",
                }}
              >
                Not features.
                <br />
                Leverage.
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
                SKYNFORM is built for premium shops that want positioning,
                conversion, and control, without friction.
              </p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-7"
                >
                  <div className="text-xs tracking-[0.18em]" style={{ color: GOLD }}>
                    {p.id}
                  </div>

                  <h3
                    className="mt-4 text-white"
                    style={{
                      fontFamily: DISPLAY_FONT,
                      fontWeight: 800,
                      lineHeight: 1.05,
                      fontSize: "clamp(22px, 2.4vw, 30px)",
                    }}
                  >
                    {p.title}
                  </h3>

                  <div className="mt-3 text-sm text-white/75">{p.tagline}</div>

                  <ul className="mt-6 grid gap-3 text-sm text-white/70">
                    {p.bullets.map((b) => (
                      <li key={b}>• {b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-12 max-w-4xl text-center text-sm leading-relaxed text-white/65">
              Built to make premium shops look sharper, sell faster, and feel
              more valuable before the customer ever asks for the price.
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 min-h-[100svh] w-full">
        <SectionDivider gold={GOLD} />
        <div className="mx-auto flex min-h-[100svh] max-w-6xl items-center justify-center px-6 py-24">
          <div className="w-full max-w-5xl text-center">
            <div className="text-xs tracking-[0.18em]" style={{ color: GOLD }}>
              WHY THIS WINS
            </div>

            <h2
              className="mt-6 text-white"
              style={{
                fontFamily: DISPLAY_FONT,
                fontWeight: 400,
                lineHeight: 1.06,
                fontSize: "clamp(34px, 5.6vw, 60px)",
              }}
            >
              Identity-driven visualization
              <br />
              + business intelligence.
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
              This is the real differentiator. Not 3D. Not Unreal. Not
              streaming. It’s the combination of emotional lock-in and
              measurable conversion power.
            </p>

            <div className="mx-auto mt-12 grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 text-left">
                <div className="text-sm tracking-[0.14em]" style={{ color: GOLD }}>
                  DIFFERENTIATION
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Premium shops want to say: “We are not like other wrap shops.”
                  SKYNFORM becomes a brand statement, a marketing asset, and a
                  sales weapon.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 text-left">
                <div className="text-sm tracking-[0.14em]" style={{ color: GOLD }}>
                  HIGHER TICKET JOBS
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Luxury presentation increases perceived value. That supports
                  higher pricing and helps filter out low-intent inquiries.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 text-left">
                <div className="text-sm tracking-[0.14em]" style={{ color: GOLD }}>
                  CONTENT MACHINE
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Endless spec variations, identity storytelling, and shareable
                  visuals, built to feed Reels, TikTok, and social proof.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 text-left">
                <div className="text-sm tracking-[0.14em]" style={{ color: GOLD }}>
                  DATA ADVANTAGE
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Track what converts: colors, identities, drop-off points, and
                  shares. You stop guessing and start improving sales with
                  evidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 min-h-[100svh] w-full">
        <SectionDivider gold={GOLD} />
        <div className="mx-auto flex min-h-[100svh] max-w-6xl items-center justify-center px-6 py-24">
          <div className="w-full max-w-4xl text-center">
            <div className="text-xs tracking-[0.18em]" style={{ color: GOLD }}>
              READY TO UPGRADE?
            </div>

            <h2
              className="mt-6 text-white"
              style={{
                fontFamily: DISPLAY_FONT,
                fontWeight: 400,
                lineHeight: 1.06,
                fontSize: "clamp(34px, 5.6vw, 60px)",
              }}
            >
              Upgrade your showroom.
              <br />
              Increase conviction.
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
              The fastest way to reduce hesitation is to let customers see their
              identity live, instantly, on any device.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://configurator.skynform.com"
                className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white backdrop-blur"
                style={primaryButtonStyle}
              >
                Open configurator
              </a>

              <a
                href="/contact"
                className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/90 backdrop-blur hover:bg-white/10"
              >
                Contact SKYNFORM
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionDivider({ gold }: { gold: string }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center">
      <div
        className="mt-4 h-px w-[min(92%,1400px)]"
        style={{
          background: `linear-gradient(to right, transparent, ${gold}45 12%, ${gold} 50%, ${gold}45 88%, transparent)`,
        }}
      />
    </div>
  );
}