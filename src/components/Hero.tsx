import type { CSSProperties } from 'react';

type HeroProps = {
  onStartBasics: () => void;
};

export default function Hero({ onStartBasics }: HeroProps) {
  const line: CSSProperties = { ['--reveal-delay' as string]: '120ms' };

  return (
    <section className="bg-skywash" aria-labelledby="hero-heading">
      <div className="container-editorial">
        <div className="flex flex-col justify-center py-20 sm:py-28 lg:min-h-[560px] lg:py-36">
          <p className="reveal eyebrow text-ink/70">Simple steps toward better sleep</p>

          <h1
            id="hero-heading"
            className="reveal mt-8 max-w-4xl font-serif text-[clamp(2.75rem,8vw,6rem)] font-semibold leading-[1.04] tracking-tight text-ink"
            style={line}
          >
            Understand Your
            <br />
            Sleep. Improve
            <br />
            Your Day
          </h1>

          <p
            className="reveal mt-8 max-w-xl text-base leading-relaxed text-ink/80 sm:text-lg"
            style={{ ['--reveal-delay' as string]: '240ms' }}
          >
            Slenora makes sleep easier to understand. Explore simple guides
            and practical tips for more restful nights, then visit the Study
            Corner for helpful learning resources and fun math activities to
            keep your mind growing.
          </p>

          <div
            className="reveal mt-10"
            style={{ ['--reveal-delay' as string]: '360ms' }}
          >
            <button
              type="button"
              onClick={onStartBasics}
              className="btn-primary"
            >
              Start with the basics
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
