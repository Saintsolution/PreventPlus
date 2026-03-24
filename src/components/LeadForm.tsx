import { useState } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

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
      const { error } = await supabase.from('leads').insert({
        ref_id: refId,
        nome: formData.nome,
        telefone: formData.telefone,
        idade: formData.idade ? parseInt(formData.idade) : null,
        tipo_plano: formData.tipo_plano,
      });

      if (error) throw error;

      const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;
      if (webhookUrl) {
        fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'lead',
            ref_id: refId,
            ...formData,
            timestamp: new Date().toISOString(),
          }),
        }).catch(() => {});
      }

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFormData({
          nome: '',
          telefone: '',
          idade: '',
          tipo_plano: 'apartamento',
        });
      }, 3000);
    } catch (error) {
      console.error('Error submitting lead:', error);
      alert('Erro ao enviar formulário. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0A2540] via-[#D4AF37] to-[#0A2540]"></div>

        {isSuccess ? (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-[#0A2540] mb-3">
              Cotação Solicitada!
            </h3>
            <p className="text-gray-600">
              Entraremos em contato em breve com sua cotação personalizada.
            </p>
          </div>
        ) : (
          <>
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#0A2540]">
                  Solicitar Cotação
                </h3>
                <button
                  onClick={onClose}
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <p className="text-gray-600 mb-8">
                Preencha seus dados e receba uma cotação personalizada em até 24 horas.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone/WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Idade
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="120"
                    value={formData.idade}
                    onChange={(e) => setFormData({ ...formData, idade: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all"
                    placeholder="Sua idade"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Plano
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, tipo_plano: 'enfermaria' })}
                      className={`px-4 py-3 rounded-xl border-2 font-medium transition-all ${
                        formData.tipo_plano === 'enfermaria'
                          ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#0A2540]'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      Enfermaria
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, tipo_plano: 'apartamento' })}
                      className={`px-4 py-3 rounded-xl border-2 font-medium transition-all ${
                        formData.tipo_plano === 'apartamento'
                          ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#0A2540]'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      Apartamento
                    </button>
                  </div>
                </div>

                {refId && (
                  <div className="bg-[#D4AF37]/10 rounded-xl p-3 text-sm text-[#0A2540]">
                    <span className="font-medium">Código de indicação:</span> {refId}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-[#0A2540] px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#0A2540]/30 border-t-[#0A2540] rounded-full animate-spin"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      Solicitar Cotação
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Ao enviar, você concorda com nossa política de privacidade.
                </p>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
