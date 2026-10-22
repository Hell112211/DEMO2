import { MoonStar } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-ink text-pale">
      <div className="mx-auto flex max-w-[1200px] items-center justify-center px-5 py-2.5 sm:px-8">
        <p className="eyebrow flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center leading-relaxed text-pale/90">
          <MoonStar className="h-3 w-3 shrink-0 text-skywash" aria-hidden="true" />
          <span>Practical sleep guides · no quick fixes · rest at your own pace</span>
        </p>
      </div>
    </div>
  );
}
