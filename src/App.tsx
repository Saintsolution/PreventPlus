import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Differentials } from './components/Differentials';
import { Network } from './components/Network';
import { Pricing } from './components/Pricing';
import { LeadForm } from './components/LeadForm';
import { Footer } from './components/Footer';
import { Admin } from './pages/Admin';
import { useReferralTracking } from './hooks/useReferralTracking';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  
  // 1. PUXANDO O REF_ID DO SEU HOOK (O MOTOR DE RASTREIO)
  const { refId } = useReferralTracking();

  useEffect(() => {
    const checkRoute = () => {
      setIsAdminRoute(window.location.pathname === '/admin');
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);

    return () => window.removeEventListener('popstate', checkRoute);
  }, []);

  if (isAdminRoute) {
    return <Admin />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 2. PASSANDO A FUNÇÃO DE ABRIR O FORMULÁRIO */}
      <Hero onCTAClick={() => setIsFormOpen(true)} />
      
      <Differentials />
      
      <Network />
      
      {/* 3. A TABELA DE PREÇOS QUE VOCÊ JÁ DINAMIZOU */}
      <Pricing onCTAClick={() => setIsFormOpen(true)} />
      
      <Footer />

      {/* 4. O FORMULÁRIO DE LEAD COM O REF_ID CORRIGIDO */}
      <LeadForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        refId={refId || null} 
      />
    </div>
  );
}

export default App;

