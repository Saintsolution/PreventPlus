import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

// Seus Componentes
import { Header } from './components/Header'; 
import { Hero } from './components/Hero';
import { Network } from './components/Network';
import { Differentials } from './components/Differentials';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';
import { LeadModal } from './components/LeadModal'; 
import { Admin } from './pages/Admin';

// COMPONENTE DA PÁGINA INICIAL
function HomePageContent() {
  const { id } = useParams(); 
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    // Se vier algo na URL (ex: /002), a gente salva
    if (id) {
      window.localStorage.setItem('referral_id', id);
      console.log("Indicador capturado pela URL:", id);
    }
  }, [id]);

  // Define qual ID usar: o da URL agora, o que estava salvo, ou 'DIRETO'
  const finalRefId = id || window.localStorage.getItem('referral_id') || 'DIRETO';

  return (
    <div className="min-h-screen bg-white">
      <Header onCTAClick={() => setIsFormOpen(true)} />
      <Hero onCTAClick={() => setIsFormOpen(true)} />
      <Network />
      <div id="unidade-havai">
        <Differentials />
      </div>
      <Pricing onCTAClick={() => setIsFormOpen(true)} />
      
      {/* CORREÇÃO AQUI: Passando a função para o Footer abrir o modal */}
      <Footer onCTAClick={() => setIsFormOpen(true)} />
      
      <LeadModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        refId={finalRefId} 
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota do Admin */}
        <Route path="/admin" element={<Admin />} />
        
        {/* Rota da Home (Pura) */}
        <Route path="/" element={<HomePageContent />} />
        
        {/* Rota da Home com ID (Ex: preventplus.com.br/002) */}
        <Route path="/:id" element={<HomePageContent />} />
        
        {/* Rota de Escape para não dar erro 404 */}
        <Route path="*" element={<HomePageContent />} />
      </Routes>
    </BrowserRouter>
  );
}