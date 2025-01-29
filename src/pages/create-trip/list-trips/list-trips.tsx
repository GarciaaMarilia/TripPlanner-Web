import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Plane, Trash } from "lucide-react";

import { Button } from "../../../components/button";
import { useTrips } from "../../../contexts/TripsContext";
import { NavigateTripParams } from "../../../models/models";
import { SkeletonLoading } from "../../../components/skeleton";
import { DeleteModal } from "../../../components/delete-modal";
import { getDisplayedDateToList } from "../../../utils/formatDate";
import { deleteTripService } from "../../../services/delete-trip-service";

export function ListTripsPage() {
 const navigate = useNavigate();
 const { pastTrips, nextTrips, isLoading } = useTrips();
 const [selectedTripId, setSelectedTripId] = useState<string>("");
 const [deletTripModal, setDeleteTripModal] = useState<boolean>(false);

 const username = localStorage.getItem("username");

 function createtrip() {
  navigate("/createTrip");
 }

 function navigateTrip({
  tripId,
  userId,
  isDisabled,
  isOwner,
 }: NavigateTripParams) {
  navigate(`/trips/${tripId}`, {
   state: { disabled: isDisabled, userId: userId, isOwner },
  });
 }

 function openDeleteTripModal(id: string) {
  setSelectedTripId(id);
  setDeleteTripModal(true);
 }

 function closeDeleteTripModal() {
  setSelectedTripId("");
  setDeleteTripModal(false);
 }

 async function deleteTrip(tripId: string) {
  try {
   if (tripId) {
    await deleteTripService(tripId);
   }
   closeDeleteTripModal();
   window.document.location.reload();
  } catch (error) {
   console.error(error);
  }
 }

 if (isLoading) return <SkeletonLoading />;

 return (
  <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
   <main className="flex flex-col lg:flex-row gap-8 px-4">
    <div className="flex-1 space-y-6">
     <div className="flex flex-wrap items-center justify-between gap-4">
      <h2 className="text-2xl sm:text-3xl font-semibold">{`Hi, ${username}`}</h2>
      <Button onClick={createtrip} className="w-full sm:w-auto">
       <Plane className="sm:w-5 w-4" />
       Create a trip
      </Button>
     </div>

     <p className="text-lg sm:text-xl font-semibold mt-6">Your past trips</p>

     {pastTrips && pastTrips.length > 0 ? (
      pastTrips.map((trip) => (
       <Button
        key={trip.id}
        size="full"
        variant="list"
        onClick={() => navigateTrip({ tripId: trip.id, isDisabled: true })}
       >
        {trip.destination} -{" "}
        {getDisplayedDateToList(trip.starts_at, trip.ends_at)}
       </Button>
      ))
     ) : (
      <p>You don't have past trips.</p>
     )}

     <p className="text-lg sm:text-xl font-semibold mt-6">Your next trips</p>

     {nextTrips && nextTrips.length > 0 ? (
      nextTrips.map((trip) => (
       <Button
        key={trip.id}
        size="full"
        variant="list"
        onClick={() => navigateTrip({ tripId: trip.id })}
       >
        {trip.destination} -{" "}
        {getDisplayedDateToList(trip.starts_at, trip.ends_at)}
        <button
         onClick={(e) => {
          e.stopPropagation();
          openDeleteTripModal(trip.id);
         }}
        >
         <Trash className="size-5" />
        </button>
       </Button>
      ))
     ) : (
      <p>You don't have next trips yet.</p>
     )}
    </div>
   </main>

   {selectedTripId && deletTripModal && (
    <DeleteModal
     type="Trip"
     closeDeleteModal={closeDeleteTripModal}
     confirmDeleteItem={() => deleteTrip(selectedTripId)}
    />
   )}
  </div>
 );
}
