import { Router, Routes, Route } from './lib/router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ReportDetail } from './pages/ReportDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen glory-page-bg text-[color:var(--glory-text-muted)]">
        <Header />
        <main className="pt-16 md:pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report/:slug" element={<ReportDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
