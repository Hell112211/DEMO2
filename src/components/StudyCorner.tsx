import { useEffect, useState } from 'react';
import { BookOpen, Lightbulb, X } from 'lucide-react';
import { TOPICS } from '@/data/topics';

type View = 'lessons' | 'examples';

export default function StudyCorner() {
  const [view, setView] = useState<View | null>(null);
  const [activeTopicId, setActiveTopicId] = useState<string>(TOPICS[0].id);
  const [open, setOpen] = useState(false);

  const openView = (next: View) => {
    setView(next);
    setOpen(true);
  };

  const closeView = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeView();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const activeTopic = TOPICS.find((t) => t.id === activeTopicId) ?? TOPICS[0];

  return (
    <>
      {/* Navy intro section */}
      <section
        id="study-corner"
        aria-labelledby="study-corner-heading"
        className="bg-navynight text-white"
      >
        <div className="container-editorial py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <p className="reveal eyebrow text-skywash">06 / Keep growing</p>
            <h3
              id="study-corner-heading"
              className="reveal mt-6 font-serif text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-white"
              style={{ ['--reveal-delay' as string]: '100ms' }}
            >
              A Little <em className="italic text-skywash">Rest</em>, a Little
              Learning
            </h3>
            <p
              className="reveal mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
              style={{ ['--reveal-delay' as string]: '200ms' }}
            >
              Rest helps you recharge, and learning keeps your mind growing.
              Welcome to the Study Corner, where you can explore
              easy-to-understand math lessons, learn through step-by-step
              examples, and challenge yourself with interactive quizzes. Take
              your time, discover new concepts, and enjoy learning at your own
              pace.
            </p>
          </div>
        </div>
      </section>

      {/* Challenge section + two cards */}
      <section
        aria-labelledby="challenge-heading"
        className="bg-pale"
      >
        <div className="container-editorial py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <p className="reveal eyebrow text-ink/60">07 / Study corner</p>
            <h3
              id="challenge-heading"
              className="reveal mt-6 font-serif text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.1] tracking-tight"
              style={{ ['--reveal-delay' as string]: '100ms' }}
            >
              <span className="text-ink">Ready to Challenge </span>
              <span className="text-electric">Your Mind</span>
              <span className="text-ink">?</span>
            </h3>
            <p
              className="reveal mt-4 max-w-2xl text-base leading-relaxed text-ink/70 sm:text-lg"
              style={{ ['--reveal-delay' as string]: '200ms' }}
            >
              Explore our learning resources and interactive activities designed
              to make mathematics easier to understand and more enjoyable to
              learn.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            <article
              className="reveal flex h-full flex-col bg-ink p-8 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/30 sm:p-10"
              style={{ ['--reveal-delay' as string]: '300ms' }}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-electric/20 text-skywash">
                <BookOpen className="h-6 w-6" aria-hidden="true" />
              </span>
              <h4 className="mt-6 font-serif text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Math Lessons
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
                Explore mathematical topics and learn the basics.
              </p>
              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => openView('lessons')}
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 bg-white px-7 text-sm font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-skywash/90 focus-invert"
                >
                  Explore Lessons
                </button>
              </div>
            </article>

            <article
              className="reveal flex h-full flex-col bg-ink p-8 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/30 sm:p-10"
              style={{ ['--reveal-delay' as string]: '400ms' }}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-electric/20 text-skywash">
                <Lightbulb className="h-6 w-6" aria-hidden="true" />
              </span>
              <h4 className="mt-6 font-serif text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Learn Through Examples
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
                Understand how to solve problems step by step.
              </p>
              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => openView('examples')}
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 bg-white px-7 text-sm font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-skywash/90 focus-invert"
                >
                  View Examples
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Drawer */}
      {open && view && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-heading"
        >
          <button
            type="button"
            aria-label="Close panel"
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            onClick={closeView}
          />
          <div className="relative ml-auto flex h-full w-full max-w-xl flex-col bg-pale shadow-2xl">
            <div className="flex items-center justify-between border-b border-ink/10 bg-white px-6 py-5">
              <div>
                <p className="eyebrow text-ink/60">
                  {view === 'lessons' ? 'Study corner' : 'Step-by-step'}
                </p>
                <h4
                  id="drawer-heading"
                  className="mt-1 font-serif text-xl font-semibold tracking-tight text-ink sm:text-2xl"
                >
                  {view === 'lessons' ? 'Math Lessons' : 'Learn Through Examples'}
                </h4>
              </div>
              <button
                type="button"
                onClick={closeView}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm border border-ink/15 bg-white text-ink transition-colors hover:border-ink/40 focus-invert"
                aria-label="Close"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="border-b border-ink/10 bg-white px-6 py-4">
              <div className="flex flex-wrap gap-2">
                {TOPICS.map((topic) => {
                  const active = topic.id === activeTopicId;
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => setActiveTopicId(topic.id)}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        active
                          ? 'border-electric bg-electric text-white'
                          : 'border-ink/15 bg-pale text-ink hover:border-electric/40 hover:bg-white'
                      }`}
                      aria-pressed={active}
                    >
                      <topic.icon className="h-4 w-4" aria-hidden="true" />
                      {topic.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8">
              {view === 'lessons' ? (
                <article>
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-electric/10 text-electric">
                      <activeTopic.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h5 className="font-serif text-2xl font-semibold tracking-tight text-ink">
                      {activeTopic.name}
                    </h5>
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-ink/80">
                    {activeTopic.lesson.intro}
                  </p>
                  <div className="mt-8 space-y-6">
                    {activeTopic.lesson.sections.map((section) => (
                      <div
                        key={section.heading}
                        className="border border-ink/10 bg-white p-6"
                      >
                        <h6 className="font-serif text-lg font-semibold tracking-tight text-ink">
                          {section.heading}
                        </h6>
                        <p className="mt-2 text-sm leading-relaxed text-ink/70">
                          {section.body}
                        </p>
                      </div>
                    ))}
                  </div>
                  <aside className="mt-8 border-l-4 border-electric bg-electric/10 p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-electric">
                      Key idea
                    </p>
                    <p className="mt-2 text-base leading-relaxed text-ink/80">
                      {activeTopic.lesson.keyIdea}
                    </p>
                  </aside>
                </article>
              ) : (
                <article>
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-electric/10 text-electric">
                      <activeTopic.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h5 className="font-serif text-2xl font-semibold tracking-tight text-ink">
                      {activeTopic.name} — Examples
                    </h5>
                  </div>
                  <div className="mt-8 space-y-6">
                    {activeTopic.examples.map((ex, i) => (
                      <div
                        key={i}
                        className="border border-ink/10 bg-white p-6"
                      >
                        <p className="font-serif text-lg font-semibold tracking-tight text-ink">
                          {ex.problem}
                        </p>
                        <ol className="mt-4 space-y-2">
                          {ex.steps.map((step, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 text-sm leading-relaxed text-ink/80"
                            >
                              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-electric/10 font-mono text-xs font-semibold text-electric">
                                {idx + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                        <p className="mt-4 border-t border-ink/10 pt-3 text-sm font-semibold text-ink">
                          Answer: <span className="text-electric">{ex.answer}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </article>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
