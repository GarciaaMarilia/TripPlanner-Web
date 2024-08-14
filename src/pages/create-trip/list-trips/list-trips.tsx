import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Plane } from "lucide-react";

import { Trip } from "../../../models/models";
import { Button } from "../../../components/button";
import { getTrips } from "../../../services/get-trips-service";
import { getDisplayedDateToList } from "../../../utils/formatDate";

export function ListTripsPage() {
 const navigate = useNavigate();
 const [trips, setTrips] = useState<Trip[]>([]);

 const userId = localStorage.getItem("userId");

 const username = localStorage.getItem("username");

 function createtrip() {
  navigate("/createTrip");
 }

 function navigateTrip(tripId: string) {
  navigate(`/trips/${tripId}`);
 }

 useEffect(() => {
  if (userId) {
   const fetchTrips = async () => {
    const tripsData = await getTrips(userId);
    setTrips(tripsData);
   };
   fetchTrips();
  }
 }, []);

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
     <p className="text-xl font-semibold">Your trips</p>

     {trips && trips.length > 0 ? (
      trips.map((trip) => (
       <div
        key={trip.id}
        className="h-16 w-1/2 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3"
       >
        <button onClick={() => navigateTrip(trip.id)}>
         {trip.destination} -{" "}
         {getDisplayedDateToList(trip.starts_at, trip.ends_at)}
        </button>
       </div>
      ))
     ) : (
      <p>You don't have trips yet.</p>
     )}
    </div>
   </main>
  </div>
 );
}
