import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import { CheckCircle2, CircleDashed, Trash, UserCog } from "lucide-react";

import { Button } from "../../../components/button";
import { Participant } from "../../../models/models";
import { getGuests } from "../../../services/get-guests-service";

export function Guests() {
 const { tripId } = useParams();
 const location = useLocation();
 const { disabled } = location.state || {};
 const [participants, setParticipants] = useState<Participant[]>([]);

 useEffect(() => {
  if (tripId) {
   const fetchParticipants = async () => {
    const participantsData = await getGuests(tripId);
    setParticipants(participantsData);
   };

   fetchParticipants();
  }
 }, [tripId]);

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
        </span>
        <Trash className="size-5" />
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
  </div>
 );
}
