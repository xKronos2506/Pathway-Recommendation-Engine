import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const { pathname } = useLocation();

  const linkCls = (path) =>
    `flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-colors
     ${pathname === path
       ? 'bg-brand-100 text-brand-700'
       : 'text-slate-600 hover:text-brand-700 hover:bg-slate-100'}`;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-brand-600 flex items-center justify-center">
            <GraduationCap className="h-4 w-4 text-white" />
          </div>
          <span className="font-display font-bold text-slate-900 text-lg">
            Acdy<span className="text-brand-600">On</span>
          </span>
        </Link>
        <div className="flex items-center gap-1">
          <Link to="/recommend" className={linkCls('/recommend')}>
            <GraduationCap className="h-4 w-4" /> Get Pathway
          </Link>
          <Link to="/submissions" className={linkCls('/submissions')}>
            <LayoutDashboard className="h-4 w-4" /> Submissions
          </Link>
        </div>
      </div>
    </nav>
  );
}
