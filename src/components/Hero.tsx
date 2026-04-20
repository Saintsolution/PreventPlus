import { useState, useEffect } from 'react';
import { User, DollarSign, TrendingDown, Shield, MessageCircle, Clock, PhoneCall, Send } from 'lucide-react';

// Adicionamos onPhoneClick para o botão de WhatsApp/Ligação
export function Hero({ onCTAClick, onPhoneClick, refId }: { onCTAClick: () => void; onPhoneClick: () => void; refId: string | null }) {
  const [promoText, setPromoText] = useState("AVALIAÇÃO DE PORTABILIDADE GRATUITA");
  const [promoDate, setPromoDate] = useState("2026-04-30T23:59:00"); 
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const fetchPromo = async () => {
      try {
        const response = await fetch('https://n8n.saintsolution.com.br/webhook/e17ae59e-3bfa-4d9a-a4a6-05dda613817f');
        const data = await response.json();
        if (data.texto) setPromoText(data.texto);
        if (data.data_limite) setPromoDate(data.data_limite);
      } catch (error) {
        console.log("Erro ao buscar promoção, usando valores padrão...");
      }
    };
    fetchPromo();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(promoDate).getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft("PROMOÇÃO ENCERRADA");
        clearInterval(timer);
      } else {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);
        
        const display = d > 0 
          ? `${d}d e ${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
          : `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        
        setTimeLeft(display);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [promoDate]);

  const mainDifferentials = [
    { icon: User, title: 'Portabilidade Segura', description: 'Mude para a PREVENT SENIOR mantendo seus direitos. Analisamos sua carência sem perda de cobertura.' },
    { icon: DollarSign, title: 'Segurança Financeira', description: 'Sem reajuste por faixa etária a partir de 44 anos e sem coparticipação.' },
    { icon: TrendingDown, title: 'Sem Limite de Idade', description: 'Do recém nascido à melhor idade sem limite.' },
  ];

  return (
    <section className="relative bg-[#0A2540] pt-10 pb-28 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/hospital.png" 
          className="w-full h-full object-cover opacity-30" 
          alt="Fundo Hospitalar" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A2540] via-[#0A2540]/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        <div className="flex flex-col items-center mb-20 space-y-4 text-center">
          <div className="bg-[#0D3A5F] rounded-[32px] py-8 px-8 md:px-16 shadow-2xl border border-white/10 relative overflow-hidden max-w-5xl w-full">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase italic tracking-tighter leading-tight md:leading-none text-white md:whitespace-nowrap">
              PORTABILIDADE <br className="md:hidden" />
              <span className="text-[#D4AF37]">E COMPRA DE CARÊNCIA</span>
            </h2>
          </div>

          <div className="bg-[#D4AF37] rounded-[24px] py-6 px-8 shadow-2xl max-w-2xl w-full border-b-4 border-[#B8941F]">
            <p className="text-[#0A2540] font-black text-lg md:text-2xl uppercase italic leading-tight mb-2">
              {promoText}
            </p>
            <div className="flex items-center justify-center gap-2 text-[#0A2540]/70 font-bold text-[10px] md:text-sm uppercase tracking-widest">
              <Clock className="w-4 h-4" />
              <span>Encerra em: <span className="text-[#0A2540]">{timeLeft}</span></span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            {/* NOVO BOTÃO: Fale pelo WhatsApp (antigo Consultoria Premium) */}
            <button 
              onClick={onPhoneClick}
              className="inline-flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/10 hover:bg-[#25D366]/20 hover:border-[#25D366] transition-all group"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              <span className="text-sm font-black text-white uppercase italic tracking-widest">Fale pelo WhatsApp</span>
            </button>

            <div className="space-y-10">
              {mainDifferentials.map((item, index) => (
                <div key={index} className="flex gap-6 group items-start text-left">
                  <div className="flex-shrink-0 w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-[#D4AF37] transition-all duration-300">
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
              {/* BOTÃO ALTERADO: Envie seus Dados (Modo E-mail) */}
              <button 
                onClick={onCTAClick}
                className="group inline-flex items-center gap-3 bg-[#0A2540] border-2 border-[#D4AF37]/50 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[3px] text-sm italic shadow-2xl hover:bg-[#D4AF37] hover:text-[#0A2540] hover:border-[#D4AF37] transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Envie seus Dados
                <Send className="w-5 h-5 text-[#D4AF37] group-hover:text-[#0A2540]" />
              </button>
            </div>
          </div>

          <div className="relative flex flex-col items-center mt-12 lg:mt-0">
            <div className="absolute -inset-10 bg-[#D4AF37]/10 blur-[100px] rounded-full opacity-50"></div>
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