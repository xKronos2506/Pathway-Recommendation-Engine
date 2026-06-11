const STEPS = ['Your Profile', 'Generating', 'Your Pathway'];

export default function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((label, idx) => {
        const step   = idx + 1;
        const done   = step < current;
        const active = step === current;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div className={`h-9 w-9 rounded-full flex items-center justify-center
                               font-semibold text-sm transition-colors
                               ${done   ? 'bg-green-500 text-white' : ''}
                               ${active ? 'bg-brand-600 text-white ring-4 ring-brand-100' : ''}
                               ${!done && !active ? 'bg-slate-200 text-slate-500' : ''}`}>
                {done ? '✓' : step}
              </div>
              <span className={`text-xs font-medium whitespace-nowrap
                               ${active ? 'text-brand-700' : 'text-slate-400'}`}>
                {label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`h-0.5 w-16 sm:w-24 mb-5 mx-1 transition-colors
                               ${done ? 'bg-green-400' : 'bg-slate-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
