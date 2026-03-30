import React, { useState } from 'react';
import { Heart, Phone, Mail, Lock, X, ExternalLink } from 'lucide-react';

// Isso aqui mata o erro no App.tsx
interface FooterProps {
  onCTAClick: () => void;
}

export function Footer({ onCTAClick }: FooterProps) {
  const [isMailModalOpen, setIsMailModalOpen] = useState(false);

  const currentRef = typeof window !== 'undefined' 
    ? (window.localStorage.getItem('referral_id') || 'SITE-DIRETO') 
    : 'SITE-DIRETO';

  const handleScrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-b from-[#0A2540] to-[#051627] text-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Coluna 1: Logo */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-[#D4AF37] rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-[#0A2540]" />
              </div>
              <span className="text-2xl font-bold text-[#D4AF37]">Equipe PreventPlus</span>
            </div>
            <p className="text-white/70 leading-relaxed italic">
              A segurança de quem conhece o mercado. Consultoria liderada por Ricardo Chaves, com 30 anos de experiência em Saúde Suplementar.
            </p>
          </div>

          {/* Coluna 2: Navegação */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-[#D4AF37] border-b border-[#D4AF37]/20 pb-2">Navegação</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" onClick={handleScrollTo('planos')} className="text-white/70 hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></span> Planos Disponíveis
                </a>
              </li>
              <li>
                <a 
                  href="https://drive.google.com/file/d/1BiXKo7Im87oOLqw_dP5SLdadTTG7F_yO/view?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/70 hover:text-[#D4AF37] transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></span> 
                  Rede Credenciada
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Institucional */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-[#D4AF37] border-b border-[#D4AF37]/20 pb-2">Institucional</h4>
            <ul className="space-y-3">
              <li><a href="#" onClick={handleScrollTo('network-top')} className="text-white/70 hover:text-[#D4AF37] transition-colors">Sobre Nós</a></li>
              <li><a href="#" onClick={handleScrollTo('unidade-havai')} className="text-white/70 hover:text-[#D4AF37] transition-colors">Unidade Havaí</a></li>
            </ul>
          </div>

          {/* Coluna 4: Contato */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-[#D4AF37] border-b border-[#D4AF37]/20 pb-2">Fale Conosco</h4>
            <ul className="space-y-4">
              <li>
                <button onClick={onCTAClick} className="group flex items-start gap-3 text-left">
                  <Phone className="w-5 h-5 text-[#D4AF37] mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-white/90 font-bold">(21) 96479-1774</div>
                    <div className="text-[#D4AF37] text-[10px] font-black uppercase tracking-widest">Fale com um consultor</div>
                  </div>
                </button>
              </li>
              <li>
                <button onClick={() => setIsMailModalOpen(true)} className="group flex items-start gap-3 text-left">
                  <Mail className="w-5 h-5 text-[#D4AF37] mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-white/90 font-bold text-xs break-all italic">emaildoricardochaves@gmail.com</div>
                    <div className="text-white/50 text-[10px] uppercase">Solicitar via e-mail</div>
                  </div>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-white/40">© {new Date().getFullYear()} PreventPlus - Ricardo Chaves.</p>
          <a href="/admin" className="text-white/20 hover:text-[#D4AF37] flex items-center gap-1 uppercase tracking-tighter"><Lock className="w-3 h-3" /> Admin</a>
        </div>
      </div>

      {/* --- MODAL DE E-MAIL (INTERNO) --- */}
      {isMailModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="bg-[#0A2540] p-6 flex justify-between items-center text-[#D4AF37]">
              <div className="flex items-center gap-2">
                <Mail />
                <h3 className="text-lg font-bold text-white uppercase text-sm">Consultoria por E-mail</h3>
              </div>
              <button onClick={() => setIsMailModalOpen(false)} className="text-white/50 hover:text-white"><X /></button>
            </div>
            
            <form 
              className="p-8 space-y-4 text-left"
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const nome = data.get('nome')?.toString().toUpperCase();
                const idade = data.get('idade');
                const bairro = data.get('bairro')?.toString().toUpperCase();
                const duvida = data.get('duvida');
                
                const subject = encodeURIComponent(`SOLICITAÇÃO DE PLANO - ${nome}`);
                const body = encodeURIComponent(`NOME: ${nome}\nIDADE: ${idade}\nBAIRRO: ${bairro}\nINDICADOR: ${currentRef}\n\nDÚVIDA: ${duvida}`);
                
                window.location.href = `mailto:emaildoricardochaves@gmail.com?subject=${subject}&body=${body}`;
                setIsMailModalOpen(false);
              }}
            >
              <div className="grid grid-cols-2 gap-4 text-black">
                <div className="col-span-2">
                  <label className="text-[10px] font-black text-[#0A2540] uppercase">Nome</label>
                  <input name="nome" required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-[#0A2540] uppercase">Idade</label>
                  <input name="idade" required type="number" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-[#0A2540] uppercase">Bairro</label>
                  <input name="bairro" required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none" />
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] font-black text-[#0A2540] uppercase">Mensagem</label>
                  <textarea name="duvida" rows={3} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none resize-none"></textarea>
                </div>
              </div>
              <button type="submit" className="w-full bg-[#D4AF37] text-[#0A2540] font-black py-4 rounded-xl uppercase text-sm">Enviar E-mail</button>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
}