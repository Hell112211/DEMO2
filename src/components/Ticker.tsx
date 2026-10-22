const PHRASES = [
  'Sleep is a skill',
  'Small changes, deeper rest',
  'Made for your actual nights',
];

export default function Ticker() {
  const group = (ariaHidden: boolean) => (
    <span
      className="flex shrink-0 items-center"
      aria-hidden={ariaHidden || undefined}
    >
      {PHRASES.map((phrase) => (
        <span key={phrase} className="flex items-center whitespace-nowrap">
          <span className="px-6 font-mono text-xs uppercase tracking-[0.22em] sm:px-8 sm:text-sm">
            {phrase}
          </span>
          <span
            className="h-2 w-2 rounded-full bg-skywash"
            aria-hidden="true"
          />
        </span>
      ))}
    </span>
  );

  return (
    <div
      className="ticker overflow-hidden border-y border-electric-deep bg-electric py-3.5 text-white"
      aria-label="Slenora principles"
      role="marquee"
    >
      <div className="ticker-track flex w-max">
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
