import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { MapPin, Calendar, Settings2 } from "lucide-react";

import { Trip } from "./types";
import { Button } from "../../../components/button";
import { getDisplayedDate } from "../../../utils/formatDate";
import { getTripDetails } from "../../../services/get-trip-details";

export function DestinationAndDateHeader() {
 const { tripId } = useParams();
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
  <div className="px-4 py-2 rounded-xl bg-zinc-900 shadow-shape flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 ">
   <div className="flex items-center gap-2">
    <MapPin className="sm:size-8 size-5 text-zinc-400" />
    <span className="text-zinc-100 sm:text-lg">{trip?.destination}</span>
   </div>

   <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 w-full sm:w-auto">
    <div className="flex items-center gap-2">
     <Calendar className="sm:size-8 size-5 text-zinc-400" />
     <span className="text-zinc-100 text-sm sm:text-lg">{formatedDate}</span>
    </div>

    <Button
     variant="secondary"
     className="text-sm sm:text-base"
     size="details_page"
    >
     Change location/date
     <Settings2 className="size-5" />
    </Button>
   </div>
  </div>
 );
}
