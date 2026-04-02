import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, UserPlus, Settings, Trophy, 
  Loader2, X, ShieldCheck, Save, ArrowLeft, Phone, MapPin, Power, Edit3, LogOut, Lock, Clock, Tag
} from 'lucide-react';

export function Admin() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [indicadores, setIndicadores] = useState<any[]>([]);
  const [precosData, setPrecosData] = useState<any>({});
  
  // ESTADOS DA PROMOÇÃO
  const [promoText, setPromoText] = useState("");
  const [promoDate, setPromoDate] = useState("");
  
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState<'new' | 'edit' | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<any>(null);

  // LINKS N8N OFICIAIS
  const LINK_PEGA_PRECOS = "https://n8n.saintsolution.com.br/webhook/a57e4858-d4d7-4071-8a94-2b1589d618c7";
  const LINK_SALVA_PRECOS = "https://n8n.saintsolution.com.br/webhook/8f6225fa-b5cf-41a0-813e-2b158daf1464";
  const LINK_PEGA_INDICADORES = "https://n8n.saintsolution.com.br/webhook/b46feb90-df11-489d-b234-d10de0ff82a6";
  const LINK_GRAVA_INDICADORES = "https://n8n.saintsolution.com.br/webhook/d0a5c115-56e3-4baf-ab74-876b6cc39a74";
  
  // SEUS NOVOS LINKS
  const LINK_PEGA_PROMO = "https://n8n.saintsolution.com.br/webhook/e17ae59e-3bfa-4d9a-a4a6-05dda613817f";
  const LINK_SALVA_PROMO = "https://n8n.saintsolution.com.br/webhook/a0580983-18a9-4ad2-b683-ffec7d789793";

  const carregarDados = async () => {
    setLoading(true);
    try {
      const [resInd, resPre, resPro] = await Promise.all([
        fetch(LINK_PEGA_INDICADORES),
        fetch(LINK_PEGA_PRECOS),
        fetch(LINK_PEGA_PROMO)
      ]);
      
      const dataInd = await resInd.json();
      const dataPre = await resPre.json();
      const dataPro = await resPro.json();
      
      setIndicadores(Array.isArray(dataInd) ? dataInd : []);
      
      // Mapeia Preços
      if (Array.isArray(dataPre)) {
        const mapa: any = {};
        dataPre.forEach((item: any) => {
          if(item.cod_plan) mapa[item.cod_plan] = item.valor_mensalidade;
        });
        setPrecosData(mapa);
      } else {
        setPrecosData(dataPre);
      }

      // Mapeia Promoção (Supondo que o n8n devolva {texto: "...", data_limite: "..."})
      if (dataPro) {
        // Se o n8n devolver uma lista, pegamos o primeiro item
        const promo = Array.isArray(dataPro) ? dataPro[0] : dataPro;
        if (promo.texto) setPromoText(promo.texto);
        if (promo.data_limite) setPromoDate(promo.data_limite);
      }

    } catch (err) { console.error("Erro ao carregar dados:", err); }
    setLoading(false);
  };

  useEffect(() => { if (isAuthorized) carregarDados(); }, [isAuthorized]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1234') setIsAuthorized(true); else alert("Senha Incorreta!");
  };

  const handleSavePartner = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(LINK_GRAVA_INDICADORES, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedPartner),
    });
    setShowModal(null);
    carregarDados();
  };

  const handleSaveTabelas = async () => {
    try {
      const payloadParaN8N = Object.keys(precosData).map(cod => ({
        cod_plan: cod,
        valor_mensalidade: precosData[cod]
      }));
      await fetch(LINK_SALVA_PRECOS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadParaN8N),
      });
      alert("Tabelas atualizadas com sucesso!");
    } catch (error) { alert("Erro ao salvar tabelas."); }
  };

  // FUNÇÃO SALVAR PROMOÇÃO
  const handleSavePromo = async () => {
    try {
      const response = await fetch(LINK_SALVA_PROMO, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          texto: promoText.toUpperCase(),
          data_limite: promoDate,
          updatedAt: new Date().toISOString()
        }),
      });
      if (response.ok) alert("Promoção atualizada com sucesso!");
      else alert("O n8n deu erro ao salvar.");
    } catch (error) { alert("Erro de conexão."); }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#0A2540] flex items-center justify-center p-4">
        <form onSubmit={handleAuth} className="bg-white p-12 rounded-[40px] shadow-2xl text-center w-full max-w-sm">
          <Lock className="w-10 h-10 text-[#D4AF37] mx-auto mb-6" />
          <input type="password" placeholder="SENHA" className="w-full p-4 bg-gray-100 rounded-2xl mb-4 text-center font-black outline-none focus:ring-2 ring-[#D4AF37]" onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="w-full bg-[#0A2540] text-white py-4 rounded-2xl font-black uppercase italic hover:bg-[#D4AF37] hover:text-[#0A2540] transition-all">Entrar</button>
        </form>
      </div>
    );
  }

  const ranking = indicadores.filter(i => i.nome && i.nome.length > 1).sort((a,b) => (Number(b.vendas)||0)-(Number(a.vendas)||0));

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#0A2540] p-8 text-white flex flex-col shadow-2xl fixed h-full z-50">
        <h1 className="text-2xl font-black italic text-[#D4AF37] uppercase mb-10 tracking-tighter">SaintSolution</h1>
        <nav className="flex-1 space-y-3">
          <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-4 w-full p-5 rounded-2xl font-black text-xs uppercase italic transition-all ${activeTab === 'dashboard' ? 'bg-[#D4AF37] text-[#0A2540]' : 'text-white/40 hover:bg-white/5'}`}><LayoutDashboard className="w-4 h-4" /> Dashboard</button>
          <button onClick={() => { setSelectedPartner({ id: '', nome: '', whatsapp: '', local: '', status: 'ativo' }); setShowModal('new'); }} className="flex items-center gap-4 w-full p-5 text-white/40 hover:bg-white/5 rounded-2xl font-black text-xs uppercase italic transition-all"><UserPlus className="w-4 h-4" /> Novo Parceiro</button>
          <button onClick={() => setActiveTab('precos')} className={`flex items-center gap-4 w-full p-5 rounded-2xl font-black text-xs uppercase italic transition-all ${activeTab === 'precos' ? 'bg-[#D4AF37] text-[#0A2540]' : 'text-white/40 hover:bg-white/5'}`}><Settings className="w-4 h-4" /> Editar Preços</button>
          <button onClick={() => setActiveTab('promocao')} className={`flex items-center gap-4 w-full p-5 rounded-2xl font-black text-xs uppercase italic transition-all ${activeTab === 'promocao' ? 'bg-[#D4AF37] text-[#0A2540]' : 'text-white/40 hover:bg-white/5'}`}><Trophy className="w-4 h-4" /> Promoção Hero</button>
        </nav>
      </aside>

      <main className="flex-1 ml-72 p-12 overflow-y-auto">
        <div className="flex justify-end mb-4">
           <button onClick={() => window.location.href='/'} className="flex items-center gap-2 bg-red-50 text-red-600 px-6 py-3 rounded-2xl font-black uppercase text-[10px] hover:bg-red-600 hover:text-white transition-all shadow-sm">
             <LogOut className="w-4 h-4" /> Sair do Site
           </button>
        </div>

        {/* DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="animate-in fade-in">
            <h2 className="text-5xl font-black text-[#0A2540] mb-12 uppercase italic tracking-tighter leading-tight">Ranking <span className="text-[#D4AF37]">Performance</span></h2>
            <div className="space-y-6 text-left">
              {ranking.map((ind, index) => (
                <div key={ind.id} className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-xl transition-all">
                  <div className="flex items-center gap-8 text-left">
                    <div className="relative w-16 h-16 bg-gray-50 rounded-2xl flex flex-col items-center justify-center font-black text-[#0A2540] border shadow-inner">
                      <span className="text-[7px] text-gray-400 uppercase tracking-widest">Ref</span>{ind.id}
                      {index < 3 && <Trophy className="absolute -top-3 -right-3 w-6 h-6 text-[#D4AF37]" />}
                    </div>
                    <div className="text-left">
                      <h3 className="text-2xl font-black text-[#0A2540] uppercase italic tracking-tight">{ind.nome}</h3>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-loose">
                        {ind.whatsapp} • {ind.local} • 
                        <span className={`ml-2 px-2 py-0.5 rounded-lg font-black ${ind.status === 'ativo' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600 uppercase'}`}>
                           {ind.status}
                        </span>
                      </p>
                    </div>
                  </div>
                  <button onClick={() => { setSelectedPartner(ind); setShowModal('edit'); }} className="p-4 bg-gray-100 rounded-2xl hover:bg-[#D4AF37] transition-all shadow-sm"><Edit3 className="w-5 h-5"/></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PREÇOS */}
        {activeTab === 'precos' && (
          <div className="animate-in slide-in-from-right-10">
            <h2 className="text-5xl font-black text-[#0A2540] mb-12 uppercase italic text-center tracking-tighter">Tabelas <span className="text-[#D4AF37]">Premium</span></h2>
            <div className="grid md:grid-cols-2 gap-10 mb-10 text-left">
              {['E', 'A'].map((prefixo) => (
                <div key={prefixo} className="bg-white p-12 rounded-[48px] shadow-xl border relative overflow-hidden transition-transform hover:scale-[1.01]">
                  <div className={`absolute top-0 left-0 w-full h-2 ${prefixo === 'E' ? 'bg-blue-400' : 'bg-[#D4AF37]'}`}></div>
                  <h3 className="text-2xl font-black text-[#0A2540] uppercase italic mb-8 text-center">
                    {prefixo === 'E' ? 'Enfermaria' : 'Apartamento'}
                  </h3>
                  <div className="space-y-4">
                    {['1', '2', '3'].map((num) => {
                      const cod = `${prefixo}${num}`;
                      return (
                        <div key={cod} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border shadow-inner">
                          <span className="font-bold text-[#0A2540] text-[10px] uppercase italic">
                            {num === '1' ? 'Até 43' : num === '2' ? '44 a 58' : '59+'} anos ({cod})
                          </span>
                          <input 
                            type="text" 
                            value={precosData[cod] || ""} 
                            onChange={(e) => setPrecosData({...precosData, [cod]: e.target.value})} 
                            className="bg-white px-4 py-2 rounded-xl border-2 border-gray-100 font-black text-[#0A2540] w-32 text-right outline-none focus:border-[#D4AF37]" 
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="max-w-2xl mx-auto">
              <button onClick={handleSaveTabelas} className="w-full bg-[#0A2540] text-[#D4AF37] py-8 rounded-[32px] font-black uppercase italic flex items-center justify-center gap-4 hover:bg-[#D4AF37] hover:text-[#0A2540] transition-all shadow-2xl text-xl"><Save className="w-8 h-8" /> Gravar Alterações de Preços</button>
            </div>
          </div>
        )}

        {/* PROMOÇÃO HERO */}
        {activeTab === 'promocao' && (
          <div className="animate-in slide-in-from-right-10 max-w-4xl mx-auto">
            <h2 className="text-5xl font-black text-[#0A2540] mb-12 uppercase italic text-center tracking-tighter">Oferta <span className="text-[#D4AF37]">Relâmpago</span></h2>
            <div className="bg-white p-12 rounded-[48px] shadow-xl border space-y-8 text-left">
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[3px] ml-4 mb-2"><Tag className="w-3 h-3"/> Texto da Oferta (Tarja Amarela)</label>
                  <input 
                    type="text" 
                    placeholder="EX: 30% OFF NA PRIMEIRA MENSALIDADE"
                    value={promoText}
                    onChange={(e) => setPromoText(e.target.value)}
                    className="w-full p-6 bg-gray-50 rounded-3xl border-2 border-transparent focus:border-[#D4AF37] font-black text-[#0A2540] outline-none transition-all uppercase"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[3px] ml-4 mb-2"><Clock className="w-3 h-3"/> Data e Hora de Encerramento</label>
                  <input 
                    type="datetime-local" 
                    value={promoDate}
                    onChange={(e) => setPromoDate(e.target.value)}
                    className="w-full p-6 bg-gray-50 rounded-3xl border-2 border-transparent focus:border-[#D4AF37] font-black text-[#0A2540] outline-none transition-all"
                  />
                </div>
              </div>
              <button 
                onClick={handleSavePromo}
                className="w-full bg-[#0A2540] text-[#D4AF37] py-8 rounded-[32px] font-black uppercase italic flex items-center justify-center gap-4 hover:bg-[#D4AF37] hover:text-[#0A2540] transition-all shadow-2xl text-xl"
              >
                <Save className="w-8 h-8" /> Atualizar Promoção no Site
              </button>
            </div>
          </div>
        )}
      </main>

      {/* MODAL PARCEIROS */}
      {showModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-[#0A2540]/90 backdrop-blur-md">
          <form onSubmit={handleSavePartner} className="bg-white w-full max-w-5xl rounded-[50px] p-12 shadow-2xl overflow-y-auto max-h-[95vh] animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-tight">{showModal === 'new' ? 'Novo' : 'Editar'} <span className="text-[#D4AF37]">Parceiro</span></h3>
              <button type="button" onClick={() => setShowModal(null)} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-500 group transition-all"><X className="group-hover:text-white" /></button>
            </div>
            
            {showModal === 'new' && (
              <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-2 mb-8 p-6 bg-gray-50 rounded-[32px] max-h-48 overflow-y-auto border-2 border-dashed shadow-inner">
                {indicadores.map((ind) => {
                  const ocupado = ind.nome && String(ind.nome).trim() !== "";
                  return (
                    <button key={ind.id} type="button" disabled={ocupado} onClick={() => setSelectedPartner({...selectedPartner, id: ind.id})}
                      className={`h-12 rounded-xl text-[10px] font-black transition-all border-2 
                      ${ocupado ? 'bg-gray-100 text-gray-200 border-transparent opacity-30 cursor-not-allowed' : 
                        selectedPartner?.id === ind.id ? 'bg-[#D4AF37] text-[#0A2540] border-[#0A2540] scale-110 shadow-lg' : 'bg-white text-green-600 border-green-100 hover:border-green-400'}`}
                    >
                      {ind.id}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="space-y-6 text-left">
              <div className="bg-[#0A2540] text-[#D4AF37] p-5 rounded-2xl italic font-black text-2xl shadow-sm border border-white/10">Ref: {selectedPartner?.id}</div>
              <input type="text" placeholder="NOME COMPLETO" value={selectedPartner?.nome || ""} className="w-full p-5 bg-gray-50 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-[#D4AF37] uppercase placeholder:text-gray-300" onChange={(e) => setSelectedPartner({...selectedPartner, nome: e.target.value.toUpperCase()})} required />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="WHATSAPP" value={selectedPartner?.whatsapp || ""} className="p-5 bg-gray-50 rounded-2xl font-bold outline-none border-2 border-gray-100 focus:border-[#D4AF37] placeholder:text-gray-300" onChange={(e) => setSelectedPartner({...selectedPartner, whatsapp: e.target.value})} />
                <input type="text" placeholder="BAIRRO" value={selectedPartner?.local || ""} className="p-5 bg-gray-50 rounded-2xl font-bold outline-none border-2 border-gray-100 focus:border-[#D4AF37] placeholder:text-gray-300" onChange={(e) => setSelectedPartner({...selectedPartner, local: e.target.value})} />
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={() => setSelectedPartner({...selectedPartner, status: selectedPartner.status === 'ativo' ? 'inativo' : 'ativo'})} className={`flex-1 p-5 rounded-2xl font-black uppercase italic border-2 transition-all shadow-sm ${selectedPartner?.status === 'ativo' ? 'bg-green-50 border-green-200 text-green-600 font-black' : 'bg-red-50 border-red-200 text-red-600 font-black'}`}>Status: {selectedPartner?.status}</button>
                <button type="submit" className="flex-[2] bg-[#D4AF37] text-[#0A2540] py-5 rounded-2xl font-black uppercase italic shadow-xl hover:scale-[1.01] transition-all">Salvar Alterações</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}