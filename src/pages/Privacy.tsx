import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export function Privacy() {
  return (
    <div className="min-h-screen bg-[#0A2540] text-white font-sans">
      <nav className="border-b border-white/10 py-6 bg-[#0D3A5F]">
        <div className="container mx-auto px-4 flex items-center gap-2">
           <div className="w-8 h-8 bg-[#D4AF37] rounded flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#0A2540]" />
           </div>
           <span className="text-xl font-black text-[#D4AF37] uppercase italic tracking-tighter">PreventPlus</span>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-20 max-w-4xl">
        <div className="bg-[#0D3A5F] rounded-[32px] p-8 md:p-12 shadow-2xl border border-white/10">
          <h1 className="text-3xl md:text-5xl font-black uppercase italic text-[#D4AF37] mb-8 border-b-4 border-[#D4AF37] pb-4 inline-block">
            Política de Privacidade
          </h1>

          <div className="space-y-10 text-white/80 leading-relaxed">
            <section className="flex gap-4">
              <div className="flex-shrink-0"><Lock className="w-6 h-6 text-[#D4AF37]" /></div>
              <div>
                <h2 className="text-xl font-black text-white uppercase italic mb-3">1. Compromisso com a Segurança</h2>
                <p>A PreventPlus, liderada por Ricardo Chaves, respeita a sua privacidade. Todos os dados coletados para análise de portabilidade ou cotação de planos Prevent Senior são tratados com sigilo absoluto, conforme a Lei Geral de Proteção de Dados (LGPD).</p>
              </div>
            </section>

            <section className="flex gap-4">
              <div className="flex-shrink-0"><Eye className="w-6 h-6 text-[#D4AF37]" /></div>
              <div>
                <h2 className="text-xl font-black text-white uppercase italic mb-3">2. Coleta de Informações</h2>
                <p>Ao enviar seus dados através de nossos formulários ou botões de contato, coletamos apenas o necessário para realizar a consultoria técnica: Nome, Telefone e informações sobre seu plano atual para análise de carências.</p>
              </div>
            </section>

            <section className="flex gap-4">
              <div className="flex-shrink-0"><FileText className="w-6 h-6 text-[#D4AF37]" /></div>
              <div>
                <h2 className="text-xl font-black text-white uppercase italic mb-3">3. Finalidade dos Dados</h2>
                <p>Seus dados são utilizados exclusivamente para entrar em contato e fornecer a Consultoria Premium solicitada. Não compartilhamos suas informações com terceiros para fins publicitários.</p>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <a href="/" className="text-[#D4AF37] font-black uppercase italic tracking-widest hover:underline">
              ← Voltar para a Página Principal
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}