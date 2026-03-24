import { Check, Sparkles } from 'lucide-react';

interface PricingProps {
  onCTAClick: () => void;
}

export function Pricing({ onCTAClick }: PricingProps) {
  const plans = [
    {
      ageGroup: 'Até 43 anos',
      enfermaria: '883,53',
      apartamento: '1.055,50',
      highlight: false,
    },
    {
      ageGroup: '44 a 58 anos',
      enfermaria: '1.162,60',
      apartamento: '1.389,60',
      highlight: true,
    },
    {
      ageGroup: '59 anos em diante',
      enfermaria: '1.529,75',
      apartamento: '1.828,43',
      highlight: false,
    },
  ];

  const benefits = [
    'Sem coparticipação',
    'Sem reajuste por idade a partir dos 44 anos',
    'Cobertura em SP e RJ',
    'Telemedicina 24h',
    'Remoção aérea nacional',
    'IAs para diagnósticos precisos',
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-sm font-medium text-[#0A2540]">Plano Prevent Ma+s</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0A2540] mb-4 text-balance">
            Investimento na sua{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#B8941F]">
              saúde e tranquilidade
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Planos personalizados para cada fase da vida, com valores justos e transparentes
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            
            {/* --- VERSÃO MOBILE (CARDS) --- */}
            <div className="block md:hidden p-4 space-y-4">
              {plans.map((plan, index) => (
                <div 
                  key={index} 
                  className={`p-6 rounded-2xl border ${plan.highlight ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-gray-100'}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-[#0A2540]">{plan.ageGroup}</span>
                    {plan.highlight && <span className="text-[10px] bg-[#D4AF37] text-[#0A2540] px-2 py-1 rounded-full font-bold uppercase">Mais Procurado</span>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">Enfermaria</p>
                      <p className="text-xl font-bold text-[#0A2540]">R$ {plan.enfermaria}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#D4AF37] uppercase font-bold">Apartamento</p>
                      <p className="text-xl font-bold text-[#D4AF37]">R$ {plan.apartamento}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* --- VERSÃO DESKTOP (TABELA) --- */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-[#0A2540] to-[#0D3A5F] text-white">
                    <th className="px-6 py-6 text-left text-lg font-bold">Faixa Etária</th>
                    <th className="px-6 py-6 text-center text-lg font-bold">Enfermaria</th>
                    <th className="px-6 py-6 text-center text-lg font-bold">
                      <div className="flex items-center justify-center gap-2">
                        Apartamento
                        <span className="bg-[#D4AF37] text-[#0A2540] text-xs px-2 py-1 rounded-full font-semibold">
                          Premium
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-100 transition-all duration-300 ${
                        plan.highlight
                          ? 'bg-gradient-to-r from-[#D4AF37]/5 to-[#D4AF37]/10'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-3">
                          {plan.highlight && (
                            <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse"></div>
                          )}
                          <span className="font-semibold text-[#0A2540] text-lg">
                            {plan.ageGroup}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <div className="text-2xl font-bold text-[#0A2540]">
                          R$ {plan.enfermaria}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">por mês</div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <div className="text-2xl font-bold text-[#D4AF37]">
                          R$ {plan.apartamento}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">por mês</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* RODAPÉ DA TABELA (BENEFÍCIOS) - MANTIDO IGUAL */}
            <div className="bg-gradient-to-r from-gray-50 to-white p-8 border-t border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-sm">
                      <Check className="w-4 h-4 text-[#0A2540]" />
                    </div>
                    <span className="text-gray-700 text-sm font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CARDS EXTRAS (APP E CLUBE) - MANTIDO IGUAL */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-br from-[#0A2540] to-[#0D3A5F] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="text-2xl font-bold text-[#0A2540] mb-3">
              Aplicativo Integrado
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Gerencie suas consultas, exames e telemedicina direto do seu smartphone com praticidade e segurança.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-3xl p-8 shadow-lg text-[#0A2540] hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-2xl font-bold mb-3">
              Clube Experiências que Encantam
            </h3>
            <p className="leading-relaxed text-[#0A2540]/90 font-medium">
              Descontos exclusivos em lazer, gastronomia e cultura. Mais qualidade de vida para você e sua família.
            </p>
          </div>
        </div>

        <div className="text-center mt-16">
          <button
            onClick={onCTAClick}
            className="group bg-[#D4AF37] hover:bg-[#B8941F] text-[#0A2540] px-10 py-5 rounded-full font-black text-lg transition-all duration-300 shadow-xl shadow-[#D4AF37]/20 hover:shadow-2xl hover:shadow-[#D4AF37]/30 hover:scale-105 inline-flex items-center gap-3"
          >
            Solicitar Cotação Personalizada
            <Check className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
          <p className="text-gray-500 mt-6 text-sm font-medium">
            Sem compromisso • Resposta rápida via WhatsApp
          </p>
        </div>
      </div>
    </section>
  );
}