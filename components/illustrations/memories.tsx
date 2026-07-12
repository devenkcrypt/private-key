'use client';

export function MovieIllustration() {
  return (
    <svg width="200" height="160" viewBox="0 0 200 160" fill="none">
      <defs>
        <linearGradient id="screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2b1d44" />
          <stop offset="100%" stopColor="#0d0820" />
        </linearGradient>
        <linearGradient id="reddoor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF5C8A" />
          <stop offset="100%" stopColor="#c01e4d" />
        </linearGradient>
      </defs>
      {/* cinema seats back */}
      <rect x="20" y="120" width="160" height="30" rx="8" fill="#5FA777" opacity="0.25" />
      {/* screen */}
      <rect x="40" y="20" width="120" height="80" rx="8" fill="url(#screen)" />
      <rect x="40" y="20" width="120" height="80" rx="8" stroke="#FFD6E5" strokeWidth="2" opacity="0.6" />
      {/* red door on screen */}
      <rect x="85" y="40" width="30" height="50" rx="3" fill="url(#reddoor)" />
      <circle cx="108" cy="66" r="2" fill="#FFD6E5" />
      {/* glow */}
      <circle cx="100" cy="65" r="30" fill="#FF5C8A" opacity="0.15" />
      {/* two heads watching */}
      <ellipse cx="70" cy="130" rx="14" ry="16" fill="#FF8FB1" />
      <ellipse cx="130" cy="132" rx="14" ry="16" fill="#7CC6FE" />
      {/* hearts above */}
      <path d="M100 95c-2-4-6-6-6-2c0 4 6 8 6 8s6-4 6-8c0-4-4-2-6 2z" fill="#FF5C8A" />
    </svg>
  );
}

export function TripIllustration() {
  return (
    <svg width="200" height="160" viewBox="0 0 200 160" fill="none">
      <defs>
        <linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7CC6FE" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FFD6E5" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {/* sky */}
      <rect x="0" y="0" width="200" height="90" fill="url(#sky2)" />
      {/* sun */}
      <circle cx="160" cy="35" r="16" fill="#FFD6E5" opacity="0.8" />
      {/* temple (Thanjavur) silhouette */}
      <rect x="80" y="50" width="40" height="40" fill="#5FA777" opacity="0.85" />
      <path d="M70 50 L100 25 L130 50 Z" fill="#5FA777" />
      <rect x="95" y="20" width="10" height="10" fill="#5FA777" />
      <circle cx="100" cy="16" r="4" fill="#FFD6E5" />
      {/* road */}
      <path d="M0 130 L200 130 L160 160 L40 160 Z" fill="#FFD6E5" opacity="0.7" />
      <path d="M100 130 L100 160" stroke="#fff" strokeWidth="2" strokeDasharray="6 6" opacity="0.8" />
      {/* car */}
      <g>
        <rect x="80" y="118" width="40" height="14" rx="4" fill="#FF5C8A" />
        <rect x="86" y="110" width="28" height="12" rx="3" fill="#FF8FB1" />
        <circle cx="90" cy="134" r="5" fill="#2C3E50" />
        <circle cx="110" cy="134" r="5" fill="#2C3E50" />
      </g>
      {/* mountains */}
      <path d="M0 90 L40 55 L80 90 Z" fill="#5FA777" opacity="0.5" />
      <path d="M120 90 L160 60 L200 90 Z" fill="#5FA777" opacity="0.5" />
    </svg>
  );
}

export function HeartIllustration() {
  return (
    <svg width="200" height="160" viewBox="0 0 200 160" fill="none">
      <defs>
        <radialGradient id="heartglow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFD6E5" />
          <stop offset="100%" stopColor="#FF5C8A" />
        </radialGradient>
      </defs>
      {/* glow */}
      <circle cx="100" cy="80" r="60" fill="#FF5C8A" opacity="0.12" />
      <circle cx="100" cy="80" r="42" fill="#FF5C8A" opacity="0.2" />
      {/* big heart */}
      <path
        d="M100 120 C 70 95, 50 75, 50 60 C 50 45, 62 35, 76 35 C 86 35, 94 42, 100 50 C 106 42, 114 35, 124 35 C 138 35, 150 45, 150 60 C 150 75, 130 95, 100 120 Z"
        fill="url(#heartglow)"
        stroke="#FF5C8A"
        strokeWidth="2"
      />
      {/* sparkles */}
      <circle cx="60" cy="40" r="2" fill="#FFD6E5" />
      <circle cx="140" cy="45" r="2.5" fill="#FFD6E5" />
      <circle cx="150" cy="100" r="2" fill="#FFD6E5" />
      <circle cx="55" cy="95" r="2" fill="#FFD6E5" />
      {/* date ribbon */}
      <rect x="65" y="130" width="70" height="18" rx="9" fill="#fff" opacity="0.9" />
      <text x="100" y="143" textAnchor="middle" fontSize="11" fill="#FF5C8A" fontWeight="700">23.11.2021</text>
    </svg>
  );
}
