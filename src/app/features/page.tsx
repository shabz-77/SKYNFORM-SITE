"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function FeaturesPage() {
  const DISPLAY_FONT =
    "allumi-std-extended, allumi, var(--font-display), ui-sans-serif, system-ui";

  const GOLD = "#A38560";

  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);

  const demoVideoRef = useRef<HTMLVideoElement | null>(null);

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
        ],
      },
      {
        id: "PILLAR #2",
        title: "Conversion Intelligence",
        tagline: "Know what they want before they walk in.",
        bullets: [
          "Save and share builds with unique links",
          "Analytics: customer selections, session duration, lead capture",
        ],
      },
      {
        id: "PILLAR #3",
        title: "Operational Efficiency",
        tagline: "Helps shops close deals faster.",
        bullets: [
          "Upsell builder and deal packages",
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

  const sectionTitleSize = "clamp(32px, 4.5vw, 54px)";

  const handlePlayDemo = async () => {
    const video = demoVideoRef.current;
    if (!video) return;

    try {
      await video.play();
      setVideoStarted(true);
    } catch {}
  };

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
                className="text-xs tracking-[0.16em] text-white/90 hover:text-white"
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
                className="text-xs tracking-[0.16em] text-white/72 hover:text-white/92"
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

      <section className="relative z-10 min-h-[100svh] w-full">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/brand/featureshero2.png"
            alt="SKYNFORM features hero"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/85" />
        </div>

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
              A digital showroom
              <br />
              on your website
            </h1>

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
        <div className="mx-auto flex min-h-[100svh] max-w-6xl items-center justify-center px-6 py-44">
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
                fontSize: sectionTitleSize,
              }}
            >
              A better way to sell wraps
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
              A clear approach to visualize, compare, and move customers toward
              a decision.
            </p>

            <div className="mx-auto mt-14 max-w-5xl">
              <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03]">
                <div className="relative aspect-[16/8] w-full">
                  <Image
                    src="/brand/old-vs-new-v2.png"
                    alt="Modern configurator shown on iPad"
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/22 via-black/10 to-black/28" />
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 text-left">
                <div className="text-sm tracking-[0.14em]" style={{ color: GOLD }}>
                  OLD WAY
                </div>
                <ul className="mt-5 grid gap-3 text-sm text-white/70">
                  <li>• Static or offline renders</li>
                  <li>• Time consuming consultations</li>
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
                  <li>• Seamless consultations in person or remote</li>
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
                  fontSize: sectionTitleSize,
                }}
              >
                Not features. Leverage.
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
                SKYNFORM gives wrap shops a clearer sales process, stronger
                positioning, and better control over how customers buy.
              </p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] px-7 pb-9 pt-7"
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

                  <div className="mt-7 text-sm" style={{ color: `${GOLD}CC` }}>
                    {p.tagline}
                  </div>

                  <ul className="mt-2.5 grid gap-2 text-sm text-white/70">
                    {p.bullets.map((b) => (
                      <li key={b}>• {b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 min-h-[100svh] w-full">
        <SectionDivider gold={GOLD} />
        <div className="mx-auto flex min-h-[100svh] max-w-6xl items-center justify-center px-6 py-44">
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
                fontSize: sectionTitleSize,
              }}
            >
              Faster decisions
              <br />
              + business intelligence
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
              Track what they choose. Understand what they want. Close faster.
            </p>

            <div className="mx-auto mt-14 max-w-5xl">
              <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03]">
                <div className="relative aspect-[16/9] w-full bg-black">
                  <video
                    ref={demoVideoRef}
                    className="h-full w-full object-cover"
                    controls
                    playsInline
                    preload="metadata"
                    poster="/brand/product-hero.jpg"
                    onPlay={() => setVideoStarted(true)}
                    onPause={() => setVideoStarted(false)}
                    onEnded={() => setVideoStarted(false)}
                  >
                    <source src="/brand/product-demo-v2.mp4" type="video/mp4" />
                  </video>

                  {!videoStarted && (
                    <button
                      type="button"
                      aria-label="Play demo video"
                      onClick={handlePlayDemo}
                      className="absolute inset-0 z-10 flex items-center justify-center bg-black/10 transition hover:bg-black/16"
                    >
                      <span
                        className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-black/45 backdrop-blur"
                        style={{
                          boxShadow:
                            "0 0 24px rgba(0,0,0,0.35), 0 0 10px rgba(163,133,96,0.14)",
                        }}
                      >
                        <span className="ml-1 block h-0 w-0 border-y-[12px] border-y-transparent border-l-[20px] border-l-white/90" />
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 min-h-[100svh] w-full overflow-hidden">
        <SectionDivider gold={GOLD} />
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_45%,rgba(24,49,44,0.14),transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E0F13]/85 via-[#0E0F13]/92 to-[#0E0F13]" />
        </div>

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
                fontSize: sectionTitleSize,
              }}
            >
              Upgrade your showroom.
              <br />
              Close with clarity.
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
              Give your customers a better way to see their vision and your shop a
              stronger way to convert it.
            </p>

            <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://configurator.skynform.com"
                className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white backdrop-blur"
                style={primaryButtonStyle}
              >
                Open configurator
              </a>

              <Link
                href="/contact"
                className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/90 backdrop-blur hover:bg-white/10"
              >
                Contact SKYNFORM
              </Link>
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
        className="h-px w-[min(92%,1400px)]"
        style={{
          background: `linear-gradient(to right, transparent, ${gold}45 12%, ${gold} 50%, ${gold}45 88%, transparent)`,
        }}
      />
    </div>
  );
}