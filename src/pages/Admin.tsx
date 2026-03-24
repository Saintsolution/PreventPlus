import { useState, useEffect } from 'react';
import { Lock, LogOut, Users, Eye, UserPlus, Copy, Check, CreditCard as Edit, BarChart3, Search, DollarSign } from 'lucide-react';

interface Indicator {
  id: string;
  nome_contato: string | null;
  whatsapp: string | null;
  local: string | null;
  ativo: boolean;
  visitas: number;
  leads: number;
  vendas: number; // Novo campo para a demo
}

export function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [selectedIndicator, setSelectedIndicator] = useState<string | null>(null);
  const [editingData, setEditingData] = useState({
    nome_contato: '',
    whatsapp: '',
    local: '',
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const authStatus = sessionStorage.getItem('admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      loadIndicators();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      loadIndicators();
    } else {
      alert('Senha incorreta');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
    window.location.href = '/';
  };

  const loadIndicators = async () => {
    setLoading(true);
    setTimeout(() => {
      const fakeData: Indicator[] = Array.from({ length: 50 }, (_, i) => {
        const id = (i + 1).toString().padStart(3, '0');
        const exemplos = [
          { nome: "Porteiro Wilson", local: "Edifício Malibu - Barra", tel: "(21) 98888-1111", v: 145, l: 12, s: 2 },
          { nome: "Zelador Sebastião", local: "Condomínio Dubai - Recreio", tel: "(21) 97777-2222", v: 82, l: 5, s: 1 },
          { nome: "Jorge (Banca de Jornal)", local: "Esquina Unidade Rússia", tel: "(21) 96666-3333", v: 340, l: 28, s: 5 }
        ];

        return {
          id: id,
          nome_contato: exemplos[i]?.nome || null,
          whatsapp: exemplos[i]?.tel || null,
          local: exemplos[i]?.local || null,
          ativo: !!exemplos[i],
          visitas: exemplos[i]?.v || 0,
          leads: exemplos[i]?.l || 0,
          vendas: exemplos[i]?.s || 0,
        };
      });

      setIndicators(fakeData);
      setLoading(false);
    }, 800);
  };

 const handleRegisterSale = (id: string) => {
    const indicador = indicators.find(i => i.id === id);
    const nome = indicador?.nome_contato || `ID ${id}`;
    
    // Simulação de fluxo de fechamento
    const plano = prompt(`Registrar venda para ${nome}:\n1 - Enfermaria\n2 - Apartamento`, "1");
    
    if (plano) {
      const formaPgto = prompt(`Forma de Recebimento:\n1 - PIX/Dinheiro (Manual)\n2 - Link Asaas (Cartão/Boleto)`, "1");
      
      if (formaPgto) {
        alert(`Venda registrada com sucesso!\n\nID: ${id}\nIndicador: ${nome}\nPlano: ${plano === "1" ? "Enfermaria" : "Apartamento"}\nOrigem: ${formaPgto === "1" ? "Manual (PIX/Dinheiro)" : "Digital (Asaas)"}\n\nO n8n já está processando o bônus do indicador.`);
        loadIndicators();
      }
    }
  };

  const handleSelectIndicator = (id: string) => {
    const indicator = indicators.find((i) => i.id === id);
    if (indicator) {
      setSelectedIndicator(id);
      setEditingData({
        nome_contato: indicator.nome_contato || '',
        whatsapp: indicator.whatsapp || '',
        local: indicator.local || '',
      });
    }
  };

  const handleSaveIndicator = async () => {
    if (!selectedIndicator) return;
    alert(`Modo Demo: O indicador ${selectedIndicator} foi atualizado.`);
    setSelectedIndicator(null);
    loadIndicators();
  };

  const copyLink = (id: string) => {
    const link = `${window.location.origin}/?ref=${id}`;
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredIndicators = indicators.filter(
    (ind) =>
      ind.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ind.nome_contato?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ind.local?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalVisits = indicators.reduce((sum, ind) => sum + ind.visitas, 0);
  const totalLeads = indicators.reduce((sum, ind) => sum + ind.leads, 0);
  const totalSales = indicators.reduce((sum, ind) => sum + ind.vendas, 0);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A2540] flex items-center justify-center p-4">
        <div className="bg-white rounded-[40px] shadow-2xl p-10 w-full max-w-md text-center">
          <div className="w-20 h-20 bg-[#D4AF37] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-[#D4AF37]/20">
            <Lock className="w-10 h-10 text-[#0A2540]" />
          </div>
          <h1 className="text-3xl font-black text-[#0A2540] mb-2 uppercase tracking-tight">Login Admin</h1>
          <p className="text-gray-400 font-medium mb-10 text-sm">Controle de Panfletagem PreventPlus</p>

          <form onSubmit={handleLogin} className="space-y-6 text-left">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-[#D4AF37] outline-none transition-all text-center text-xl tracking-[0.5em]"
              placeholder="••••••"
              required
            />
            <button type="submit" className="w-full bg-[#0A2540] hover:bg-[#0D3A5F] text-white py-5 rounded-2xl font-black text-lg transition-all shadow-xl">
              ACESSAR PAINEL
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#0A2540] rounded-2xl flex items-center justify-center"><BarChart3 className="w-6 h-6 text-[#D4AF37]" /></div>
            <div>
              <h1 className="text-xl font-black text-[#0A2540] leading-none uppercase tracking-tighter">Ricardo Admin</h1>
              <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] mt-1">Gestão de Vendas PreventPlus</p>
            </div>
          </div>
          <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors"><LogOut className="w-6 h-6" /></button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Visitas Totais</p>
            <div className="text-4xl font-black text-[#0A2540]">{totalVisits}</div>
          </div>
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Leads Gerados</p>
            <div className="text-4xl font-black text-[#0A2540]">{totalLeads}</div>
          </div>
          <div className="bg-[#D4AF37] p-8 rounded-[32px] shadow-lg">
            <p className="text-xs font-black text-[#0A2540] uppercase tracking-widest mb-2">Vendas Fechadas</p>
            <div className="text-4xl font-black text-[#0A2540]">{totalSales}</div>
          </div>
        </div>

        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
            <h2 className="text-2xl font-black text-[#0A2540] tracking-tight">Indicadores (001-050)</h2>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-[#D4AF37]/50 font-bold"
                placeholder="Buscar por nome ou bairro..."
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 text-[10px] font-black uppercase tracking-[0.15em] text-gray-400">
                <tr>
                  <th className="px-8 py-5">Ref ID</th>
                  <th className="px-8 py-5">Responsável</th>
                  <th className="px-8 py-5 text-center">Métricas (V/L/V)</th>
                  <th className="px-8 py-5 text-right">Ações Rápidas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredIndicators.map((ind) => (
                  <tr key={ind.id} className="group hover:bg-gray-50/50 transition-all">
                    <td className="px-8 py-6 font-black text-blue-600 text-lg">{ind.id}</td>
                    <td className="px-8 py-6">
                      <div className="font-bold text-[#0A2540]">{ind.nome_contato || 'Disponível'}</div>
                      <div className="text-xs font-medium text-gray-400">{ind.local || 'Sem localização'}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center gap-3">
                        <div className="text-center px-3 py-1 bg-gray-100 rounded-lg text-[10px] font-black">V: {ind.visitas}</div>
                        <div className="text-center px-3 py-1 bg-green-50 text-green-700 rounded-lg text-[10px] font-black">L: {ind.leads}</div>
                        <div className="text-center px-3 py-1 bg-[#D4AF37]/20 text-[#0A2540] rounded-lg text-[10px] font-black uppercase">Fechadas: {ind.vendas}</div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-end gap-3">
                        <button onClick={() => handleRegisterSale(ind.id)} title="Registrar Venda" className="p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all shadow-lg shadow-green-500/20"><DollarSign className="w-4 h-4" /></button>
                        <button onClick={() => handleSelectIndicator(ind.id)} title="Editar" className="p-3 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition-all"><Edit className="w-4 h-4 text-gray-400" /></button>
                        <button onClick={() => copyLink(ind.id)} title="Copiar Link" className="p-3 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition-all">
                          {copiedId === ind.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL DE EDIÇÃO MANTIDO */}
      {selectedIndicator && (
        <div className="fixed inset-0 bg-[#0A2540]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] max-w-md w-full shadow-2xl p-10">
            <h3 className="text-2xl font-black text-[#0A2540] mb-8 uppercase tracking-tight">Editar ID {selectedIndicator}</h3>
            <div className="space-y-6 mb-10">
              <input type="text" value={editingData.nome_contato} onChange={(e) => setEditingData({ ...editingData, nome_contato: e.target.value })} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-[#D4AF37] font-bold" placeholder="Nome do Indicador" />
              <input type="tel" value={editingData.whatsapp} onChange={(e) => setEditingData({ ...editingData, whatsapp: e.target.value })} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-[#D4AF37] font-bold" placeholder="WhatsApp" />
              <input type="text" value={editingData.local} onChange={(e) => setEditingData({ ...editingData, local: e.target.value })} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-[#D4AF37] font-bold" placeholder="Local / Bairro" />
            </div>
            <div className="flex gap-4">
              <button onClick={() => setSelectedIndicator(null)} className="flex-1 font-bold text-gray-400">Cancelar</button>
              <button onClick={handleSaveIndicator} className="flex-1 bg-[#D4AF37] text-[#0A2540] py-4 rounded-2xl font-black transition-all shadow-lg shadow-[#D4AF37]/20 uppercase">Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}