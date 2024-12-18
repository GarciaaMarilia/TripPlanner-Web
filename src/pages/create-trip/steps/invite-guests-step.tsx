import { UserRoundPlus, ArrowRight } from "lucide-react";

import { Button } from "../../../components/button";

interface InviteGuestsStepProps {
 openGuestsModal: () => void;
 openConfirmTripModal: () => void;
 emailsToInvite: string[];
}

export function InviteGuestsStep({
 emailsToInvite,
 openConfirmTripModal,
 openGuestsModal,
}: InviteGuestsStepProps) {
 return (
  <div className="sm:h-16 h-24 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
   <button
    type="button"
    onClick={openGuestsModal}
    className="flex items-center gap-2 flex-1 text-left"
   >
    <UserRoundPlus className="sm:size-5 size-7 text-zinc-400" />
    {emailsToInvite.length > 0 ? (
     <span className="text-zinc-100 text-lg flex-1">
      {emailsToInvite.length} invited person(s)
     </span>
    ) : (
     <span className="text-zinc-400 text-lg flex-1">
      Who will be on the trip?
     </span>
    )}
   </button>

   <div className="w-px h-6 bg-zinc-800" />

   <Button onClick={openConfirmTripModal}>
    Confirm trip
    <ArrowRight className="size-5" />
   </Button>
  </div>
 );
}
