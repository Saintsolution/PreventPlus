import React, { useState } from 'react';
import { Heart, Lock, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onCTAClick: () => void;
}

export function Footer({ onCTAClick }: FooterProps) {
  // Função para scroll suave que você já usava
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
          
          {/* Coluna 1: Logo - Mantida */}
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

          {/* Coluna 2: Navegação - Mantida */}
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

          {/* Coluna 3: Institucional - Mantida */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-[#D4AF37] border-b border-[#D4AF37]/20 pb-2">Institucional</h4>
            <ul className="space-y-3">
              <li><a href="#" onClick={handleScrollTo('network-top')} className="text-white/70 hover:text-[#D4AF37] transition-colors">Sobre Nós</a></li>
              <li><a href="#" onClick={handleScrollTo('unidade-havai')} className="text-white/70 hover:text-[#D4AF37] transition-colors">Unidade Havaí</a></li>
            </ul>
          </div>

          {/* Coluna 4: Privacidade (Substituindo Contatos) */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-[#D4AF37] border-b border-[#D4AF37]/20 pb-2">Segurança</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white/50">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">ANS: 40221-4</span>
              </div>
              <p className="text-white/50 text-[10px] leading-relaxed uppercase italic">
                Dados protegidos de acordo com a LGPD.
              </p>
              <button 
                onClick={() => alert("Texto da Política de Privacidade em breve...")}
                className="inline-block bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all"
              >
                Política de Privacidade
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-white/40">© {new Date().getFullYear()} PreventPlus - Ricardo Chaves.</p>
          <a href="/admin" className="text-white/20 hover:text-[#D4AF37] flex items-center gap-1 uppercase tracking-tighter"><Lock className="w-3 h-3" /> Admin</a>
        </div>
      </div>
    </footer>
  );
}