export default function LoadingSpinner({ size = 'md', label = 'Loading…' }) {
  const sizes = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' };
  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`${sizes[size]} animate-spin rounded-full
                       border-4 border-brand-100 border-t-brand-600`} />
      {label && <p className="text-sm text-slate-500">{label}</p>}
    </div>
  );
}
