import React, { useState } from 'react';
import { Heart, Phone, Mail, MapPin, Lock, X } from 'lucide-react';

export function Footer() {
  const [isMailModalOpen, setIsMailModalOpen] = useState(false);

  // PEGA O CÓDIGO DINÂMICO QUE O APP.TSX SALVOU (Ex: 001, 002)
  const currentRef = typeof window !== 'undefined' 
    ? (window.localStorage.getItem('referral_id') || 'SITE-DIRETO') 
    : 'SITE-DIRETO';

  // LINK DO WHATSAPP ATUALIZADO COM O INDICADOR DINÂMICO
  const whatsappUrl = `https://wa.me/5521964791774?text=${encodeURIComponent(
    `*CONTATO VIA SITE PREVENTPLUS*\n\n` +
    `*Indicador:* ${currentRef}\n` +
    `Olá, Ricardo! Gostaria de uma consultoria sobre os planos Prevent Ma+s.`
  )}`;

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
              <span className="text-2xl font-bold text-[#D4AF37]">PreventPlus</span>
            </div>
            <p className="text-white/70 leading-relaxed italic">
              Consultoria Ricardo Chaves. Excelência no cuidado sênior há 28 anos no Rio.
            </p>
          </div>

          {/* Coluna 2: Navegação */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-[#D4AF37] border-b border-[#D4AF37]/20 pb-2">Navegação</h4>
            <ul className="space-y-3">
              <li><a href="#" onClick={handleScrollTo('planos')} className="text-white/70 hover:text-[#D4AF37] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></span> Planos Disponíveis</a></li>
              <li><a href="#" onClick={handleScrollTo('network-grid')} className="text-white/70 hover:text-[#D4AF37] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></span> Rede Credenciada</a></li>
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

          {/* Coluna 4: Contato (LINK DINÂMICO) */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-[#D4AF37] border-b border-[#D4AF37]/20 pb-2">Fale Conosco</h4>
            <ul className="space-y-4">
              <li>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#D4AF37] mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-white/90 font-bold">(21) 96479-1774</div>
                    <div className="text-[#D4AF37] text-[10px] font-black uppercase tracking-widest">Chamar no WhatsApp</div>
                  </div>
                </a>
              </li>
              <li className="group cursor-pointer" onClick={() => setIsMailModalOpen(true)}>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#D4AF37] mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-white/90 font-bold text-xs">emaildoricardochaves@gmail.com</div>
                    <div className="text-white/50 text-[10px] uppercase">Enviar E-mail</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-white/40">© {new Date().getFullYear()} PreventPlus - Ricardo Chaves.</p>
          <a href="/admin" className="text-white/20 hover:text-[#D4AF37] flex items-center gap-1 uppercase tracking-tighter"><Lock className="w-3 h-3" /> Admin</a>
        </div>
      </div>

      {/* --- MODAL DE E-MAIL --- */}
      {isMailModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="bg-[#0A2540] p-6 flex justify-between items-center text-[#D4AF37]">
              <div className="flex items-center gap-2">
                <Mail />
                <h3 className="text-lg font-bold text-white uppercase">Dados para Atendimento</h3>
              </div>
              <button onClick={() => setIsMailModalOpen(false)} className="text-white/50 hover:text-white"><X /></button>
            </div>
            
            <form className="p-8 space-y-4 text-left">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-[10px] font-black text-[#0A2540] uppercase">Nome</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black outline-none" placeholder="Nome completo" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-[#0A2540] uppercase">Idade</label>
                  <input type="number" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black outline-none" placeholder="65" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-[#0A2540] uppercase">Bairro</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black outline-none" placeholder="Ex: Tijuca" />
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-[#0A2540] font-black py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 uppercase text-sm"
                >
                  <Phone className="w-5 h-5" /> FALAR COM O RICARDO AGORA
                </a>
                <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold text-center">
                  Ref Indicador: <span className="text-[#0A2540]">{currentRef}</span>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
}