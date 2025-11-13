'use client';

import React, { useMemo, type CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const halos = [
  {
    key: 'magenta',
    from: 'rgba(176, 55, 255, 0.22)',
    size: 540,
    initial: { x: '-18%', y: '10%' },
    animate: { x: '-10%', y: '4%' },
  },
  {
    key: 'indigo',
    from: 'rgba(69, 77, 255, 0.2)',
    size: 620,
    initial: { x: '-6%', y: '-20%' },
    animate: { x: '4%', y: '-12%' },
  },
  {
    key: 'azure',
    from: 'rgba(40, 173, 255, 0.22)',
    size: 580,
    initial: { x: '28%', y: '-6%' },
    animate: { x: '18%', y: '-2%' },
  },
  {
    key: 'cyan',
    from: 'rgba(54, 233, 255, 0.18)',
    size: 660,
    initial: { x: '24%', y: '30%' },
    animate: { x: '16%', y: '24%' },
  },
];

const ribbons = [
  {
    key: 'ribbon-left',
    gradient:
      'linear-gradient(130deg, rgba(121, 64, 255, 0.35), rgba(255,255,255,0) 72%)',
    initial: { x: '-30%', rotate: -8 },
    animate: { x: '-12%', rotate: -2 },
  },
  {
    key: 'ribbon-right',
    gradient:
      'linear-gradient(250deg, rgba(45, 205, 255, 0.32), rgba(255,255,255,0) 68%)',
    initial: { x: '28%', rotate: 6 },
    animate: { x: '12%', rotate: 1 },
  },
];

export function MeshBackground() {
  const shouldReduceMotion = useReducedMotion();

  const layers = useMemo(
    () =>
      halos.map(({ key, from, size, initial, animate }) => {
        const baseStyle: CSSProperties = {
          width: size,
          height: size,
          background: `radial-gradient(circle, ${from}, transparent 65%)`,
        };

        return (
          <motion.div
            key={key}
            aria-hidden
            className="absolute rounded-full blur-3xl will-change-transform"
            style={baseStyle}
            initial={initial}
            animate={shouldReduceMotion ? initial : animate}
            transition={{
              duration: 18,
              repeat: shouldReduceMotion ? 0 : Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
          />
        );
      }),
    [shouldReduceMotion],
  );

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-[#f5f6ff]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_25%,rgba(121,64,255,0.22),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(60,201,255,0.2),transparent_58%)]" />
      {layers}
      {ribbons.map(({ key, gradient, initial, animate }) => (
        <motion.div
          key={key}
          aria-hidden
          className="absolute inset-y-[-14%] w-[58%] mix-blend-screen blur-[70px]"
          style={{ backgroundImage: gradient }}
          initial={initial}
          animate={shouldReduceMotion ? initial : animate}
          transition={{
            duration: 20,
            repeat: shouldReduceMotion ? 0 : Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        />
      ))}
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.28),transparent_70%)] mix-blend-screen"
        initial={{ opacity: 0.6 }}
        animate={{
          opacity: shouldReduceMotion ? 0.6 : [0.5, 0.76, 0.56],
        }}
        transition={{
          duration: 18,
          repeat: shouldReduceMotion ? 0 : Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      />
      <div className="absolute inset-0 opacity-35 mix-blend-soft-light [background:repeating-linear-gradient(128deg,rgba(100,148,255,0.07)_0,rgba(100,148,255,0.07)_2px,transparent_2px,transparent_9px)]" />
    </div>
  );
}

export default MeshBackground;
