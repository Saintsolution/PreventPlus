import { X, DollarSign, CheckCircle2 } from 'lucide-react';

interface ModalVendaProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (nome: string, plano: string) => void;
  indicadorNome: string;
}

export function ModalVenda({ isOpen, onClose, onConfirm, indicadorNome }: ModalVendaProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#0A2540]/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-[40px] w-full max-w-md p-10 shadow-2xl animate-in fade-in zoom-in duration-200 relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-red-500"><X /></button>
        <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
          <DollarSign className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-black text-[#0A2540] mb-2 uppercase italic tracking-tighter">Registrar Venda</h3>
        <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest mb-8">Indicador: {indicadorNome}</p>
        
        <form onSubmit={(e) => {
          e.preventDefault();
          const target = e.target as any;
          onConfirm(target.nome.value, target.plano.value);
        }} className="space-y-4">
          <input name="nome" required placeholder="Nome do Cliente" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none font-bold text-[#0A2540] focus:ring-2 ring-[#D4AF37]" />
          <select name="plano" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none font-bold text-[#0A2540] focus:ring-2 ring-[#D4AF37] appearance-none cursor-pointer">
            <option>Enfermaria</option>
            <option>Apartamento</option>
          </select>
          <button type="submit" className="w-full bg-[#0A2540] text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-all">
            <CheckCircle2 className="w-5 h-5" /> Confirmar Baixa
          </button>
        </form>
      </div>
    </div>
  );
}