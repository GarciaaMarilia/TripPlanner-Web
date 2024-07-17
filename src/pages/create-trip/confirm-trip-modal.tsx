import { User, X } from "lucide-react";
import { FormEvent } from "react";

interface ConfirmTripModalProps {
 closeConfirmTripModal: () => void;
 setOwnerName: (name: string) => void;
 setOwnerEmail: (email: string) => void;
 createTrip: (event: FormEvent<HTMLFormElement>) => void;
}

export function ConfirmTripModal({
 closeConfirmTripModal,
 createTrip,
 setOwnerEmail,
 setOwnerName,
}: ConfirmTripModalProps) {
 return (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
   <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
    <div className="space-y-2">
     <div className="flex items-center justify-between">
      <h2 className="font-lg font-semibold">Confirmar criação da viagem</h2>
      <button>
       <X className="size-5 text-zinc-400" onClick={closeConfirmTripModal} />
      </button>
     </div>

     <p className="text-sm text-zinc-400">
      Para concluir a criação da viagem para{" "}
      <span className="font-semibold text-zinc-100">Florianopolis, Brasil</span>{" "}
      nas datas de{" "}
      <span className="font-semibold text-zinc-100">
       16 a 27 de Agosto de 2024
      </span>
      .
     </p>
    </div>

    <form onSubmit={createTrip} className="space-y-5">
     <div className="px-4 h-14 flex items-centerp-2.5 bg-zinc-950 border border-zinc-800 rounded-lg items-center flex-1 gap-2">
      <User className="text-zinc-400 size-5" />
      <input
       type="text"
       name="name"
       placeholder="Seu nome completo"
       className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
      />
     </div>
     <div className="px-4 h-14 flex items-centerp-2.5 bg-zinc-950 border border-zinc-800 rounded-lg items-center flex-1 gap-2">
      <User className="text-zinc-400 size-5" />
      <input
       type="email"
       name="email"
       placeholder="Seu email pessoal"
       className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
      />
     </div>

     <button
      type="submit"
      className="w-full gap-2 justify-center bg-lime-300 text-lime-950 rounded-lg px-5 font-medium flex items-center h-11 hover:bg-lime-400"
     >
      Confirmar criação da viagem
     </button>
    </form>
   </div>
  </div>
 );
}
