import { useMemo, useState } from 'react';
import { Lightbulb, RefreshCw, Sparkles } from 'lucide-react';

type Option = {
  label: string;
  value: number;
};

type Question = {
  id: string;
  prompt: string;
  options: Option[];
};

const QUESTIONS: Question[] = [
  {
    id: 'bedtime',
    prompt: 'How often do you go to bed around the same time each night?',
    options: [
      { label: 'Almost every night', value: 4 },
      { label: 'Most nights', value: 3 },
      { label: 'Sometimes', value: 2 },
      { label: 'Rarely', value: 1 },
      { label: 'Almost never', value: 0 },
    ],
  },
  {
    id: 'hours',
    prompt: 'On a typical night, how many hours of sleep do you get?',
    options: [
      { label: '8–10 hours', value: 4 },
      { label: '6–7 hours', value: 2 },
      { label: '5 hours or fewer', value: 0 },
      { label: 'It varies a lot', value: 1 },
      { label: 'More than 10 hours', value: 3 },
    ],
  },
  {
    id: 'screens',
    prompt: 'How often do you use a phone or screen right before bed?',
    options: [
      { label: 'Never', value: 4 },
      { label: 'Once in a while', value: 3 },
      { label: 'A few nights a week', value: 2 },
      { label: 'Most nights', value: 1 },
      { label: 'Every night', value: 0 },
    ],
  },
  {
    id: 'fallasleep',
    prompt: 'How long does it usually take you to fall asleep?',
    options: [
      { label: 'Under 15 minutes', value: 4 },
      { label: '15–30 minutes', value: 3 },
      { label: '30–60 minutes', value: 2 },
      { label: 'More than an hour', value: 1 },
      { label: 'It changes a lot', value: 0 },
    ],
  },
  {
    id: 'wakings',
    prompt: 'How often do you wake up during the night?',
    options: [
      { label: 'Almost never', value: 4 },
      { label: 'Once in a while', value: 3 },
      { label: 'A few times a week', value: 2 },
      { label: 'Most nights', value: 1 },
      { label: 'Several times a night', value: 0 },
    ],
  },
  {
    id: 'morning',
    prompt: 'How do you usually feel when you wake up?',
    options: [
      { label: 'Refreshed and ready', value: 4 },
      { label: 'Mostly okay', value: 3 },
      { label: 'A little groggy', value: 2 },
      { label: 'Tired', value: 1 },
      { label: 'Exhausted', value: 0 },
    ],
  },
  {
    id: 'caffeine',
    prompt: 'How often do you have caffeine (soda, tea, coffee) in the afternoon or evening?',
    options: [
      { label: 'Never', value: 4 },
      { label: 'Once in a while', value: 3 },
      { label: 'A few times a week', value: 2 },
      { label: 'Most days', value: 1 },
      { label: 'Every day', value: 0 },
    ],
  },
];

const MAX_SCORE = QUESTIONS.reduce(
  (sum, q) => sum + Math.max(...q.options.map((o) => o.value)),
  0
);

type Feedback = { heading: string; body: string };

const FEEDBACK_HIGH: Feedback[] = [
  {
    heading: 'Your sleep rhythm looks steady',
    body:
      'You are keeping habits that tend to support restful nights. Keep protecting a consistent bedtime and a cool, dark room. Even small tweaks — dimming lights a little earlier or winding down without screens — can help mornings feel even smoother.',
  },
  {
    heading: 'Rest seems to be working for you',
    body:
      'Your answers point to a routine that gives your body a reliable signal it is time to rest. Keep it going, and notice which nights feel best so you can repeat what works.',
  },
  {
    heading: 'Your habits are setting you up well',
    body:
      'Consistency is doing a lot of the work here. If you want to experiment, try a short calming ritual before bed — slow breathing or quiet reading — and see how your mornings feel.',
  },
];

const FEEDBACK_MID: Feedback[] = [
  {
    heading: 'A few small changes could help',
    body:
      'Your habits are heading in a good direction. Try setting one steady wake time (even on weekends), winding down without screens 30–60 minutes before bed, and keeping caffeine to the morning. These shifts often make mornings feel noticeably easier.',
  },
  {
    heading: 'You are close — a couple of tweaks may help',
    body:
      'Pick one habit to focus on first: a fixed wake-up time, a calmer pre-sleep routine, or moving screens further from bedtime. You do not have to fix everything at once.',
  },
  {
    heading: 'Small steps can smooth things out',
    body:
      'Your nights are okay, and a little more consistency could help them feel better. Try the same bedtime for a week and notice how your energy shifts during the day.',
  },
];

const FEEDBACK_LOW: Feedback[] = [
  {
    heading: 'There is room to make rest easier',
    body:
      'Many of us have nights like this. Start small: pick one fixed wake-up time, add a short calming routine before bed, and move screens and caffeine further from bedtime. One habit at a time adds up.',
  },
  {
    heading: 'A fresh approach could help a lot',
    body:
      'Begin with a single change — a consistent wake time is a great one. Once that feels steady, layer in a calm wind-down and less screen time before bed. Be patient with yourself as your rhythm adjusts.',
  },
  {
    heading: 'Small changes can make a big difference',
    body:
      'Your answers suggest your rest could use some support. Try one habit this week: same wake time each day, a quiet pre-sleep routine, or no caffeine after lunch. Build from there.',
  },
];

