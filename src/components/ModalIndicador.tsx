import { X, Save, UserPlus, MapPin, Phone } from 'lucide-react';

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
        <button onClick={onClose} className="absolute top-8 right-8 text-gray-400 hover:text-red-500"><X /></button>
        <h3 className="text-2xl font-black text-[#0A2540] mb-8 uppercase italic tracking-tighter">
          {indicadorParaEditar ? 'Editar Parceiro' : 'Novo Parceiro'}
        </h3>

        <form onSubmit={(e) => {
          e.preventDefault();
          const target = e.target as any;
          onSave({
            id: indicadorParaEditar?.id || "", 
            nome: target.nome.value,
            local: target.local.value,
            whatsapp: target.whatsapp.value,
          });
        }} className="space-y-4">
          <input name="nome" defaultValue={indicadorParaEditar?.nome} required placeholder="Nome (Ex: Porteiro Wilson)" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none font-bold" />
          <input name="local" defaultValue={indicadorParaEditar?.local} required placeholder="Local (Ex: Ed. Malibu)" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none font-bold" />
          <input name="whatsapp" defaultValue={indicadorParaEditar?.whatsapp} required placeholder="WhatsApp (219XXXXXXXX)" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none font-bold" />
          <button type="submit" className="w-full bg-[#0A2540] text-[#D4AF37] py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-3">
            <Save className="w-5 h-5" /> Salvar Indicador
          </button>
        </form>
      </div>
    </div>
  );
}