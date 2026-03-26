import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Seus Componentes
import { Hero } from './components/Hero';
import { Differentials } from './components/Differentials';
import { Network } from './components/Network';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';
import { LeadForm } from './components/LeadForm';
import { Admin } from './pages/Admin';

// Seu Hook de Rastreio
import { useReferralTracking } from './hooks/useReferralTracking';

// Componente para a Home (Organiza tudo o que não é Admin)
function HomePage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { refId } = useReferralTracking();

  return (
    <div className="min-h-screen bg-white">
      <Hero onCTAClick={() => setIsFormOpen(true)} />
      <Differentials />
      <Network />
      <Pricing onCTAClick={() => setIsFormOpen(true)} />
      <Footer />
      
      <LeadForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        refId={refId || null} 
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Principal (Home) */}
        <Route path="/" element={<HomePage />} />
        
        {/* Rota do Painel (Admin) */}
        <Route path="/admin" element={<Admin />} />
        
        {/* Rota de "Escape" (Se digitar qualquer coisa errada, volta pra Home) */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;