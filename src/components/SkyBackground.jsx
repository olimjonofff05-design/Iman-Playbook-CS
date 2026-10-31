import ImanMark from "./ImanMark";
import "./SkyBackground.css";

// IMAN = NUR: orqa fonda nur sochib aylanuvchi IMAN belgisi va uchib yuruvchi yulduzchalar.
// Yulduzlar bir marta (modul yuklanganda) tasodifiy joylashtiriladi, render paytida o'zgarmaydi.
const STAR_COUNT = 46;
const SPARKLE_COUNT = 9;

function rand(min, max) {
  return min + Math.random() * (max - min);
}

const STARS = Array.from({ length: STAR_COUNT }, () => ({
  x: rand(0, 100),
  y: rand(0, 100),
  size: rand(1, 2.8),
  twinkle: rand(2.5, 6),
  drift: rand(18, 42),
  delay: rand(-40, 0),
}));

// Kattaroq, to'rt nurli oltin yulduzchalar
const SPARKLES = Array.from({ length: SPARKLE_COUNT }, () => ({
  x: rand(4, 96),
  y: rand(6, 94),
  size: rand(8, 16),
  twinkle: rand(3.5, 7),
  drift: rand(26, 50),
  delay: rand(-50, 0),
}));

function starStyle(s) {
  return {
    left: `${s.x}%`,
    top: `${s.y}%`,
    width: `${s.size}px`,
    height: `${s.size}px`,
    "--twinkle": `${s.twinkle}s`,
    "--drift": `${s.drift}s`,
    animationDelay: `${s.delay}s, ${s.delay / 2}s`,
  };
}

function SkyBackground() {
  return (
    <div className="sky" aria-hidden="true">
      <div className="sky-nur">
        <span className="sky-nur-glow" />
        <span className="sky-nur-rays" />
        <ImanMark className="sky-mark" size={520} />
      </div>

      {STARS.map((s, i) => (
        <span key={`s${i}`} className="sky-star" style={starStyle(s)} />
      ))}

      {SPARKLES.map((s, i) => (
        <svg key={`k${i}`} className="sky-sparkle" viewBox="0 0 24 24" style={starStyle(s)}>
          <path d="M12 0C12.9 7.6 16.4 11.1 24 12C16.4 12.9 12.9 16.4 12 24C11.1 16.4 7.6 12.9 0 12C7.6 11.1 11.1 7.6 12 0Z" />
        </svg>
      ))}

      <span className="sky-meteor" />
      <span className="sky-meteor sky-meteor-2" />
    </div>
  );
}

export default SkyBackground;
