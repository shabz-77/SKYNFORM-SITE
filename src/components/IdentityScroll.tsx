"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

export default function IdentityScroll() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pinnedRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const [activeIdx, setActiveIdx] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const [hasMounted, setHasMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [vhPx, setVhPx] = useState(0);

  const GOLD = "#A38560";

  useEffect(() => {
    setHasMounted(true);

    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setIsMobile(mq.matches);
    apply();

    mq.addEventListener?.("change", apply);

    const setVh = () => setVhPx(window.innerHeight || 0);
    setVh();
    window.addEventListener("resize", setVh, { passive: true });

    return () => {
      mq.removeEventListener?.("change", apply);
      window.removeEventListener("resize", setVh);
    };
  }, []);

  const mobile = hasMounted ? isMobile : false;

  const mobileRef = useRef(false);
  useEffect(() => {
    mobileRef.current = mobile;
  }, [mobile]);

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
        description: "For drivers who believe great design doesn’t need to shout.",
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

    if (mobileRef.current) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: "smooth" });
      return;
    }

    const root = rootRef.current;
    if (!root) return;
    const target = root.querySelector<HTMLElement>(`#${id}`);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  useEffect(() => {
    const onScroll = () => setMenuOpen(false);

    const bind = () => {
      if (mobileRef.current) {
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
      }

      const scroller = rootRef.current;
      if (!scroller) return () => {};
      scroller.addEventListener("scroll", onScroll, { passive: true });
      return () => scroller.removeEventListener("scroll", onScroll);
    };

    const unbind = bind();
    const t = window.setTimeout(() => {
      unbind();
      bind();
    }, 0);

    return () => {
      window.clearTimeout(t);
      unbind();
    };
  }, []);

  useEffect(() => {
    const STEP_VH_DESKTOP = 90;
    const EXIT_BUFFER_VH_DESKTOP = 70;

    const STEP_VH_MOBILE = 120;
    const EXIT_BUFFER_VH_MOBILE = 95;

    const getScrollTop = () =>
      mobileRef.current ? window.scrollY : rootRef.current?.scrollTop ?? 0;

    const getPinnedTop = () => {
      const pinned = pinnedRef.current;
      if (!pinned) return 0;

      if (mobileRef.current) {
        return pinned.getBoundingClientRect().top + window.scrollY;
      }
      return pinned.offsetTop;
    };

    const getViewportH = () =>
      mobileRef.current
        ? window.innerHeight
        : rootRef.current?.clientHeight ?? window.innerHeight;

    const onScroll = () => {
      if (rafRef.current) return;

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;

        const pinned = pinnedRef.current;
        if (!pinned) return;

        const scrollTop = getScrollTop();
        const pinnedTop = getPinnedTop();
        const within = scrollTop - pinnedTop;

        const pinnedHeightPx = pinned.getBoundingClientRect().height;
        if (pinnedHeightPx <= 0) return;

        const viewportH = getViewportH();
        const EXIT_BUFFER_VH = mobileRef.current
          ? EXIT_BUFFER_VH_MOBILE
          : EXIT_BUFFER_VH_DESKTOP;

        const exitBufferPx = (viewportH * EXIT_BUFFER_VH) / 100;
        const stepsHeightPx = Math.max(1, pinnedHeightPx - exitBufferPx);
        const stepPx = stepsHeightPx / steps.length;

        if (within < 0 || within >= pinnedHeightPx) return;

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
    const scroller = rootRef.current;
    scroller?.addEventListener("scroll", onScroll, { passive: true });

    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      scroller?.removeEventListener("scroll", onScroll);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [steps.length]);

  const DISPLAY_FONT =
    "allumi-std-extended, allumi, var(--font-display), ui-sans-serif, system-ui";

  const activeStep = steps[activeIdx];

  const STEP_VH = mobile ? 120 : 90;
  const EXIT_BUFFER_VH = mobile ? 95 : 70;

  const pinnedHeightStyle = mobile
    ? {
        height:
          vhPx > 0
            ? `${((steps.length * STEP_VH + EXIT_BUFFER_VH) / 100) * vhPx}px`
            : "auto",
      }
    : { height: `${steps.length * STEP_VH + EXIT_BUFFER_VH}svh` };

  const rootClass = mobile
    ? "w-full bg-[#0E0F13] text-white"
    : "h-[100svh] w-full overflow-y-auto overscroll-y-none bg-[#0E0F13] text-white scroll-smooth";

  const isIntro = activeStep?.key === "intro";
  const heroTitleSize = mobile
    ? "clamp(28px, 7.4vw, 36px)"
    : "clamp(34px, 4.2vw, 58px)";
  const titleSize = isIntro ? heroTitleSize : "clamp(52px, 7.2vw, 96px)";
  const paraSize = isIntro ? undefined : "clamp(18px, 2.6vw, 30px)";

  const primaryButtonStyle = {
    background:
      "linear-gradient(90deg, rgba(163,133,96,0.18) 0%, rgba(255,255,255,0.04) 100%)",
    boxShadow:
      "0 0 34px rgba(163,133,96,0.16), 0 0 12px rgba(163,133,96,0.08), inset 0 0 18px rgba(255,255,255,0.05)",
  } as const;

  return (
    <div
      ref={rootRef}
      suppressHydrationWarning
      className={rootClass}
      style={mobile ? undefined : { WebkitOverflowScrolling: "touch" }}
    >
      <header className="fixed left-0 top-0 z-50 w-full pointer-events-none">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div
            className="pointer-events-auto mt-4 flex items-center justify-between rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 backdrop-blur md:px-8 md:py-3.5"
            style={{ boxShadow: "0 0 34px rgba(0,0,0,0.32)" }}
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

          {/* fallback image */}
          <Image
            src="/brand/heros2.jpg"
            alt="SKYNFORM hero"
            fill
            priority
            className="object-cover object-center opacity-0"
          />
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

            <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
              A premium configurator and sales environment powered by Unreal Engine, designed to help
              shops sell personalization with clarity and confidence on any device.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://configurator.skynform.com"
                className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white backdrop-blur"
                style={primaryButtonStyle}
              >
                Explore configurator
              </a>

              <button
                type="button"
                onClick={() => scrollToId("s2")}
                className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/90 backdrop-blur hover:bg-white/10"
              >
                Explore archetypes
              </button>
            </div>
          </div>
        </div>
      </section>

      <section ref={pinnedRef} id="s2" className="relative w-full" style={pinnedHeightStyle}>
        <div className="sticky top-0 h-[100svh] w-full">
          <div className="absolute inset-0">
            {steps.map((s, i) => (
              <div
                key={s.key}
                className="absolute inset-0 transition-opacity duration-700 ease-out"
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
                  <span className="h-[1px] w-10" style={{ backgroundColor: `${GOLD}66` }} />
                  SCROLL TO EXPLORE
                  <span className="h-[1px] w-10" style={{ backgroundColor: `${GOLD}66` }} />
                </button>
              )}

              {activeStep?.key !== "intro" && (
                <div className="mt-10 text-xs tracking-[0.18em]" style={{ color: `${GOLD}B3` }}>
                  {Math.min(4, Math.max(1, activeIdx))}/4
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="s7" className="relative min-h-[100svh] w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050607] to-black" />

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
                fontSize: "clamp(34px, 5.4vw, 60px)",
                letterSpacing: "normal",
                lineHeight: 1.06,
              }}
            >
              Upgrade your showroom.
              <br />
              Increase conviction.
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
              The fastest way to reduce hesitation is to let customers see their identity live,
              instantly, on any device.
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
                href="/features"
                className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/90 backdrop-blur hover:bg-white/10"
              >
                Explore features
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}