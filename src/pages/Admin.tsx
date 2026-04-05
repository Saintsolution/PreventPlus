import { useEffect, useMemo, useState } from 'react';
import {
  LayoutDashboard,
  UserPlus,
  Settings,
  Trophy,
  X,
  Save,
  Edit3,
  LogOut,
  Lock,
  Tag,
  Wallet,
  Menu,
} from 'lucide-react';

type TabType = 'dashboard' | 'precos' | 'promocao' | 'vendas' | 'pagamentos';
type PartnerModalType = 'new' | 'edit' | null;
type VendaModalType = 'new' | 'edit' | null;
type SortMode = 'ranking' | 'ref';
type VendaStatus = 'aberto' | 'negociando' | 'fechado';

interface Indicador {
  id: string;
  nome: string;
  local: string;
  whatsapp: string;
  status: 'ativo' | 'inativo' | string;
  vendas?: number | string;
}

interface Venda {
  row_number?: number | string;
  os?: string | number;
  data?: string;
  id_indicador: string | number;
  cliente_nome: string;
  cod_plano: string;
  telefone: string;
  email: string;
  status: VendaStatus | string;
  updated_at?: string;
  observacao?: string;
}

interface Pagamento {
  data_baixa?: string;
  os?: string | number;
  id_indicador: string | number;
  valor_pago: number | string;
}

interface RankingItem extends Indicador {
  totalVendas: number;
  fechados: number;
  totalPago: number;
  posicaoRanking: number;
}

const toStr = (value: unknown) => String(value ?? '').trim();

const normalizeRef = (value: unknown) => {
  const raw = String(value ?? '').trim();
  if (!raw) return '';
  return raw.padStart(3, '0');
};

const normalizeOs = (value: unknown) => {
  const raw = toStr(value);
  return raw === '0' ? '' : raw;
};

const formatMoney = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value || 0);

const formatDateInput = (value: string) => {
  if (!value) return '';
  if (value.includes('T')) return value.slice(0, 16);
  return value;
};

const formatDisplayDate = (value?: string) => {
  if (!value) return '-';
  return value;
};

const getTodayBR = () => {
  const now = new Date();
  const ano = now.getFullYear();
  const mes = String(now.getMonth() + 1).padStart(2, '0');
  const dia = String(now.getDate()).padStart(2, '0');
  return `${dia}/${mes}/${ano}`;
};

