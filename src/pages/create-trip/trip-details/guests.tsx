import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import { CheckCircle2, CircleDashed, Trash, UserCog } from "lucide-react";

import { Button } from "../../../components/button";
import { Participant } from "../../../models/models";
import { DeleteModal } from "../../../components/delete-modal";
import { getGuests } from "../../../services/get-guests-service";
import { deleteGuestService } from "../../../services/delete-guest-service";

export function Guests() {
 const { tripId } = useParams();
 const location = useLocation();
 const { disabled } = location.state || {};
 const [participants, setParticipants] = useState<Participant[]>([]);
 const [selectedGuestId, setSelectedGuestId] = useState<string>("");
 const [deleteGuestModal, setDeleteGuestModal] = useState<boolean>(false);

 useEffect(() => {
  if (tripId) {
   const fetchParticipants = async () => {
    const participantsData = await getGuests(tripId);
    setParticipants(participantsData);
   };

   fetchParticipants();
  }
 }, [tripId]);

 async function deleteGuest(participantId: string) {
  if (tripId && participantId) {
   await deleteGuestService(participantId, tripId);
  }
  closeDeleteGuestModal();
  window.document.location.reload();
 }

 function openDeleteGuestModal(id: string) {
  setSelectedGuestId(id);
  setDeleteGuestModal(true);
 }

 function closeDeleteGuestModal() {
  setSelectedGuestId("");
  setDeleteGuestModal(false);
 }

 return (
  <div className="space-y-6">
   <h2 className="font-semibold text-xl">Guests</h2>

   <div className="space-y-5">
    {participants.map((participant, index) => (
     <div
      key={participant.id}
      className="flex items-center justify-between gap-4"
     >
      <div className="space-y-1.5">
       <div className="flex gap-2">
        <span className="block font-medium text-zinc-100">
         {participant.name ?? `Convidado ${index}`}
         {participant.name && participant.is_owner && " (Owner)"}
        </span>
        {!participant.is_owner && (
         <button
          onClick={() => openDeleteGuestModal(participant.id)}
          disabled={disabled}
         >
          <Trash className="size-5" />
         </button>
        )}
       </div>
       <span className="block text-sm text-zinc-400 truncate">
        {participant.email}
       </span>
      </div>

      {participant.is_confirmed ? (
       <CheckCircle2 className="text-green-400 size-5 shrink-0" />
      ) : (
       <CircleDashed className="text-zinc-400 size-5 shrink-0" />
      )}
     </div>
    ))}
   </div>

   <Button variant={disabled ? "disabled" : "primary"} size="full">
    <UserCog className="size-5" />
    Manage guests
   </Button>

   {selectedGuestId && deleteGuestModal && (
    <DeleteModal
     type="Guest"
     closeDeleteModal={closeDeleteGuestModal}
     confirmDeleteItem={() => deleteGuest(selectedGuestId)}
    />
   )}
  </div>
 );
}
