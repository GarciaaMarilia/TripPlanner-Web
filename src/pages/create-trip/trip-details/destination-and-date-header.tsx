import { FormEvent, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { MapPin, Calendar, Settings2, ArrowRight, X } from "lucide-react";

import { Trip } from "./types";
import { Button } from "../../../components/button";
import { getDisplayedDate } from "../../../utils/formatDate";
import { getTripDetails } from "../../../services/get-trip-details";
import { DayPicker } from "react-day-picker";

export function DestinationAndDateHeader() {
 const { tripId } = useParams();
 const location = useLocation();
 const { disabled } = location.state || {};

 const [trip, setTrip] = useState<Trip | undefined>();
 const [update, setUpdate] = useState<boolean>(false);
 const [destination, setDestination] = useState("");
 const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
 const [eventStartAndEndDates, setEventStartAndEndDates] = useState(null);
 const [confirm, setConfirm] = useState(false);

 useEffect(() => {
  if (tripId) {
   const fetchTrip = async () => {
    const tripData = await getTripDetails(tripId);
    setTrip(tripData);
   };
   fetchTrip();
  }
 }, [tripId]);

 const formattedDate = trip
  ? getDisplayedDate({
     from: new Date(trip.starts_at),
     to: new Date(trip.ends_at),
    })
  : null;

 const handleEnableUpdate = () => setUpdate((prev) => !prev);
 const handleDatePicker = () => setIsDatePickerOpen((prev) => !prev);

 const handleUpdateTrip = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const title = data.get("title")?.toString();
  const occurs_at = data.get("occurs_at")?.toString();
 };

 return update ? (
  <div className="flex flex-col sm:flex-row gap-y-4 px-4 py-4 justify-between rounded-xl shadow-shape bg-zinc-900 w-[70%]">
   <div className="flex items-center gap-2">
    <MapPin className="lg:size-5 size-6 text-zinc-400" />
    <input
     type="text"
     value={destination}
     placeholder={trip?.destination}
     onChange={(event) => setDestination(event.target.value)}
     className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
    />
   </div>

   <button
    onClick={handleDatePicker}
    className="flex items-center gap-2 text-left"
   >
    <Calendar className="text-zinc-400 sm:size-5 size-6" />
    <span className="text-lg text-zinc-400">{formattedDate}</span>
   </button>

   {isDatePickerOpen && (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-10">
     <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5 w-[90%] max-w-md">
      <div className="flex items-center justify-between">
       <h2 className="text-lg font-semibold">Select the date</h2>
       <button onClick={handleDatePicker}>
        <X className="size-5 text-zinc-400" />
       </button>
      </div>
      <DayPicker
       mode="range"
       className="w-full"
       fromDate={new Date()}
       // selected={eventStartAndEndDates}
       // onSelect={setEventStartAndEndDates}
      />
     </div>
    </div>
   )}

   <div className="w-full sm:w-auto flex justify-center gap-4">
    <Button onClick={() => setConfirm(true)} variant="primary" size="full">
     Update <ArrowRight className="size-5 ml-2" />
    </Button>
    <Button onClick={handleEnableUpdate} variant="danger" size="full">
     Cancel <X className="size-5 ml-2" />
    </Button>
   </div>
  </div>
 ) : (
  <div className="flex flex-col sm:flex-row gap-y-4 px-4 py-4 justify-between rounded-xl shadow-shape bg-zinc-900 w-[70%]">
   <div className="flex items-center gap-2">
    <MapPin className="sm:size-8 size-6 text-zinc-400" />
    <span className="text-zinc-100 text-lg">{trip?.destination}</span>
   </div>

   <div className="flex items-center gap-2">
    <Calendar className="sm:size-8 size-6 text-zinc-400" />
    <span className="text-zinc-100 text-lg">{formattedDate}</span>
   </div>

   <div className="items-center" onClick={handleEnableUpdate}>
    <Button variant={disabled ? "disabled" : "primary"} size="full">
     Change informations <Settings2 className="size-5" />
    </Button>
   </div>
  </div>
 );
}
