import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

// Importações mantidas exatamente como você usa
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

  // Função para abrir o Modal no modo E-MAIL (Resend)
  const handleOpenEmail = () => {
    setIsEmailMode(true);
    setIsFormOpen(true);
  };

  // Função para abrir o Modal no modo WHATSAPP / LIGAÇÃO (Direto)
  const handleOpenDirect = () => {
    setIsEmailMode(false);
    setIsFormOpen(true);
  };

  const finalRefId = id || window.localStorage.getItem('referral_id') || 'DIRETO';

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER: Passando o refId para o rastreio da ligação direta */}
      <Header 
        onCTAClick={handleOpenEmail} 
        onPhoneClick={handleOpenDirect} 
        refId={finalRefId} 
      />
      
      {/* HERO: Também recebe o refId caso precise rastrear cliques diretos */}
      <Hero 
        onCTAClick={handleOpenEmail} 
        onPhoneClick={handleOpenDirect} 
        refId={finalRefId} 
      />
      
      <Network />
      
      <div id="unidade-havai">
        {/* DIFFERENTIALS: Configurado para o botão de WhatsApp */}
        <Differentials onPhoneClick={handleOpenDirect} />
      </div>
      
      {/* PRICING: Botão inferior configurado para WhatsApp */}
      <Pricing onPhoneClick={handleOpenDirect} />
      
      {/* FOOTER: Agora simplificado apenas com Política de Privacidade internamente */}
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
        <Route path="/" element={<HomePageContent />} />
        <Route path="/:id" element={<HomePageContent />} />
        <Route path="*" element={<HomePageContent />} />
      </Routes>
    </BrowserRouter>
  );
}