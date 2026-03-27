import { Star, Award, HeartHandshake } from 'lucide-react';

export function Network() {
  // Lista manual das fotos com os nomes dos arquivos e legendas que você definiu
  const myPhotos = [
    { src: 'foto02.png', label: 'Centro Médico Havaí' },
    { src: 'foto03.png', label: 'Cuidado Especializado' },
    { src: 'foto13.png', label: 'Enfermaria Acolhedora' },
    { src: 'foto10.png', label: 'Quartos Premium' },
    { src: 'foto14.png', label: 'Tecnologia & Saúde' },
    { src: 'foto12.png', label: 'Tranquilidade' },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzBBMjU0MCIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-40"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- 1. BLOCO "NOSSO JEITO DE CUIDAR" (ID para âncora 'Sobre Nós') --- */}
        <div id="network-top" className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-100 mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
              <img
                src="ric_corretor.jpg"
                alt="Ricardo Chaves - Corretor Especialista"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/60 to-transparent"></div>
            </div>
            <div>
              <h3 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight text-[#0A2540]">
                Nosso Jeito de Cuidar
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Nós acreditamos que a saúde vai muito além de uma carteirinha. Nossa missão é oferecer a excelência da Prevent Senior com um olhar humano e carinhoso. Entendemos que cada história é única e, por isso, priorizamos o atendimento personalizado para que você se sinta seguro em todas as etapas.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <Award className="w-8 h-8 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-[#0A2540] block mb-1">30 Anos de Expertise</span>
                    <span className="text-sm text-gray-600">Três décadas de experiência no mercado de saúde suplementar.</span>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <HeartHandshake className="w-8 h-8 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-[#0A2540] block mb-1">Atendimento Presencial</span>
                    <span className="text-sm text-gray-600">Valorizamos o olho no olho e a conversa clara e acolhedora.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- 2. TÍTULO DA SEÇÃO --- */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0A2540] mb-4">
            Nossa{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#B8941F]">
              Rede de Cuidado
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Por que somos o diferencial que você merece?
          </p>
        </div>

        {/* --- 3. GRID DE FOTOS REAIS (ID para âncora 'Atendimento Diferenciado') --- */}
        <div id="network-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {myPhotos.map((photo, index) => (
            <div
              key={index}
              className="group relative rounded-[40px] overflow-hidden shadow-lg aspect-[4/3] bg-gray-100 border border-gray-200"
            >
              <img 
                src={photo.src} 
                alt={photo.label}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>

              {/* LEGENDA NOBRE (AMARELO DOURADO) */}
              <div className="absolute bottom-6 left-0 right-0 px-6">
                <div className="bg-[#D4AF37] text-[#0A2540] py-3 px-6 rounded-2xl font-black text-center uppercase italic shadow-lg transform group-hover:-translate-y-2 transition-transform text-xs sm:text-sm tracking-tighter">
                  {photo.label}
                </div>
              </div>

              <div className="absolute top-4 right-4 w-10 h-10 bg-[#D4AF37]/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Star className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}