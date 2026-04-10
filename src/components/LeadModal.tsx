import { useState } from 'react';
import { X, Send, User, Phone, Hash, ShieldCheck, Mail, MessageCircle, PhoneCall } from 'lucide-react';

// Esta interface é o que "limpa" o erro no App.tsx
interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  refId: string | null;
  isEmailMode: boolean; 
}

export function LeadModal({ isOpen, onClose, refId, isEmailMode }: LeadModalProps) {
  const [loading, setLoading] = useState(false); // Adicionado para o feedback de envio
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    idades: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEmailMode) {
      setLoading(true);
      try {
        // Nova lógica de envio via Netlify Function (Resend)
        const response = await fetch('/.netlify/functions/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, refId }),
        });

        if (response.ok) {
          alert("Cadastro enviado com sucesso!");
          onClose();
        } else {
          throw new Error();
        }
      } catch (error) {
        alert("Erro ao enviar. Por favor, tente pelo WhatsApp.");
      } finally {
        setLoading(false);
      }
    } else {
      // MODO WHATSAPP DIRETO COM A SUA FRASE
      const mensagem = encodeURIComponent(`Olá, Ví o Anuncio na Internet e gostaria de mais informações`);
      window.open(`https://wa.me/5521964791774?text=${mensagem}`, '_blank');
      onClose();
    }
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
            <span className="text-[10px] font-black uppercase tracking-[3px] text-[#D4AF37]">
              {isEmailMode ? 'Cadastro Oficial' : 'Consultoria Rápida'}
            </span>
          </div>
          <h2 className="text-3xl font-black uppercase italic leading-tight">
            {isEmailMode ? 'Garantir Minha' : 'Solicitar Minha'} <br/>
            <span className="text-[#D4AF37]">Cotação</span>
          </h2>
        </div>

        {/* Formulário / Área de Contato */}
        <div className="p-8">
          {isEmailMode ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input required type="text" placeholder="NOME COMPLETO" className="w-full pl-12 pr-6 py-4 bg-gray-50 rounded-2xl font-bold text-sm outline-none focus:ring-2 ring-[#D4AF37] uppercase"
                  onChange={(e) => setFormData({...formData, nome: e.target.value})} />
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input required type="email" placeholder="SEU MELHOR E-MAIL" className="w-full pl-12 pr-6 py-4 bg-gray-50 rounded-2xl font-bold text-sm outline-none focus:ring-2 ring-[#D4AF37]"
                  onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Phone className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <input required type="tel" placeholder="WHATSAPP" className="w-full pl-12 pr-6 py-4 bg-gray-50 rounded-2xl font-bold text-sm outline-none focus:ring-2 ring-[#D4AF37]"
                    onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} />
                </div>
                <div className="relative">
                  <Hash className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <input required type="text" placeholder="IDADES (EX: 62, 50)" className="w-full pl-12 pr-6 py-4 bg-gray-50 rounded-2xl font-bold text-sm outline-none focus:ring-2 ring-[#D4AF37]"
                    onChange={(e) => setFormData({...formData, idades: e.target.value})} />
                </div>
              </div>

              <button disabled={loading} type="submit" className="w-full bg-[#D4AF37] hover:bg-[#0A2540] text-[#0A2540] hover:text-white py-6 rounded-2xl font-black uppercase tracking-[3px] text-xs transition-all shadow-xl flex items-center justify-center gap-3 group disabled:opacity-50">
                {loading ? 'ENVIANDO...' : 'Finalizar Cadastro por E-mail'}
                <Send className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <button onClick={handleSubmit} className="w-full bg-[#25D366] text-white py-6 rounded-2xl font-black uppercase flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-xl">
                <MessageCircle className="w-6 h-6" />
                Chamar no WhatsApp
              </button>
              
              <a href="tel:+5521964791774" className="w-full bg-[#0A2540] text-white py-6 rounded-2xl font-black uppercase flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-xl">
                <PhoneCall className="w-6 h-6" />
                Ligar Agora
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}