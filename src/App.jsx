import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout      from './components/Layout';
import Home        from './pages/Home';
import Recommend   from './pages/Recommend';
import Submissions from './pages/Submissions';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { borderRadius: '12px', fontSize: '14px' },
          success: { iconTheme: { primary: '#4f6ef7', secondary: '#fff' } },
        }}
      />
      <Layout>
        <Routes>
          <Route path="/"            element={<Home />}        />
          <Route path="/recommend"   element={<Recommend />}   />
          <Route path="/submissions" element={<Submissions />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