export function Admin() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [sortMode, setSortMode] = useState<SortMode>('ranking');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [indicadores, setIndicadores] = useState<Indicador[]>([]);
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);

  const [precosData, setPrecosData] = useState<Record<string, string | number>>({});
  const [promoText, setPromoText] = useState('');
  const [promoDate, setPromoDate] = useState('');

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState<PartnerModalType>(null);
  const [selectedPartner, setSelectedPartner] = useState<any>(null);

  const [showVendaModal, setShowVendaModal] = useState<VendaModalType>(null);
  const [selectedVenda, setSelectedVenda] = useState<Venda | null>(null);
  const [vendaOriginal, setVendaOriginal] = useState<Venda | null>(null);

  const LINK_PEGA_PRECOS = 'https://n8n.saintsolution.com.br/webhook/a57e4858-d4d7-4071-8a94-2b1589d618c7';
  const LINK_SALVA_PRECOS = 'https://n8n.saintsolution.com.br/webhook/8f6225fa-b5cf-41a0-813e-2b158daf1464';

  const LINK_PEGA_INDICADORES = 'https://n8n.saintsolution.com.br/webhook/b46feb90-df11-489d-b234-d10de0ff82a6';
  const LINK_GRAVA_INDICADORES = 'https://n8n.saintsolution.com.br/webhook/d0a5c115-56e3-4baf-ab74-876b6cc39a74';

  const LINK_PEGA_PROMO = 'https://n8n.saintsolution.com.br/webhook/e17ae59e-3bfa-4d9a-a4a6-05dda613817f';
  const LINK_SALVA_PROMO = 'https://n8n.saintsolution.com.br/webhook/a0580983-18a9-4ad2-b683-ffec7d789793';

  const LINK_GRAVA_VENDAS = 'https://n8n.saintsolution.com.br/webhook/e282aa1e-565b-4eb9-b5df-707e2b029822';
  const LINK_GERA_OS = 'https://n8n.saintsolution.com.br/webhook/2926f195-0dfc-4645-b729-3979e11bd366';
  const LINK_GRAVA_PAGAMENTO = 'https://n8n.saintsolution.com.br/webhook/62ba903a-819e-454e-b005-035f51c821c7';
  const LINK_PEGA_DETALHES_VENDAS = 'https://n8n.saintsolution.com.br/webhook/d0502a49-0420-4130-947b-a568bdc51b34';

  const normalizarIndicadores = (data: any): Indicador[] => {
  if (!Array.isArray(data)) return [];
  return data.map((item: any) => ({
    id: normalizeRef(item.id),
    nome: toStr(item.nome),
    local: toStr(item.local),
    whatsapp: toStr(item.whatsapp),
    status: toStr(item.status || 'ativo'),
    vendas: item.vendas,
  }));
};

  const normalizarVendas = (data: any): Venda[] => {
  if (!Array.isArray(data)) return [];
  return data.map((item: any) => ({
    row_number: item.row_number,
    os: normalizeOs(item.os),
    data: toStr(item.data),
    id_indicador: normalizeRef(item.id_indicador),
    cliente_nome: toStr(item.cliente_nome),
    cod_plano: toStr(item.cod_plano),
    telefone: toStr(item.telefone),
    email: toStr(item.email),
    status: toStr(item.status || 'aberto') as VendaStatus,
    updated_at: toStr(item.updated_at),
    observacao: toStr(item.observacao),
  }));
};

  const normalizarPagamentos = (data: any): Pagamento[] => {
  if (!Array.isArray(data)) return [];
  return data.map((item: any) => ({
    data_baixa: toStr(item.data_baixa),
    os: normalizeOs(item.os),
    id_indicador: normalizeRef(item.id_indicador),
    valor_pago: Number(item.valor_pago) || 0,
  }));
};

  const carregarDados = async () => {
    setLoading(true);

    try {
      const [resInd, resPre, resPro, resDet] = await Promise.all([
        fetch(LINK_PEGA_INDICADORES),
        fetch(LINK_PEGA_PRECOS),
        fetch(LINK_PEGA_PROMO),
        fetch(LINK_PEGA_DETALHES_VENDAS),
      ]);

      const dataInd = await resInd.json();
      const dataPre = await resPre.json();
      const dataPro = await resPro.json();
      const dataDet = await resDet.json();

      setIndicadores(normalizarIndicadores(dataInd));

      if (Array.isArray(dataPre)) {
        const mapa: Record<string, string | number> = {};
        dataPre.forEach((item: any) => {
          if (item.cod_plan) mapa[item.cod_plan] = item.valor_mensalidade;
        });
        setPrecosData(mapa);
      } else {
        setPrecosData(dataPre || {});
      }

      if (dataPro) {
        const promo = Array.isArray(dataPro) ? dataPro[0] : dataPro;
        if (promo.texto) setPromoText(promo.texto);
        if (promo.data_limite) setPromoDate(formatDateInput(promo.data_limite));
      }

      const payloadDet =
        Array.isArray(dataDet) && dataDet.length === 1 && typeof dataDet[0] === 'object'
          ? dataDet[0]
          : dataDet;

      if (Array.isArray(payloadDet)) {
        setVendas(normalizarVendas(payloadDet));
        setPagamentos([]);
      } else {
        const vendasBrutas =
          payloadDet?.vendas ||
          payloadDet?.detalhes ||
          payloadDet?.items ||
          payloadDet?.dados_vendas ||
          [];

        const pagamentosBrutos =
          payloadDet?.pagamentos ||
          payloadDet?.comissoes ||
          payloadDet?.dados_pagamentos ||
          [];

        setVendas(normalizarVendas(vendasBrutas));
        setPagamentos(normalizarPagamentos(pagamentosBrutos));
      }
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (isAuthorized) carregarDados();
  }, [isAuthorized]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1234') setIsAuthorized(true);
    else alert('Senha Incorreta!');
  };

  const handleSavePartner = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(LINK_GRAVA_INDICADORES, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedPartner),
      });

      if (response.ok) {
        alert('Parceiro atualizado com sucesso!');
        setShowModal(null);
        carregarDados();
      } else {
        alert('Erro ao salvar no n8n.');
      }
    } catch (error) {
      alert('Erro de conexão com o servidor.');
    }
  };

  const handleSaveTabelas = async () => {
    try {
      const payloadParaN8N = Object.keys(precosData).map((cod) => ({
        cod_plan: cod,
        valor_mensalidade: precosData[cod],
      }));

      await fetch(LINK_SALVA_PRECOS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadParaN8N),
      });

      alert('Tabelas atualizadas com sucesso!');
    } catch (error) {
      alert('Erro ao salvar tabelas.');
    }
  };

  const handleSavePromo = async () => {
    try {
      const response = await fetch(LINK_SALVA_PROMO, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          texto: promoText.toUpperCase(),
          data_limite: promoDate,
          updatedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) alert('Promoção atualizada com sucesso!');
      else alert('O n8n deu erro ao salvar.');
    } catch (error) {
      alert('Erro de conexão.');
    }
  };

  const abrirNovaVenda = () => {
    const novaVenda: Venda = {
  row_number: '',
  os: '',
  data: getTodayBR(),
  id_indicador: '',
  cliente_nome: '',
  cod_plano: '',
  telefone: '',
  email: '',
  status: 'aberto',
  updated_at: new Date().toISOString(),
  observacao: 'nenhuma',
};

    setVendaOriginal(null);
    setSelectedVenda(novaVenda);
    setShowVendaModal('new');
  };

  const abrirEdicaoVenda = (venda: Venda) => {
    const vendaClonada = { ...venda };
    setVendaOriginal({ ...vendaClonada });
    setSelectedVenda({ ...vendaClonada });
    setShowVendaModal('edit');
  };

  const handleSaveVenda = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedVenda) return;

    try {
      const statusAnterior = toStr(vendaOriginal?.status || '');
      const statusNovo = toStr(selectedVenda.status || 'aberto');

      const payloadVenda: Venda = {
  ...selectedVenda,
  row_number: selectedVenda.row_number,
  os: normalizeOs(selectedVenda.os),
  id_indicador: normalizeRef(selectedVenda.id_indicador),
  cliente_nome: toStr(selectedVenda.cliente_nome),
  cod_plano: toStr(selectedVenda.cod_plano),
  telefone: toStr(selectedVenda.telefone),
  email: toStr(selectedVenda.email),
  status: statusNovo as VendaStatus,
  data: toStr(selectedVenda.data || getTodayBR()),
  updated_at: new Date().toISOString(),
  observacao: toStr(selectedVenda.observacao || 'nenhuma'),
};
      if (!payloadVenda.id_indicador) {
        alert('Selecione a referência do indicador.');
        return;
      }

      if (!payloadVenda.cliente_nome) {
        alert('Preencha o nome do cliente.');
        return;
      }

      if (!payloadVenda.cod_plano) {
        alert('Selecione o plano.');
        return;
      }

      if (statusAnterior !== 'negociando' && statusNovo === 'negociando' && !normalizeOs(payloadVenda.os)) {
        const resOS = await fetch(LINK_GERA_OS, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id_indicador: payloadVenda.id_indicador,
            cliente_nome: payloadVenda.cliente_nome,
            data: payloadVenda.data,
          }),
        });

        if (!resOS.ok) {
          alert('Erro ao gerar OS.');
          return;
        }

        const dataOS = await resOS.json();

