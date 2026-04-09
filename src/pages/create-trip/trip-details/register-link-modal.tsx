import ReactDOM from "react-dom";
import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";

import { Link2, Tag, X } from "lucide-react";

import { Button } from "../../../components/button";
import { ConfirmModal, ModalType } from "../../../components/confirm-modal";
import { registerLink } from "../../../services/create-link-service";

interface RegisterLinkModalProps {
 closeRegisterLinkModal: () => void;
}

export type Link = { title: string; url: string };

export function RegisterLinkModal({
 closeRegisterLinkModal,
}: RegisterLinkModalProps) {
 const { tripId } = useParams();
 const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

 const handleConfirmModal = (shouldReload = false) => {
  setIsConfirmModalOpen((prev) => !prev);
  if (shouldReload) {
   setTimeout(() => {
    window.document.location.reload();
   }, 200);
  }
 };

 const handleRegisterLink = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  if (!tripId) {
   return;
  }

  const token = localStorage.getItem("token");

  if (!token) {
   return;
  }

  const data = new FormData(event.currentTarget);

  const link: Link = {
   title: data.get("title")?.toString() || "",
   url: data.get("url")?.toString() || "",
  };

  const response = await registerLink(tripId, link);

  if (response && response.linkId) {
   handleConfirmModal(true);
  }
 };

 return ReactDOM.createPortal(
  <div className="fixed inset-0 z-[50] bg-black/60 flex items-center justify-center">
   <div className="sm:w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
    <div className="space-y-2">
     <div className="flex items-center justify-between">
      <h2 className="font-lg font-semibold">Register a link</h2>
      <button>
       <X className="size-5 text-zinc-400" onClick={closeRegisterLinkModal} />
      </button>
     </div>

     <p className="text-sm text-zinc-400">All guests can view the links.</p>
    </div>

    {isConfirmModalOpen && (
     <ConfirmModal
      type={ModalType.Link}
      closeConfirmModal={handleConfirmModal}
     />
    )}

    <form onSubmit={handleRegisterLink} className="space-y-3">
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
  </div>,
  document.body
 );
}
