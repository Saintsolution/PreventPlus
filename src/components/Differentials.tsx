import { User, MapPin, TrendingDown, Brain, Plane, HeartPulse } from 'lucide-react';

export function Differentials() {
  const differentials = [
    {
      icon: User,
      title: 'Portabilidade Segura',
      description: 'Mude para a PREVENT SENIOR mantendo seus direitos. Analisamos sua portabilidade para garantir toda as suas coberturs atuais sem perda',
    },
    {
      icon: MapPin,
      title: 'Segurança Financeira',
      description: 'Mensalidade sem surpresas após os 50 anos.Desfrute da única segurança financeira real: zero reajuste por idade.',
    },
    {
      icon: TrendingDown,
      title: 'Sem Coparticipação',
      description: 'Use o quanto precisar, sem custos adicionais.Valor fixo mensal. Sem taxas por consultas ou exames e sem surpresas na fatura.',
    },
    {
      icon: Brain,
      title: 'Inteligência Artificial',
      description: 'IAs exclusivas para diagnósticos precisos e confiáveis.',
    },
    {
      icon: Plane,
      title: 'Remoção Aérea',
      description: 'Cobertura para remoção aérea em todo território nacional.',
    },
    {
      icon: HeartPulse,
      title: 'Telemedicina 24h',
      description: 'Atendimento médico online disponível todos os dias, a qualquer hora.',
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0A2540]/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0A2540] mb-4">
            Diferenciais que{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#B8941F]">
              transformam
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tecnologia de ponta aliada ao cuidado humanizado para sua tranquilidade
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentials.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#D4AF37]/30 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#0A2540] to-[#0D3A5F] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-[#D4AF37]" />
                  </div>

                  <h3 className="text-xl font-bold text-[#0A2540] mb-3 group-hover:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
