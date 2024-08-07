import { Plane } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../../components/button";

export function ListTripsPage() {
 const navigate = useNavigate();

 function createtrip() {
  navigate("/createTrip");
 }
 const username = localStorage.getItem("username");
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
    </div>
   </main>
  </div>
 );
}
