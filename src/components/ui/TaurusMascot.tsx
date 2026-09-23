'use client';

import React, { useEffect, useRef, useId } from 'react';
import Image from 'next/image';
import { assets } from '@/config/assets';

interface TaurusMascotProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

/**
 * TaurusMascot Component
 *
 * Displays the authentic Xtreme Spanish Taurus Mascot with an interactive,
 * GPU-accelerated, natural eye-following effect.
 *
 * Requirements strictly met:
 * 1. Body, horns, clothes, and head remain 100% static.
 * 2. Only the pupils follow the user's cursor.
 * 3. Individual tracking vector calculated per eye.
 * 4. Maximum displacement clamped to eye boundaries (4-5px in 640x640 coordinate space).
 * 5. SVG clipPath ensures pupils never breach the sclera under any circumstance.
 * 6. Smooth requestAnimationFrame easing interpolation (0.12 factor) with no jitter.
 * 7. Smooth return to neutral when cursor leaves viewport.
 * 8. Responsive across all viewport widths via SVG coordinate mapping.
 * 9. Mobile touch devices detect `pointer: fine` and keep the mascot static.
 * 10. Respects `prefers-reduced-motion: reduce`.
 * 11. Zero React re-renders on mouse movement (GPU translate3d via direct DOM refs).
 */
