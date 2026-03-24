import { Heart, Phone, Mail, MapPin, Lock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0A2540] to-[#051627] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-[#D4AF37] rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-[#0A2540]" />
              </div>
              <span className="text-2xl font-bold text-[#D4AF37]">PreventPlus</span>
            </div>
            <p className="text-white/70 leading-relaxed">
              Revenda autorizada do plano Prevent Ma+s. Cuidando da saúde sênior com excelência há mais de 28 anos.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-[#D4AF37]">Planos</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/70 hover:text-[#D4AF37] transition-colors">
                  Plano Enfermaria
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-[#D4AF37] transition-colors">
                  Plano Apartamento
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-[#D4AF37] transition-colors">
                  Rede Credenciada
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-[#D4AF37] transition-colors">
                  Perguntas Frequentes
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-[#D4AF37]">Institucional</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/70 hover:text-[#D4AF37] transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-[#D4AF37] transition-colors">
                  Unidades Temáticas
                </a>
              </li>
              <li>
                <a href="/admin" className="text-white/70 hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                  <Lock className="w-3 h-3" /> Acesso Restrito
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-[#D4AF37]">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
                <div>
                  <div className="text-white/90">(11) 9999-9999</div>
                  <div className="text-white/60 text-sm">Segunda a Sexta, 8h às 18h</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
                <div>
                  <div className="text-white/90">contato@preventplus.com.br</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
                <div>
                  <div className="text-white/90">São Paulo e Rio de Janeiro</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm text-center md:text-left">
              © {new Date().getFullYear()} PreventPlus. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 items-center">
              <a href="#" className="text-white/60 hover:text-[#D4AF37] text-sm transition-colors">
                Política de Privacidade
              </a>
              <span className="text-white/20">|</span>
              <a 
                href="/admin" 
                className="flex items-center gap-1.5 text-white/40 hover:text-[#D4AF37] text-xs font-medium uppercase tracking-wider transition-all"
              >
                <Lock className="w-3 h-3" /> Painel Admin
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}