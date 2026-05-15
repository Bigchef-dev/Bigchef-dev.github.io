import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './hooks/useLanguage.tsx';
import { Header } from './components/Header';
import { Background } from './components/Background';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';
import './styles/globals.css';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="relative min-h-screen bg-white">
          <Background />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
