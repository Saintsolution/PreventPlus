import { ArrowRight, Shield } from 'lucide-react';

interface HeroProps {
  onCTAClick: () => void;
}

export function Hero({ onCTAClick }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#0A2540] via-[#0D3A5F] to-[#0A2540]">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4269492/pexels-photo-4269492.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center"></div>
      </div>

      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/5 to-transparent"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 backdrop-blur-sm px-4 py-2 rounded-full border border-[#D4AF37]/30">
              <Shield className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-sm font-medium text-[#D4AF37]">28 anos de excelência em saúde</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Cuidar bem é entregar{' '}
              <span className="text-[#D4AF37] relative">
                mais
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4AF37] to-transparent"></div>
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                A evolução da saúde sênior
              </span>
            </h1>

            <p className="text-xl text-white/80 leading-relaxed max-w-xl">
              Oferecemos saúde de excelência com acolhimento, tecnologia e inovação para o público sênior há mais de 28 anos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onCTAClick}
                className="group bg-[#D4AF37] hover:bg-[#B8941F] text-[#0A2540] px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-[#D4AF37]/20 hover:shadow-2xl hover:shadow-[#D4AF37]/30 hover:scale-105"
              >
                Solicitar Cotação
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 border border-white/20 hover:border-white/40 text-center"
              >
                Falar com Consultor
              </a>
            </div>

            <div className="flex items-center gap-8 pt-8 border-t border-white/10">
              <div>
                <div className="text-3xl font-bold text-[#D4AF37]">28+</div>
                <div className="text-sm text-white/60">Anos de história</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#D4AF37]">5</div>
                <div className="text-sm text-white/60">Unidades temáticas</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#D4AF37]">24/7</div>
                <div className="text-sm text-white/60">Telemedicina</div>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/20 to-transparent rounded-3xl blur-3xl"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src="https://images.pexels.com/photos/7551659/pexels-photo-7551659.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Casal sênior feliz"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="text-lg font-medium">Excelência em cuidados sênior</p>
                <p className="text-white/70">Tecnologia de ponta e acolhimento humano</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
