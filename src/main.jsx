import React    from 'react';
import ReactDOM from 'react-dom/client';
import App      from './App';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ fontFamily: 'sans-serif', padding: '40px', maxWidth: '600px', margin: '80px auto', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <h2 style={{ color: '#1e293b', marginBottom: '8px' }}>Something went wrong</h2>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>
            {this.state.error.message || 'An unexpected error occurred.'}
          </p>
          <p style={{ fontSize: '13px', color: '#94a3b8' }}>
            Check that your <code>.env.local</code> file exists with valid Supabase keys.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: '24px', padding: '10px 24px', background: '#3b5bf0', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '14px' }}
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
