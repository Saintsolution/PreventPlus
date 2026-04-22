import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

// Importações mantidas
import { Header } from './components/Header'; 
import { Hero } from './components/Hero';
import { Network } from './components/Network';
import { Differentials } from './components/Differentials';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';
import { LeadModal } from './components/LeadModal'; 
import { Admin } from './pages/Admin';

// IMPORTAÇÃO DA NOVA PÁGINA
import { Privacy } from './pages/Privacy';

function HomePageContent() {
  const { id } = useParams(); 
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEmailMode, setIsEmailMode] = useState(false);

  useEffect(() => {
    if (id) {
      window.localStorage.setItem('referral_id', id);
    }
  }, [id]);

  const handleOpenEmail = () => {
    setIsEmailMode(true);
    setIsFormOpen(true);
  };

  const handleOpenDirect = () => {
    setIsEmailMode(false);
    setIsFormOpen(true);
  };

  const finalRefId = id || window.localStorage.getItem('referral_id') || 'DIRETO';

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onCTAClick={handleOpenEmail} 
        onPhoneClick={handleOpenDirect} 
        refId={finalRefId} 
      />
      
      <Hero 
        onCTAClick={handleOpenEmail} 
        onPhoneClick={handleOpenDirect} 
        refId={finalRefId} 
      />
      
      <Network />
      
      <div id="unidade-havai">
        <Differentials onPhoneClick={handleOpenDirect} />
      </div>
      
      <Pricing onPhoneClick={handleOpenDirect} />
      
      <Footer onCTAClick={handleOpenEmail} />
      
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
        
        {/* NOVA ROTA DE PRIVACIDADE */}
        <Route path="/privacidade" element={<Privacy />} />

        {/* LÓGICA DE REFERRAL MANTIDA */}
        <Route path="/" element={<HomePageContent />} />
        <Route path="/:id" element={<HomePageContent />} />
        <Route path="*" element={<HomePageContent />} />
      </Routes>
    </BrowserRouter>
  );
}