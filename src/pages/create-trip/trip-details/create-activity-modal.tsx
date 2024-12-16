import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";

import { Calendar, Tag, X } from "lucide-react";

import { Activity } from "../../../models/models";
import { Button } from "../../../components/button";
import { ConfirmModal, ModalType } from "../../../components/modal";
import { createActivity } from "../../../services/create-activity-service";
import { ErrorModal, ErrorModalType } from "../../../components/error-modal";

interface CreateActivityModalProps {
 closeCreateActivityModal: () => void;
}

export function CreateActivityModal({
 closeCreateActivityModal,
}: CreateActivityModalProps) {
 const { tripId } = useParams();
 const [errorMessage, setErrorMessage] = useState<string>("");
 const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
 const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

 function openConfirmModal() {
  setIsConfirmModalOpen(true);
 }

 function closeConfirmModal() {
  setIsConfirmModalOpen(false);
  window.document.location.reload();
 }

 function openErrorModal() {
  setIsErrorModalOpen(true);
 }

 function closeErrorModal() {
  setIsErrorModalOpen(false);
 }

 async function handleCreateActivity(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const data = new FormData(event.currentTarget);

  const title = data.get("title")?.toString();
  const occurs_at = data.get("occurs_at")?.toString();

  if (!title || !occurs_at) {
   setErrorMessage("Incorrect title or date");
   return openErrorModal();
  }

  if (tripId && title && occurs_at) {
   const activityData: Activity = {
    id: new Date().toDateString(),
    title: title,
    occurs_at: occurs_at,
    trip_id: tripId,
   };
   const result = await createActivity(tripId, activityData);
   if (result && result.success) {
    openConfirmModal();
   } else if (result && result.message) {
    openErrorModal();
    setErrorMessage(result?.message);
   }
  }
 }

 return (
  <div className="fixed inset-0 z-[1000] bg-black/60 flex items-center justify-center">
   <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
    <div className="space-y-2">
     <div className="flex items-center justify-between">
      <h2 className="font-lg font-semibold">Create an activity</h2>
      <button>
       <X className="size-5 text-zinc-400" onClick={closeCreateActivityModal} />
      </button>
     </div>

     <p className="text-sm text-zinc-400">
      All guests can view the activities.
     </p>
    </div>

    <form onSubmit={handleCreateActivity} className="space-y-3">
     <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
      <Tag className="text-zinc-400 size-5" />
      <input
       name="title"
       placeholder="What's the activity?"
       className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
      />
     </div>

     <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
      <Calendar className="text-zinc-400 size-5" />
      <input
       type="datetime-local"
       name="occurs_at"
       placeholder="Date and time of the activity"
       className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
      />
     </div>

     <Button size="full">Save activity</Button>
    </form>

    {isConfirmModalOpen && (
     <ConfirmModal
      type={ModalType.Activity}
      closeConfirmModal={closeConfirmModal}
     />
    )}

    {isErrorModalOpen && (
     <ErrorModal
      message={errorMessage}
      type={ErrorModalType.CreateError}
      closeErrorModal={closeErrorModal}
     />
    )}
   </div>
  </div>
 );
}
