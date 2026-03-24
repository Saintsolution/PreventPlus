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

  return (
    <div className="fixed inset-0 bg-[#0A2540]/90 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-[40px] w-full max-w-4xl max-h-[90vh] overflow-y-auto p-10 shadow-2xl relative border border-white/20">
        <button onClick={onClose} className="absolute top-8 right-8 text-gray-400 hover:text-red-500 transition-colors">
          <X className="w-8 h-8" />
        </button>
        
        <h2 className="text-3xl font-black text-[#0A2540] mb-2 uppercase italic tracking-tighter">Ajustar Mensalidades</h2>
        <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] mb-10">Configuração Direta PreventPlus</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          {precos.map((p, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-[24px] border-2 border-transparent hover:border-[#D4AF37]/30 transition-all group">
              <p className="text-[10px] font-black text-gray-400 mb-1 uppercase tracking-widest">{p.cod_plan} — {p.nome_plan}</p>
              <p className="text-[11px] font-bold text-[#D4AF37] mb-3 uppercase">{p.faixa_etaria}</p>
              <div className="flex items-center gap-3">
                <span className="font-black text-[#0A2540] text-xl">R$</span>
                <input 
                  type="text" 
                  value={p.valor_mensalidade} 
                  onChange={(e) => {
                    const newPrecos = [...precos];
                    newPrecos[i].valor_mensalidade = e.target.value;
                    setPrecos(newPrecos);
                  }}
                  className="w-full bg-white border-none rounded-xl py-3 px-4 font-black text-[#0A2540] text-xl shadow-inner focus:ring-2 ring-[#D4AF37] outline-none"
                />
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={onSave} 
          disabled={loading}
          className="w-full mt-10 bg-[#0A2540] text-[#D4AF37] py-6 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4"
        >
          {loading ? <Loader2 className="animate-spin w-6 h-6" /> : <Save className="w-6 h-6" />}
          {loading ? "Gravando..." : "Salvar na Planilha"}
        </button>
      </div>
    </div>
  );
}