import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { MapPin, Calendar, Settings2 } from "lucide-react";

import { Trip } from "./types";
import { Button } from "../../../components/button";
import { getDisplayedDate } from "../../../utils/formatDate";
import { getTripDetails } from "../../../services/get-trip-details";

export function DestinationAndDateHeader() {
 const { tripId } = useParams();
 const location = useLocation();
 const { disabled } = location.state || {};
 const [trip, setTrip] = useState<Trip | undefined>();

 useEffect(() => {
  if (tripId) {
   const fetchTrip = async () => {
    const tripData = await getTripDetails(tripId);
    setTrip(tripData);
   };
   fetchTrip();
  }
 }, [tripId]);

 const formatedDate = trip
  ? getDisplayedDate({
     from: new Date(trip.starts_at),
     to: new Date(trip.ends_at),
    })
  : null;

 return (
  <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
   <div className="flex items-center gap-2">
    <MapPin className="size-5 text-zinc-400" />
    <span className="text-zinc-100">{trip?.destination}</span>
   </div>

   <div className="flex items-center gap-5">
    <div className="flex items-center gap-2">
     <Calendar className="size-5 text-zinc-400" />
     <span className="text-zinc-100">{formatedDate}</span>
    </div>

    <div className="w-px h-6 bg-zinc-800" />

    <Button variant={disabled ? "disabled" : "primary"}>
     Change location/date
     <Settings2 className="size-5" />
    </Button>
   </div>
  </div>
 );
}
