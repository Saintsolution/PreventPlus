export function Network() {
  const units = [
    {
      name: 'Malibu',
      inspiration: 'Havaí',
      image: 'https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-blue-500 to-cyan-400',
    },
    {
      name: 'Dubai',
      inspiration: 'Emirados Árabes',
      image: 'https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-amber-500 to-orange-400',
    },
    {
      name: 'Rússia',
      inspiration: 'Moscou',
      image: 'https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-red-500 to-pink-400',
    },
    {
      name: 'Cascais',
      inspiration: 'Portugal',
      image: 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-green-500 to-emerald-400',
    },
    {
      name: 'Istambul',
      inspiration: 'Turquia',
      image: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-purple-500 to-violet-400',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzBBMjU0MCIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-40"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0A2540] mb-4">
            Nossa{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#B8941F]">
              Rede de Cuidado
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unidades Temáticas inspiradas nos destinos mais sofisticados do mundo, proporcionando uma experiência única de cuidado e bem-estar
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {units.map((unit, index) => (
            <div
              key={index}
              className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={unit.image}
                  alt={unit.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-[#0A2540]/50 to-transparent opacity-80"></div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${unit.color} text-white text-sm font-medium mb-2`}>
                  Inspirado em {unit.inspiration}
                </div>
                <h3 className="text-2xl font-bold mb-1">{unit.name}</h3>
                <p className="text-white/80 text-sm">Unidade Temática Premium</p>
              </div>

              <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[#D4AF37] text-2xl">✦</span>
              </div>
            </div>
          ))}

          <div className="md:col-span-2 lg:col-span-1 bg-gradient-to-br from-[#0A2540] to-[#0D3A5F] rounded-3xl p-8 flex flex-col justify-center items-center text-center text-white">
            <div className="w-20 h-20 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mb-6">
              <span className="text-5xl text-[#D4AF37]">+</span>
            </div>
            <h3 className="text-2xl font-bold mb-3">Experiência Única</h3>
            <p className="text-white/80 leading-relaxed">
              Cada unidade oferece ambientes tematizados que proporcionam conforto, sofisticação e um atendimento de classe mundial.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/7659564/pexels-photo-7659564.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Equipe médica"
                className="w-full h-80 object-cover"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[#0A2540] mb-4">
                Tecnologia e Humanização
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Nossas unidades combinam o que há de mais moderno em tecnologia médica com um ambiente acolhedor e humanizado. Cada espaço foi cuidadosamente projetado para proporcionar não apenas tratamento médico de excelência, mas uma experiência completa de bem-estar.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span className="text-gray-700">Equipamentos de última geração</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span className="text-gray-700">Equipe altamente qualificada</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span className="text-gray-700">Ambientes projetados para o conforto</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
