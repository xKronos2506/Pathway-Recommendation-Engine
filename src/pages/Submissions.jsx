import { useSubmissions }   from '../hooks/useSubmissions';
import SubmissionsTable     from '../components/SubmissionsTable';
import { RefreshCw, Users } from 'lucide-react';

export default function Submissions() {
  const { submissions, loading, error, refetch } = useSubmissions();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900">
            Submissions
          </h1>
          <p className="text-slate-500 mt-1 flex items-center gap-2">
            <Users className="h-4 w-4" />
            {loading ? '—' : `${submissions.length} total assessments`}
          </p>
        </div>
        <button onClick={refetch} disabled={loading}
                className="btn-secondary flex items-center gap-2 text-sm py-2 px-4">
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <SubmissionsTable
        submissions={submissions}
        loading={loading}
        error={error}
        onRefetch={refetch}
      />
    </div>
  );
}
