import { User, DollarSign, TrendingDown, Shield, MessageCircle } from 'lucide-react';

export function Hero({ onCTAClick }: { onCTAClick: () => void }) {
  const mainDifferentials = [
    { icon: User, title: 'Portabilidade Segura', description: 'Mude para a PREVENT SENIOR mantendo seus direitos. Analisamos sua carência sem perda de cobertura.' },
    { icon: DollarSign, title: 'Segurança Financeira', description: 'Mensalidade sem surpresas após os 50 anos. Zero reajuste por mudança de faixa etária.' },
    { icon: TrendingDown, title: 'Sem Coparticipação', description: 'Use o quanto precisar, sem custos adicionais. Valor fixo mensal sem taxas extras.' },
  ];

  return (
    <section className="relative bg-[#0A2540] pt-10 pb-28 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://images.pexels.com/photos/4269492/pexels-photo-4269492.jpeg?auto=compress&cs=tinysrgb&w=1920" className="w-full h-full object-cover opacity-20" alt="Fundo" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A2540]/40 via-[#0A2540] to-[#0A2540]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-20 bg-[#0D3A5F] rounded-[32px] py-12 px-10 shadow-2xl border border-white/10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase italic tracking-tighter leading-tight">
            <span className="text-white">AVALIAMOS SUA</span><br className="md:hidden" />
            <span className="text-[#D4AF37]"> PORTABILIDADE</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <Shield className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-sm font-black text-white uppercase italic">Consultoria Premium</span>
            </div>

            <div className="space-y-10">
              {mainDifferentials.map((item, index) => (
                <div key={index} className="flex gap-6 group items-start">
                  <div className="flex-shrink-0 w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-[#D4AF37] transition-all">
                    <item.icon className="w-8 h-8 text-[#D4AF37] group-hover:text-[#0A2540]" />
                  </div>
                  <div className="pt-2">
                    <h3 className="text-2xl font-black text-[#D4AF37] uppercase italic mb-2 tracking-tight">{item.title}</h3>
                    <p className="text-white/80 leading-relaxed text-lg font-medium">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 text-left">
              <button 
                onClick={onCTAClick}
                className="group inline-flex items-center gap-3 bg-[#0A2540] border-2 border-[#D4AF37]/50 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[3px] text-sm italic shadow-2xl shadow-[#D4AF37]/10 hover:bg-[#D4AF37] hover:text-[#0A2540] transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Solicitar Cadastro
                <MessageCircle className="w-5 h-5 text-[#D4AF37] group-hover:text-[#0A2540]" />
              </button>
            </div>
          </div>

          <div className="relative flex flex-col items-center mt-12 lg:mt-0">
            <div className="absolute -inset-10 bg-[#D4AF37]/10 blur-[100px] rounded-full"></div>
            <div className="relative rounded-[40px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border-[10px] border-[#1a1a1a] bg-black w-full max-w-[360px] aspect-[9/16]">
              <iframe 
                src="https://fast.wistia.net/embed/iframe/zgv7e2kaly?videoFoam=true" 
                title="Wistia Video" 
                allow="autoplay; fullscreen" 
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}