const payloadOS = Array.isArray(dataOS) ? dataOS[0] : dataOS;

const osGerada =
  toStr(payloadOS?.os) ||
  toStr(payloadOS?.numero_os) ||
  toStr(payloadOS?.numero) ||
  toStr(payloadOS?.value);

        if (!osGerada) {
          alert('O webhook gerou resposta, mas não trouxe a OS.');
          return;
        }

        payloadVenda.os = osGerada;
      }

      if (statusAnterior !== 'fechado' && statusNovo === 'fechado') {
        const osFinal = normalizeOs(payloadVenda.os);

        if (!osFinal) {
          alert('Não é possível fechar sem OS. Coloque em negociando primeiro.');
          return;
        }

        const resPagamento = await fetch(LINK_GRAVA_PAGAMENTO, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data_baixa: getTodayBR(),
            os: osFinal,
            id_indicador: payloadVenda.id_indicador,
            valor_pago: 50,
          }),
        });

        if (!resPagamento.ok) {
          alert('Erro ao gravar pagamento da comissão.');
          return;
        }
      }

      const response = await fetch(LINK_GRAVA_VENDAS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadVenda),
      });

      if (response.ok) {
        alert('Venda salva com sucesso!');
        setShowVendaModal(null);
        setSelectedVenda(null);
        setVendaOriginal(null);
        carregarDados();
      } else {
        alert('Erro ao salvar venda no n8n.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão ao salvar venda.');
    }
  };

  const indicadoresComMetricas: RankingItem[] = useMemo(() => {
    const base = indicadores
      .filter((i) => i.nome && i.nome.length > 1)
      .map((ind) => {
        const id = normalizeRef(ind.id);

        const vendasDoIndicador = vendas.filter(
          (v) => normalizeRef(v.id_indicador) === id
        );

        const fechados = vendasDoIndicador.filter(
          (v) => toStr(v.status).toLowerCase() === 'fechado'
        ).length;

        const totalPago = pagamentos
          .filter((p) => normalizeRef(p.id_indicador) === id)
          .reduce((acc, item) => acc + (Number(item.valor_pago) || 0), 0);

        return {
          ...ind,
          totalVendas: vendasDoIndicador.length,
          fechados,
          totalPago,
          posicaoRanking: 0,
        };
      });

    const ordenadoPorRanking = [...base].sort((a, b) => {
      if (b.fechados !== a.fechados) return b.fechados - a.fechados;
      if (b.totalPago !== a.totalPago) return b.totalPago - a.totalPago;
      return a.id.localeCompare(b.id, 'pt-BR', { numeric: true });
    });

    const posicoes = new Map<string, number>();
    ordenadoPorRanking.forEach((item, index) => {
      posicoes.set(item.id, index + 1);
    });

    const comPosicao = base.map((item) => ({
      ...item,
      posicaoRanking: posicoes.get(item.id) || 0,
    }));

    return [...comPosicao].sort((a, b) => {
      if (sortMode === 'ref') {
        return a.id.localeCompare(b.id, 'pt-BR', { numeric: true });
      }
      return a.posicaoRanking - b.posicaoRanking;
    });
  }, [indicadores, vendas, pagamentos, sortMode]);

  const vendasOrdenadas = useMemo(() => {
    return [...vendas].sort((a, b) => {
      const statusA = toStr(a.status);
      const statusB = toStr(b.status);

      if (statusA === statusB) {
        return toStr(b.updated_at).localeCompare(toStr(a.updated_at));
      }

      const ordem: Record<string, number> = {
        aberto: 1,
        negociando: 2,
        fechado: 3,
      };

      return (ordem[statusA] || 99) - (ordem[statusB] || 99);
    });
  }, [vendas]);

  const pagamentosOrdenados = useMemo(() => {
    return [...pagamentos].sort((a, b) => {
      return toStr(b.data_baixa).localeCompare(toStr(a.data_baixa));
    });
  }, [pagamentos]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#0A2540] flex items-center justify-center p-4">
        <form
          onSubmit={handleAuth}
          className="bg-white p-12 rounded-[40px] shadow-2xl text-center w-full max-w-sm"
        >
          <Lock className="w-10 h-10 text-[#D4AF37] mx-auto mb-6" />
          <input
            type="password"
            placeholder="SENHA"
            autoComplete="new-password"
            className="w-full p-4 bg-gray-100 rounded-2xl mb-4 text-center font-black outline-none focus:ring-2 ring-[#D4AF37]"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-[#0A2540] text-white py-4 rounded-2xl font-black uppercase italic hover:bg-[#D4AF37] hover:text-[#0A2540] transition-all"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="lg:hidden fixed top-0 left-0 right-0 z-[70] bg-[#0A2540] text-white px-4 py-4 flex items-center justify-between shadow-xl">
        <h1 className="text-lg font-black italic text-[#D4AF37] uppercase tracking-tighter">
          SaintSolution
        </h1>

        <button
          onClick={() => setMobileMenuOpen(true)}
          className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <aside className="hidden lg:flex w-72 bg-[#0A2540] p-8 text-white flex-col shadow-2xl fixed h-full z-50">
        <h1 className="text-2xl font-black italic text-[#D4AF37] uppercase mb-10 tracking-tighter">
          SaintSolution
        </h1>

        <nav className="flex-1 space-y-3">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-4 w-full p-5 rounded-2xl font-black text-xs uppercase italic transition-all ${
              activeTab === 'dashboard'
                ? 'bg-[#D4AF37] text-[#0A2540]'
                : 'text-white/40 hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </button>

          <button
            onClick={() => {
              setSelectedPartner({
                id: '',
                nome: '',
                whatsapp: '',
                local: '',
                status: 'ativo',
              });
              setShowModal('new');
            }}
            className="flex items-center gap-4 w-full p-5 text-white/40 hover:bg-white/5 rounded-2xl font-black text-xs uppercase italic transition-all"
          >
            <UserPlus className="w-4 h-4" /> Novo Parceiro
          </button>

          <button
            onClick={() => setActiveTab('vendas')}
            className={`flex items-center gap-4 w-full p-5 rounded-2xl font-black text-xs uppercase italic transition-all ${
              activeTab === 'vendas'
                ? 'bg-[#D4AF37] text-[#0A2540]'
                : 'text-white/40 hover:bg-white/5'
            }`}
          >
            <Tag className="w-4 h-4" /> Vendas
          </button>

          <button
            onClick={() => setActiveTab('pagamentos')}
            className={`flex items-center gap-4 w-full p-5 rounded-2xl font-black text-xs uppercase italic transition-all ${
              activeTab === 'pagamentos'
                ? 'bg-[#D4AF37] text-[#0A2540]'
                : 'text-white/40 hover:bg-white/5'
            }`}
          >
            <Wallet className="w-4 h-4" /> Pagamentos
          </button>

          <button
            onClick={() => setActiveTab('precos')}
            className={`flex items-center gap-4 w-full p-5 rounded-2xl font-black text-xs uppercase italic transition-all ${
              activeTab === 'precos'
                ? 'bg-[#D4AF37] text-[#0A2540]'
                : 'text-white/40 hover:bg-white/5'
            }`}
          >
            <Settings className="w-4 h-4" /> Editar Preços
          </button>

          <button
            onClick={() => setActiveTab('promocao')}
            className={`flex items-center gap-4 w-full p-5 rounded-2xl font-black text-xs uppercase italic transition-all ${
              activeTab === 'promocao'
                ? 'bg-[#D4AF37] text-[#0A2540]'
                : 'text-white/40 hover:bg-white/5'
            }`}
          >
            <Trophy className="w-4 h-4" /> Promoção Hero
          </button>
        </nav>
      </aside>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[80]">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute top-0 left-0 h-full w-[86%] max-w-[320px] bg-[#0A2540] text-white p-6 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-xl font-black italic text-[#D4AF37] uppercase tracking-tighter">
                SaintSolution
              </h1>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="space-y-3">
              <button
                onClick={() => {
                  setActiveTab('dashboard');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-4 w-full p-4 rounded-2xl font-black text-xs uppercase italic transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-[#D4AF37] text-[#0A2540]'
                    : 'text-white/50 hover:bg-white/5'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </button>

              <button
                onClick={() => {
                  setSelectedPartner({
                    id: '',
                    nome: '',
                    whatsapp: '',
                    local: '',
                    status: 'ativo',
                  });
                  setShowModal('new');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-4 w-full p-4 rounded-2xl font-black text-xs uppercase italic text-white/50 hover:bg-white/5"
              >
                <UserPlus className="w-4 h-4" /> Novo Parceiro
              </button>

              <button
                onClick={() => {
                  setActiveTab('vendas');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-4 w-full p-4 rounded-2xl font-black text-xs uppercase italic transition-all ${
                  activeTab === 'vendas'
                    ? 'bg-[#D4AF37] text-[#0A2540]'
                    : 'text-white/50 hover:bg-white/5'
                }`}
              >
                <Tag className="w-4 h-4" /> Vendas
              </button>

              <button
                onClick={() => {
                  setActiveTab('pagamentos');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-4 w-full p-4 rounded-2xl font-black text-xs uppercase italic transition-all ${
                  activeTab === 'pagamentos'
                    ? 'bg-[#D4AF37] text-[#0A2540]'
                    : 'text-white/50 hover:bg-white/5'
                }`}
              >
                <Wallet className="w-4 h-4" /> Pagamentos
              </button>

              <button
                onClick={() => {
                  setActiveTab('precos');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-4 w-full p-4 rounded-2xl font-black text-xs uppercase italic transition-all ${
                  activeTab === 'precos'
                    ? 'bg-[#D4AF37] text-[#0A2540]'
                    : 'text-white/50 hover:bg-white/5'
                }`}
              >
                <Settings className="w-4 h-4" /> Editar Preços
              </button>

              <button
                onClick={() => {
                  setActiveTab('promocao');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-4 w-full p-4 rounded-2xl font-black text-xs uppercase italic transition-all ${
                  activeTab === 'promocao'
                    ? 'bg-[#D4AF37] text-[#0A2540]'
                    : 'text-white/50 hover:bg-white/5'
                }`}
              >
                <Trophy className="w-4 h-4" /> Promoção Hero
              </button>
            </nav>
          </div>
        </div>
      )}

      <main className="flex-1 lg:ml-72 p-4 pt-24 lg:p-12 lg:pt-12 overflow-y-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => (window.location.href = '/')}
            className="flex items-center gap-2 bg-red-50 text-red-600 px-4 lg:px-6 py-3 rounded-2xl font-black uppercase text-[10px] hover:bg-red-600 hover:text-white transition-all shadow-sm"
          >
            <LogOut className="w-4 h-4" /> Sair do Site
          </button>
        </div>

        {loading && (
          <div className="mb-8 bg-white rounded-[28px] p-6 border shadow-sm text-[#0A2540] font-black uppercase italic">
            Carregando dados...
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="animate-in fade-in">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-8 lg:mb-12">
              <h2 className="text-3xl lg:text-5xl font-black text-[#0A2540] uppercase italic tracking-tighter leading-tight">
                Ranking <span className="text-[#D4AF37]">Performance</span>
              </h2>

              <div className="grid grid-cols-2 gap-3 w-full lg:w-auto">
                <button
                  onClick={() => setSortMode('ranking')}
                  className={`px-4 lg:px-5 py-3 rounded-2xl font-black uppercase italic text-[10px] transition-all ${
                    sortMode === 'ranking'
                      ? 'bg-[#D4AF37] text-[#0A2540] shadow-lg'
                      : 'bg-white text-[#0A2540] border border-gray-200'
                  }`}
                >
                  Ordem por Ranking
                </button>

                <button
                  onClick={() => setSortMode('ref')}
                  className={`px-4 lg:px-5 py-3 rounded-2xl font-black uppercase italic text-[10px] transition-all ${
                    sortMode === 'ref'
                      ? 'bg-[#D4AF37] text-[#0A2540] shadow-lg'
                      : 'bg-white text-[#0A2540] border border-gray-200'
                  }`}
                >
                  Ordem por Ref
                </button>
              </div>
            </div>

            <div className="space-y-4 lg:space-y-6 text-left">
              {indicadoresComMetricas.map((ind, index) => (
                <div
                  key={ind.id}
                  className="bg-white p-5 lg:p-8 rounded-[28px] lg:rounded-[40px] shadow-sm border border-gray-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 group hover:shadow-xl transition-all"
                >
                  <div className="flex items-start gap-4 lg:gap-8 text-left">
                    <div className="relative w-14 h-14 lg:w-16 lg:h-16 bg-gray-50 rounded-2xl flex flex-col items-center justify-center font-black text-[#0A2540] border shadow-inner shrink-0">
                      <span className="text-[7px] text-gray-400 uppercase tracking-widest">
                        Ref
                      </span>
                      {ind.id}
                      {index < 3 && sortMode === 'ranking' && (
                        <Trophy className="absolute -top-2 -right-2 lg:-top-3 lg:-right-3 w-5 h-5 lg:w-6 lg:h-6 text-[#D4AF37]" />
                      )}
                    </div>


                    <div className="text-left min-w-0">
                      <div className="flex flex-wrap items-center gap-2 lg:gap-3">
                        <h3 className="text-xl lg:text-2xl font-black text-[#0A2540] uppercase italic tracking-tight break-words">
                          {ind.nome}
                        </h3>

                        <span className="px-3 py-1 rounded-xl bg-[#0A2540] text-[#D4AF37] text-[10px] font-black uppercase italic">
                          #{ind.posicaoRanking}
                        </span>
                      </div>

                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-loose break-words">
                        {ind.whatsapp} • {ind.local} •
                        <span
                          className={`ml-2 px-2 py-0.5 rounded-lg font-black ${
                            ind.status === 'ativo'
                              ? 'bg-green-100 text-green-600'
                              : 'bg-red-100 text-red-600 uppercase'
                          }`}
                        >
                          {ind.status}
                        </span>
                      </p>

                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="px-3 py-1 rounded-xl bg-blue-50 text-blue-700 text-[10px] font-black uppercase">
                          Leads: {ind.totalVendas}
                        </span>
                        <span className="px-3 py-1 rounded-xl bg-green-50 text-green-700 text-[10px] font-black uppercase">
                          Fechados: {ind.fechados}
                        </span>
                        <span className="px-3 py-1 rounded-xl bg-yellow-50 text-yellow-700 text-[10px] font-black uppercase">
                          Comissão: {formatMoney(ind.totalPago)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedPartner(ind);
                      setShowModal('edit');
                    }}
                    className="self-end lg:self-auto p-4 bg-gray-100 rounded-2xl hover:bg-[#D4AF37] transition-all shadow-sm"
                  >
                    <Edit3 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'vendas' && (
          <div className="animate-in fade-in">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-8 lg:mb-10">
              <h2 className="text-3xl lg:text-5xl font-black text-[#0A2540] uppercase italic tracking-tighter">
                Leads <span className="text-[#D4AF37]">e Vendas</span>
              </h2>

              <button
                onClick={abrirNovaVenda}
                className="w-full lg:w-auto bg-[#0A2540] text-[#D4AF37] px-6 py-4 rounded-2xl font-black uppercase italic shadow-xl hover:scale-[1.01] transition-all"
              >
                Nova Venda
              </button>
            </div>

            <div className="space-y-4">
              {vendasOrdenadas.map((venda, idx) => (
                <div
                  key={`${toStr(venda.os)}-${toStr(venda.id_indicador)}-${idx}`}
                  className="bg-white p-5 lg:p-6 rounded-[28px] lg:rounded-[32px] shadow-sm border flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-lg lg:text-xl font-black text-[#0A2540] uppercase italic break-words">
                        {venda.cliente_nome}
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase ${
                          toStr(venda.status) === 'aberto'
                            ? 'bg-blue-50 text-blue-700'
                            : toStr(venda.status) === 'negociando'
                            ? 'bg-yellow-50 text-yellow-700'
                            : 'bg-green-50 text-green-700'
                        }`}
                      >
                        {venda.status}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 font-bold uppercase break-words">
                      Ref {venda.id_indicador} • Plano {venda.cod_plano || '---'} • {venda.telefone || '---'}
                    </p>

                    <p className="text-xs text-gray-400 font-bold uppercase mt-1 break-words">
                      OS: {normalizeOs(venda.os) || 'Aguardando'} • Data: {formatDisplayDate(venda.data)} • Atualizado:{' '}
                      {formatDisplayDate(venda.updated_at)}
                    </p>

                    <p className="text-xs text-gray-400 font-bold uppercase mt-1 break-words">
                      {venda.email || 'SEM EMAIL'} • Obs: {venda.observacao || 'nenhuma'}
                    </p>
                  </div>

                  <button
                    onClick={() => abrirEdicaoVenda(venda)}
                    className="self-end lg:self-auto p-4 bg-gray-100 rounded-2xl hover:bg-[#D4AF37] transition-all shadow-sm"
                  >
                    <Edit3 className="w-5 h-5" />
                  </button>
                </div>
              ))}

              {!vendasOrdenadas.length && !loading && (
                <div className="bg-white p-8 rounded-[32px] shadow-sm border text-[#0A2540] font-black uppercase italic">
                  Nenhuma venda encontrada.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'pagamentos' && (
          <div className="animate-in fade-in">
            <h2 className="text-3xl lg:text-5xl font-black text-[#0A2540] mb-8 lg:mb-10 uppercase italic tracking-tighter">
              Controle <span className="text-[#D4AF37]">de Pagamentos</span>
            </h2>

            <div className="space-y-4">
              {pagamentosOrdenados.map((pag, idx) => (
                <div
                  key={`${toStr(pag.os)}-${idx}`}
                  className="bg-white p-5 lg:p-6 rounded-[28px] lg:rounded-[32px] shadow-sm border flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
                >
                  <div>
                    <h3 className="text-base lg:text-lg font-black text-[#0A2540] uppercase italic">
                      Ref {pag.id_indicador}
                    </h3>
                    <p className="text-xs text-gray-500 font-bold uppercase break-words">
                      OS: {normalizeOs(pag.os) || 'Sem OS'} • Data: {formatDisplayDate(pag.data_baixa)}
                    </p>
                  </div>

                  <div className="text-lg lg:text-xl font-black text-green-600">
                    {formatMoney(Number(pag.valor_pago) || 0)}
                  </div>
                </div>
              ))}

              {!pagamentosOrdenados.length && !loading && (
                <div className="bg-white p-8 rounded-[32px] shadow-sm border text-[#0A2540] font-black uppercase italic">
                  Nenhum pagamento encontrado.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'precos' && (
          <div className="animate-in slide-in-from-right-10">
            <h2 className="text-3xl lg:text-5xl font-black text-[#0A2540] mb-8 lg:mb-12 uppercase italic text-center tracking-tighter">
              Tabelas <span className="text-[#D4AF37]">Premium</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 mb-10 text-left">
              {['E', 'A'].map((prefixo) => (
                <div
                  key={prefixo}
                  className="bg-white p-6 lg:p-12 rounded-[32px] lg:rounded-[48px] shadow-xl border relative overflow-hidden transition-transform hover:scale-[1.01]"
                >
                  <div
                    className={`absolute top-0 left-0 w-full h-2 ${
                      prefixo === 'E' ? 'bg-blue-400' : 'bg-[#D4AF37]'
                    }`}
                  />

                  <h3 className="text-xl lg:text-2xl font-black text-[#0A2540] uppercase italic mb-8 text-center">
                    {prefixo === 'E' ? 'Enfermaria' : 'Apartamento'}
                  </h3>

                  <div className="space-y-4">
                    {['1', '2', '3'].map((num) => {
                      const cod = `${prefixo}${num}`;

                      return (
                        <div
                          key={cod}
                          className="flex items-center justify-between gap-4 p-4 bg-gray-50 rounded-2xl border shadow-inner"
                        >
                          <span className="font-bold text-[#0A2540] text-[10px] uppercase italic">
                            {cod} - {num === '1' ? 'Até 43' : num === '2' ? '44 a 58' : '59+'} anos
                          </span>

                          <input
                            type="text"
                            value={precosData[cod] || ''}
                            onChange={(e) =>
                              setPrecosData({ ...precosData, [cod]: e.target.value })
                            }
                            className="bg-white px-4 py-2 rounded-xl border-2 font-black text-[#0A2540] w-28 lg:w-32 text-right outline-none focus:border-[#D4AF37]"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleSaveTabelas}
              className="w-full bg-[#0A2540] text-[#D4AF37] py-6 lg:py-8 rounded-[28px] lg:rounded-[32px] font-black uppercase italic flex items-center justify-center gap-4 hover:bg-[#D4AF37] hover:text-[#0A2540] transition-all shadow-2xl text-base lg:text-xl"
            >
              <Save className="w-6 h-6 lg:w-8 lg:h-8" /> Gravar Alterações de Preços
            </button>
          </div>
        )}

        {activeTab === 'promocao' && (
          <div className="animate-in slide-in-from-right-10 max-w-4xl mx-auto text-left">
            <h2 className="text-3xl lg:text-5xl font-black text-[#0A2540] mb-8 lg:mb-12 uppercase italic text-center tracking-tighter">
              Oferta <span className="text-[#D4AF37]">Relâmpago</span>
            </h2>

            <div className="bg-white p-6 lg:p-12 rounded-[32px] lg:rounded-[48px] shadow-xl border space-y-8">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase ml-4 mb-2 block">
                  Texto da Oferta
                </label>
                <input
                  type="text"
                  value={promoText}
                  onChange={(e) => setPromoText(e.target.value)}
                  className="w-full p-5 lg:p-6 bg-gray-50 rounded-3xl border-2 border-transparent focus:border-[#D4AF37] font-black text-[#0A2540] outline-none uppercase"
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase ml-4 mb-2 block">
                  Encerramento
                </label>
                <input
                  type="datetime-local"
                  value={promoDate}
                  onChange={(e) => setPromoDate(e.target.value)}
                  className="w-full p-5 lg:p-6 bg-gray-50 rounded-3xl border-2 border-transparent focus:border-[#D4AF37] font-black text-[#0A2540] outline-none"
                />
              </div>

              <button
                onClick={handleSavePromo}
                className="w-full bg-[#0A2540] text-[#D4AF37] py-6 lg:py-8 rounded-[28px] lg:rounded-[32px] font-black uppercase italic flex items-center justify-center gap-4 hover:bg-[#D4AF37] hover:text-[#0A2540] transition-all shadow-2xl text-base lg:text-xl"
              >
                <Save className="w-6 h-6 lg:w-8 lg:h-8" /> Atualizar Promoção
              </button>
            </div>
          </div>
        )}
      </main>

      {showModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3 lg:p-6 bg-[#0A2540]/90 backdrop-blur-md">
          <div className="bg-white w-full max-w-5xl rounded-[32px] lg:rounded-[50px] p-5 lg:p-12 shadow-2xl overflow-y-auto max-h-[95vh] animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl lg:text-3xl font-black uppercase italic tracking-tighter">
                {showModal === 'new' ? 'Novo' : 'Editar'}{' '}
                <span className="text-[#D4AF37]">Parceiro</span>
              </h3>

              <button
                onClick={() => setShowModal(null)}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-500 group transition-all"
              >
                <X className="group-hover:text-white" />
              </button>
            </div>

            {showModal === 'new' && (
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-2 mb-8 p-4 lg:p-6 bg-gray-50 rounded-[24px] lg:rounded-[32px] max-h-48 overflow-y-auto border-2 border-dashed shadow-inner">
                {indicadores.map((ind) => {
                  const ocupado = String(ind.nome ?? '').trim() !== '';

                  return (
                    <button
                      key={ind.id}
                      type="button"
                      disabled={ocupado}
                      onClick={() =>
                        setSelectedPartner({ ...selectedPartner, id: ind.id })
                      }
                      className={`h-12 rounded-xl text-[10px] font-black transition-all border-2 ${
                        ocupado
                          ? 'bg-gray-100 text-gray-200 border-transparent opacity-30 cursor-not-allowed'
                          : selectedPartner?.id === ind.id
                          ? 'bg-[#D4AF37] text-[#0A2540] border-[#0A2540] scale-110 shadow-lg'
                          : 'bg-white text-green-600 border-green-100 hover:border-green-400'
                      }`}
                    >
                      {ind.id}
                    </button>
                  );
                })}
              </div>
            )}

            <form onSubmit={handleSavePartner} className="space-y-6 text-left">
              <div className="bg-[#0A2540] text-[#D4AF37] p-5 rounded-2xl italic font-black text-xl lg:text-2xl shadow-sm border border-white/10">
                Ref: {selectedPartner?.id}
              </div>

              <input
                type="text"
                placeholder="NOME COMPLETO"
                value={selectedPartner?.nome || ''}
                className="w-full p-4 lg:p-5 bg-gray-50 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-[#D4AF37] uppercase"
                onChange={(e) =>
                  setSelectedPartner({
                    ...selectedPartner,
                    nome: e.target.value.toUpperCase(),
                  })
                }
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="WHATSAPP"
                  value={selectedPartner?.whatsapp || ''}
                  className="p-4 lg:p-5 bg-gray-50 rounded-2xl font-bold outline-none border-2 border-gray-100 focus:border-[#D4AF37]"
                  onChange={(e) =>
                    setSelectedPartner({
                      ...selectedPartner,
                      whatsapp: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="BAIRRO"
                  value={selectedPartner?.local || ''}
                  className="p-4 lg:p-5 bg-gray-50 rounded-2xl font-bold outline-none border-2 border-gray-100 focus:border-[#D4AF37]"
                  onChange={(e) =>
                    setSelectedPartner({
                      ...selectedPartner,
                      local: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedPartner({
                      ...selectedPartner,
                      status:
                        selectedPartner.status === 'ativo' ? 'inativo' : 'ativo',
                    })
                  }
                  className={`p-5 rounded-2xl font-black uppercase italic border-2 transition-all flex-1 ${
                    selectedPartner?.status === 'ativo'
                      ? 'bg-green-50 border-green-200 text-green-600'
                      : 'bg-red-50 border-red-200 text-red-600'
                  }`}
                >
                  Status: {selectedPartner?.status}
                </button>

                <button
                  type="submit"
                  className="bg-[#D4AF37] text-[#0A2540] p-5 rounded-2xl font-black uppercase italic shadow-xl flex-[2] hover:scale-[1.01] transition-all"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showVendaModal && selectedVenda && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3 lg:p-6 bg-[#0A2540]/90 backdrop-blur-md">
          <div className="bg-white w-full max-w-4xl rounded-[32px] lg:rounded-[50px] p-5 lg:p-12 shadow-2xl overflow-y-auto max-h-[95vh] animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl lg:text-3xl font-black uppercase italic tracking-tighter">
                {showVendaModal === 'new' ? 'Nova' : 'Editar'}{' '}
                <span className="text-[#D4AF37]">Venda</span>
              </h3>

              <button
                onClick={() => {
                  setShowVendaModal(null);
                  setSelectedVenda(null);
                  setVendaOriginal(null);
                }}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-500 group transition-all"
              >
                <X className="group-hover:text-white" />
              </button>
            </div>

            <form onSubmit={handleSaveVenda} className="space-y-6 text-left">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#0A2540] text-[#D4AF37] p-5 rounded-2xl italic font-black text-lg lg:text-xl shadow-sm border border-white/10">
                  Ref: {selectedVenda.id_indicador || '---'}
                </div>

                <div className="bg-gray-50 text-[#0A2540] p-5 rounded-2xl font-black text-lg lg:text-xl shadow-sm border">
                  OS: {normalizeOs(selectedVenda.os) || 'Aguardando'}
                </div>

                <div className="bg-gray-50 text-[#0A2540] p-5 rounded-2xl font-black text-lg lg:text-xl shadow-sm border">
                  Status: {selectedVenda.status}
                </div>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-2 p-4 lg:p-6 bg-gray-50 rounded-[24px] lg:rounded-[32px] max-h-48 overflow-y-auto border-2 border-dashed shadow-inner">
                {indicadores
                  .filter((ind) => ind.nome && String(ind.nome).trim() !== '')
                  .map((ind) => (
                    <button
                      key={ind.id}
                      type="button"
                      onClick={() =>
                        setSelectedVenda({
                          ...selectedVenda,
                          id_indicador: ind.id,
                        })
                      }
                      className={`h-12 rounded-xl text-[10px] font-black transition-all border-2 ${
                        toStr(selectedVenda.id_indicador) === toStr(ind.id)
                          ? 'bg-[#D4AF37] text-[#0A2540] border-[#0A2540] scale-110 shadow-lg'
                          : 'bg-white text-green-600 border-green-100 hover:border-green-400'
                      }`}
                    >
                      {ind.id}
                    </button>
                  ))}
              </div>

              <input
                type="text"
                placeholder="NOME DO CLIENTE"
                value={selectedVenda.cliente_nome || ''}
                className="w-full p-4 lg:p-5 bg-gray-50 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-[#D4AF37] uppercase"
                onChange={(e) =>
                  setSelectedVenda({
                    ...selectedVenda,
                    cliente_nome: e.target.value.toUpperCase(),
                  })
                }
                required
              />

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="WHATSAPP"
                  value={selectedVenda.telefone || ''}
                  className="p-4 lg:p-5 bg-gray-50 rounded-2xl font-bold outline-none border-2 border-gray-100 focus:border-[#D4AF37]"
                  onChange={(e) =>
                    setSelectedVenda({
                      ...selectedVenda,
                      telefone: e.target.value,
                    })
                  }
                />

                <input
                  type="email"
                  placeholder="EMAIL"
                  value={selectedVenda.email || ''}
                  className="p-4 lg:p-5 bg-gray-50 rounded-2xl font-bold outline-none border-2 border-gray-100 focus:border-[#D4AF37]"
                  onChange={(e) =>
                    setSelectedVenda({
                      ...selectedVenda,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="DATA"
                  value={selectedVenda.data || ''}
                  className="p-4 lg:p-5 bg-gray-50 rounded-2xl font-bold outline-none border-2 border-gray-100 focus:border-[#D4AF37]"
                  onChange={(e) =>
                    setSelectedVenda({
                      ...selectedVenda,
                      data: e.target.value,
                    })
                  }
                />

                <select
                  value={selectedVenda.cod_plano || ''}
                  className="p-4 lg:p-5 bg-gray-50 rounded-2xl font-bold outline-none border-2 border-gray-100 focus:border-[#D4AF37]"
                  onChange={(e) =>
                    setSelectedVenda({
                      ...selectedVenda,
                      cod_plano: e.target.value,
                    })
                  }
                >
                  <option value="">PLANO</option>
                  <option value="E1">E1</option>
                  <option value="A1">A1</option>
                  <option value="E2">E2</option>
                  <option value="A2">A2</option>
                  <option value="E3">E3</option>
                  <option value="A3">A3</option>
                </select>

                <select
                  value={selectedVenda.status || 'aberto'}
                  className="p-4 lg:p-5 bg-gray-50 rounded-2xl font-bold outline-none border-2 border-gray-100 focus:border-[#D4AF37]"
                  onChange={(e) =>
                    setSelectedVenda({
                      ...selectedVenda,
                      status: e.target.value as VendaStatus,
                    })
                  }
                >
                  <option value="aberto">aberto</option>
                  <option value="negociando">negociando</option>
                  <option value="fechado">fechado</option>
                </select>
              </div>

              <textarea
                placeholder="OBSERVAÇÃO"
                value={selectedVenda.observacao || ''}
                className="w-full min-h-[120px] p-4 lg:p-5 bg-gray-50 rounded-2xl font-bold outline-none border-2 border-gray-100 focus:border-[#D4AF37] resize-none"
                onChange={(e) =>
                  setSelectedVenda({
                    ...selectedVenda,
                    observacao: e.target.value,
                  })
                }
              />

              <button
                type="submit"
                className="w-full bg-[#D4AF37] text-[#0A2540] p-5 rounded-2xl font-black uppercase italic shadow-xl hover:scale-[1.01] transition-all"
              >
                Salvar Venda
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}