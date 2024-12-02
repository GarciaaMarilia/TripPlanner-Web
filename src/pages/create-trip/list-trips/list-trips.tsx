import { useNavigate } from "react-router-dom";

import { Plane, Trash } from "lucide-react";

import { Button } from "../../../components/button";
import { useTrips } from "../../../contexts/TripsContext";
import { SkeletonLoading } from "../../../components/skeleton";
import { getDisplayedDateToList } from "../../../utils/formatDate";

export function ListTripsPage() {
 const navigate = useNavigate();
 const { pastTrips, nextTrips, isLoading } = useTrips();

 const username = localStorage.getItem("username");

 function createtrip() {
  navigate("/createTrip");
 }

 function navigateTrip(tripId: string, isDisabled?: boolean) {
  navigate(`/trips/${tripId}`, { state: { disabled: isDisabled } });
 }

 if (isLoading) return <SkeletonLoading />;

 return (
  <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
   <main className="flex gap-16 px-4">
    <div className="flex-1 space-y-6">
     <div className="flex items-center justify-between">
      <h2 className="text-3xl font-semibold">{`Hi, ${username}`}</h2>
      <Button onClick={createtrip}>
       <Plane className="size-5" />
       Create a trip
      </Button>
     </div>
     <p className="text-xl font-semibold">Your past trips</p>

     {pastTrips && pastTrips.length > 0 ? (
      pastTrips.map((trip) => (
       <Button
        key={trip.id}
        size="full"
        variant="list"
        onClick={() => navigateTrip(trip.id, true)}
       >
        {trip.destination} -{" "}
        {getDisplayedDateToList(trip.starts_at, trip.ends_at)}
       </Button>
      ))
     ) : (
      <p>You don't have past trips.</p>
     )}

     <p className="text-xl font-semibold">Your next trips</p>

     {nextTrips && nextTrips.length > 0 ? (
      nextTrips.map((trip) => (
       <Button
        key={trip.id}
        size="full"
        variant="list"
        onClick={() => navigateTrip(trip.id)}
       >
        {trip.destination} -{" "}
        {getDisplayedDateToList(trip.starts_at, trip.ends_at)}
        <Trash className="size-5"/>
       </Button>
      ))
     ) : (
      <p>You don't have next trips yet.</p>
     )}
    </div>
   </main>
  </div>
 );
}
