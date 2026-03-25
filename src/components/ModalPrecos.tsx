import { X, Save, Loader2 } from 'lucide-react';

interface ModalPrecosProps {
  isOpen: boolean;
  onClose: () => void;
  precos: any[];
  setPrecos: (precos: any[]) => void;
  onSave: () => void;
  loading: boolean;
}

export function ModalPrecos({ isOpen, onClose, precos, setPrecos, onSave, loading }: ModalPrecosProps) {
  if (!isOpen) return null;

  // Separa os planos para o layout em duas colunas
  const enfermarias = precos.filter(p => p.cod_plan.startsWith('E'));
  const apartamentos = precos.filter(p => p.cod_plan.startsWith('A'));

  const handleChange = (cod: string, novoValor: string) => {
    const atualizados = precos.map(p => 
      p.cod_plan === cod ? { ...p, valor_mensalidade: novoValor } : p
    );
    setPrecos(atualizados);
  };

  return (
    <div className="fixed inset-0 bg-[#0A2540]/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-[40px] w-full max-w-2xl overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-2xl font-black text-[#0A2540] italic uppercase tracking-tighter">Ajustar Mensalidades</h2>
            <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">Configuração Direta PreventPlus</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white rounded-2xl transition-colors">
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            
            {/* COLUNA ENFERMARIA */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div> Enfermarias
              </h3>
              {enfermarias.map((plano) => (
                <div key={plano.cod_plan} className="group relative">
                  <label className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-[#0A2540] text-xs">
                    {plano.cod_plan}
                  </label>
                  <input
                    type="text"
                    value={plano.valor_mensalidade}
                    onChange={(e) => handleChange(plano.cod_plan, e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl font-black text-right text-[#0A2540] outline-none focus:ring-2 ring-[#D4AF37] transition-all"
                  />
                </div>
              ))}
            </div>

            {/* COLUNA APARTAMENTO */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div> Apartamentos
              </h3>
              {apartamentos.map((plano) => (
                <div key={plano.cod_plan} className="group relative">
                  <label className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-[#0A2540] text-xs">
                    {plano.cod_plan}
                  </label>
                  <input
                    type="text"
                    value={plano.valor_mensalidade}
                    onChange={(e) => handleChange(plano.cod_plan, e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl font-black text-right text-[#0A2540] outline-none focus:ring-2 ring-[#D4AF37] transition-all"
                  />
                </div>
              ))}
            </div>

          </div>

          <button
            onClick={onSave}
            disabled={loading}
            className="w-full bg-[#0A2540] text-white py-5 rounded-[24px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5 text-[#D4AF37]" />}
            {loading ? "Sincronizando..." : "Salvar na Planilha"}
          </button>
        </div>
      </div>
    </div>
  );
}