import { useEffect, useState } from 'react';
import { Menu, X, MoonStar } from 'lucide-react';

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const handleNavClick = () => setOpen(false);

  const navLinkClass =
    'nav-link focus-invert border border-pale/60 px-4 py-2 transition-colors hover:border-white focus-visible:border-white';

  return (
    <header className="bg-ink text-white">
      <div className="container-editorial">
        <div className="flex h-16 items-center justify-between gap-6 md:h-20">
          <a
            href="#top"
            className="focus-invert flex items-center gap-2.5"
            aria-label="Slenora — back to top"
            onClick={handleNavClick}
          >
            <MoonStar className="h-5 w-5 text-skywash" aria-hidden="true" />
            <span className="font-serif text-xl font-semibold tracking-tight md:text-2xl">
              Slenora
            </span>
          </a>

          <a
            href="#sleep-basics"
            className="nav-link hidden md:block"
            onClick={handleNavClick}
          >
            Sleep basics
          </a>

          <a
            href="#study-corner"
            className="nav-link hidden md:block"
            onClick={handleNavClick}
          >
            Study corner
          </a>

          <button
            type="button"
            className="nav-link flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">
              {open ? 'Close navigation menu' : 'Open navigation menu'}
            </span>
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>

        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out md:hidden ${
            open ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pb-5">
            <a
              href="#sleep-basics"
              className={navLinkClass}
              onClick={handleNavClick}
            >
              Sleep basics
            </a>
            <a
              href="#study-corner"
              className={`${navLinkClass} mt-3 inline-flex`}
              onClick={handleNavClick}
            >
              Study corner
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
