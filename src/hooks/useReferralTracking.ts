import { useEffect, useState } from 'react';

const REFERRAL_KEY = 'preventplus_ref_id';

export function useReferralTracking() {
  const [refId, setRefId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlRefId = params.get('ref');

    if (urlRefId) {
      // Formata com zeros (ex: 1 vira 0001)
      const formattedRefId = urlRefId.padStart(4, '0');
      localStorage.setItem(REFERRAL_KEY, formattedRefId);
      setRefId(formattedRefId);
      
      // Dispara o rastro da visita
      trackVisit(formattedRefId);
    } else {
      const storedRefId = localStorage.getItem(REFERRAL_KEY);
      if (storedRefId) {
        setRefId(storedRefId);
      }
    }
  }, []);

  // FUNÇÃO DE RASTREIO VIA WEBHOOK (N8N)
  const trackVisit = async (id: string) => {
    try {
      const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;
      
      if (webhookUrl) {
        fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'visit',
            ref_id: id,
            timestamp: new Date().toISOString(),
            user_agent: navigator.userAgent,
          }),
        }).catch(() => console.log("n8n offline, mas visita registrada localmente."));
      }
    } catch (error) {
      console.error('Error tracking visit:', error);
    }
  };

  const getRefId = () => {
    return refId || localStorage.getItem(REFERRAL_KEY);
  };

  return { 
    refId: getRefId(), 
    trackVisit 
  };
}