function pickFeedback(ratio: number): Feedback {
  if (ratio >= 0.75) {
    return FEEDBACK_HIGH[Math.floor(Math.random() * FEEDBACK_HIGH.length)];
  }
  if (ratio >= 0.5) {
    return FEEDBACK_MID[Math.floor(Math.random() * FEEDBACK_MID.length)];
  }
  return FEEDBACK_LOW[Math.floor(Math.random() * FEEDBACK_LOW.length)];
}

export default function SleepSelfCheck() {
  // answers maps question id -> selected option index
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const answeredCount = Object.keys(answers).length;
  const score = useMemo(
    () =>
      Object.entries(answers).reduce((sum, [qid, optIdx]) => {
        const q = QUESTIONS.find((x) => x.id === qid);
        return sum + (q ? q.options[optIdx].value : 0);
      }, 0),
    [answers]
  );
  const allAnswered = answeredCount === QUESTIONS.length;

  const select = (qid: string, optIdx: number) => {
    setAnswers((prev) => ({ ...prev, [qid]: optIdx }));
    if (submitted) {
      setSubmitted(false);
      setFeedback(null);
    }
  };

  const handleSeeFeedback = () => {
    if (!allAnswered) return;
    const ratio = score / MAX_SCORE;
    setFeedback(pickFeedback(ratio));
    setSubmitted(true);
  };

  const handleRetake = () => {
    setAnswers({});
    setSubmitted(false);
    setFeedback(null);
  };

  return (
    <div
      id="sleep-self-check"
      aria-labelledby="self-check-heading"
      className="bg-gradient-to-br from-skywash/40 via-pale to-pale-deep"
    >
      <div className="container-editorial py-24 sm:py-32 lg:py-40">
        <div className="max-w-3xl">
          <p className="reveal eyebrow text-ink/60">05 / Quick reflection</p>
          <h3
            id="self-check-heading"
            className="reveal mt-6 font-serif text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.1] tracking-tight"
            style={{ ['--reveal-delay' as string]: '100ms' }}
          >
            <span className="text-ink">How Well Are You </span>
            <span className="text-electric">Sleeping</span>
            <span className="text-ink">?</span>
          </h3>
          <p
            className="reveal mt-4 max-w-2xl text-base leading-relaxed text-ink/70 sm:text-lg"
            style={{ ['--reveal-delay' as string]: '200ms' }}
          >
            Take this quick self-check to reflect on your sleep habits and
            discover helpful tips for better rest.
          </p>
        </div>

        <div
          className="reveal mt-12 border border-skywash/50 bg-white/80 p-6 shadow-sm backdrop-blur sm:p-10"
          style={{ ['--reveal-delay' as string]: '300ms' }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 pb-5">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-ink/60">
              {answeredCount} of {QUESTIONS.length} answered
            </p>
            <div className="h-2 w-32 overflow-hidden rounded-full bg-pale-deep">
              <div
                className="h-full rounded-full bg-electric transition-all duration-500"
                style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          <ol className="mt-8 space-y-10">
            {QUESTIONS.map((q, index) => {
              const selectedIdx = answers[q.id];
              return (
                <li key={q.id}>
                  <p className="font-serif text-lg font-semibold tracking-tight text-ink sm:text-xl">
                    <span className="mr-2 font-mono text-sm text-electric">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {q.prompt}
                  </p>
                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {q.options.map((opt, optIdx) => {
                      const active = selectedIdx === optIdx;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => select(q.id, optIdx)}
                          className={`flex min-h-[44px] items-center gap-3 rounded-sm border px-4 py-3 text-left text-sm transition-all duration-200 ${
                            active
                              ? 'border-electric bg-electric text-white shadow-sm'
                              : 'border-ink/10 bg-pale/60 text-ink hover:border-electric/40 hover:bg-white'
                          }`}
                          aria-pressed={active}
                        >
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] ${
                              active
                                ? 'border-white bg-white text-electric'
                                : 'border-ink/30 text-transparent'
                            }`}
                            aria-hidden="true"
                          >
                            ✓
                          </span>
                          <span className="font-medium">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-ink/10 pt-6">
            <button
              type="button"
              onClick={handleSeeFeedback}
              disabled={!allAnswered}
              className={`inline-flex min-h-[52px] items-center justify-center gap-2 px-7 text-sm font-medium transition-all duration-200 ${
                allAnswered
                  ? 'bg-ink text-white hover:-translate-y-0.5 hover:bg-ink-soft focus-invert'
                  : 'cursor-not-allowed bg-ink/30 text-white/70'
              }`}
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              {submitted ? 'Feedback shown' : 'See my feedback'}
            </button>
            <button
              type="button"
              onClick={handleRetake}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 border border-ink/20 bg-white px-7 text-sm font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/40 focus-invert"
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Start over
            </button>
            {!allAnswered && (
              <p className="text-sm text-ink/60">
                Answer all {QUESTIONS.length} questions to unlock your feedback.
              </p>
            )}
          </div>
        </div>

        {submitted && feedback && (
          <aside
            className="mt-8 animate-fadeIn border border-electric/30 bg-gradient-to-br from-white via-white to-skywash/20 p-6 shadow-sm sm:p-10"
            aria-live="polite"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-electric/10 text-electric">
                <Lightbulb className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h4 className="font-serif text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  {feedback.heading}
                </h4>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/80 sm:text-lg">
                  {feedback.body}
                </p>
                <p className="mt-4 text-sm text-ink/50">
                  This reflection is not a diagnosis — it is just a way to
                  notice your own patterns. You can retake it any time.
                </p>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
