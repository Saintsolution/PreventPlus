import { PhoneCall } from 'lucide-react';

// Simplificamos as props: o Header agora só precisa saber que existe uma ação de CTA (se precisar)
export function Header({ onCTAClick }: { onCTAClick: () => void }) {
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

        {/* BOTÃO LIGUE AGORA - Agora é um link direto para discagem */}
        <a 
          href="tel:+5521964791774"
          className="bg-[#D4AF37] text-[#0A2540] px-6 py-3 md:px-10 md:py-4 rounded-xl md:rounded-2xl font-black uppercase text-[11px] tracking-[1px] md:tracking-[2px] hover:bg-white hover:scale-105 transition-all flex items-center justify-center gap-2 md:gap-3 shadow-lg shadow-[#D4AF37]/20 active:scale-95 w-full md:w-auto"
        >
          <PhoneCall className="w-4 h-4 md:w-5 md:h-5" /> 
          <span className="whitespace-nowrap">Ligue Agora</span>
        </a>
      </div>
    </header>
  );
}