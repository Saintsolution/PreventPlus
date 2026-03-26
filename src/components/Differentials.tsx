import { Brain, Plane, HeartPulse, Building2, Stethoscope, ShieldCheck } from 'lucide-react';

export function Differentials() {
  const secondaryDifferentials = [
    {
      icon: Brain,
      title: 'Inteligência Artificial',
      description: 'IAs exclusivas que auxiliam médicos em diagnósticos precoces e tratamentos personalizados.',
    },
    {
      icon: Plane,
      title: 'Remoção Aérea',
      description: 'Logística de ponta com suporte aéreo para transferência entre unidades em todo o Brasil.',
    },
    {
      icon: HeartPulse,
      title: 'Telemedicina 24h',
      description: 'Acesso imediato a médicos de plantão diretamente pelo celular, sem sair de casa.',
    },
    {
      icon: Building2,
      title: 'Rede Própria',
      description: 'Hospitais e núcleos de medicina avançada exclusivos para beneficiários Prevent Senior.',
    },
    {
      icon: Stethoscope,
      title: 'Medicina Preventiva',
      description: 'Programas focados em longevidade e acompanhamento constante da sua saúde.',
    },
    {
      icon: ShieldCheck,
      title: 'Sem Carência em Grupos',
      description: 'Condições especiais para migração de grupos familiares e empresas.',
    },
  ];

  return (
    <section className="py-24 bg-gray-50/50 border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-[#0A2540] uppercase italic mb-4">
            Tecnologia a serviço da <span className="text-[#D4AF37]">Longevidade</span>
          </h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {secondaryDifferentials.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-[#0A2540] transition-colors">
                    <Icon className="w-6 h-6 text-[#0A2540] group-hover:text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="font-black text-[#0A2540] uppercase text-xs italic mb-2 tracking-wider">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}