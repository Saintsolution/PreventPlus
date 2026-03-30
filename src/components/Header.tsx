import { Send } from 'lucide-react';

export function Header({ onCTAClick }: { onCTAClick: () => void }) {
  return (
    <header className="sticky top-0 z-50 bg-[#0A2540] border-b border-white/5 shadow-xl">
      <div className="container mx-auto px-4 h-16 md:h-28 flex justify-between items-center gap-2">
        
        <div className="flex items-center gap-4 md:gap-8 flex-shrink-0">
          <img 
            src="/prevent-banner.png" 
            alt="Logo Prevent Senior" 
            className="h-9 md:h-16 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
          
          <div className="hidden lg:flex flex-col border-l border-white/10 pl-8 py-2">
            <span className="text-[11px] font-black uppercase text-white/20 italic leading-tight tracking-[4px]">
              Parceria PreventPlus
            </span>
          </div>
        </div>

        <button 
          onClick={onCTAClick}
          className="bg-[#D4AF37] text-[#0A2540] px-3 py-2 md:px-10 md:py-4 rounded-lg md:rounded-2xl font-black uppercase text-[8px] md:text-[11px] tracking-[0.5px] md:tracking-[2px] hover:bg-white hover:scale-105 transition-all flex items-center gap-1.5 md:gap-3 shadow-lg shadow-[#D4AF37]/10 active:scale-95 flex-shrink-0"
        >
          <Send className="w-2.5 h-2.5 md:w-4 md:h-4" /> 
          <span className="whitespace-nowrap">Faça o seu Cadastro</span>
        </button>
      </div>
    </header>
  );
}