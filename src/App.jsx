import { useState, useCallback, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';

const BASE = import.meta.env.BASE_URL;
const AUDIO_SRC = `${BASE}images/videoplayback.mp3`;

const GROWTH_PER_CLICK = 35;
const FONT_GROWTH_PER_CLICK = 25;
const MAX_NO_CLICKS = 5;
const MAX_YES_BUTTON_WIDTH = 260;
const MAX_YES_BUTTON_HEIGHT = 100;
const MAX_YES_FONT_SIZE = 28;

const IMAGE_PATHS = [
  `${BASE}images/image1.gif`,
  `${BASE}images/image2.gif`,
  `${BASE}images/image3.gif`,
  `${BASE}images/image4.gif`,
  `${BASE}images/image5.gif`,
  `${BASE}images/image6.gif`,
  `${BASE}images/image7.gif`,
];

const NO_BUTTON_MESSAGES = [
  'No',
  'Are you sure?',
  'Pookie please',
  "Don't do this to me :(",
  "You're breaking my heart",
  "I'm gonna cry...",
];

const ALT_TEXTS = [
  'Cute kitten with flowers',
  'Sad kitten looking up',
  'Kitten begging',
  'Heartbroken kitten',
  'Crying kitten',
  'Devastated kitten',
  'Happy kitten celebrating',
];

const HEART_PATH =
  'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';

const runHeartConfetti = () => {
  const heart = confetti.shapeFromPath({ path: HEART_PATH });
  const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0,
    decay: 0.94,
    startVelocity: 20,
    shapes: [heart],
    colors: ['#ff69b4', '#ff1493', '#ff6b81', '#e84393', '#ffc0cb'],
  };
  confetti({ ...defaults, particleCount: 50, scalar: 2 });
  confetti({ ...defaults, particleCount: 25, scalar: 3 });
  confetti({ ...defaults, particleCount: 10, scalar: 4 });
};

const runCelebration = () => {
  runHeartConfetti();
  const delays = [400, 800, 1200];
  delays.forEach((delay) => {
    setTimeout(() => runHeartConfetti(), delay);
  });
};

