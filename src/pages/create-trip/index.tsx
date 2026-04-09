import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DateRange } from "react-day-picker";

import { ConfirmTripModal } from "./confirm-trip-modal";
import { getDisplayedDate } from "../../utils/formatDate";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";

import plannerImg from "../../../public/assets/logo.svg";
import { saveTrip } from "../../services/create-trip-service";

export function CreateTripPage() {
 const navigate = useNavigate();
 const [loading, setLoading] = useState<boolean>(false);
 const [ownerName, setOwnerName] = useState<string>("");
 const [ownerEmail, setOwnerEmail] = useState<string>("");
 const [destination, setDestination] = useState<string>("");
 const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] =
  useState<boolean>(false);
 const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
  DateRange | undefined
 >();

 const displayedDate = getDisplayedDate(eventStartAndEndDates) as string;
 const id_user = localStorage.getItem("userId");

 const handleTripModal = () => {
  setIsConfirmTripModalOpen((prev) => !prev);
 };

 const createTrip = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  try {
   setLoading(true);
   const tripData = {
    destination,
    id_user,
    eventStartAndEndDates,
    owner_name: ownerName,
    owner_email: ownerEmail,
   };
   const response = await saveTrip(tripData);

   if (response) {
    const tripId = response;

    navigate(`/trips/${tripId}`);
   }
  } catch (error) {
   console.error(error);
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
   <div className="max-w-3xl w-full px-6 text-center space-y-10">
    <div className="flex flex-col items-center gap-3">
     <img src={plannerImg} alt="plann.er" />
     <p className="text-zinc-300 text-lg">
      Invite your friends and plan your next trip!
     </p>
    </div>

    <div className="space-y-4">
     <DestinationAndDateStep
      setConfirm={handleTripModal}
      setDestination={setDestination}
      eventStartAndEndDates={eventStartAndEndDates}
      setEventStartAndEndDates={setEventStartAndEndDates}
     />
    </div>

    <p className="text-sm text-zinc-500">
     By planning your trip with plann.er you automatically agree <br />
     to our{" "}
     <a className="text-zinc-300 underline" href="#">
      terms of use
     </a>{" "}
     and{" "}
     <a className="text-zinc-300 underline" href="#">
      privacy policies
     </a>
     .
    </p>
   </div>

   {/* {isConfirmTripModalOpen && (
    <ConfirmTripModal
     loading={loading}
     date={displayedDate}
     createTrip={createTrip}
     destination={destination}
     setOwnerName={setOwnerName}
     setOwnerEmail={setOwnerEmail}
     closeConfirmTripModal={handleTripModal}
    />
   )} */}
  </div>
 );
}
