import { FormEvent } from "react";
import { useParams } from "react-router-dom";

import { Link2, Tag, X } from "lucide-react";

import { api } from "../../../lib/axios";
import { Button } from "../../../components/button";

interface RegisterLinkModalProps {
 closeRegisterLinkModal: () => void;
}

export function RegisterLinkModal({
 closeRegisterLinkModal,
}: RegisterLinkModalProps) {
 const { tripId } = useParams();

 async function registerLink(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const data = new FormData(event.currentTarget);

  const title = data.get("title")?.toString();
  const url = data.get("url")?.toString();

  await api.post(`/trips/${tripId}/links`, {
   title,
   url,
  });

  window.document.location.reload();
 }

 return (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
   <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
    <div className="space-y-2">
     <div className="flex items-center justify-between">
      <h2 className="font-lg font-semibold">Register a link</h2>
      <button>
       <X className="size-5 text-zinc-400" onClick={closeRegisterLinkModal} />
      </button>
     </div>

     <p className="text-sm text-zinc-400">All guests can view the links.</p>
    </div>

    <form onSubmit={registerLink} className="space-y-3">
     <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
      <Tag className="text-zinc-400 size-5" />
      <input
       type="text"
       name="title"
       placeholder="What's the activity?"
       className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
      />
     </div>

     <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
      <Link2 className="text-zinc-400 size-5" />
      <input
       type="text"
       name="url"
       placeholder="URL"
       className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
      />
     </div>

     <Button size="full">Register link</Button>
    </form>
   </div>
  </div>
 );
}
