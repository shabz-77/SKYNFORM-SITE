"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

export default function IdentityScroll() {
  const pathname = usePathname();

  const pinnedRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const [activeIdx, setActiveIdx] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const [hasMounted, setHasMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [vhPx, setVhPx] = useState(0);

  const GOLD = "#A38560";

  const getViewportHeight = () => {
    if (typeof window === "undefined") return 0;
    return Math.round(window.visualViewport?.height || window.innerHeight || 0);
  };

  useEffect(() => {
    if (pathname !== "/") return;

    setHasMounted(true);
    setActiveIdx(0);
    setMenuOpen(false);

    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);

    const setVh = () => {
      setVhPx(getViewportHeight());
    };

    const resetPage = () => {
      window.scrollTo({ top: 0, behavior: "auto" });

      requestAnimationFrame(() => {
        setVh();
        window.dispatchEvent(new Event("scroll"));
      });
    };

    setVh();
    resetPage();

    const handleResize = () => {
      setVh();
      window.dispatchEvent(new Event("scroll"));
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("pageshow", resetPage);
    window.visualViewport?.addEventListener("resize", handleResize);

    return () => {
      mq.removeEventListener?.("change", apply);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pageshow", resetPage);
      window.visualViewport?.removeEventListener("resize", handleResize);
    };
  }, [pathname]);

  const mobile = hasMounted ? isMobile : false;

  const steps = useMemo(
    () => [
      {
        key: "intro",
        title: "Wrap isn’t color.\nIt’s character.",
        description:
          "Choose your archetype that matches your personality. Let the configurator make it real.",
        image: "/identity/intro-identitys1.jpg",
      },
      {
        key: "predator",
        title: "Predator",
        description: "Designed for those who move first and explain later.",
        image: "/identity/predator.jpg",
      },
      {
        key: "purist",
        title: "Purist",
        description:
          "For drivers who believe great design doesn’t need to shout.",
        image: "/identity/purist.jpg",
      },
      {
        key: "visionary",
        title: "Visionary",
        description: "For those designing the future, not inheriting it.",
        image: "/identity/visionary.jpg",
      },
      {
        key: "icon",
        title: "Icon",
        description: "Built for those who want to be remembered.",
        image: "/identity/icon.jpg",
      },
    ],
    []
  );

  function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: "smooth" });
  }

  useEffect(() => {
    const onScroll = () => setMenuOpen(false);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const EXIT_BUFFER_VH_DESKTOP = 64;
    const EXIT_BUFFER_VH_MOBILE = 80;

    const onScroll = () => {
      if (rafRef.current) return;

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;

        const pinned = pinnedRef.current;
        if (!pinned) return;

        const scrollTop = window.scrollY;
        const pinnedTop = pinned.getBoundingClientRect().top + window.scrollY;
        const within = scrollTop - pinnedTop;

        const pinnedHeightPx = pinned.getBoundingClientRect().height;
        if (pinnedHeightPx <= 0) return;

        const viewportH = getViewportHeight();
        if (viewportH <= 0) return;

        const EXIT_BUFFER_VH = mobile
          ? EXIT_BUFFER_VH_MOBILE
          : EXIT_BUFFER_VH_DESKTOP;

        const exitBufferPx = (viewportH * EXIT_BUFFER_VH) / 100;
        const stepsHeightPx = Math.max(1, pinnedHeightPx - exitBufferPx);
        const stepPx = stepsHeightPx / steps.length;

        if (stepPx <= 0) return;

        if (within < 0) {
          setActiveIdx(0);
          return;
        }

        if (within >= stepsHeightPx) {
          setActiveIdx(steps.length - 1);
          return;
        }

        const idx = Math.max(
          0,
          Math.min(steps.length - 1, Math.floor(within / stepPx))
        );

        setActiveIdx(idx);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    requestAnimationFrame(() => {
      onScroll();
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [steps.length, mobile, pathname]);

  const DISPLAY_FONT =
    "allumi-std-extended, allumi, var(--font-display), ui-sans-serif, system-ui";

  const activeStep = steps[activeIdx];

  const STEP_VH = mobile ? 98 : 84;
  const EXIT_BUFFER_VH = mobile ? 80 : 64;

  const pinnedHeightStyle =
    vhPx > 0
      ? {
          height: `${((steps.length * STEP_VH + EXIT_BUFFER_VH) / 100) * vhPx}px`,
        }
      : { height: "auto" };

  const isIntro = activeStep?.key === "intro";
  const heroTitleSize = mobile
    ? "clamp(28px, 7.4vw, 36px)"
    : "clamp(34px, 4.2vw, 58px)";
  const sectionTitleSize = "clamp(32px, 4.5vw, 54px)";
  const titleSize = isIntro ? heroTitleSize : "clamp(52px, 7.2vw, 96px)";
  const paraSize = isIntro ? undefined : "clamp(18px, 2.6vw, 30px)";

  const primaryButtonStyle = {
    background:
      "linear-gradient(90deg, rgba(163,133,96,0.18) 0%, rgba(255,255,255,0.04) 100%)",
    boxShadow:
      "0 0 34px rgba(163,133,96,0.16), 0 0 12px rgba(163,133,96,0.08), inset 0 0 18px rgba(255,255,255,0.05)",
  } as const;

  return (
    <div suppressHydrationWarning className="w-full bg-[#0E0F13] text-white">
      <header className="fixed left-0 top-0 z-50 w-full pointer-events-none">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div
            className="pointer-events-auto mt-4 flex items-center justify-between rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 backdrop-blur md:px-8 md:py-3.5"
            style={{ boxShadow: "0 0 34px rgba(0,0,0,0.32)" }}
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

      <section id="s1" className="relative min-h-[100svh] w-full">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/brand/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/80" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(70% 60% at 50% 35%, rgba(22,48,43,0.16), rgba(22,48,43,0.08) 38%, rgba(0,0,0,0.68) 74%, rgba(0,0,0,0.88) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-center justify-center px-6 pt-20">
          <div className="w-full max-w-7xl text-center">
            <div
              className="tracking-[0.22em]"
              style={{
                fontFamily: DISPLAY_FONT,
                fontWeight: 500,
                fontSize: mobile ? "18px" : "22px",
                color: GOLD,
              }}
            >
              SKYNFORM
            </div>

            <h1
              className="mx-auto mt-5 max-w-[22ch] tracking-tight text-white"
              style={{
                fontFamily: DISPLAY_FONT,
                fontWeight: 300,
                lineHeight: 0.96,
                fontSize: heroTitleSize,
              }}
            >
              A real-time sales
              <br />
              experience for wrap shops.
            </h1>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/features"
                className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white backdrop-blur"
                style={primaryButtonStyle}
              >
                Explore features
              </Link>

              <a
                href="https://configurator.skynform.com"
                className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/90 backdrop-blur hover:bg-white/10"
              >
                Explore configurator
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={pinnedRef}
        id="s2"
        className="relative w-full"
        style={pinnedHeightStyle}
      >
        <div className="sticky top-0 h-[100svh] w-full">
          <div className="absolute inset-0">
            {steps.map((s, i) => (
              <div
                key={s.key}
                className="absolute inset-0 transition-opacity duration-[900ms] ease-out"
                style={{
                  opacity: i === activeIdx ? 1 : 0,
                  willChange: "opacity",
                  transform: "translateZ(0)",
                }}
              >
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover object-center"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80" />
                <div className="absolute inset-0 shadow-[inset_0_0_240px_rgba(0,0,0,0.88)]" />
              </div>
            ))}
          </div>

          <div className="relative z-10 mx-auto flex h-[100svh] max-w-6xl items-center justify-center px-6 pt-20">
            <div className="w-full max-w-5xl text-center">
              {isIntro && (
                <div className="text-sm tracking-wide" style={{ color: GOLD }}>
                  Find your identity
                </div>
              )}

              <h2
                className="mt-5 whitespace-pre-line tracking-tight text-white"
                style={{
                  fontFamily: DISPLAY_FONT,
                  fontWeight: activeStep?.key === "intro" ? 400 : 800,
                  lineHeight: 1.02,
                  fontSize: titleSize,
                }}
              >
                {activeStep?.title}
              </h2>

              <p
                className="mx-auto mt-6 max-w-3xl text-white/70"
                style={{
                  fontSize: paraSize,
                  lineHeight: 1.5,
                }}
              >
                {activeStep?.description}
              </p>

              {activeStep?.key === "intro" && (
                <button
                  type="button"
                  onClick={() => scrollToId("s2")}
                  className="mt-10 inline-flex items-center gap-3 text-xs tracking-[0.14em] hover:text-white/60"
                  style={{ color: GOLD }}
                >
                  <span
                    className="h-[1px] w-10"
                    style={{ backgroundColor: `${GOLD}66` }}
                  />
                  SCROLL TO EXPLORE
                  <span
                    className="h-[1px] w-10"
                    style={{ backgroundColor: `${GOLD}66` }}
                  />
                </button>
              )}

              {activeStep?.key !== "intro" && (
                <div
                  className="mt-10 text-xs tracking-[0.18em]"
                  style={{ color: `${GOLD}B3` }}
                >
                  {Math.min(4, Math.max(1, activeIdx))}/4
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="s7" className="relative min-h-[100svh] w-full overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_45%,rgba(24,49,44,0.14),transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E0F13]/85 via-[#0E0F13]/92 to-[#0E0F13]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl items-center justify-center px-6 pt-20">
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

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://configurator.skynform.com"
                className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white backdrop-blur"
                style={primaryButtonStyle}
              >
                Open configurator
              </a>

              <Link
                href="/features"
                className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/90 backdrop-blur hover:bg-white/10"
              >
                Explore features
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}