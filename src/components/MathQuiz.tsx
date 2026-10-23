import { useMemo, useState } from 'react';
import { Award, RotateCcw, Trophy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { TOPICS } from '@/data/topics';
import {
  generateQuiz,
  type Difficulty,
  type QuizQuestion,
} from '@/data/quizGenerator';

type TopicId = string;

const DIFFICULTIES: Array<{ id: Difficulty; label: string; hint: string }> = [
  { id: 'easy', label: 'Easy', hint: 'Warm-up problems' },
  { id: 'medium', label: 'Medium', hint: 'A steady challenge' },
  { id: 'hard', label: 'Hard', hint: 'Test your understanding' },
];

type Encouragement = { heading: string; body: string };

const ENCOURAGE_5: Encouragement[] = [
  {
    heading: 'Outstanding work!',
    body: 'You answered every question correctly. Your understanding of the topic is strong — keep exploring harder challenges to stretch yourself further.',
  },
  {
    heading: 'Perfect score — well done!',
    body: 'Every answer was right. You clearly grasp the key ideas. Try a harder difficulty next time and see how far you can go.',
  },
];

const ENCOURAGE_4: Encouragement[] = [
  {
    heading: 'Great job!',
    body: 'You got almost everything right. One small slip aside, your skills are solid. Review the question you missed and you will be ready for the next level.',
  },
  {
    heading: 'Strong performance!',
    body: 'Four out of five is a great result. A quick review of the one you missed will turn this into a perfect score next time.',
  },
];

const ENCOURAGE_3: Encouragement[] = [
  {
    heading: 'Good effort!',
    body: 'You got more than half right — that is real progress. Skim the lesson one more time and try again; you are close to mastering this.',
  },
  {
    heading: 'You are on your way',
    body: 'Halfway to a perfect score. Revisit the examples for this topic, then retake the quiz — the patterns will start to click.',
  },
];

const ENCOURAGE_2: Encouragement[] = [
  {
    heading: 'Keep going — you are learning',
    body: 'A couple right is a start. Read through the lesson and worked examples again, then retake the quiz. Practice makes the patterns clearer.',
  },
  {
    heading: 'Every attempt counts',
    body: 'You got two right — that means some ideas are landing. Slow down, review the lesson, and try once more. You will see improvement.',
  },
];

const ENCOURAGE_LOW: Encouragement[] = [
  {
    heading: 'A fresh start is always okay',
    body: 'This topic can take a few tries to click. Revisit the lesson, work through the examples step by step, and try again. You have got this.',
  },
  {
    heading: 'Mistakes are part of learning',
    body: 'Do not be discouraged. Read the lesson slowly, try the examples by hand, and come back. Each attempt builds understanding.',
  },
];

function pickEncouragement(score: number): Encouragement {
  let pool: Encouragement[];
  if (score >= 5) pool = ENCOURAGE_5;
  else if (score === 4) pool = ENCOURAGE_4;
  else if (score === 3) pool = ENCOURAGE_3;
  else if (score === 2) pool = ENCOURAGE_2;
  else pool = ENCOURAGE_LOW;
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function MathQuiz() {
  const [topicId, setTopicId] = useState<TopicId | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [encouragement, setEncouragement] = useState<Encouragement | null>(null);

  const activeTopic = useMemo(
    () => TOPICS.find((t) => t.id === topicId) ?? null,
    [topicId]
  );

  const startQuiz = (tId: TopicId, d: Difficulty) => {
    setTopicId(tId);
    setDifficulty(d);
    setQuestions(generateQuiz(tId, d, 5));
    setAnswers({});
    setSubmitted(false);
    setEncouragement(null);
  };

  const selectAnswer = (qid: string, optIdx: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qid]: optIdx }));
  };

  const allAnswered = questions.length > 0 && Object.keys(answers).length === questions.length;

  const score = useMemo(
    () =>
      questions.reduce(
        (sum, q) => sum + (answers[q.id] === q.answerIndex ? 1 : 0),
        0
      ),
    [answers, questions]
  );

  const handleSubmit = () => {
    if (!allAnswered) return;
    setSubmitted(true);
    setEncouragement(pickEncouragement(score));
  };

  const handleRestart = () => {
    if (topicId && difficulty) {
      startQuiz(topicId, difficulty);
    } else {
      setQuestions([]);
      setAnswers({});
      setSubmitted(false);
      setEncouragement(null);
    }
  };

  const handleNewTopic = () => {
    setTopicId(null);
    setDifficulty(null);
    setQuestions([]);
    setAnswers({});
    setSubmitted(false);
    setEncouragement(null);
  };

  return (
    <section
      id="math-quiz"
      aria-labelledby="math-quiz-heading"
      className="bg-ink text-white"
    >
      <div className="container-editorial py-24 sm:py-32 lg:py-40">
        <div className="max-w-3xl">
          <p className="reveal eyebrow text-skywash">08 / Put it to the test</p>
          <h3
            id="math-quiz-heading"
            className="reveal mt-6 font-serif text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.1] tracking-tight text-white"
            style={{ ['--reveal-delay' as string]: '100ms' }}
          >
            <span className="text-white">Test Your </span>
            <span className="text-skywash">Math Skills</span>
          </h3>
          <p
            className="reveal mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
            style={{ ['--reveal-delay' as string]: '200ms' }}
          >
            Test what you have learned and see how you do.
          </p>
        </div>

        {!topicId && (
          <div className="mt-12 animate-fadeIn">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/60">
              Step 1 — Choose a topic
            </p>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {TOPICS.map((topic) => {
                const TopicIcon: LucideIcon = topic.icon;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setTopicId(topic.id)}
                    className="group flex h-full flex-col items-start gap-4 border border-white/15 bg-white/5 p-6 text-left transition-all duration-200 hover:-translate-y-1 hover:border-skywash hover:bg-white/10 focus-invert"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-electric/20 text-skywash">
                      <TopicIcon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="font-serif text-xl font-semibold tracking-tight text-white">
                      {topic.name}
                    </span>
                    <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-skywash">
                      Choose this topic
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {topicId && !difficulty && (
          <div className="mt-12 animate-fadeIn">
            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/60">
                Step 2 — Pick a difficulty
              </p>
              <button
                type="button"
                onClick={handleNewTopic}
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                Change topic
              </button>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => startQuiz(topicId, d.id)}
                  className="group flex h-full flex-col gap-2 border border-white/15 bg-white/5 p-6 text-left transition-all duration-200 hover:-translate-y-1 hover:border-skywash hover:bg-white/10 focus-invert"
                >
                  <span className="font-serif text-2xl font-semibold tracking-tight text-white">
                    {d.label}
                  </span>
                  <span className="text-sm text-white/60">{d.hint}</span>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-skywash">
                    Start the quiz
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {topicId && difficulty && questions.length > 0 && (
          <div className="mt-12 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-5">
              <div className="flex items-center gap-3">
                {activeTopic && (
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-electric/20 text-skywash">
                    <activeTopic.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                )}
                <div>
                  <p className="font-serif text-lg font-semibold tracking-tight text-white">
                    {activeTopic?.name} · {difficulty}
                  </p>
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/50">
                    {Object.keys(answers).length} of {questions.length} answered
                  </p>
                </div>
              </div>
              <div className="h-2 w-32 overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full rounded-full bg-skywash transition-all duration-500"
                  style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <ol className="mt-8 space-y-10">
              {questions.map((q, index) => {
                const selectedIdx = answers[q.id];
                const correctIdx = q.answerIndex;
                return (
                  <li key={q.id}>
                    <p className="font-serif text-lg font-semibold tracking-tight text-white sm:text-xl">
                      <span className="mr-2 font-mono text-sm text-skywash">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {q.prompt}
                    </p>
                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {q.options.map((opt, optIdx) => {
                        const selected = selectedIdx === optIdx;
                        const isCorrect = optIdx === correctIdx;
                        let cls =
                          'border-white/15 bg-white/5 text-white hover:border-skywash/60 hover:bg-white/10';
                        if (submitted) {
                          if (isCorrect) {
                            cls = 'border-emerald-400 bg-emerald-400/15 text-white';
                          } else if (selected) {
                            cls = 'border-rose-400 bg-rose-400/15 text-white';
                          } else {
                            cls = 'border-white/10 bg-white/5 text-white/50';
                          }
                        } else if (selected) {
                          cls = 'border-skywash bg-skywash/20 text-white';
                        }
                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => selectAnswer(q.id, optIdx)}
                            disabled={submitted}
                            className={`flex min-h-[44px] items-center gap-3 rounded-sm border px-4 py-3 text-left text-sm transition-all duration-200 ${cls}`}
                            aria-pressed={selected}
                          >
                            <span
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] ${
                                selected
                                  ? 'border-white bg-white text-ink'
                                  : 'border-white/30 text-transparent'
                              }`}
                              aria-hidden="true"
                            >
                              ✓
                            </span>
                            <span className="font-medium">{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                    {submitted && (
                      <p className="mt-3 text-sm leading-relaxed text-white/70">
                        <span className="font-semibold text-skywash">Why: </span>
                        {q.explanation}
                      </p>
                    )}
                  </li>
                );
              })}
            </ol>

            <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-white/15 pt-6">
              {!submitted ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!allAnswered}
                  className={`inline-flex min-h-[52px] items-center justify-center gap-2 px-7 text-sm font-medium transition-all duration-200 ${
                    allAnswered
                      ? 'bg-skywash text-ink hover:-translate-y-0.5 focus-invert'
                      : 'cursor-not-allowed bg-white/10 text-white/50'
                  }`}
                >
                  <Trophy className="h-4 w-4" aria-hidden="true" />
                  See my results
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleRestart}
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 bg-skywash px-7 text-sm font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 focus-invert"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  New questions
                </button>
              )}
              <button
                type="button"
                onClick={handleNewTopic}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 border border-white/25 px-7 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white focus-invert"
              >
                Choose a different topic
              </button>
              {!allAnswered && !submitted && (
                <p className="text-sm text-white/60">
                  Answer all {questions.length} questions to see your results.
                </p>
              )}
            </div>

            {submitted && encouragement && (
              <aside
                className="mt-8 animate-fadeIn border border-skywash/40 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 sm:p-10"
                aria-live="polite"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-skywash/20 text-skywash">
                    <Award className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-skywash">
                      You scored {score} / {questions.length}
                    </p>
                    <h4 className="mt-2 font-serif text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                      {encouragement.heading}
                    </h4>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                      {encouragement.body}
                    </p>
                  </div>
                </div>
              </aside>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
