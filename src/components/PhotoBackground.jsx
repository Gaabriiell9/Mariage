const PHOTOS = [
  '/photos/photo1.jpg',
  '/photos/photo2.jpg',
  '/photos/photo3.jpg',
];

// Each photo stays for 8s, total cycle = 24s
// delay = index * 8s
export default function PhotoBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {PHOTOS.map((src, i) => (
        <div
          key={src}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            animation: 'photoSlide 24s infinite',
            animationDelay: `${i * 8}s`,
            opacity: 0,
            transform: 'scale(1.04)',
          }}
        />
      ))}
    </div>
  );
}
