import { useState } from 'react';
import { X, CheckCircle, MessageCircle } from 'lucide-react';

interface LeadFormProps {
  isOpen: boolean;
  onClose: () => void;
  refId: string | null;
}

export function LeadForm({ isOpen, onClose, refId }: LeadFormProps) {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    idade: '',
    tipo_plano: 'apartamento',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. DISPARO PARA O N8N (Captura de Leads e Planilha)
      const webhookUrl = "https://n8n.saintsolution.com.br/webhook/a57e4858-d4d7-4071-8a94-2b1589d618c7";
      
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'lead_site',
          ref_id: refId || 'DIRETO',
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => console.log("n8n em standby, enviando direto para o WhatsApp..."));

      // 2. CONFIGURAÇÃO DO WHATSAPP (A ENTREGA REAL PARA O RICARDO)
      const cleanPhone = "5521966879813"; 
      
      const textoZap = encodeURIComponent(
        `*NOVO LEAD - PREVENT PLUS*\n\n` +
        `*Nome:* ${formData.nome}\n` +
        `*Plano:* ${formData.tipo_plano.toUpperCase()}\n` +
        `*Idade:* ${formData.idade} anos\n` +
        `*WhatsApp:* ${formData.telefone}\n\n` +
        `*INDICADOR:* ${refId || 'VENDA DIRETA'}`
      );

      // 3. EFEITO VISUAL DE SUCESSO
      setIsSuccess(true);

      // Redirecionamento após 2 segundos
      setTimeout(() => {
        window.open(`https://wa.me/${cleanPhone}?text=${textoZap}`, '_blank');
        onClose();
        setIsSuccess(false);
        setFormData({ nome: '', telefone: '', idade: '', tipo_plano: 'apartamento' });
      }, 2000);

    } catch (error) {
      console.error('Error submitting lead:', error);
      alert('Ops! Algo deu errado. Tente novamente ou chame no WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#0A2540]/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[40px] max-w-md w-full shadow-2xl relative overflow-hidden border border-white/20">
        
        {isSuccess ? (
          <div className="p-12 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h3 className="text-3xl font-black text-[#0A2540] mb-3">Tudo Pronto!</h3>
            <p className="text-gray-500 font-medium italic">Estamos te levando para falar com o corretor Ricardo...</p>
          </div>
        ) : (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-black text-[#0A2540] uppercase tracking-tighter">Cotação Rápida</h3>
                <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">Prevent Ma+s</p>
              </div>
              <button 
                onClick={onClose} 
                className="w-12 h-12 bg-gray-50 hover:bg-gray-100 rounded-2xl flex items-center justify-center transition-all group"
              >
                <X className="w-6 h-6 text-gray-400 group-hover:scale-110 transition-transform" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                required
                placeholder="Nome Completo"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-[#D4AF37] focus:bg-white font-bold outline-none transition-all"
              />

              <input
                type="tel"
                required
                placeholder="Seu WhatsApp"
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-[#D4AF37] focus:bg-white font-bold outline-none transition-all"
              />

              <input
                type="number"
                required
                placeholder="Sua Idade"
                value={formData.idade}
                onChange={(e) => setFormData({ ...formData, idade: e.target.value })}
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-[#D4AF37] focus:bg-white font-bold outline-none transition-all"
              />

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, tipo_plano: 'enfermaria' })}
                  className={`py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                    formData.tipo_plano === 'enfermaria' 
                      ? 'bg-[#0A2540] text-white shadow-lg scale-[1.02]' 
                      : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                  }`}
                >
                  Enfermaria
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, tipo_plano: 'apartamento' })}
                  className={`py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                    formData.tipo_plano === 'apartamento' 
                      ? 'bg-[#0A2540] text-white shadow-lg scale-[1.02]' 
                      : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                  }`}
                >
                  Apartamento
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-[#0A2540] py-5 rounded-2xl font-black text-lg shadow-xl shadow-[#D4AF37]/20 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                {isSubmitting ? "PROCESSANDO..." : <>FALAR COM CORRETOR <MessageCircle className="w-6 h-6" /></>}
              </button>
              
              {refId && (
                <div className="pt-2">
                  <p className="text-center text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                    Consultoria via ID: <span className="text-[#D4AF37]">{refId}</span>
                  </p>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}