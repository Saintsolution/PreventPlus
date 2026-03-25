import { useState, useEffect } from 'react';
import { 
  Phone, MapPin, Search, LogOut, BarChart3, 
  Lock, Settings, DollarSign, UserPlus, Edit2, Loader2 
} from 'lucide-react';

import { ModalPrecos } from '../components/ModalPrecos';
import { ModalVenda } from '../components/ModalVenda';
import { ModalIndicador } from '../components/ModalIndicador';

export function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeModal, setActiveModal] = useState<null | 'precos' | 'venda' | 'indicador'>(null);
  const [selectedIndicador, setSelectedIndicador] = useState<any>(null);
  const [indicadores, setIndicadores] = useState<any[]>([]);
  const [precos, setPrecos] = useState<any[]>([
    { cod_plan: 'E1', valor_mensalidade: '0.00' },
    { cod_plan: 'E2', valor_mensalidade: '0.00' },
    { cod_plan: 'E3', valor_mensalidade: '0.00' },
    { cod_plan: 'A1', valor_mensalidade: '0.00' },
    { cod_plan: 'A2', valor_mensalidade: '0.00' },
    { cod_plan: 'A3', valor_mensalidade: '0.00' },
  ]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const N8N_URL = "https://n8n.saintsolution.com.br/webhook/a57e4858-d4d7-4071-8a94-2b1589d618c7";

  const loadDashboard = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const res = await fetch(N8N_URL);
      if (!res.ok) throw new Error("Erro no servidor");
      
      const data = await res.json();
      
      // Separar indicadores e preços do que vem do n8n
      const listaRaw = Array.isArray(data) ? data : (data.indicadores || []);
      const precosVindoDoN8n = Array.isArray(data.precos) ? data.precos : (Array.isArray(data) && data[0]?.cod_plan ? data : []);

      // Atualiza indicadores com o ranking
      const sorted = [...listaRaw].filter(i => i.nome).sort((a, b) => {
        const vA = Number(a.vendas) || 0;
        const vB = Number(b.vendas) || 0;
        if (vB !== vA) return vB - vA;
        const dA = Math.max(1, (new Date().getTime() - new Date(a.data_inicio || Date.now()).getTime()) / 86400000);
        const dB = Math.max(1, (new Date().getTime() - new Date(b.data_inicio || Date.now()).getTime()) / 86400000);
        return (vB / dB) - (vA / dA);
      });

      setIndicadores(sorted);

      // Se vierem preços do n8n, a gente mescla com a nossa estrutura padrão
      if (precosVindoDoN8n.length > 0) {
        setPrecos(prev => prev.map(p => {
          const encontrado = precosVindoDoN8n.find((item: any) => item.cod_plan === p.cod_plan);
          return encontrado ? { ...p, valor_mensalidade: encontrado.valor_mensalidade } : p;
        }));
      }

    } catch (err) {
      console.error("Erro na Saint Base:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') setIsAuthenticated(true);
    else alert("Senha incorreta!");
  };

  const handleSavePrecos = async () => {
    setLoading(true);
    try {
      // Mandamos os 6 preços de uma vez pro n8n (que já tem o Split Out pronto!)
      await fetch("https://n8n.saintsolution.com.br/webhook/8f6225fa-b5cf-41a0-813e-2b158daf1464", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(precos)
      });
      alert("Preços atualizados na planilha!");
      setActiveModal(null);
    } catch (err) {
      alert("Erro ao salvar preços.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveIndicador = async (dados: any) => {
    setLoading(true);
    try {
      await fetch(N8N_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: selectedIndicador ? 'UPDATE_INDICADOR' : 'INSERT_INDICADOR',
          ...dados 
        })
      });
      alert("Operação realizada com sucesso!");
      setActiveModal(null);
      loadDashboard();
    } catch (err) {
      alert("Erro ao salvar dados.");
    } finally {
      setLoading(false);
    }
  };

  const registrarVenda = async (cliente: string, plano: string) => {
    setLoading(true);
    try {
      await fetch(N8N_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'REGISTRAR_VENDA',
          indicador_id: selectedIndicador?.id,
          cliente,
          plano
        })
      });
      alert("Venda registrada!");
      setActiveModal(null);
      loadDashboard();
    } catch (err) {
      alert("Erro ao registrar venda.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A2540] flex items-center justify-center p-6">
        <div className="bg-white rounded-[40px] p-10 shadow-2xl w-full max-w-sm text-center">
          <Lock className="w-12 h-12 text-[#D4AF37] mx-auto mb-6" />
          <h2 className="text-2xl font-black text-[#0A2540] mb-8 uppercase italic">Acesso Saint</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" placeholder="SENHA" className="w-full px-6 py-4 rounded-2xl bg-gray-50 text-center font-black outline-none focus:ring-2 ring-[#D4AF37]" onChange={(e) => setPassword(e.target.value)} />
            <button className="w-full bg-[#0A2540] text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg">Entrar</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row font-sans">
      <aside className="w-full lg:w-72 bg-[#0A2540] p-8 text-white flex flex-col shrink-0 sticky top-0 h-screen">
        <div className="mb-10">
          <h1 className="text-2xl font-black italic tracking-tighter text-[#D4AF37]">SaintSolution</h1>
          <p className="text-[9px] font-bold uppercase tracking-[0.3em]">Gestão PreventPlus</p>
        </div>
        
        <div className="space-y-3">
          <button onClick={() => setActiveModal(null)} className={`w-full flex items-center gap-4 p-4 rounded-2xl font-black text-[10px] uppercase transition-all ${!activeModal ? 'bg-[#D4AF37] text-[#0A2540]' : 'text-gray-400 hover:bg-white/5'}`}>
            <BarChart3 className="w-5 h-5" /> Dashboard
          </button>
          <button onClick={() => { setSelectedIndicador(null); setActiveModal('indicador'); }} className="w-full flex items-center gap-4 p-4 rounded-2xl text-gray-400 hover:bg-white/5 font-black text-[10px] uppercase transition-all">
            <UserPlus className="w-5 h-5" /> Novo Parceiro
          </button>
          <button onClick={() => setActiveModal('precos')} className={`w-full flex items-center gap-4 p-4 rounded-2xl font-black text-[10px] uppercase transition-all ${activeModal === 'precos' ? 'bg-[#D4AF37] text-[#0A2540]' : 'text-gray-400 hover:bg-white/5'}`}>
            <Settings className="w-5 h-5" /> Editar Preços
          </button>
        </div>

        <button onClick={() => setIsAuthenticated(false)} className="mt-auto flex items-center gap-3 text-gray-500 font-black text-[10px] uppercase hover:text-red-400 pt-6 border-t border-white/5">
          <LogOut className="w-4 h-4" /> Sair
        </button>
      </aside>

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <h2 className="text-3xl font-black text-[#0A2540] tracking-tighter uppercase italic">Performance Real</h2>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
            <input type="text" placeholder="Filtrar por nome..." className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white shadow-sm font-bold text-sm outline-none" onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>

        <div className="grid gap-4">
          {indicadores.length > 0 ? (
            indicadores.filter(i => i.nome?.toLowerCase().includes(searchTerm.toLowerCase())).map((ind, index) => (
              <div key={ind.id} className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative group transition-all">
                <div className={`absolute top-0 left-0 w-2 h-full ${index === 0 ? 'bg-[#D4AF37]' : 'bg-gray-100'}`}></div>
                <div className="flex items-center gap-6 min-w-[250px]">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center font-black text-[#0A2540]">{ind.id}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-[#0A2540] uppercase text-sm">{ind.nome}</h3>
                      <button onClick={() => { setSelectedIndicador(ind); setActiveModal('indicador'); }} className="text-gray-300 hover:text-[#D4AF37]"><Edit2 className="w-3 h-3"/></button>
                    </div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase"><MapPin className="w-3 h-3 inline mr-1" />{ind.local}</p>
                  </div>
                </div>

                <div className="flex items-center gap-8 bg-gray-50/50 py-4 px-6 rounded-2xl">
                  <div className="text-center"><p className="text-[8px] font-black text-gray-400 uppercase">Vendas</p><p className="font-black text-[#0A2540] text-lg">{ind.vendas || 0}</p></div>
                </div>

                <div className="flex items-center gap-2">
                  <a href={`https://wa.me/${ind.whatsapp}`} target="_blank" className="p-4 bg-green-50 text-green-500 rounded-2xl hover:bg-green-500 hover:text-white transition-all"><Phone className="w-5 h-5" /></a>
                  <button onClick={() => { setSelectedIndicador(ind); setActiveModal('venda'); }} className="px-6 py-4 bg-green-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-[#0A2540] transition-all">
                    <DollarSign className="w-4 h-4" /> Venda Fechada
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-20 text-center text-gray-300 font-black uppercase">
              {loading ? <Loader2 className="animate-spin mx-auto w-8 h-8 mb-4" /> : "Nenhum parceiro na base."}
            </div>
          )}
        </div>
      </main>

      {/* MODAIS */}
      <ModalPrecos 
        isOpen={activeModal === 'precos'} 
        onClose={() => setActiveModal(null)} 
        precos={precos} 
        setPrecos={setPrecos} 
        onSave={handleSavePrecos} 
        loading={loading} 
      />
      
      <ModalVenda 
        isOpen={activeModal === 'venda'} 
        onClose={() => setActiveModal(null)} 
        indicadorNome={selectedIndicador?.nome || ''} 
        onConfirm={registrarVenda} 
      />

      <ModalIndicador 
        isOpen={activeModal === 'indicador'} 
        onClose={() => setActiveModal(null)} 
        indicadorParaEditar={selectedIndicador} 
        onSave={handleSaveIndicador} 
      />
    </div>
  );
}