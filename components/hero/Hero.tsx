'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';

import { MeshBackground } from './MeshBackground';

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const headingRef = React.useRef<HTMLDivElement | null>(null);
  const firstSectionRef = React.useRef<HTMLDivElement | null>(null);
  const secondSectionRef = React.useRef<HTMLDivElement | null>(null);
  const foldSectionRef = React.useRef<HTMLDivElement | null>(null);

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 32,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  } as const;

  const heading = 'CE QUE NOUS FAISONS';
  const letters = React.useMemo(() => heading.split(''), [heading]);
  const { scrollYProgress } = useScroll({
    target: firstSectionRef,
    offset: ['start center', 'end start'],
  });
  const { scrollYProgress: secondScrollYProgress } = useScroll({
    target: secondSectionRef,
    offset: ['start start', 'end end'],
  });
  const { scrollYProgress: foldScrollYProgress } = useScroll({
    target: foldSectionRef,
    offset: ['start end', 'end end'],
  });

  const LETTER_PHASE_START = 0.05;
  const LETTER_PHASE_END = 0.5;
  const SHRINK_PHASE_START = LETTER_PHASE_END;
  const SHRINK_PHASE_END = 0.75;
  const TAGLINE_PHASE_START = SHRINK_PHASE_END;
  const TAGLINE_PHASE_END = 1;

  const headingScale = useTransform(
    scrollYProgress,
    [0, SHRINK_PHASE_START, SHRINK_PHASE_END],
    [1, 1, 0.32],
    {
      clamp: true,
    }
  );
  const headingLetterSpacing = useTransform(
    scrollYProgress,
    [0, SHRINK_PHASE_START, SHRINK_PHASE_END],
    ['0.22em', '0.22em', '0.012em'],
    { clamp: true }
  );
  const headingX = useTransform(
    scrollYProgress,
    [0, SHRINK_PHASE_START, SHRINK_PHASE_END],
    ['0vw', '0vw', '-7vw'],
    {
      clamp: true,
    }
  );
  const headingY = useTransform(
    scrollYProgress,
    [0, SHRINK_PHASE_START, SHRINK_PHASE_END],
    ['0%', '0%', '-410%'],
    {
      clamp: true,
    }
  );

  const taglineOpacity = useTransform(scrollYProgress, [TAGLINE_PHASE_START, TAGLINE_PHASE_END], [0, 1], {
    clamp: true,
  });
  const taglineY = useTransform(scrollYProgress, [TAGLINE_PHASE_START, TAGLINE_PHASE_END], ['35%', '-45%'], {
    clamp: true,
  });

  const rectangleGradients = React.useMemo(
    () => [
      ['#00D1FF', '#1CC9FF', '#00B2FF'],
      ['#436FFF', '#1B4DFF', '#0029BB'],
      ['#9A4CFF', '#8222FF', '#5100BD'],
      ['#BB2EFF', '#AA0CF8', '#5D008B'],
    ],
    []
  );
  const rectangleLabels = React.useMemo(
    () => ['SITE WEB', 'DESIGN UI/UX', 'IDENTITÉ VISUELLE', 'SEO'],
    []
  );
  const rectangleContents = React.useMemo(
    () => [
      {
        title: 'Création sur mesure',
        description:
          'Design et code réunis pour des sites rapides, clairs et évolutifs, pensés pour refléter votre image.',
      },
      {
        title: 'Interfaces fluides',
        description:
          'Des expériences lisibles et cohérentes, où chaque détail guide l’utilisateur naturellement.',
      },
      {
        title: 'Image fidèle à vos valeurs',
        description:
          'Des identités fortes et équilibrées qui traduisent votre personnalité avec justesse.',
      },
      {
        title: 'Visibilité durable',
        description:
          'Un référencement naturel intégré dès la conception pour une présence solide dans le temps.',
      },
    ],
    []
  );
  const rectangleOffsets = React.useMemo(
    () => [
      { x: -320, y: -60 },
      { x: 320, y: -150 },
      { x: -320, y: 40 },
      { x: 320, y: -50 },
    ],
    []
  );
  const rectangleMovementStart = 0.65;
  const rectangleHeight = 90;
  const foldSegmentHeight = rectangleHeight / 3;
  const separationOffset = rectangleHeight - foldSegmentHeight;
  const foldDistance = 170;
  const foldAnimationHeight = 180;
  const foldSectionTotalHeight = 260;
  const foldCompletionProgress = foldAnimationHeight / foldSectionTotalHeight;
  const foldBaseDelay = 0.01;
  const foldStagger = 0;

  const rectangleScale = useTransform(
    secondScrollYProgress,
    [0, 1],
    [0, 1],
    { clamp: true }
  );
  const rectangleRotate = useTransform(secondScrollYProgress, [0, 1], [52, 0], { clamp: true });
  const rectangleTransforms = rectangleOffsets.map((offset) => ({
    x: useTransform(secondScrollYProgress, [0, rectangleMovementStart, 1], [0, 0, offset.x]),
    y: useTransform(secondScrollYProgress, [0, rectangleMovementStart, 1], [0, 0, offset.y]),
  }));
  const rectangleWidth = useTransform(
    secondScrollYProgress,
    [0, rectangleMovementStart, 1],
    [360, 360, 540],
    { clamp: true }
  );
  const foldConfigs = rectangleGradients.map((_, index) => {
    const start = foldBaseDelay + index * foldStagger;
    const clipAt = start;
    const translateStart = start;
    const translateEnd = 1;

    const topClip = useTransform(
      foldScrollYProgress,
      [start - 0.0001, start, 1],
      ['inset(0px 0px 0px 0px)', `inset(0px 0px ${foldSegmentHeight}px 0px)`, `inset(0px 0px ${foldSegmentHeight}px 0px)`],
      { clamp: true }
    );
    const bottomTranslateEndProgress = Math.min(translateStart + foldCompletionProgress, translateEnd);

    const bottomTranslate = useTransform(
      foldScrollYProgress,
      [translateStart, bottomTranslateEndProgress],
      [0, foldDistance],
      { clamp: true }
    );

    const bottomOpacity = useTransform(
      foldScrollYProgress,
      [translateStart - 0.0001, translateStart, 1],
      [0, 1, 1],
      { clamp: true }
    );

    const connectorOpacity = useTransform(
      foldScrollYProgress,
      [translateStart - 0.0001, translateStart, 1],
      [0, 0.45, 0.65],
      { clamp: true }
    );

    const middleOpacity = useTransform(
      foldScrollYProgress,
      [translateStart - 0.0001, translateStart, translateEnd],
      [0, 1, 1],
      { clamp: true }
    );

    const connectorLength = useTransform(bottomTranslate, (value) => Math.max(value, 6));
    const middleHeight = useTransform(bottomTranslate, (value) => Math.max(value, 0));

    const contentOpacity = useTransform(foldScrollYProgress, [foldCompletionProgress, 1], [0, 1], {
      clamp: true,
    });

    return {
      topClip,
      bottomTranslate,
      bottomOpacity,
      connectorLength,
      connectorOpacity,
      middleHeight,
      middleOpacity,
      contentOpacity,
    };
  });

  return (
    <section className="relative isolate bg-sf-bg text-sf-text">
      <div className="absolute inset-0" aria-hidden>
        <MeshBackground />
      </div>
      <div className="relative flex min-h-screen items-center justify-center px-6 pb-24 pt-32 sm:px-12">
        <div className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-4 sm:px-8 lg:px-12">
          <nav className="pointer-events-auto flex w-full max-w-5xl items-center justify-between rounded-full border border-white/45 bg-white/65 px-5 py-2.5 text-sm text-sf-text shadow-[0_18px_60px_rgba(45,76,170,0.18)] backdrop-blur-xl">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/logo/SmartFlow.png`}
                alt="Smartflow"
                width={40}
                height={40}
                priority
              />
              <span className="font-display text-xs font-semibold uppercase tracking-[0.36em] text-sf-text/70 sm:text-sm">
                Smartflow
              </span>
            </Link>
            <div className="hidden items-center gap-6 text-xs font-medium uppercase tracking-[0.28em] text-sf-text/70 sm:flex sm:text-[0.8rem]">
              <Link href="#services" className="transition hover:text-[#7f2dff]">
                Services
              </Link>
              <Link href="#projets" className="transition hover:text-[#7f2dff]">
                Projets
              </Link>
              <Link href="#contact" className="transition hover:text-[#7f2dff]">
                Contact
              </Link>
            </div>
            <Link
              href="#contact"
              className="rounded-full border border-[#7f2dff]/50 bg-[#7f2dff] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white shadow-[0_16px_32px_rgba(79,58,255,0.28)] transition hover:bg-[#6b2dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f2dff]/60 sm:text-[0.78rem]"
            >
              Parler
            </Link>
          </nav>
        </div>
        <motion.div
          className="mx-auto flex w-full max-w-5xl flex-col gap-12 lg:flex-row lg:items-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            className="relative flex w-full justify-center lg:w-1/3"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          >
            <div className="font-display relative flex flex-col items-center font-semibold uppercase text-sf-text">
              <div
                aria-hidden
                className="absolute inset-0 flex items-center justify-center lg:-left-1"
              >
                <div className="h-[84vw] w-[84vw] max-h-[23.5rem] max-w-[23.5rem] translate-y-[1.5rem] rounded-[2.5rem] bg-gradient-to-br from-[#6b2dff] via-[#3658ff] to-[#2fcbff] opacity-90 blur-[1.5px] shadow-[0_36px_96px_rgba(60,93,255,0.46)]" />
              </div>
              <span className="relative mb-8 translate-x-1 text-xs font-semibold tracking-[0.48em] text-white/85 drop-shadow-[0_6px_20px_rgba(27,40,110,0.45)] lg:text-sm">
                Smartflow
              </span>
              <div className="relative flex flex-col items-center text-white drop-shadow-[0_25px_45px_rgba(18,24,63,0.45)]">
                <span className="text-[16vw] leading-[0.85] sm:text-[13vw] lg:text-[8.5rem]">W</span>
                <span className="mt-3 text-[16vw] leading-[0.85] sm:-mt-2 sm:text-[13vw] lg:-mt-[0.6rem] lg:text-[8.5rem]">
                  E
                </span>
                <span className="mt-3 text-[16vw] leading-[0.85] sm:-mt-2 sm:text-[13vw] lg:-mt-[0.6rem] lg:text-[8.5rem]">
                  B
                </span>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="relative w-full lg:-mt-6 lg:w-[75%]"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="absolute -top-14 right-6 h-32 w-32 rounded-full bg-gradient-to-tr from-white/70 via-[#6da2ff]/28 to-transparent blur-3xl" aria-hidden />
            <div className="absolute -bottom-12 left-8 h-28 w-28 rounded-full bg-gradient-to-br from-white/65 via-[#784dff]/24 to-transparent blur-3xl" aria-hidden />
            <div className="relative overflow-hidden rounded-[2.25rem] border border-white/60 bg-gradient-to-br from-white via-[#f9fbff] to-[#f2f6ff] px-12 py-12 text-center shadow-[0_34px_122px_rgba(45,76,170,0.24)] backdrop-blur-[38px] lg:px-16 lg:py-16 lg:text-left">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(107,77,255,0.1),transparent_60%)]" aria-hidden />
              <div className="absolute inset-0 opacity-32 [background:linear-gradient(135deg,rgba(53,125,255,0.08)_0%,rgba(53,213,255,0.06)_45%,transparent_80%)]" aria-hidden />
              <div className="absolute -left-14 top-1/2 hidden h-28 w-28 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(84,120,255,0.28),transparent_68%)] blur-[70px] lg:block" aria-hidden />
              <div className="absolute -right-12 top-1/3 hidden h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(53,213,255,0.26),transparent_65%)] blur-[70px] lg:block" aria-hidden />
              <div className="relative z-10 space-y-9">
                <div className="flex flex-col items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.38em] text-sf-text/60 sm:flex-row sm:justify-between lg:items-start">
                  <span className="inline-flex items-center gap-2 text-sf-text/50">
                    Produit · UX · Identité
                  </span>
                </div>
                <h1 className="font-display text-balance text-4xl font-semibold leading-tight text-sf-text sm:text-5xl md:text-[3.45rem]">
                  Expérience digitale
                  <br />
                  sur mesure.
                </h1>
                <p className="text-lg leading-relaxed text-sf-text/70 sm:text-xl">
                  Agence web &amp; design pour une présence en ligne durable. Nous façonnons des interfaces fluides, fiables et mémorables pour vos marques et produits.
                </p>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/60 bg-gradient-to-br from-white/90 via-[#eef2ff]/80 to-white/70 p-4 text-left shadow-[0_16px_45px_rgba(64,102,255,0.22)] backdrop-blur">
                    <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-sf-text/70">
                      Design fluide
                    </p>
                    <p className="mt-2 text-sm text-sf-text/60">
                      Parcours soignés, animations maîtrisées et ADN visuel cohérent.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/60 bg-gradient-to-br from-white/90 via-[#e5fbff]/80 to-white/70 p-4 text-left shadow-[0_16px_45px_rgba(64,186,255,0.22)] backdrop-blur">
                    <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-sf-text/70">
                      Tech durable
                    </p>
                    <p className="mt-2 text-sm text-sf-text/60">
                      Performance, accessibilité et évolutivité alignées à vos enjeux.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-2xl bg-gradient-to-r from-[#7f2dff] via-[#3658ff] to-[#35d5ff] px-8 text-base font-semibold text-white shadow-[0_26px_60px_rgba(79,58,255,0.34)] transition hover:shadow-[0_32px_72px_rgba(79,58,255,0.44)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f2dff]/60"
                  >
                    <Link href="#contact">Demander un devis</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-2xl border-[#35d5ff]/60 bg-white/75 px-8 text-base font-semibold text-sf-text backdrop-blur transition hover:border-[#7f2dff]/60 hover:text-[#7f2dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f2dff]/60"
                  >
                    <Link href="#projets">Voir les projets</Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="relative -mt-[100px] flex min-h-[1000vh] flex-col items-center px-4 py-32 sm:px-8">
        <motion.div
          className="sticky top-1/2 w-full max-w-6xl -translate-y-1/2 px-2 sm:px-4"
          ref={headingRef}
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.45 }}
        >
          <div className="relative flex w-full items-center justify-center">
            <motion.div
              className="flex w-full flex-col items-start"
              style={{
                x: headingX,
                y: headingY,
                transformOrigin: 'left top',
                originX: 0,
                originY: 0,
              }}
            >
              <motion.h2
                className="font-display text-left text-3xl font-semibold uppercase leading-[1.05] text-sf-text drop-shadow-[0_25px_45px_rgba(18,24,63,0.35)] sm:text-[4.1rem]"
                style={{
                  letterSpacing: headingLetterSpacing,
                  scale: headingScale,
                  transformOrigin: 'left top',
                  originX: 0,
                  originY: 0,
                }}
              >
                {letters.map((char, index) => {
                  const totalRange = LETTER_PHASE_END - LETTER_PHASE_START;
                  const segment = totalRange / letters.length;
                  const start = LETTER_PHASE_START + index * segment;
                  const end = start + segment;
                  const opacity = useTransform(scrollYProgress, [start, end], [0, 1], {
                    clamp: true,
                  });
                  const y = useTransform(scrollYProgress, [start, end], ['55%', '0%'], {
                    clamp: true,
                  });

                  return (
                    <motion.span
                      key={`${char}-${index}`}
                      style={{ opacity, translateY: y }}
                      className="inline-block"
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  );
                })}
              </motion.h2>
              <motion.p
                className="-mt-7 text-left text-base leading-snug text-sf-text/70 whitespace-nowrap sm:text-lg"
                style={{ opacity: taglineOpacity, translateY: taglineY }}
              >
                De la stratégie à la mise en ligne, nous maîtrisons chaque étape du digital pour allier design, performance et impact mesurable.
              </motion.p>
            </motion.div>
            <motion.div
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              style={{
                scale: rectangleScale,
                rotate: rectangleRotate,
                transformOrigin: '50% 50%',
              }}
            >
              <motion.div
                className="relative flex h-[360px] w-[360px] flex-col items-center justify-center"
                style={{ width: rectangleWidth }}
              >
                {rectangleGradients.map((gradient, index) => {
                  const {
                    topClip,
                    bottomTranslate,
                    bottomOpacity,
                    connectorLength,
                    connectorOpacity,
                    middleHeight,
                    middleOpacity,
                    contentOpacity,
                  } = foldConfigs[index];
                  const bottomClip = `inset(${rectangleHeight - foldSegmentHeight}px 0px 0px 0px)`;
                  const hologramGradient = `linear-gradient(180deg, ${gradient[2]}1f 0%, ${gradient[1]}12 50%, ${gradient[0]}1a 100%)`;
                  const mainGradient = `linear-gradient(180deg, ${gradient[2]} 0%, ${gradient[1]} 50%, ${gradient[0]} 100%)`;
                  const connectorGradient = `linear-gradient(180deg, ${gradient[2]}85 0%, ${gradient[1]}78 50%, ${gradient[0]}70 100%)`;
                  const content = rectangleContents[index];

                  return (
                    <motion.div
                      key={`sticky-rect-${index}`}
                      className="flex justify-center"
                      style={{
                        x: rectangleTransforms[index].x,
                        y: rectangleTransforms[index].y,
                      }}
                    >
                      <motion.div
                        className="relative h-[90px] w-[360px]"
                        style={{
                          width: rectangleWidth,
                          filter: 'drop-shadow(0 16px 40px rgba(45, 76, 170, 0.18))',
                        }}
                      >
                        <motion.div
                        className="absolute inset-0 flex h-full w-full items-center justify-center rounded-[2rem] border border-white/40 bg-white/7 text-center backdrop-blur-sm"
                          style={{
                            clipPath: topClip,
                            backgroundImage: mainGradient,
                          }}
                        >
                          <span className="inline-block font-display text-lg font-semibold uppercase tracking-[0.2em] text-white drop-shadow-[0_12px_32px_rgba(0,0,0,0.25)] -translate-y-2">
                            {rectangleLabels[index]}
                          </span>
                        </motion.div>
                        <motion.div
                          className="absolute left-0 right-0 z-0 border border-white/10"
                          style={{
                            top: separationOffset,
                            height: middleHeight,
                            opacity: middleOpacity,
                            background: `linear-gradient(95deg, ${gradient[2]}0d 0%, ${gradient[1]}09 48%, ${gradient[0]}06 100%)`,
                            boxShadow: '0 10px 22px rgba(40, 78, 200, 0.1)',
                          }}
                        >
                          <motion.div
                            className="relative flex h-full w-full flex-col justify-start gap-2 px-8 text-left pt-5"
                            style={{
                              opacity: contentOpacity,
                            }}
                          >
                            <h3
                              className="font-display text-[1.22rem] font-bold leading-tight tracking-[0.05em] uppercase"
                              style={{ color: gradient[2] }}
                            >
                              {content.title}
                            </h3>
                            <p
                              className="text-[0.98rem] leading-relaxed"
                              style={{ color: '#0b0d12' }}
                            >
                              {content.description}
                            </p>
                          </motion.div>
                        </motion.div>
                        <motion.div
                          className="pointer-events-none absolute z-10 w-[3px]"
                          style={{
                            top: separationOffset,
                            left: 0,
                            height: connectorLength,
                            opacity: connectorOpacity,
                            backgroundImage: connectorGradient,
                            boxShadow: '0 0 12px rgba(53, 213, 255, 0.38)',
                          }}
                        />
                        <motion.div
                          className="pointer-events-none absolute z-10 w-[3px]"
                          style={{
                            top: separationOffset,
                            right: 0,
                            height: connectorLength,
                            opacity: connectorOpacity,
                            backgroundImage: connectorGradient,
                            boxShadow: '0 0 12px rgba(79, 58, 255, 0.35)',
                          }}
                        />
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center rounded-[2rem] border border-white/45 text-center backdrop-blur"
                          style={{
                            clipPath: bottomClip,
                            backgroundImage: mainGradient,
                            y: bottomTranslate,
                            opacity: bottomOpacity,
                          }}
                        >
                          <span className="inline-block font-display text-sm font-medium uppercase tracking-[0.24em] text-white/85 drop-shadow-[0_10px_24px_rgba(0,0,0,0.3)] -translate-y-2">
                            Section à venir
                          </span>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        <div className="w-full max-w-6xl px-2 sm:px-4">
          <div ref={firstSectionRef} className="h-[600vh]" />
          <div ref={secondSectionRef} className="h-[420vh]" />
          <div ref={foldSectionRef} className="h-[280vh]" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
