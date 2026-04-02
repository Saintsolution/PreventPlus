import { Send } from 'lucide-react';

export function Header({ onCTAClick }: { onCTAClick: () => void }) {
  return (
    <header className="sticky top-0 z-50 bg-[#0A2540] border-b border-white/5 shadow-xl">
      {/* Aumentamos h-16 para h-24 no mobile e h-28 para h-40 no desktop */}
      <div className="container mx-auto px-4 h-24 md:h-40 flex justify-between items-center gap-2 transition-all">
        
        <div className="flex items-center gap-4 md:gap-12 flex-shrink-0">
          <img 
            src="/prevent-banner.png" 
            alt="Logo Prevent Senior" 
            /* Aumentamos a logo: h-9 para h-14 no mobile e h-16 para h-24 no desktop */
            className="h-14 md:h-24 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
          
          {/* Divisor lateral ajustado para acompanhar a altura maior */}
          <div className="hidden lg:flex flex-col border-l border-white/10 pl-10 py-4">
            <span className="text-[11px] font-black uppercase text-white/20 italic leading-tight tracking-[4px]">
              Parceria PreventPlus
            </span>
          </div>
        </div>

        <button 
          onClick={onCTAClick}
          className="bg-[#D4AF37] text-[#0A2540] px-4 py-3 md:px-10 md:py-4 rounded-lg md:rounded-2xl font-black uppercase text-[10px] md:text-[11px] tracking-[0.5px] md:tracking-[2px] hover:bg-white hover:scale-105 transition-all flex items-center gap-2 md:gap-3 shadow-lg shadow-[#D4AF37]/10 active:scale-95 flex-shrink-0"
        >
          <Send className="w-3 h-3 md:w-4 md:h-4" /> 
          <span className="whitespace-nowrap">Faça o seu Cadastro</span>
        </button>
      </div>
    </header>
  );
}