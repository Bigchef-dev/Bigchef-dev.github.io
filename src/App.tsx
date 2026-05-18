import { LanguageProvider } from './hooks/useLanguage';
import { Header } from './components/Header';
import { Background } from './components/Background';
import { Contact } from './pages/Contact';
import { Timeline } from './components/Timeline';
import { Projects } from './pages/Projects';
import './styles/globals.css';

function App() {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-white">
        <Background />
        <Header />
        <main>
          <Contact />
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          <Timeline />
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          <Projects />
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </main>
      </div>
    </LanguageProvider>
  );
}

export default App;
