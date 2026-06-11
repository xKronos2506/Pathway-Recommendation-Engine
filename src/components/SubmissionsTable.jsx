import { formatDate } from '../utils/formatDate';
import LoadingSpinner from './LoadingSpinner';
import { AlertCircle } from 'lucide-react';

const BADGE = {
  'Certification Program': 'bg-emerald-100 text-emerald-700',
  'DBA':                   'bg-brand-100 text-brand-700',
  'PhD':                   'bg-purple-100 text-purple-700',
  'Honorary Doctorate':    'bg-amber-100 text-amber-700',
};

export default function SubmissionsTable({ submissions, loading, error, onRefetch }) {
  if (loading) return (
    <div className="py-20 flex justify-center">
      <LoadingSpinner label="Loading submissions…" />
    </div>
  );

  if (error) return (
    <div className="py-20 flex flex-col items-center gap-4 text-slate-500">
      <AlertCircle className="h-8 w-8 text-red-400" />
      <p className="text-sm">Failed to load: {error}</p>
      <button onClick={onRefetch} className="btn-secondary text-sm py-2 px-4">Retry</button>
    </div>
  );

  if (submissions.length === 0) return (
    <div className="py-20 text-center text-slate-400">
      <p className="text-4xl mb-3">📭</p>
      <p className="font-medium">No submissions yet.</p>
      <p className="text-sm mt-1">Be the first to get a pathway recommendation.</p>
    </div>
  );

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-100">
      <table className="min-w-full divide-y divide-slate-100">
        <thead className="bg-slate-50">
          <tr>
            {['Name', 'Email', 'Career Goal', 'Pathway', 'Submitted'].map(h => (
              <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold
                                     text-slate-500 uppercase tracking-wide">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-50">
          {submissions.map(s => (
            <tr key={s.id} className="hover:bg-slate-50/60 transition-colors">
              <td className="px-5 py-4 font-medium text-slate-800 whitespace-nowrap">{s.full_name}</td>
              <td className="px-5 py-4 text-slate-500 text-sm">{s.email}</td>
              <td className="px-5 py-4 text-slate-600 text-sm max-w-xs truncate">{s.career_goal}</td>
              <td className="px-5 py-4">
                <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold
                                  ${BADGE[s.pathway_type] || 'bg-slate-100 text-slate-600'}`}>
                  {s.pathway_type}
                </span>
              </td>
              <td className="px-5 py-4 text-slate-400 text-xs whitespace-nowrap">
                {formatDate(s.created_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
