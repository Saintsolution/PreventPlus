import { Send } from 'lucide-react';

// Aceita a prop onCTAClick para abrir o modal de lead
export function Header({ onCTAClick }: { onCTAClick: () => void }) {
  return (
    <header className="sticky top-0 z-50 bg-[#0A2540] border-b border-white/5 shadow-xl">
      {/* h-16 no mobile (mais slim) e h-28 no desktop (mais imponente) */}
      <div className="container mx-auto px-4 h-16 md:h-28 flex justify-between items-center gap-2">
        
        {/* Lado Esquerdo: Logo Prevent */}
        <div className="flex items-center gap-4 md:gap-8 flex-shrink-0">
          <img 
            src="/prevent-banner.png" 
            alt="Logo Prevent Senior" 
            /* h-9 no celular (discreta) e h-16 no desktop (Aumentada para destaque) */
            className="h-9 md:h-16 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
          
          <div className="hidden lg:flex flex-col border-l border-white/10 pl-8 py-2">
            <span className="text-[11px] font-black uppercase text-white/20 italic leading-tight tracking-[4px]">
              Parceria PreventPlus
            </span>
          </div>
        </div>

        {/* Botão de Cotação: Agora bem mais "slim" no mobile */}
        <button 
          onClick={onCTAClick}
          className="
            bg-[#D4AF37] text-[#0A2540] 
            /* Padding: Bem reduzido no mobile (px-3 py-2) | Generoso no desktop */
            px-3 py-2 md:px-10 md:py-4 
            /* Arredondamento menor no mobile para combinar com o botão menor */
            rounded-lg md:rounded-2xl 
            font-black uppercase 
            /* Fonte: 8px no celular (mínimo legível) | 11px no desktop */
            text-[8px] md:text-[11px] 
            /* Espaçamento de letra */
            tracking-[0.5px] md:tracking-[2px] 
            hover:bg-white hover:scale-105 transition-all 
            flex items-center gap-1.5 md:gap-3 
            shadow-lg shadow-[#D4AF37]/10 active:scale-95
            flex-shrink-0
          "
        >
          <Send className="w-2.5 h-2.5 md:w-4 md:h-4" /> 
          <span className="whitespace-nowrap">Fale com um consultor</span>
        </button>
      </div>
    </header>
  );
}