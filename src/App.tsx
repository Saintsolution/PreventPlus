import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

// Importações com CHAVES {} porque seus arquivos usam "export function"
import { Header } from './components/Header'; 
import { Hero } from './components/Hero';
import { Network } from './components/Network';
import { Differentials } from './components/Differentials';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';
import { LeadModal } from './components/LeadModal'; 
import { Admin } from './pages/Admin';

function HomePageContent() {
  const { id } = useParams(); 
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEmailMode, setIsEmailMode] = useState(false);

  useEffect(() => {
    if (id) {
      window.localStorage.setItem('referral_id', id);
    }
  }, [id]);

  const handleOpenCadastro = () => {
    setIsEmailMode(true);
    setIsFormOpen(true);
  };

  const handleOpenWhatsApp = () => {
    setIsEmailMode(false);
    setIsFormOpen(true);
  };

  const finalRefId = id || window.localStorage.getItem('referral_id') || 'DIRETO';

  return (
    <div className="min-h-screen bg-white">
      <Header onCTAClick={handleOpenCadastro} />
      <Hero onCTAClick={handleOpenWhatsApp} />
      <Network />
      <div id="unidade-havai">
        <Differentials onCTAClick={handleOpenWhatsApp} />
      </div>
      <Pricing onCTAClick={handleOpenWhatsApp} />
      <Footer onCTAClick={handleOpenWhatsApp} />
      
      <LeadModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        refId={finalRefId}
        isEmailMode={isEmailMode} 
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<HomePageContent />} />
        <Route path="/:id" element={<HomePageContent />} />
        <Route path="*" element={<HomePageContent />} />
      </Routes>
    </BrowserRouter>
  );
}