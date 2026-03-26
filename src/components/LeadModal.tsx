import { useState } from 'react';
import { X, Send, User, Phone, Calendar, ShieldCheck } from 'lucide-react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  refId: string | null;
}

export function LeadModal({ isOpen, onClose, refId }: LeadModalProps) {
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    nascimento: '',
    plano: 'E1'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Montando a mensagem para o WhatsApp (ou para o n8n via Webhook)
    const mensagem = `*Nova Cotação Saint Solution*%0A%0A` +
      `*Vendedor:* ${refId || 'Direto'}%0A` +
      `*Cliente:* ${formData.nome}%0A` +
      `*Plano:* ${formData.plano}%0A` +
      `*Data Nasc:* ${formData.nascimento}%0A` +
      `*WhatsApp:* ${formData.whatsapp}`;

    window.open(`https://wa.me/5511999999999?text=${mensagem}`, '_blank');
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
            <span className="text-[10px] font-black uppercase tracking-[3px] text-[#D4AF37]">Cotação Oficial</span>
          </div>
          <h2 className="text-3xl font-black uppercase italic leading-tight">Prepare seu <br/><span className="text-[#D4AF37]">Plano de Saúde</span></h2>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          
          <div className="relative">
            <User className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
            <input 
              required
              type="text" 
              placeholder="NOME COMPLETO"
              className="w-full pl-12 pr-6 py-4 bg-gray-50 rounded-2xl font-bold text-sm outline-none focus:ring-2 ring-[#D4AF37] transition-all"
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
              <Calendar className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <input 
                required
                type="date" 
                className="w-full pl-12 pr-6 py-4 bg-gray-50 rounded-2xl font-bold text-sm outline-none focus:ring-2 ring-[#D4AF37]"
                onChange={(e) => setFormData({...formData, nascimento: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2">Escolha seu Plano</label>
            <div className="grid grid-cols-3 gap-2">
              {['E1', 'E2', 'E3', 'A1', 'A2', 'A3'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setFormData({...formData, plano: p})}
                  className={`py-3 rounded-xl font-black text-xs transition-all ${formData.plano === p ? 'bg-[#0A2540] text-[#D4AF37] scale-105' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#D4AF37] hover:bg-[#0A2540] text-[#0A2540] hover:text-white py-5 rounded-2xl font-black uppercase tracking-[3px] text-xs transition-all shadow-xl shadow-[#D4AF37]/20 flex items-center justify-center gap-3 group"
          >
            Enviar para Consultor
            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>

          <p className="text-[9px] text-center text-gray-400 font-bold uppercase">Vendedor Responsável: {refId || 'Saint Solution - Direto'}</p>
        </form>
      </div>
    </div>
  );
}