import { MessageCircle } from 'lucide-react';

export function Differentials({ onPhoneClick }: { onPhoneClick: () => void }) {
  return (
    <section id="unidade-havai" className="py-24 bg-white border-t border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LADO ESQUERDO: VÍDEO WISTIA VERTICAL */}
          <div className="relative flex justify-center">
            {/* Efeito de brilho ao fundo */}
            <div className="absolute -inset-10 bg-gradient-to-b from-[#D4AF37]/10 to-transparent rounded-full blur-3xl opacity-50"></div>
            
            <div className="relative w-full max-w-[320px] rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-[6px] border-[#0A2540] aspect-[9/16] bg-[#0A2540]">
              <iframe 
                src="https://fast.wistia.net/embed/iframe/1dlgi86tzs?videoFoam=true" 
                title="Centro Médico Havai Vertical" 
                allow="autoplay; fullscreen" 
                frameBorder="0" 
                className="w-full h-full"
              ></iframe>
            </div>
          </div>

          {/* LADO DIREITO: TEXTO VENDÁVEL */}
          <div className="flex flex-col text-center lg:text-left">
            <h2 className="text-4xl sm:text-5xl font-black text-[#0A2540] leading-tight mb-8">
              A Nova Era do Cuidado: <br />
              <span className="text-[#D4AF37]">Tecnologia e Acolhimento</span>
            </h2>

            <div className="space-y-6 max-w-2xl mx-auto lg:mx-0">
              <p className="text-lg text-gray-700 leading-relaxed font-medium">
                No coração do Rio de Janeiro, apresentamos um novo conceito em cuidado com a saúde: <span className="text-[#0A2540] font-bold">moderno, eficiente e centrado nas pessoas.</span>
              </p>
              
              <p className="text-base text-gray-600 leading-relaxed">
                Nosso centro reúne tecnologia de última geração, estrutura completa e uma equipe altamente qualificada para oferecer atendimento ágil, seguro e humanizado.
              </p>

              <div className="bg-[#0A2540] p-8 rounded-3xl shadow-xl shadow-[#0A2540]/20 relative overflow-hidden text-left">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                <p className="text-white/90 text-sm leading-relaxed relative z-10 italic">
                  "Investir em saúde é investir em tranquilidade. Oferecemos um modelo que combina excelência médica com total transparência e confiança."
                </p>
              </div>

              <p className="text-base text-gray-600 leading-relaxed">
                Aqui, você encontra mais do que atendimento — encontra <span className="font-bold text-[#0A2540]">respeito e continuidade no cuidado</span>, amparado por uma estrutura sólida preparada para o futuro.
              </p>

              <div className="pt-6">
                <button 
                  onClick={onPhoneClick}
                  className="w-full lg:w-auto bg-[#D4AF37] hover:bg-[#B8941F] text-[#0A2540] font-black py-4 px-12 rounded-2xl shadow-lg shadow-[#D4AF37]/30 transition-all transform hover:-translate-y-1 active:scale-95 text-center uppercase tracking-widest text-sm flex items-center justify-center gap-3 mx-auto lg:mx-0"
                >
                  <MessageCircle className="w-4 h-4" /> Fale pelo WhatsApp
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}