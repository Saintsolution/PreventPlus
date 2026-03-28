import { useState } from 'react';
import { X, Send, User, Phone, Hash, ShieldCheck } from 'lucide-react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  refId: string | null;
}

export function LeadModal({ isOpen, onClose, refId }: LeadModalProps) {
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    idade: '', // Mudamos de nascimento para idade
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Montando a mensagem curta e direta conforme pedido do Ricardo
    const mensagem = `Olá! Meu nome é ${formData.nome.toUpperCase()}, tenho ${formData.idade} anos. ` +
      `Gostaria de uma consultoria Prevent Senior. (Ref: ${refId || 'DIRETO'})`;

    // Lembre-se de colocar o número real do Ricardo aqui no lugar dos 999
    window.open(`https://wa.me/5521964791774?text=${encodeURIComponent(mensagem)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0A2540]/90 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-[40px] overflow-hidden shadow-2xl border border-white/20 animate-in fade-in zoom-in duration-300">
        
        {/* Header do Modal */}
        <div className="bg-[#0A2540] p-8 text-white relative">
          <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
            <span className="text-[10px] font-black uppercase tracking-[3px] text-[#D4AF37]">Consultoria Oficial</span>
          </div>
          <h2 className="text-3xl font-black uppercase italic leading-tight">Solicitar <br/><span className="text-[#D4AF37]">Atendimento</span></h2>
        </div>

        {/* Formulário Simplificado */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          
          <div className="relative">
            <User className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
            <input 
              required
              type="text" 
              placeholder="NOME COMPLETO"
              className="w-full pl-12 pr-6 py-4 bg-gray-50 rounded-2xl font-bold text-sm outline-none focus:ring-2 ring-[#D4AF37] transition-all uppercase"
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Phone className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <input 
                required
                type="tel" 
                placeholder="WHATSAPP"
                className="w-full pl-12 pr-6 py-4 bg-gray-50 rounded-2xl font-bold text-sm outline-none focus:ring-2 ring-[#D4AF37]"
                onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
              />
            </div>
            <div className="relative">
              {/* Mudamos para Hash (ícone de número) e tipo texto para a idade */}
              <Hash className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <input 
                required
                type="text" 
                placeholder="IDADE (EX: 62)"
                className="w-full pl-12 pr-6 py-4 bg-gray-50 rounded-2xl font-bold text-sm outline-none focus:ring-2 ring-[#D4AF37]"
                onChange={(e) => setFormData({...formData, idade: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#D4AF37] hover:bg-[#0A2540] text-[#0A2540] hover:text-white py-6 rounded-2xl font-black uppercase tracking-[3px] text-xs transition-all shadow-xl shadow-[#D4AF37]/20 flex items-center justify-center gap-3 group"
          >
            Falar com Consultor
            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>

          <p className="text-[9px] text-center text-gray-400 font-bold uppercase tracking-widest">
            Identificador do Parceiro: {refId || 'DIRETO'}
          </p>
        </form>
      </div>
    </div>
  );
}