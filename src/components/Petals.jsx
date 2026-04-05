import { useMemo } from 'react';

const PETAL_COUNT = 22;

const PETAL_COLORS = [
  '#E8C4C8', '#D4A8A8', '#F0E4C4', '#E8D5C0',
  '#C8D4BC', '#F0D0C0', '#DEC8B8', '#E0C8B0',
  '#CCBCB8', '#E8D0B8', '#F4E0D0', '#D8C8D0',
];

/** Ellipse petal */
const Petal1 = ({ color, size }) => (
  <svg width={size} height={size * 1.7} viewBox="0 0 22 38" fill="none">
    <ellipse cx="11" cy="19" rx="8.5" ry="17" fill={color} opacity="0.75" />
    <path d="M11 4 Q17 13 11 32 Q5 13 11 4Z" fill={color} opacity="0.35" />
  </svg>
);

/** Rounded petal */
const Petal2 = ({ color, size }) => (
  <svg width={size} height={size * 1.4} viewBox="0 0 20 28" fill="none">
    <path d="M10 2 C18 2 20 10 18 18 C16 24 10 27 10 27 C10 27 4 24 2 18 C0 10 2 2 10 2Z"
      fill={color} opacity="0.72" />
  </svg>
);

/** Heart petal */
const Petal3 = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 20 18" fill="none">
    <path d="M10 16 C10 16 1 10 1 5 C1 2.5 3 1 5.5 1 C7.5 1 9 2.5 10 4 C11 2.5 12.5 1 14.5 1 C17 1 19 2.5 19 5 C19 10 10 16 10 16Z"
      fill={color} opacity="0.65" />
  </svg>
);

const PETAL_SHAPES = [Petal1, Petal2, Petal3];

export default function Petals() {
  const petals = useMemo(() =>
    Array.from({ length: PETAL_COUNT }, (_, i) => {
      const ShapeComp = PETAL_SHAPES[i % PETAL_SHAPES.length];
      return {
        id: i,
        left: `${4 + Math.random() * 92}%`,
        color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
        size: 7 + Math.random() * 13,
        duration: 12 + Math.random() * 16,
        delay: -(Math.random() * 25),
        swayDuration: 3.5 + Math.random() * 4,
        rot: `${(Math.random() > 0.5 ? 1 : -1) * (300 + Math.random() * 400)}deg`,
        sway: `${(Math.random() > 0.5 ? 1 : -1) * (30 + Math.random() * 80)}px`,
        ShapeComp,
      };
    }),
  []);

  return (
    <div className="petals-container" aria-hidden="true">
      {petals.map(({ id, left, color, size, duration, delay, swayDuration, rot, sway, ShapeComp }) => (
        <div
          key={id}
          className="petal"
          style={{
            left,
            '--rot': rot,
            '--sway': sway,
            animationDuration: `${duration}s, ${swayDuration}s`,
            animationDelay: `${delay}s, 0s`,
          }}
        >
          <ShapeComp color={color} size={size} />
        </div>
      ))}
    </div>
  );
}
