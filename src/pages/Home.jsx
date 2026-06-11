import { Link } from 'react-router-dom';
import { GraduationCap, Zap, Database, Shield } from 'lucide-react';

const FEATURES = [
  { icon: GraduationCap, title: 'AI-Powered Matching',  desc: 'Claude AI analyses your background and goals to recommend the ideal academic pathway.'         },
  { icon: Zap,           title: 'Instant Results',       desc: 'Get your personalised recommendation in seconds, with clear reasoning and next steps.'         },
  { icon: Database,      title: 'Stored Securely',       desc: 'Every assessment is stored in real-time and accessible in the admin dashboard.'                },
  { icon: Shield,        title: 'Rules-Based Fallback',  desc: 'Even without AI, our expert logic matrix ensures you always get a reliable recommendation.'    },
];

const PATHWAYS = [
  { name: 'Certification',      emoji: '📜', desc: 'Fast-track specialist skills'     },
  { name: 'DBA',                emoji: '💼', desc: 'Executive doctorate in business'  },
  { name: 'PhD',                emoji: '🔬', desc: 'Research & academic leadership'   },
  { name: 'Honorary Doctorate', emoji: '🏅', desc: 'Recognising professional legacy'  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-700 to-violet-700 text-white">
        <div className="absolute inset-0 opacity-10"
             style={{
               backgroundImage: 'radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
               backgroundSize: '60px 60px'
             }} />
        <div className="relative max-w-4xl mx-auto px-6 py-24 sm:py-32 text-center">
          <span className="inline-block bg-white/15 backdrop-blur text-white/90 text-xs font-semibold
                           uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            AcdyOn Academic Engine
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold leading-tight mb-6">
            Discover Your<br />
            <span className="text-amber-300">Academic Pathway</span>
          </h1>
          <p className="text-white/75 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
            Enter your profile and receive an AI-generated recommendation for the academic credential
            that best fits your experience, qualifications, and career goals.
          </p>
          <Link to="/recommend" className="inline-block bg-white text-brand-700 font-bold
                                           px-8 py-4 rounded-2xl text-lg hover:bg-amber-50
                                           transition-colors shadow-lg">
            Get My Recommendation →
          </Link>
        </div>
      </section>

      {/* Pathways */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="font-display text-2xl font-bold text-center text-slate-800 mb-8">
          Four Pathways. One Right Fit.
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {PATHWAYS.map(p => (
            <div key={p.name} className="card text-center hover:shadow-md transition-shadow">
              <div className="text-4xl mb-3">{p.emoji}</div>
              <div className="font-semibold text-slate-800 text-sm">{p.name}</div>
              <div className="text-xs text-slate-500 mt-1">{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-100/60 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-2xl font-bold text-center text-slate-800 mb-10">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(f => (
              <div key={f.title} className="card flex flex-col gap-3">
                <div className="h-10 w-10 rounded-xl bg-brand-100 flex items-center justify-center">
                  <f.icon className="h-5 w-5 text-brand-600" />
                </div>
                <h3 className="font-semibold text-slate-800">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h2 className="font-display text-3xl font-bold text-slate-800 mb-4">
          Ready to find your path?
        </h2>
        <p className="text-slate-500 mb-8">Takes less than 2 minutes. No account needed.</p>
        <Link to="/recommend" className="btn-primary inline-block text-base px-10 py-4">
          Start My Assessment
        </Link>
      </section>
    </div>
  );
}
