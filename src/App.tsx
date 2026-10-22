import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MathQuiz from '@/components/MathQuiz';
import SleepBasics from '@/components/SleepBasics';
import SleepSelfCheck from '@/components/SleepSelfCheck';
import StudyCorner from '@/components/StudyCorner';
import Ticker from '@/components/Ticker';
import { useRevealContainer } from '@/hooks/useReveal';

export default function App() {
  const mainRef = useRevealContainer<HTMLDivElement>();
  const scrollToBasics = () => {
    const el = document.getElementById('sleep-basics');
    if (!el) return;
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    el.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <div id="top" ref={mainRef} className="min-h-screen bg-pale">
      <AnnouncementBar />
      <Header />
      <main>
        <Hero onStartBasics={scrollToBasics} />
        <Ticker />
        <SleepBasics />
        <SleepSelfCheck />
        <StudyCorner />
        <MathQuiz />
      </main>
    </div>
  );
}
