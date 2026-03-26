import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

// Seus Componentes
import { Header } from './components/Header'; 
import { Hero } from './components/Hero';
import { Differentials } from './components/Differentials';
import { Network } from './components/Network';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';
import { LeadModal } from './components/LeadModal'; 
import { Admin } from './pages/Admin';

// COMPONENTE DA PÁGINA INICIAL (Agora encapsulado para o Router)
function HomePageContent() {
  const { id } = useParams(); 
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (id) {
      window.localStorage.setItem('referral_id', id);
    }
  }, [id]);

  const finalRefId = id || window.localStorage.getItem('referral_id') || 'DIRETO';

  return (
    <div className="min-h-screen bg-white">
      <Header onCTAClick={() => setIsFormOpen(true)} />
      <Hero onCTAClick={() => setIsFormOpen(true)} />
      <Differentials />
      <Network />
      <Pricing onCTAClick={() => setIsFormOpen(true)} />
      <Footer />
      <LeadModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        refId={finalRefId} 
      />
    </div>
  );
}

// O COMPONENTE PRINCIPAL (Onde o Router "manda")
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota do Admin */}
        <Route path="/admin" element={<Admin />} />
        
        {/* Rota da Home (Sem ID) */}
        <Route path="/" element={<HomePageContent />} />
        
        {/* Rota da Home (Com ID do Indicador - ex: /001) */}
        <Route path="/:id" element={<HomePageContent />} />
        
        {/* Rota de Escape */}
        <Route path="*" element={<HomePageContent />} />
      </Routes>
    </BrowserRouter>
  );
}