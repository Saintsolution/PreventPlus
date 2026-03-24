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
    <>
      <div className="min-h-screen bg-white">
        <Hero onCTAClick={() => setIsFormOpen(true)} />
        <Differentials />
        <Network />
        <Pricing onCTAClick={() => setIsFormOpen(true)} />
        <Footer />
      </div>

      <LeadForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        refId={refId}
      />
    </>
  );
}

export default App;
