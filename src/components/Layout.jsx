import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <footer className="text-center py-6 text-xs text-slate-400 border-t border-slate-100">
        © {new Date().getFullYear()} AcdyOn Academic Pathway Engine — Built with React + Supabase
      </footer>
    </div>
  );
}
