import { Award, BookOpen, FlaskConical, Star } from 'lucide-react';

const CONFIG = {
  'Certification Program': {
    icon:  BookOpen,
    color: 'from-emerald-500 to-teal-600',
    bg:    'bg-emerald-50',
    badge: 'bg-emerald-100 text-emerald-800',
    label: 'Fast-Track Certification',
  },
  'DBA': {
    icon:  Award,
    color: 'from-brand-500 to-violet-600',
    bg:    'bg-brand-50',
    badge: 'bg-brand-100 text-brand-800',
    label: 'Doctor of Business Administration',
  },
  'PhD': {
    icon:  FlaskConical,
    color: 'from-purple-500 to-pink-600',
    bg:    'bg-purple-50',
    badge: 'bg-purple-100 text-purple-800',
    label: 'Doctor of Philosophy',
  },
  'Honorary Doctorate': {
    icon:  Star,
    color: 'from-amber-500 to-orange-600',
    bg:    'bg-amber-50',
    badge: 'bg-amber-100 text-amber-800',
    label: 'Honorary Doctorate',
  },
};

export default function RecommendationCard({ result, profile, onReset }) {
  const cfg = CONFIG[result.pathwayType] || CONFIG['Certification Program'];
  const Icon = cfg.icon;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero gradient card */}
      <div className={`rounded-2xl bg-gradient-to-br ${cfg.color} p-8 text-white`}>
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
            <Icon className="h-7 w-7 text-white" />
          </div>
          <div>
            <span className="text-white/70 text-sm font-medium uppercase tracking-widest">
              Your Recommended Pathway
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mt-1">
              {result.pathwayType}
            </h2>
            <p className="text-white/80 text-sm mt-0.5">{cfg.label}</p>
          </div>
        </div>
      </div>

      {/* Reasoning */}
      <div className={`card ${cfg.bg} border-0`}>
        <h3 className="font-semibold text-slate-700 mb-2">Why this pathway?</h3>
        <p className="text-slate-600 leading-relaxed">{result.reasoning}</p>
      </div>

      {/* Profile summary */}
      <div className="card">
        <h3 className="font-semibold text-slate-700 mb-4">Profile Summary</h3>
        <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          {[
            ['Name',          profile.fullName],
            ['Qualification', profile.qualification],
            ['Experience',    `${profile.experience} years`],
            ['Profession',    profile.profession],
            ['Goal',          profile.careerGoal],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-xs font-medium text-slate-400 uppercase tracking-wide">{k}</dt>
              <dd className="text-slate-700 font-medium mt-0.5 truncate">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <button onClick={onReset} className="btn-secondary w-full">
        ← Start a New Assessment
      </button>
    </div>
  );
}