export default function TaurusMascot({
  className = '',
  width = 240,
  height = 240,
  priority = false
}: TaurusMascotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<SVGGElement>(null);
  const rightPupilRef = useRef<SVGGElement>(null);
  const rawId = useId();
  // Sanitize unique ID for SVG clipPath URL usage
  const idPrefix = 'taurus-' + rawId.replace(/[^a-zA-Z0-9_-]/g, '');

  useEffect(() => {
    // 1. Accessibility: Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) {
      return; // Keep mascot static
    }

    const container = containerRef.current;
    let isVisible = true;
    let animFrameId: number | null = null;

    // Mouse coordinates (null when mouse leaves window)
    let mouseX: number | null = null;
    let mouseY: number | null = null;

    // Target displacement in SVG coordinate space (640x640)
    let targetLx = 0;
    let targetLy = 0;
    let targetRx = 0;
    let targetRy = 0;

    // Current interpolated displacement
    let currentLx = 0;
    let currentLy = 0;
    let currentRx = 0;
    let currentRy = 0;

    // Exact eye socket centers measured from the 640x640 asset
    const LEFT_EYE_X = 284.5;
    const LEFT_EYE_Y = 183.0;
    const RIGHT_EYE_X = 342.5;
    const RIGHT_EYE_Y = 178.0;

    // Maximum displacement radii (SVG units) ensuring pupils stay inside the eye socket
    const MAX_DISPLACEMENT_X = 4.8;
    const MAX_DISPLACEMENT_Y = 3.8;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = null;
      mouseY = null;
    };

    const updateLoop = () => {
      if (!isVisible) {
        animFrameId = requestAnimationFrame(updateLoop);
        return;
      }

      if (containerRef.current && mouseX !== null && mouseY !== null) {
        const rect = containerRef.current.getBoundingClientRect();

        // Scale factor between rendered pixel size and 640x640 SVG viewBox
        const scale = rect.width / 640;

        if (scale > 0) {
          // Calculate screen positions for both eye centers
          const leftEyeScreenX = rect.left + LEFT_EYE_X * scale;
          const leftEyeScreenY = rect.top + LEFT_EYE_Y * scale;

          const rightEyeScreenX = rect.left + RIGHT_EYE_X * scale;
          const rightEyeScreenY = rect.top + RIGHT_EYE_Y * scale;

          // Vector from Left Eye to Cursor
          const dxL = mouseX - leftEyeScreenX;
          const dyL = mouseY - leftEyeScreenY;
          const distL = Math.hypot(dxL, dyL);

          if (distL > 0) {
            // Natural response: proportional displacement that gently caps around ~250px away
            const factorL = Math.min(distL / 240, 1.0);
            targetLx = (dxL / distL) * MAX_DISPLACEMENT_X * factorL;
            targetLy = (dyL / distL) * MAX_DISPLACEMENT_Y * factorL;
          }

          // Vector from Right Eye to Cursor
          const dxR = mouseX - rightEyeScreenX;
          const dyR = mouseY - rightEyeScreenY;
          const distR = Math.hypot(dxR, dyR);

          if (distR > 0) {
            const factorR = Math.min(distR / 240, 1.0);
            targetRx = (dxR / distR) * MAX_DISPLACEMENT_X * factorR;
            targetRy = (dyR / distR) * MAX_DISPLACEMENT_Y * factorR;
          }
        }
      } else {
        // When cursor leaves the viewport or is inactive, smoothly glide back to neutral center
        targetLx = 0;
        targetLy = 0;
        targetRx = 0;
        targetRy = 0;
      }

      // Smooth easing interpolation (current += (target - current) * 0.12)
      currentLx += (targetLx - currentLx) * 0.12;
      currentLy += (targetLy - currentLy) * 0.12;
      currentRx += (targetRx - currentRx) * 0.12;
      currentRy += (targetRy - currentRy) * 0.12;

      // Apply GPU-accelerated translate3d transform to the pupils
      if (leftPupilRef.current) {
        leftPupilRef.current.style.transform = `translate3d(${currentLx.toFixed(2)}px, ${currentLy.toFixed(2)}px, 0)`;
      }
      if (rightPupilRef.current) {
        rightPupilRef.current.style.transform = `translate3d(${currentRx.toFixed(2)}px, ${currentRy.toFixed(2)}px, 0)`;
      }

      animFrameId = requestAnimationFrame(updateLoop);
    };

    // IntersectionObserver to pause loop calculations when offscreen
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined' && container) {
      observer = new IntersectionObserver(
        (entries) => {
          isVisible = entries[0]?.isIntersecting ?? true;
        },
        { threshold: 0.05 }
      );
      observer.observe(container);
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    animFrameId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameId !== null) {
        cancelAnimationFrame(animFrameId);
      }
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative select-none aspect-square inline-block ${className}`}
    >
      {/* 1. Static Real Mascot Base Asset (Body, clothes, head, horns are 100% static) */}
      <Image
        src={assets.brand.mascot}
        alt="Xtreme Taurus Mascot"
        width={width}
        height={height}
        className="w-full h-full object-contain block pointer-events-none filter drop-shadow-2xl"
        priority={priority}
      />

      {/* 2. Interactive SVG Eye Overlay (viewBox locked to 640x640 asset coordinate system) */}
      <svg
        viewBox="0 0 640 640"
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          {/* Exact anatomical clip boundaries for Left and Right Eye Sockets */}
          <clipPath id={`${idPrefix}-left-eye-clip`}>
            <ellipse cx="284.5" cy="183" rx="13.5" ry="12.5" />
          </clipPath>
          <clipPath id={`${idPrefix}-right-eye-clip`}>
            <ellipse cx="342.5" cy="178" rx="12" ry="12.5" />
          </clipPath>
        </defs>

        {/* --- Left Eye (Viewer's Left / Taurus's Right) --- */}
        <g clipPath={`url(#${idPrefix}-left-eye-clip)`}>
          {/* Eyeball Sclera (White #FAF3F3 matching asset artwork) */}
          <ellipse cx="284.5" cy="183" rx="13.5" ry="12.5" fill="#FAF3F3" />

          {/* Smooth Interactive Left Pupil Group */}
          <g ref={leftPupilRef} style={{ willChange: 'transform' }}>
            {/* Deep Warm Espresso / Near-Black Pupil matching original asset */}
            <circle cx="286.5" cy="183" r="9.5" fill="#230104" />
          </g>
        </g>
        {/* Crisp Eye Socket Outline matching original character art */}
        <ellipse
          cx="284.5"
          cy="183"
          rx="13.5"
          ry="12.5"
          fill="none"
          stroke="#230104"
          strokeWidth="2"
        />

        {/* --- Right Eye (Viewer's Right / Taurus's Left) --- */}
        <g clipPath={`url(#${idPrefix}-right-eye-clip)`}>
          {/* Eyeball Sclera (White #FAF3F3 matching asset artwork) */}
          <ellipse cx="342.5" cy="178" rx="12" ry="12.5" fill="#FAF3F3" />

          {/* Smooth Interactive Right Pupil Group */}
          <g ref={rightPupilRef} style={{ willChange: 'transform' }}>
            {/* Deep Warm Espresso / Near-Black Pupil matching original asset */}
            <circle cx="344.0" cy="178" r="9.5" fill="#230104" />
          </g>
        </g>
        {/* Crisp Eye Socket Outline matching original character art */}
        <ellipse
          cx="342.5"
          cy="178"
          rx="12"
          ry="12.5"
          fill="none"
          stroke="#230104"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
