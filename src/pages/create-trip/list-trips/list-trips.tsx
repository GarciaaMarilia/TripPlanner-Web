import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Plane } from "lucide-react";

import { api } from "../../../lib/axios";
import { Button } from "../../../components/button";

export function ListTripsPage() {
 const navigate = useNavigate();
 const [trips, setTrips] = useState<any[]>([]);

 const userId = localStorage.getItem("userId");

 const username = localStorage.getItem("username");

 function createtrip() {
  navigate("/createTrip");
 }

 async function getTrips() {
  api
   .get(`listTrips/${userId}`)
   .then((response) => setTrips(response.data.trips));
 }

 useEffect(() => {
  getTrips();
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
     <div className="flex items-center gap-2 flex-1">
      <button className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1">
       {" "}
      </button>
     </div>
     {trips && trips.length > 0 ? (
      trips.map((trip) => (
       <div key={trip.id}>
        <p>{trip.name}</p>
       </div>
      ))
     ) : (
      <p>No trips</p>
     )}
    </div>
   </main>
  </div>
 );
}
