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
  <div className="flex flex-col sm:flex-row gap-y-4 px-4 py-4 justify-between rounded-xl shadow-shape bg-zinc-900 ">
   <div className="flex items-center gap-2">
    <MapPin className="sm:size-8 size-6 text-zinc-400" />
    <span className="text-zinc-100 text-lg">{trip?.destination}</span>
   </div>

   <div className="flex items-center gap-2">
    <Calendar className="sm:size-8 size-6 text-zinc-400" />
    <span className="text-zinc-100 text-lg">{formatedDate}</span>
   </div>

   <div className="items-center">
    <Button variant={disabled ? "disabled" : "primary"} size="full">
     Change location/date
     <Settings2 className="size-5" />
    </Button>
   </div>
  </div>
 );
}
