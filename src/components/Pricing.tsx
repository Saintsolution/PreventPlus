import { useState, useEffect } from 'react';
import { Check, Sparkles, MessageCircle, Loader2 } from 'lucide-react';

interface PricingProps {
  onCTAClick: () => void;
}

export function Pricing({ onCTAClick }: PricingProps) {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // URL do seu Webhook de Produção/Teste
    const webhookUrl = "https://n8n.saintsolution.com.br/webhook/a57e4858-d4d7-4071-8a94-2b1589d618c7";

    fetch(webhookUrl)
      .then(res => res.json())
      .then(data => {
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

  // Função que dispara o WhatsApp direto do card de preço
  const handlePlanSelection = (plano: string, faixa: string) => {
    const refId = localStorage.getItem('referral_id') || 'DIRETO';
    const phoneNumber = "5521964791774"; // NÚMERO DO RICARDO ATUALIZADO
    
    const mensagem = encodeURIComponent(
      `*INTERESSE EM PLANO - PREVENT PLUS*\n\n` +
      `*Vendedor:* ${refId}\n` +
      `*Plano Selecionado:* ${plano}\n` +
      `*Faixa Etária:* ${faixa}\n\n` +
      `_Vindo da tabela de preços do site_`
    );

    window.open(`https://wa.me/${phoneNumber}?text=${mensagem}`, '_blank');
  };

  return (
    /* ADICIONADO O ID "planos" ABAIXO PARA O FOOTER FUNCIONAR */
    <section id="planos" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-sm font-black text-[#0A2540] uppercase tracking-widest">Tabela Oficial</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-[#0A2540] mb-6 tracking-tighter uppercase italic">
            Investimento <span className="text-[#D4AF37]">Prevent Ma+s</span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 min-h-[400px] flex flex-col">
            
            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center p-20">
                <Loader2 className="w-12 h-12 text-[#D4AF37] animate-spin mb-4" />
                <p className="font-bold text-[#0A2540] uppercase tracking-widest italic">Sincronizando com n8n...</p>
              </div>
            ) : (
              <>
                {/* --- VERSÃO MOBILE --- */}
                <div className="block md:hidden p-6 space-y-6">
                  {plans.map((plan, index) => (
                    <div key={index} className={`p-6 rounded-[32px] border-2 ${plan.highlight ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-gray-50'}`}>
                      <p className="font-black text-[#0A2540] mb-4 uppercase text-center italic text-xl">{plan.ageGroup}</p>
                      <div className="space-y-4">
                        <button onClick={() => handlePlanSelection('Enfermaria', plan.ageGroup)} className="w-full p-4 bg-gray-100 rounded-2xl flex justify-between items-center group active:scale-95 transition-all">
                          <div className="text-left">
                            <p className="text-[10px] font-black text-gray-400 uppercase">Enfermaria</p>
                            <p className="text-xl font-black text-[#0A2540]">R$ {plan.enfermaria}</p>
                          </div>
                          <MessageCircle className="text-[#D4AF37] w-6 h-6" />
                        </button>
                        <button onClick={() => handlePlanSelection('Apartamento', plan.ageGroup)} className="w-full p-4 bg-[#0A2540] rounded-2xl flex justify-between items-center active:scale-95 transition-all">
                          <div className="text-left">
                            <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">Apartamento Premium</p>
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
                        <th className="px-10 py-8 text-left font-black uppercase tracking-widest text-xs italic">Faixa Etária</th>
                        <th className="px-10 py-8 text-center font-black uppercase tracking-widest text-xs italic">Plano Enfermaria</th>
                        <th className="px-10 py-8 text-center font-black uppercase tracking-widest text-xs italic text-[#D4AF37]">Apartamento Premium</th>
                      </tr>
                    </thead>
                    <tbody>
                      {plans.map((plan, index) => (
                        <tr key={index} className={`border-b border-gray-100 ${plan.highlight ? 'bg-[#D4AF37]/5' : ''}`}>
                          <td className="px-10 py-8">
                            <span className="font-black text-[#0A2540] text-2xl italic uppercase">{plan.ageGroup}</span>
                          </td>
                          <td className="px-10 py-8 text-center">
                            <button onClick={() => handlePlanSelection('Enfermaria', plan.ageGroup)} className="w-full group p-6 rounded-3xl hover:bg-white hover:shadow-xl transition-all">
                              <div className="text-3xl font-black text-[#0A2540]">R$ {plan.enfermaria}</div>
                              <div className="text-[10px] font-black text-gray-400 uppercase mt-2 tracking-widest group-hover:text-[#D4AF37]">Selecionar Plano</div>
                            </button>
                          </td>
                          <td className="px-10 py-8 text-center">
                            <button onClick={() => handlePlanSelection('Apartamento', plan.ageGroup)} className="w-full group p-6 rounded-3xl bg-white shadow-lg border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all">
                              <div className="text-3xl font-black text-[#D4AF37]">R$ {plan.apartamento}</div>
                              <div className="text-[10px] font-black text-[#0A2540] uppercase mt-2 tracking-widest italic">Selecionar Apartamento</div>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* BENEFÍCIOS RODAPÉ */}
                <div className="bg-[#0A2540]/5 p-12 grid grid-cols-2 md:grid-cols-3 gap-8 mt-auto">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-6 h-6 bg-[#D4AF37] rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-[#0A2540]" />
                      </div>
                      <span className="text-[11px] font-black text-[#0A2540] uppercase tracking-wider italic">{benefit}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={onCTAClick} 
            className="bg-[#0A2540] text-white px-16 py-6 rounded-2xl font-black text-xs uppercase tracking-[4px] shadow-2xl hover:bg-[#D4AF37] hover:text-[#0A2540] transition-all transform hover:scale-105 italic active:scale-95"
          >
            Falar com Consultor Especialista
          </button>
        </div>
      </div>
    </section>
  );
}