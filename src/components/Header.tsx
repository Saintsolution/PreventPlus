import { PhoneCall } from 'lucide-react';

// Adicionamos refId nas props para capturar a referência (001, 002, etc)
export function Header({ onCTAClick, refId }: { onCTAClick: () => void; refId: string | null }) {
  
  // Função que envia o e-mail silencioso e depois disca
  const handleCallTracking = async () => {
    try {
      fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nome: "⚠️ CLIQUE NO HEADER", 
          email: "ligacao-direta@sistema.com", 
          whatsapp: "Botão Superior (Ligue Agora)",
          idades: "N/A",
          refId: refId || "Direto" 
        }),
      });
    } catch (e) {
      // Falha silenciosa para não atrapalhar a ligação
    }

    // Abre o discador do celular
    window.location.href = "tel:+5521964791774";
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0A2540] border-b border-white/5 shadow-xl">
      <div className="container mx-auto px-4 py-4 md:py-0 md:h-40 flex flex-col md:flex-row justify-between items-center gap-4 transition-all">
        
        {/* LOGO - Design original 100% mantido */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-12">
          <img 
            src="/prevent-banner.png" 
            alt="Logo Prevent Senior" 
            className="h-16 md:h-24 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
          
          <div className="flex flex-col md:border-l md:border-white/10 md:pl-10 md:py-4 items-center md:items-start">
            <span className="text-[9px] md:text-[11px] font-black uppercase text-white/30 italic leading-tight tracking-[2px] md:tracking-[4px]">
              Parceria PreventPlus
            </span>
          </div>
        </div>

        {/* BOTÃO LIGUE AGORA - Agora com rastreamento de referência */}
        <button 
          onClick={handleCallTracking}
          className="bg-[#D4AF37] text-[#0A2540] px-6 py-3 md:px-10 md:py-4 rounded-xl md:rounded-2xl font-black uppercase text-[11px] tracking-[1px] md:tracking-[2px] hover:bg-white hover:scale-105 transition-all flex items-center justify-center gap-2 md:gap-3 shadow-lg shadow-[#D4AF37]/20 active:scale-95 w-full md:w-auto"
        >
          <PhoneCall className="w-4 h-4 md:w-5 md:h-5" /> 
          <span className="whitespace-nowrap">Ligue Agora</span>
        </button>
      </div>
    </header>
  );
}