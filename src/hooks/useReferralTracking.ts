import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const REFERRAL_KEY = 'preventplus_ref_id';

export function useReferralTracking() {
  const [refId, setRefId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlRefId = params.get('ref');

    if (urlRefId) {
      const formattedRefId = urlRefId.padStart(4, '0');
      localStorage.setItem(REFERRAL_KEY, formattedRefId);
      setRefId(formattedRefId);

      trackVisit(formattedRefId);
    } else {
      const storedRefId = localStorage.getItem(REFERRAL_KEY);
      if (storedRefId) {
        setRefId(storedRefId);
      }
    }
  }, []);

  const trackVisit = async (refId: string) => {
    try {
      await supabase.from('visitas').insert({
        ref_id: refId,
        user_agent: navigator.userAgent,
      });

      const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;
      if (webhookUrl) {
        fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'visit',
            ref_id: refId,
            timestamp: new Date().toISOString(),
            user_agent: navigator.userAgent,
          }),
        }).catch(() => {});
      }
    } catch (error) {
      console.error('Error tracking visit:', error);
    }
  };

  const getRefId = () => {
    return refId || localStorage.getItem(REFERRAL_KEY);
  };

  return { refId: getRefId(), trackVisit };
}
