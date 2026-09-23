'use client';

import React from 'react';
import Link from 'next/link';

interface XtremeLogoProps {
  variant?: 'white' | 'navy' | 'dark' | 'color';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showTagline?: boolean;
  className?: string;
  asLink?: boolean;
}

export default function XtremeLogo({
  variant = 'white',
  size = 'md',
  showTagline = false,
  className = '',
  asLink = true
}: XtremeLogoProps) {
  // Height mappings matching standard design scale
  const heights = {
    sm: 'h-6 sm:h-7',
    md: 'h-8 sm:h-9 md:h-10',
    lg: 'h-11 sm:h-12 md:h-14',
    xl: 'h-14 sm:h-16 md:h-18',
    hero: 'h-12 sm:h-14 md:h-16 lg:h-20',
  };

  const currentHeight = heights[size] || heights.md;

  // Determine colors based on variant
  // In official branding:
  // - On white/light background ('navy' or 'color'): 'X' is Red/Orange and 'treme' is Navy (#050A5C)
  // - On dark/red background ('white'): all white OR Red X + white treme
  const isWhite = variant === 'white';
  const xLeftColor = isWhite ? '#FFFFFF' : '#C62828';
  const xRightColor = isWhite ? '#FFFFFF' : '#F4511E';
  const tremeColor = isWhite ? '#FFFFFF' : variant === 'dark' ? '#111827' : '#050A5C';
  const taglineColor = isWhite ? 'text-white/80' : 'text-gray-600';

  const logoSvg = (
    <svg
      viewBox="0 0 1094 186"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${currentHeight} w-auto max-w-full transition-transform duration-300 group-hover:scale-[1.02]`}
      aria-label="Xtreme Logo"
    >
      {/* 't' */}
      <path
        d="M366.52 175.31C360.769 178.727 354.555 181.297 348.07 182.94C341.414 184.688 334.562 185.575 327.68 185.58C313.82 185.58 302.54 181.603 293.84 173.65C285.14 165.697 280.807 154.323 280.84 139.53V70.46H260V41.06H280.81V0H323.26V41.06H363.76V70.74H323.26V132.32C323.26 143.787 327.79 149.517 336.85 149.51C343.13 149.51 350.063 147.663 357.65 143.97L366.52 175.31Z"
        fill={tremeColor}
      />
      {/* 'r' */}
      <path
        d="M453.9 40.22C462.22 35.42 471.926 32.9233 483.02 32.73V73C480.81 72.7775 478.59 72.684 476.37 72.72C463.23 72.72 452.826 76.28 445.16 83.4C437.493 90.52 433.656 99.9967 433.65 111.83V183.67H390.93V34.4H433.65V61.3C438.346 52.5544 445.35 45.2636 453.9 40.22Z"
        fill={tremeColor}
      />
      {/* 'e' */}
      <path
        d="M623.8 53.8198C636.28 67.6931 642.52 87.0264 642.52 111.82C642.52 116.26 642.42 119.68 642.24 122.08H535.17C537.57 131.52 542.193 138.853 549.04 144.08C555.887 149.306 564.117 151.946 573.73 152C580.678 152.02 587.561 150.66 593.98 148C600.526 145.264 606.464 141.257 611.45 136.21L633.92 159C626.316 167.52 616.88 174.204 606.32 178.55C595.5 183.09 583.433 185.356 570.12 185.35C554.4 185.35 540.67 182.206 528.93 175.92C517.453 169.899 507.998 160.639 501.74 149.29C495.36 137.823 492.17 124.6 492.17 109.62C492.17 94.4598 495.407 81.0998 501.88 69.5398C508.168 58.1335 517.603 48.7753 529.06 42.5798C540.72 36.1998 554.053 33.0098 569.06 33.0098C593.06 33.0098 611.323 39.9464 623.85 53.8198M602.35 96.8198C601.97 87.0198 598.823 79.1598 592.91 73.2398C586.997 67.3198 579.113 64.3598 569.26 64.3598C560.013 64.3598 552.293 67.2731 546.1 73.0998C539.907 78.9264 535.987 86.8298 534.34 96.8098L602.35 96.8198Z"
        fill={tremeColor}
      />
      {/* 'm' */}
      <path
        d="M905.9 48.13C915.613 58.39 920.466 72.3066 920.46 89.88V183.63H878.02V102.36C878.02 92.7466 875.43 85.2566 870.25 79.89C865.07 74.5233 858.043 71.8566 849.17 71.89C839.003 72.0766 830.956 75.6833 825.03 82.71C819.103 89.7366 816.146 98.8 816.16 109.9V183.68H773.72V102.36C773.72 92.9333 771.176 85.49 766.09 80.03C761.003 74.57 754.023 71.84 745.15 71.84C734.983 72.0266 726.893 75.6333 720.88 82.66C714.866 89.6866 711.866 98.75 711.88 109.85V183.63H669.14V34.4H711.86V60.2C722.22 42.26 739.046 33.1033 762.34 32.73C774.92 32.73 785.556 35.73 794.25 41.73C802.943 47.73 809.136 56.19 812.83 67.11C817.636 55.83 824.616 47.3233 833.77 41.59C842.923 35.8566 853.883 32.8966 866.65 32.71C883.103 32.71 896.186 37.8433 905.9 48.11"
        fill={tremeColor}
      />
      {/* 'e' */}
      <path
        d="M1074.83 53.82C1087.31 67.6933 1093.55 87.0267 1093.54 111.82C1093.54 116.26 1093.45 119.68 1093.27 122.08H986.2C988.594 131.52 993.217 138.853 1000.07 144.08C1006.92 149.307 1015.15 151.947 1024.76 152C1031.71 152.021 1038.59 150.661 1045 148C1051.55 145.267 1057.49 141.26 1062.48 136.21L1084.95 159C1077.35 167.522 1067.91 174.207 1057.35 178.55C1046.53 183.09 1034.46 185.357 1021.15 185.35C1005.43 185.35 991.7 182.207 979.96 175.92C968.483 169.899 959.028 160.639 952.77 149.29C946.39 137.823 943.2 124.6 943.2 109.62C943.2 94.46 946.437 81.1 952.91 69.54C959.209 58.1543 968.642 48.8148 980.09 42.63C991.744 36.21 1005.06 33 1020.03 33C1044.07 33 1062.34 39.9367 1074.83 53.81M1053.33 96.81C1052.96 87.01 1049.82 79.15 1043.89 73.23C1037.96 67.31 1030.11 64.3533 1020.32 64.36C1011.07 64.36 1003.35 67.2733 997.15 73.1C990.95 78.9267 987.024 86.83 985.37 96.81H1053.33Z"
        fill={tremeColor}
      />
      {/* 'X' main left/lower chevron */}
      <path
        d="M168.5 91.5L260 183H130.25H0.5L46 137.25L91.5 91.5L45.75 45.75L0 0H38.5H77L168.5 91.5Z"
        fill={xLeftColor}
      />
      {/* 'X' top right wing */}
      <path
        d="M184.44 75.19L259.63 0H182.75L146 36.74L184.44 75.19Z"
        fill={xRightColor}
      />
    </svg>
  );

  const logoContent = (
    <div className={`inline-flex flex-col select-none ${className}`}>
      {logoSvg}
      {showTagline && (
        <span className={`text-[9px] sm:text-[11px] font-bold uppercase tracking-wider mt-1 ${taglineColor}`}>
          Spanish Technology
        </span>
      )}
    </div>
  );

  if (asLink) {
    return (
      <Link href="/" className="inline-block group focus:outline-none focus:ring-2 focus:ring-red-400 rounded">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
