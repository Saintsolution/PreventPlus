import { Send } from 'lucide-react';

// Aceita a prop onCTAClick para abrir o modal de lead
export function Header({ onCTAClick }: { onCTAClick: () => void }) {
  return (
    <header className="sticky top-0 z-50 bg-[#0A2540] border-b border-white/5 shadow-xl">
      <div className="container mx-auto px-4 h-24 flex justify-between items-center">
        
        {/* Lado Esquerdo: Logo Prevent + Texto de Parceria */}
        <div className="flex items-center gap-6">
          <img 
            src="/prevent-banner.png" 
            alt="Logo Prevent Senior" 
            className="h-14 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
          
          <div className="hidden lg:flex flex-col border-l border-white/10 pl-6 py-1">
            <span className="text-[10px] font-black uppercase text-white/20 italic leading-tight tracking-[3px]">
              Parceria PreventPlus
            </span>
          </div>
        </div>

        {/* Botão de Cotação Único */}
        <button 
          onClick={onCTAClick}
          className="bg-[#D4AF37] text-[#0A2540] px-10 py-4 rounded-2xl font-black uppercase text-[11px] tracking-[2px] hover:bg-white hover:scale-105 transition-all flex items-center gap-3 shadow-lg shadow-[#D4AF37]/10 active:scale-95"
        >
          <Send className="w-4 h-4" /> Fale com um consultor
        </button>
      </div>
    </header>
  );
}