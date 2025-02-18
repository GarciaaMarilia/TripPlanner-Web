import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DateRange } from "react-day-picker";

import { api } from "../../lib/axios";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { getDisplayedDate } from "../../utils/formatDate";
import { InviteGuestsModal } from "./invite-guests-modal";
import { InviteGuestsStep } from "./steps/invite-guests-step";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";

import plannerImg from "../../../public/assets/logo.svg";

export function CreateTripPage() {
 const navigate = useNavigate();
 const [loading, setLoading] = useState<boolean>(false);
 const [ownerName, setOwnerName] = useState<string>("");
 const [ownerEmail, setOwnerEmail] = useState<string>("");
 const [destination, setDestination] = useState<string>("");
 const [isGuestsInputOpen, setIsGuestsInputOpen] = useState<boolean>(false);
 const [isGuestsModalOpen, setIsGuestsModalOpen] = useState<boolean>(false);
 const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
 const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] =
  useState<boolean>(false);
 const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
  DateRange | undefined
 >();

 const displayedDate = getDisplayedDate(eventStartAndEndDates) as string;

 function openGuestsInput() {
  setIsGuestsInputOpen(true);
 }

 function closeGuestsInput() {
  setIsGuestsInputOpen(false);
 }

 function openGuestsModal() {
  setIsGuestsModalOpen(true);
 }

 function closeGuestsModal() {
  setIsGuestsModalOpen(false);
 }

 function openConfirmTripModal() {
  setIsConfirmTripModalOpen(true);
 }

 function closeConfirmTripModal() {
  setIsConfirmTripModalOpen(false);
 }

 function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const data = new FormData(event.currentTarget);
  const email = data.get("email")?.toString();

  if (!email) {
   return;
  }

  if (emailsToInvite.includes(email)) {
   return;
  }

  setEmailsToInvite([...emailsToInvite, email]);

  event.currentTarget.reset();
 }

 function removeEmailFromInvites(emailToRemove: string) {
  const newEmailList = emailsToInvite.filter(
   (email) => email !== emailToRemove
  );

  setEmailsToInvite(newEmailList);
 }

 async function createTrip(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  if (!destination) {
   return;
  }

  if (!eventStartAndEndDates?.from) {
   return;
  }

  if (emailsToInvite.length === 0) {
   return;
  }

  if (!ownerName || !ownerEmail) {
   return;
  }

  const id_user = localStorage.getItem("userId");
  setLoading(true);
  const tripData = {
   destination,
   id_user,
   starts_at: eventStartAndEndDates.from,
   ends_at: eventStartAndEndDates.to,
   emails_to_invite: emailsToInvite,
   owner_name: ownerName,
   owner_email: ownerEmail,
  };

  try {
   const response = await api.post("/trips", tripData);
   const { tripId } = response.data;
   navigate(`/trips/${tripId}`);
  } catch (error) {
   console.error(error);
  } finally {
   setLoading(false);
  }
 }

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
      setDestination={setDestination}
      openGuestsInput={openGuestsInput}
      closeGuestsInput={closeGuestsInput}
      isGuestsInputOpen={isGuestsInputOpen}
      eventStartAndEndDates={eventStartAndEndDates}
      setEventStartAndEndDates={setEventStartAndEndDates}
     />

     {isGuestsInputOpen && (
      <InviteGuestsStep
       emailsToInvite={emailsToInvite}
       openGuestsModal={openGuestsModal}
       openConfirmTripModal={openConfirmTripModal}
      />
     )}
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

   {isGuestsModalOpen && (
    <InviteGuestsModal
     emailsToInvite={emailsToInvite}
     closeGuestsModal={closeGuestsModal}
     addNewEmailToInvite={addNewEmailToInvite}
     removeEmailFromInvites={removeEmailFromInvites}
    />
   )}

   {isConfirmTripModalOpen && (
    <ConfirmTripModal
     loading={loading}
     createTrip={createTrip}
     setOwnerName={setOwnerName}
     setOwnerEmail={setOwnerEmail}
     destination={destination}
     date={displayedDate}
     closeConfirmTripModal={closeConfirmTripModal}
    />
   )}
  </div>
 );
}
