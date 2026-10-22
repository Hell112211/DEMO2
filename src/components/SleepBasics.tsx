import {
  Bed,
  Brain,
  CheckSquare,
  Cigarette,
  Flower2,
  HeartPulse,
  MonitorSmartphone,
  Moon,
  Sun,
  SunMedium,
  Wind,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Card = {
  title: string;
  description: string;
};

const GRID_CARDS: Array<Card & { variant: 'navy' | 'pale' }> = [
  {
    title: 'Notice',
    description:
      'Sleep quality is how restorative and refreshing sleep feels, not just how long you were in bed.',
    variant: 'navy',
  },
  {
    title: 'Prepare',
    description:
      'Lower light, noise, and stimulation so your body can move toward rest.',
    variant: 'pale',
  },
  {
    title: 'Protect',
    description:
      'Keep a steady wake time and make your room cool, dark, and comfortable.',
    variant: 'navy',
  },
  {
    title: 'Repeat',
    description:
      'A routine is not a test. Let small, repeatable choices add up over time.',
    variant: 'pale',
  },
];

const IMPORTANCE_ITEMS: Array<{ icon: LucideIcon; title: string; description: string }> = [
  {
    icon: Brain,
    title: 'Memory and Learning',
    description:
      'Sleep helps your brain process and store information you learn during the day.',
  },
  {
    icon: CheckSquare,
    title: 'Concentration',
    description:
      'Getting enough quality sleep supports your ability to focus on schoolwork and daily activities.',
  },
  {
    icon: HeartPulse,
    title: 'Physical Health',
    description:
      "Sleep supports growth, recovery, and the body's normal functions.",
  },
  {
    icon: Flower2,
    title: 'Emotional Well-Being',
    description:
      'Adequate sleep helps regulate mood and manage everyday stress.',
  },
  {
    icon: Sun,
    title: 'Energy',
    description:
      'Restful sleep helps you feel more prepared for the activities ahead.',
  },
];

const SMALL_STEPS: Array<{ icon: LucideIcon; title: string; description: string }> = [
  {
    icon: Moon,
    title: 'Build a Sleep Routine',
    description:
      'Go to bed and wake up at the same time every day. Follow a relaxing routine before sleeping.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Unplug Before Bed',
    description:
      'Put away your phone before bedtime and avoid bright screens to help your mind relax.',
  },
  {
    icon: Bed,
    title: 'Create a Comfortable Room',
    description:
      'Keep your bedroom dark, quiet, and cool. Use comfortable pillows and blankets.',
  },
  {
    icon: Wind,
    title: 'Relax Before Sleeping',
    description:
      'Read a book, listen to calm music, or try slow breathing to help yourself unwind.',
  },
  {
    icon: CheckSquare,
    title: 'Manage School Stress',
    description:
      'Prepare your school materials early and write down tomorrow\'s tasks to clear your mind.',
  },
  {
    icon: SunMedium,
    title: 'Stay Active During the Day',
    description:
      'Get some sunlight, enjoy physical activities, and avoid caffeine late in the day.',
  },
];

const SLEEP_FACTORS: Array<{ icon: LucideIcon; title: string }> = [
  { icon: MonitorSmartphone, title: 'Screen Time' },
  { icon: Brain, title: 'Academic Stress' },
  { icon: Cigarette, title: 'Caffeine' },
  { icon: Bed, title: 'Sleep Environment' },
  { icon: Moon, title: 'Irregular Sleeping Schedule' },
  { icon: Flower2, title: 'Emotional Well-Being' },
];

export default function SleepBasics() {
  return (
    <section
      id="sleep-basics"
      aria-labelledby="sleep-basics-heading"
      className="bg-pale"
    >
      <div className="container-editorial py-24 sm:py-32 lg:py-40">
        <div className="max-w-3xl">
          <p className="reveal eyebrow text-ink/60">01 / Start here</p>
          <h2
            id="sleep-basics-heading"
            className="reveal mt-6 font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-ink"
            style={{ ['--reveal-delay' as string]: '100ms' }}
          >
            A little <em className="italic text-electric">more</em> than
            bedtime.
          </h2>
          <p
            className="reveal mt-6 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg"
            style={{ ['--reveal-delay' as string]: '200ms' }}
          >
            There is no perfect night. Start with one small signal your body
            can recognize, then let consistency do the work.
          </p>
        </div>

        <div className="mt-16 sm:mt-24">
          <article
            className="reveal border border-skywash/50 bg-gradient-to-br from-white via-pale to-pale-deep p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navynight/10 sm:p-12"
            aria-labelledby="definition-heading"
          >
            <h3
              id="definition-heading"
              className="reveal mt-2 font-serif text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.1] tracking-tight"
            >
              <span className="text-ink">What Is </span>
              <span className="text-electric">Sleep Quality</span>
              <span className="text-ink">?</span>
            </h3>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/70 sm:text-lg">
              Sleep quality refers to how well you sleep throughout the night.
              It is not just about how many hours you sleep, but also how
              easily you fall asleep, whether you stay asleep, and how rested
              you feel when you wake up.
            </p>
          </article>
        </div>

        <div className="mt-16 sm:mt-24">
          <div className="max-w-3xl">
            <p className="reveal eyebrow text-ink">02 / Why it matters</p>
            <h3
              id="importance-heading"
              className="reveal mt-6 font-serif text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.1] tracking-tight"
            >
              <span className="text-ink">The Power of Rest</span>
              <span className="text-electric">: Why Sleep Matters</span>
            </h3>
            <p className="reveal mt-4 max-w-2xl text-base leading-relaxed text-ink/70 sm:text-lg">
              Good sleep does more than end a long day — it is how your body
              and mind recharge for the next one. Here is what every restful
              night gives back to you.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {IMPORTANCE_ITEMS.map((item, index) => (
              <article
                key={item.title}
                className={`reveal flex h-full flex-col border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-8 ${
                  [
                    'border-skywash/40 bg-gradient-to-br from-skywash/25 via-white to-white hover:shadow-skywash/30',
                    'border-electric/30 bg-gradient-to-br from-electric/15 via-white to-white hover:shadow-electric/25',
                    'border-skywash/40 bg-gradient-to-br from-skywash/25 via-white to-white hover:shadow-skywash/30',
                    'border-electric/30 bg-gradient-to-br from-electric/15 via-white to-white hover:shadow-electric/25',
                    'border-skywash/40 bg-gradient-to-br from-skywash/25 via-white to-white hover:shadow-skywash/30',
                  ][index]
                } ${index === IMPORTANCE_ITEMS.length - 1 ? 'lg:col-span-2' : ''}`}
                style={{ ['--reveal-delay' as string]: `${index * 90}ms` }}
              >
                <item.icon className="h-6 w-6 rounded-full bg-electric/10 p-1 text-electric" aria-hidden="true" />
                <h4 className="mt-5 font-serif text-2xl font-semibold tracking-tight text-ink">
                  {item.title}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-16 sm:mt-24 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          <article
            className="reveal group flex h-full flex-col justify-between bg-ink p-8 text-pale transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/20 sm:p-12"
            aria-labelledby="guide-card-heading"
          >
            <div>
              <p className="eyebrow text-skywash">Did you know?</p>
              <h3
                id="guide-card-heading"
                className="mt-6 max-w-sm font-serif text-3xl font-medium leading-snug text-white sm:text-4xl"
              >
                Your brain is busy even while you sleep!
              </h3>
            </div>
          </article>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            {GRID_CARDS.map((card, index) => {
              const isNavy = card.variant === 'navy';
              return (
                <article
                  key={card.title}
                  className={`reveal flex h-full flex-col rounded-sm p-7 transition-all duration-300 hover:-translate-y-1 sm:p-8 ${
                    isNavy
                      ? 'bg-navynight text-white hover:shadow-lg hover:shadow-navynight/30'
                      : 'border border-skywash/50 bg-gradient-to-br from-skywash/30 via-white to-white text-ink hover:shadow-md hover:shadow-skywash/30'
                  }`}
                  style={{ ['--reveal-delay' as string]: `${index * 90}ms` }}
                >
                  <h3 className="font-serif text-2xl font-semibold tracking-tight">
                    {card.title}
                  </h3>
                  <p
                    className={`mt-4 text-sm leading-relaxed ${
                      isNavy ? 'text-white/90' : 'text-ink/70'
                    }`}
                  >
                    {card.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        {/* Small Steps to Better Sleep */}
        <div className="mt-24 sm:mt-32 lg:mt-40">
          <div className="max-w-3xl">
            <p className="reveal eyebrow text-ink/60">03 / Build better habits</p>
            <h3
              id="small-steps-heading"
              className="reveal mt-6 font-serif text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.1] tracking-tight"
            >
              <span className="text-ink">Small Steps to </span>
              <span className="text-electric">Better Sleep</span>
            </h3>
            <p className="reveal mt-4 max-w-2xl text-base leading-relaxed text-ink/70 sm:text-lg">
              Explore simple tips and practical advice to build healthier sleep
              habits and make your nights more restful.
            </p>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {SMALL_STEPS.map((step, index) => (
              <li
                key={step.title}
                className="reveal flex h-full flex-col border border-skywash/40 bg-gradient-to-br from-white via-pale to-pale-deep p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-skywash/30 sm:p-8"
                style={{ ['--reveal-delay' as string]: `${index * 80}ms` }}
              >
                <step.icon className="h-6 w-6 rounded-full bg-electric/10 p-1 text-electric" aria-hidden="true" />
                <h4 className="mt-5 font-serif text-2xl font-semibold tracking-tight text-ink">
                  {step.title}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">
                  {step.description}
                </p>
              </li>
            ))}
          </ul>

          <aside
            className="reveal mt-12 border-l-4 border-electric bg-electric/10 p-6 sm:p-8"
            aria-label="Sleep reminder"
          >
            <p className="text-base leading-relaxed text-ink sm:text-lg">
              <span className="font-semibold text-electric">Remember:</span>{' '}
              Teenagers generally need 8–10 hours of sleep each night. Start
              with small changes to build healthier sleeping habits.
            </p>
          </aside>
        </div>

        {/* Factors Affecting Sleep */}
        <div className="mt-24 sm:mt-32 lg:mt-40">
          <div className="max-w-3xl">
            <p className="reveal eyebrow text-ink/60">04 / What shapes your nights</p>
            <h3
              id="factors-heading"
              className="reveal mt-6 font-serif text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.1] tracking-tight"
            >
              <span className="text-ink">Factors Affecting </span>
              <span className="text-electric">Sleep</span>
            </h3>
            <p className="reveal mt-4 max-w-2xl text-base leading-relaxed text-ink/70 sm:text-lg">
              Many things can affect how well we sleep. From daily habits to our
              surroundings, understanding these factors can help us develop
              healthier sleeping habits.
            </p>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {SLEEP_FACTORS.map((factor, index) => (
              <li
                key={factor.title}
                className="reveal flex h-full items-center gap-4 border border-ink/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-navynight/10 sm:p-7"
                style={{ ['--reveal-delay' as string]: `${index * 80}ms` }}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navynight/10 text-navynight">
                  <factor.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h4 className="font-serif text-xl font-semibold tracking-tight text-ink">
                  {factor.title}
                </h4>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
