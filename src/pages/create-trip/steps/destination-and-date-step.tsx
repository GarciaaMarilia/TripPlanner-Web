import { useState } from "react";

import "react-day-picker/dist/style.css";
import { DateRange, DayPicker } from "react-day-picker";
import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";

import { Button } from "../../../components/button";
import { getDisplayedDate } from "../../../utils/formatDate";

interface DestinationAndDateStepProps {
 isGuestsInputOpen: boolean;
 eventStartAndEndDates: DateRange | undefined;
 closeGuestsInput: () => void;
 openGuestsInput: () => void;
 setDestination: (destination: string) => void;
 setEventStartAndEndDates: (dates: DateRange | undefined) => void;
}

export function DestinationAndDateStep({
 closeGuestsInput,
 isGuestsInputOpen,
 openGuestsInput,
 setDestination,
 setEventStartAndEndDates,
 eventStartAndEndDates,
}: DestinationAndDateStepProps) {
 const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

 function openDatePicker() {
  return setIsDatePickerOpen(true);
 }

 function closeDatePicker() {
  return setIsDatePickerOpen(false);
 }

 const placeholdDate = eventStartAndEndDates
  ? getDisplayedDate(eventStartAndEndDates)
  : "When?";

 return (
  <div className="bg-zinc-900 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center shadow-shape gap-3 sm:gap-4">
   <div className="flex items-center gap-2 flex-1 min-w-[250px]">
    <MapPin className="sm:size-5 size-6 text-zinc-400" />
    <input
     type="text"
     disabled={isGuestsInputOpen}
     placeholder="Where are you going?"
     onChange={(event) => setDestination(event.target.value)}
     className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
    />
   </div>

   <button
    onClick={openDatePicker}
    disabled={isGuestsInputOpen}
    className="flex items-center gap-2 text-left w-[250px]"
   >
    <Calendar className="text-zinc-400 sm:size-5 size-6" />
    <span className="text-lg text-zinc-400">{placeholdDate}</span>
   </button>

   {isDatePickerOpen && (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-10">
     <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5 w-[90%] max-w-md">
      <div className="space-y-2">
       <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Select the date</h2>
        <button onClick={closeDatePicker}>
         <X className="size-5 text-zinc-400" />
        </button>
       </div>
      </div>

      <DayPicker
       mode="range"
       selected={eventStartAndEndDates}
       onSelect={setEventStartAndEndDates}
       className="w-full"
      />
     </div>
    </div>
   )}

   <div className="w-full sm:w-auto flex justify-center">
    {isGuestsInputOpen ? (
     <Button onClick={closeGuestsInput} variant="secondary">
      Change location/date
      <Settings2 className="size-5 ml-2" />
     </Button>
    ) : (
     <Button onClick={openGuestsInput} variant="primary" size="full">
      Continue
      <ArrowRight className="size-5 ml-2" />
     </Button>
    )}
   </div>
  </div>
 );
}
