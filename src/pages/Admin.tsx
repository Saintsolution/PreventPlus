import { useState, useEffect } from 'react';
import { 
  Phone, MapPin, Search, LogOut, BarChart3, 
  Lock, Settings, DollarSign, UserPlus, Edit2, Loader2, ArrowLeft,
  Trophy, UserCheck, UserX, ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { ModalPrecos } from '../components/ModalPrecos';
import { ModalVenda } from '../components/ModalVenda';
import { ModalIndicador } from '../components/ModalIndicador';

export function Admin() {
  const navigate = useNavigate();
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

  // WEBHOOKS ATUALIZADOS CONFORME SEU PRINT DO N8N
  const URL_PEGA_INDICADORES = "https://n8n.saintsolution.com.br/webhook/b46feb90-df11-489d-b234-d10de0ff82a6"; 
  const URL_PEGA_PRECOS = "https://n8n.saintsolution.com.br/webhook/a57e4858-d4d7-4071-8a94-2b1589d618c7"; // ID CORRIGIDO!
  const URL_SALVA_INDICADOR = "https://n8n.saintsolution.com.br/webhook/d0a5c115-56e3-4baf-ab74-876b6cc39a74";
  const URL_ATUALIZA_PRECO = "https://n8n.saintsolution.com.br/webhook/8f6225fa-b5cf-41a0-813e-2b158daf1464";

  const fetchIndicadores = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const res = await fetch(URL_PEGA_INDICADORES);
      const data = await res.json();
      const listaRaw = Array.isArray(data) ? data : (data.indicadores || []);
      const sorted = [...listaRaw].filter(i => i.nome).sort((a, b) => (Number(b.vendas) || 0) - (Number(a.vendas) || 0));
      setIndicadores(sorted);
    } catch (err) {
      console.error("Erro indicadores:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPrecos = async () => {
    if (!isAuthenticated) return;
    try {
      // Adicionado timestamp (?t=...) para evitar cache de erro do navegador
      const res = await fetch(`${URL_PEGA_PRECOS}?t=${Date.now()}`);
      if (!res.ok) throw new Error("Falha na resposta dos preços");
      const data = await res.json();
      const deFatoPrecos = Array.isArray(data) ? data.filter((p: any) => p.cod_plan) : [];
      if (deFatoPrecos.length > 0) {
        setPrecos(deFatoPrecos);
        console.log("✅ Preços carregados com a URL nova!");
      }
    } catch (err) {
      console.error("Erro preços (Verifique o CORS no n8n):", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchIndicadores();
      fetchPrecos();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') setIsAuthenticated(true);
    else alert("Senha incorreta!");
  };

  const handleSavePrecos = async () => {
    setLoading(true);
    try {
      const res = await fetch(URL_ATUALIZA_PRECO, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(precos)
      });
      if (res.ok) {
        alert("Preços atualizados com sucesso!");
        await fetchPrecos(); 
        setActiveModal(null);
      }
    } catch (err) {
      alert("Erro ao salvar preços.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveIndicador = async (dadosvindosdoModal: any) => {
    setLoading(true);
    const payload = {
      action: selectedIndicador ? 'UPDATE_INDICADOR' : 'INSERT_INDICADOR',
      id: selectedIndicador?.id || null,
      nome: dadosvindosdoModal.nome || "",
      local: dadosvindosdoModal.local || "",
      whatsapp: dadosvindosdoModal.whatsapp || "",
      status: dadosvindosdoModal.status || 'ativo'
    };

    try {
      const response = await fetch(URL_SALVA_INDICADOR, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert("Dados salvos com sucesso!");
        await fetchIndicadores(); 
        setActiveModal(null);
      }
    } catch (err) {
      alert("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A2540] flex items-center justify-center p-6">
        <div className="bg-white rounded-[40px] p-10 shadow-2xl w-full max-w-sm text-center border-t-8 border-[#D4AF37]">
          <Lock className="w-12 h-12 text-[#D4AF37] mx-auto mb-6" />
          <h2 className="text-2xl font-black text-[#0A2540] mb-8 uppercase italic text-center">Acesso Saint</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" placeholder="SENHA" className="w-full px-6 py-4 rounded-2xl bg-gray-50 text-center font-black outline-none focus:ring-2 ring-[#D4AF37]" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="w-full bg-[#0A2540] text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg hover:bg-[#D4AF37] hover:text-[#0A2540] transition-all">Entrar</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row font-sans">
      <aside className="w-full lg:w-72 bg-[#0A2540] p-8 text-white flex flex-col shrink-0 sticky top-0 h-screen">
        <div className="mb-10 flex flex-col gap-4">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-[10px] font-black uppercase text-[#D4AF37] hover:text-white transition-all">
            <ArrowLeft className="w-4 h-4" /> Voltar ao Site
          </button>
          <h1 className="text-2xl font-black italic tracking-tighter text-[#D4AF37]">SaintSolution</h1>
        </div>
        <div className="space-y-3">
          <button onClick={() => { setActiveModal(null); fetchIndicadores(); }} className={`w-full flex items-center gap-4 p-4 rounded-2xl font-black text-[10px] uppercase transition-all ${!activeModal ? 'bg-[#D4AF37] text-[#0A2540]' : 'text-gray-400 hover:bg-white/5'}`}>
            <BarChart3 className="w-5 h-5" /> Dashboard
          </button>
          <button onClick={() => { setSelectedIndicador(null); setActiveModal('indicador'); }} className={`w-full flex items-center gap-4 p-4 rounded-2xl font-black text-[10px] uppercase transition-all ${activeModal === 'indicador' ? 'bg-[#D4AF37] text-[#0A2540]' : 'text-gray-400 hover:bg-white/5'}`}>
            <UserPlus className="w-5 h-5" /> Novo Parceiro
          </button>
          <button onClick={() => setActiveModal('precos')} className={`w-full flex items-center gap-4 p-4 rounded-2xl font-black text-[10px] uppercase transition-all ${activeModal === 'precos' ? 'bg-[#D4AF37] text-[#0A2540]' : 'text-gray-400 hover:bg-white/5'}`}>
            <Settings className="w-5 h-5" /> Editar Preços
          </button>
        </div>
        <button onClick={() => setIsAuthenticated(false)} className="mt-auto flex items-center gap-3 text-gray-500 font-black text-[10px] uppercase hover:text-red-400 pt-6 border-t border-white/5">
          <LogOut className="w-4 h-4" /> Sair do Painel
        </button>
      </aside>

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-black text-[#0A2540] tracking-tighter uppercase italic">Performance Real</h2>
          <div className="relative w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
            <input type="text" placeholder="Filtrar por nome..." className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white shadow-sm font-bold text-sm outline-none" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>

        <div className="grid gap-4">
          {indicadores.filter(i => i.nome?.toLowerCase().includes(searchTerm.toLowerCase())).map((ind, index) => (
            <div key={ind.id || index} className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex items-center justify-between gap-6 relative group hover:border-[#D4AF37] transition-all">
              
              <div className="absolute -top-3 -left-2 bg-[#0A2540] text-[#D4AF37] text-[9px] font-black px-3 py-1.5 rounded-full shadow-xl z-10 border border-[#D4AF37] flex items-center gap-1 uppercase tracking-tighter italic">
                <Trophy className="w-3 h-3" /> POS {index + 1}º
              </div>

              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex flex-col items-center justify-center border border-gray-100 shadow-inner group-hover:bg-white transition-all">
                  <span className="text-[8px] font-black text-gray-300 uppercase leading-none">REF</span>
                  <span className="text-lg font-black text-[#0A2540] leading-none">{ind.id || index + 1}</span>
                </div>
                
                <div className="min-w-[180px]">
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-[#0A2540] uppercase text-sm tracking-tight">{ind.nome}</h3>
                    {ind.status === 'inativo' ? 
                      <span className="flex items-center gap-1 text-[7px] font-black text-red-500 bg-red-50 px-2 py-1 rounded-md uppercase border border-red-100">Inativo</span> : 
                      <span className="flex items-center gap-1 text-[7px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-md uppercase border border-green-100">Ativo</span>
                    }
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">
                    <MapPin className="w-3 h-3 inline mr-1 text-[#D4AF37]" />{ind.local}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8 bg-gray-50/50 py-4 px-8 rounded-2xl border border-dashed border-gray-200">
                <div className="text-center">
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Vendas Totais</p>
                  <div className="flex items-center justify-center gap-2">
                    <p className="font-black text-[#0A2540] text-xl">{ind.vendas || 0}</p>
                    {index === 0 && <div className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-lg font-black italic">LÍDER</div>}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={() => { setSelectedIndicador(ind); setActiveModal('indicador'); }} className="p-4 bg-gray-50 text-gray-400 rounded-2xl hover:bg-[#0A2540] hover:text-white transition-all border border-transparent hover:border-[#D4AF37]">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => { setSelectedIndicador(ind); setActiveModal('venda'); }} className="px-7 py-4 bg-green-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-green-700 transition-all shadow-lg hover:scale-105 transform">
                  <DollarSign className="w-4 h-4" /> Registrar Venda
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <ModalPrecos isOpen={activeModal === 'precos'} onClose={() => setActiveModal(null)} precos={precos} setPrecos={setPrecos} onSave={handleSavePrecos} loading={loading} />
      <ModalIndicador isOpen={activeModal === 'indicador'} onClose={() => setActiveModal(null)} indicadorParaEditar={selectedIndicador} onSave={handleSaveIndicador} />
      <ModalVenda isOpen={activeModal === 'venda'} onClose={() => setActiveModal(null)} indicadorNome={selectedIndicador?.nome || ''} onConfirm={fetchIndicadores} />
    </div>
  );
}