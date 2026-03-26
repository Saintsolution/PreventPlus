import { X, Save, UserCheck, UserX, MapPin, Phone } from 'lucide-react';

interface ModalIndicadorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dados: any) => void;
  indicadorParaEditar?: any;
}

export function ModalIndicador({ isOpen, onClose, onSave, indicadorParaEditar }: ModalIndicadorProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#0A2540]/80 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
      <div className="bg-white rounded-[40px] w-full max-w-lg p-10 shadow-2xl relative animate-in zoom-in duration-200">
        <button onClick={onClose} className="absolute top-8 right-8 text-gray-400 hover:text-red-500 transition-colors"><X /></button>
        
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gray-50 rounded-2xl text-[#D4AF37]">
            {indicadorParaEditar ? <UserCheck className="w-6 h-6" /> : <UserCheck className="w-6 h-6" />}
          </div>
          <h3 className="text-2xl font-black text-[#0A2540] uppercase italic tracking-tighter">
            {indicadorParaEditar ? 'Editar Parceiro' : 'Novo Parceiro'}
          </h3>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          const target = e.target as any;
          onSave({
            id: indicadorParaEditar?.id || "", 
            nome: target.nome.value,
            local: target.local.value,
            whatsapp: target.whatsapp.value,
            status: target.status.value, // <--- PEGANDO O STATUS AGORA!
          });
        }} className="space-y-4">
          
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Nome do Parceiro</label>
            <input name="nome" defaultValue={indicadorParaEditar?.nome} required placeholder="Ex: Porteiro Wilson" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none font-bold focus:ring-2 ring-[#D4AF37] transition-all" />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Local / Condomínio</label>
            <input name="local" defaultValue={indicadorParaEditar?.local} required placeholder="Ex: Ed. Malibu" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none font-bold focus:ring-2 ring-[#D4AF37] transition-all" />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-4">WhatsApp</label>
            <input name="whatsapp" defaultValue={indicadorParaEditar?.whatsapp} required placeholder="219XXXXXXXX" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none font-bold focus:ring-2 ring-[#D4AF37] transition-all" />
          </div>

          {/* NOVO CAMPO DE STATUS PARA O RICARDO */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Status da Parceria</label>
            <select 
              name="status" 
              defaultValue={indicadorParaEditar?.status || 'ativo'} 
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none font-black uppercase text-sm appearance-none cursor-pointer focus:ring-2 ring-[#D4AF37] transition-all"
            >
              <option value="ativo" className="text-green-600">✅ Ativo</option>
              <option value="inativo" className="text-red-600">❌ Inativo</option>
            </select>
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full bg-[#0A2540] text-[#D4AF37] py-5 rounded-3xl font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all">
              <Save className="w-5 h-5" /> Confirmar e Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}