const FloatingHearts = () => {
  const hearts = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${5 + Math.random() * 90}%`,
        top: `${5 + Math.random() * 90}%`,
        delay: Math.random() * 3,
        duration: 4 + Math.random() * 2,
        className: i % 2 === 0 ? 'heart-float' : 'heart-float-slow',
        emoji: ['💕', '💗', '💖', '❤️', '💝', '🌸'][i % 6],
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      {hearts.map(({ id, left, top, delay, className, emoji }) => (
        <span
          key={id}
          className={`floating-heart ${className}`}
          style={{
            left,
            top,
            animationDelay: `${delay}s`,
            animationDuration: `${4 + (id % 3)}s`,
          }}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
};

const App = () => {
  const [noClickCount, setNoClickCount] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [yesButtonHeight, setYesButtonHeight] = useState(48);
  const [yesButtonWidth, setYesButtonWidth] = useState(80);
  const [yesFontSize, setYesFontSize] = useState(20);
  const [noPosition, setNoPosition] = useState(null);
  const buttonAreaRef = useRef(null);
  const audioRef = useRef(null);

  const YES_NO_GAP = 24;
  const noButtonStyle = useMemo(() => {
    if (noPosition) return { left: noPosition.left, top: noPosition.top };
    return {
      left: `${yesButtonWidth + YES_NO_GAP}px`,
      top: '0',
    };
  }, [noPosition, yesButtonWidth]);

  const imageIndex = accepted ? IMAGE_PATHS.length - 1 : Math.min(noClickCount, IMAGE_PATHS.length - 1);
  const currentImage = IMAGE_PATHS[imageIndex];
  const currentAlt = ALT_TEXTS[imageIndex];
  const noButtonText = NO_BUTTON_MESSAGES[Math.min(noClickCount, NO_BUTTON_MESSAGES.length - 1)];

  const handleNoClick = useCallback(() => {
    if (noClickCount >= MAX_NO_CLICKS) return;
    setNoClickCount((c) => c + 1);
    setYesButtonHeight((h) => Math.min(h + GROWTH_PER_CLICK, MAX_YES_BUTTON_HEIGHT));
    setYesButtonWidth((w) => Math.min(w + GROWTH_PER_CLICK, MAX_YES_BUTTON_WIDTH));
    setYesFontSize((s) => Math.min(s + FONT_GROWTH_PER_CLICK, MAX_YES_FONT_SIZE));
  }, [noClickCount]);

  const handleNoMouseEnter = useCallback(() => {
    const el = buttonAreaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const noWidth = 100;
    const noHeight = 56;
    const minLeft = yesButtonWidth + YES_NO_GAP;
    const maxLeft = Math.max(minLeft, rect.width - noWidth - 8);
    const maxTop = Math.max(0, rect.height - noHeight - 8);
    const leftPx = minLeft + Math.random() * (maxLeft - minLeft);
    const topPx = Math.random() * maxTop;
    setNoPosition({ left: `${leftPx}px`, top: `${topPx}px` });
  }, [yesButtonWidth]);

  const handleYesClick = useCallback(() => {
    setAccepted(true);
    runCelebration();
    audioRef.current?.play().catch(() => {});
  }, []);

  return (
    <main className="gradient-background flex items-center justify-center min-h-screen relative">
      <audio ref={audioRef} src={AUDIO_SRC} preload="auto" />
      <FloatingHearts />

      <section className="card-enter glass-card rounded-3xl flex flex-col items-center p-6 sm:p-8 mx-4 max-w-lg relative z-10">
        <img
          src={currentImage}
          alt={currentAlt}
          className="rounded-2xl h-[280px] sm:h-[320px] w-full object-cover shadow-lg ring-2 ring-white/50"
        />
        <h1
          className="mt-5 mb-1 text-3xl sm:text-4xl font-bold text-[#bd1e59] text-center leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {accepted ? 'Yayyy!! 💕' : 'Jinu,Will you be my Valentine?'}
        </h1>
        {!accepted && (
          <p className="text-[#c75a7a] text-sm sm:text-base mb-4 font-medium">Pick wisely 💝</p>
        )}
        {accepted && (
          <p className="celebrate-text text-lg text-[#bd1e59] font-semibold mt-2">Best choice ever!</p>
        )}

        {!accepted && (
          <>
            {/* Mobile: stacked, centered — visible only below md */}
            <div className="flex flex-col items-center gap-4 pt-2 w-full md:hidden">
              <button
                type="button"
                onClick={handleYesClick}
                className="bounce inline-flex items-center justify-center whitespace-nowrap rounded-xl font-semibold cursor-pointer px-5 py-2.5 bg-green-500 text-white transition-all duration-300 ease-in-out hover:bg-green-400 hover:scale-105 min-h-12 min-w-[75px] max-w-[min(260px,90vw)] max-h-[100px] shadow-lg hover:shadow-green-300/50"
                style={{
                  height: yesButtonHeight,
                  width: yesButtonWidth,
                  fontSize: yesFontSize,
                }}
              >
                Yes!
              </button>
              <button
                type="button"
                onClick={handleNoClick}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-xl font-semibold cursor-pointer px-4 py-2 bg-red-500 text-white transition-colors hover:bg-red-600 h-12 min-w-[75px] shadow-lg hover:shadow-red-300/40"
              >
                {noButtonText}
              </button>
            </div>
            {/* Desktop: run-away No — visible from md up */}
            <div
              ref={buttonAreaRef}
              className="hidden md:block relative w-full min-h-[100px] pt-2"
            >
              <button
                type="button"
                onClick={handleYesClick}
                className="bounce absolute left-0 top-0 inline-flex items-center justify-center whitespace-nowrap rounded-xl font-semibold cursor-pointer px-5 py-2.5 bg-green-500 text-white transition-all duration-300 ease-in-out hover:bg-green-400 hover:scale-105 min-h-12 min-w-[75px] max-w-[min(260px,90vw)] max-h-[100px] shadow-lg hover:shadow-green-300/50"
                style={{
                  height: yesButtonHeight,
                  width: yesButtonWidth,
                  fontSize: yesFontSize,
                }}
              >
                Yes!
              </button>
              <button
                type="button"
                onClick={handleNoClick}
                onMouseEnter={handleNoMouseEnter}
                className="no-button-move absolute top-0 inline-flex items-center justify-center whitespace-nowrap rounded-xl text-xl font-semibold cursor-pointer px-4 py-2 bg-red-500 text-white transition-colors hover:bg-red-600 h-12 min-w-[75px] shadow-lg hover:shadow-red-300/40 z-10"
                style={noButtonStyle}
              >
                {noButtonText}
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default App;
