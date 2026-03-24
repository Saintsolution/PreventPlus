import { useState, useEffect } from 'react';
import { Check, Sparkles, MessageCircle, Loader2 } from 'lucide-react';

interface PricingProps {
  onCTAClick: () => void;
}

export function Pricing({ onCTAClick }: PricingProps) {
  // --- ESTADO PARA OS PREÇOS DINÂMICOS ---
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // URL do seu Webhook de TESTE (Lembre de clicar em "Listen" no n8n)
    const webhookUrl = "https://n8n.saintsolution.com.br/webhook/a57e4858-d4d7-4071-8a94-2b1589d618c7";

    fetch(webhookUrl)
      .then(res => res.json())
      .then(data => {
        // Mapeamos o JSON da planilha para o formato do site
        const formattedPlans = [
          {
            ageGroup: 'Até 43 anos',
            enfermaria: data.find((p: any) => p.cod_plan === 'E1')?.valor_mensalidade || '---',
            apartamento: data.find((p: any) => p.cod_plan === 'A1')?.valor_mensalidade || '---',
            highlight: false,
          },
          {
            ageGroup: '44 a 58 anos',
            enfermaria: data.find((p: any) => p.cod_plan === 'E2')?.valor_mensalidade || '---',
            apartamento: data.find((p: any) => p.cod_plan === 'A2')?.valor_mensalidade || '---',
            highlight: true,
          },
          {
            ageGroup: '59 anos em diante',
            enfermaria: data.find((p: any) => p.cod_plan === 'E3')?.valor_mensalidade || '---',
            apartamento: data.find((p: any) => p.cod_plan === 'A3')?.valor_mensalidade || '---',
          }
        ];
        setPlans(formattedPlans);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao carregar preços:", err);
        setLoading(false);
      });
  }, []);

  const benefits = [
    'Sem coparticipação',
    'Sem reajuste por idade (44+)',
    'Cobertura em SP e RJ',
    'Telemedicina 24h',
    'Remoção aérea nacional',
    'Clube de Vantagens Luxo',
  ];

  const handlePlanSelection = (plano: string, faixa: string) => {
    const refId = localStorage.getItem('referral_id') || 'DIRETO';
    const phoneNumber = "5521966879813"; // NÚMERO DO RICARDO QUE VOCÊ PASSOU
    
    const mensagem = encodeURIComponent(
      `*INTERESSE EM PLANO - PREVENT PLUS*\n\n` +
      `*Plano:* ${plano}\n` +
      `*Faixa Etária:* ${faixa}\n\n` +
      `*Código de Referência:* ${refId}\n` +
      `_Vindo do site oficial_`
    );

    window.open(`https://wa.me/${phoneNumber}?text=${mensagem}`, '_blank');
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-sm font-black text-[#0A2540] uppercase tracking-widest">Tabela de Investimento</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-[#0A2540] mb-6 tracking-tighter">
            Escolha o seu <span className="text-[#D4AF37]">Prevent Ma+s</span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 min-h-[400px] flex flex-col">
            
            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center p-20">
                <Loader2 className="w-12 h-12 text-[#D4AF37] animate-spin mb-4" />
                <p className="font-bold text-[#0A2540] uppercase tracking-widest">Atualizando Preços...</p>
              </div>
            ) : (
              <>
                {/* --- VERSÃO MOBILE --- */}
                <div className="block md:hidden p-6 space-y-6">
                  {plans.map((plan, index) => (
                    <div key={index} className={`p-6 rounded-[32px] border-2 ${plan.highlight ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-gray-50'}`}>
                      <p className="font-black text-[#0A2540] mb-4 uppercase text-center">{plan.ageGroup}</p>
                      <div className="space-y-4">
                        <button onClick={() => handlePlanSelection('Enfermaria', plan.ageGroup)} className="w-full p-4 bg-gray-50 rounded-2xl flex justify-between items-center group active:scale-95 transition-all">
                          <div className="text-left">
                            <p className="text-[10px] font-black text-gray-400 uppercase">Enfermaria</p>
                            <p className="text-xl font-black text-[#0A2540]">R$ {plan.enfermaria}</p>
                          </div>
                          <MessageCircle className="text-[#D4AF37] w-6 h-6" />
                        </button>
                        <button onClick={() => handlePlanSelection('Apartamento', plan.ageGroup)} className="w-full p-4 bg-[#0A2540] rounded-2xl flex justify-between items-center active:scale-95 transition-all">
                          <div className="text-left">
                            <p className="text-[10px] font-black text-[#D4AF37] uppercase">Apartamento</p>
                            <p className="text-xl font-black text-white">R$ {plan.apartamento}</p>
                          </div>
                          <MessageCircle className="text-[#D4AF37] w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* --- VERSÃO DESKTOP --- */}
                <div className="hidden md:block">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#0A2540] text-white">
                        <th className="px-8 py-8 text-left font-black uppercase tracking-widest text-sm">Faixa Etária</th>
                        <th className="px-8 py-8 text-center font-black uppercase tracking-widest text-sm">Enfermaria</th>
                        <th className="px-8 py-8 text-center font-black uppercase tracking-widest text-sm text-[#D4AF37]">Apartamento Premium</th>
                      </tr>
                    </thead>
                    <tbody>
                      {plans.map((plan, index) => (
                        <tr key={index} className={`border-b border-gray-50 ${plan.highlight ? 'bg-gray-50/50' : ''}`}>
                          <td className="px-8 py-8">
                            <span className="font-black text-[#0A2540] text-xl">{plan.ageGroup}</span>
                          </td>
                          <td className="px-8 py-8 text-center">
                            <button onClick={() => handlePlanSelection('Enfermaria', plan.ageGroup)} className="w-full group p-6 rounded-3xl hover:bg-white hover:shadow-xl transition-all">
                              <div className="text-2xl font-black text-[#0A2540]">R$ {plan.enfermaria}</div>
                              <div className="text-[10px] font-bold text-gray-400 uppercase mt-2 group-hover:text-[#D4AF37]">Selecionar Enfermaria</div>
                            </button>
                          </td>
                          <td className="px-8 py-8 text-center">
                            <button onClick={() => handlePlanSelection('Apartamento', plan.ageGroup)} className="w-full group p-6 rounded-3xl bg-white shadow-lg border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all">
                              <div className="text-2xl font-black text-[#D4AF37]">R$ {plan.apartamento}</div>
                              <div className="text-[10px] font-bold text-[#0A2540] uppercase mt-2">Selecionar Apartamento</div>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* BENEFÍCIOS RODAPÉ */}
                <div className="bg-gray-50/50 p-10 grid grid-cols-2 md:grid-cols-3 gap-6 mt-auto">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#D4AF37]" />
                      <span className="text-xs font-black text-[#0A2540] uppercase tracking-tight">{benefit}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="text-center">
          <button onClick={onCTAClick} className="bg-[#D4AF37] text-[#0A2540] px-12 py-5 rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-all uppercase tracking-widest">
            Falar com Consultor
          </button>
        </div>
      </div>
    </section>
  );
}