import { useState } from "react";

import "react-day-picker/dist/style.css";
import { DateRange, DayPicker } from "react-day-picker";
import { ArrowRight, Calendar, MapPin, X } from "lucide-react";

import { Button } from "../../../components/button";
import { getDisplayedDate } from "../../../utils/formatDate";

interface DestinationAndDateStepProps {
 eventStartAndEndDates: DateRange | undefined;
 setConfirm: React.Dispatch<React.SetStateAction<boolean>>;
 setDestination: React.Dispatch<React.SetStateAction<string>>;
 setEventStartAndEndDates: React.Dispatch<
  React.SetStateAction<DateRange | undefined>
 >;
}

export function DestinationAndDateStep({
 setConfirm,
 setDestination,
 setEventStartAndEndDates,
 eventStartAndEndDates,
}: DestinationAndDateStepProps) {
 const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

 const handleDatePicker = () => {
  setIsDatePickerOpen((prev) => !prev);
 };

 const placeholdDate = eventStartAndEndDates
  ? getDisplayedDate(eventStartAndEndDates)
  : "When?";

 return (
  <div className="bg-zinc-900 p-4 rounded-xl flex flex-col lg:flex-row lg:items-center shadow-shape gap-6 lg:gap-4">
   <div className="flex items-center gap-2 flex-1 min-w-[250px]">
    <MapPin className="lg:size-5 size-6 text-zinc-400" />
    <input
     type="text"
     placeholder="Where are you going?"
     onChange={(event) => setDestination(event.target.value)}
     className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
    />
   </div>

   <button
    onClick={handleDatePicker}
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
        <button onClick={handleDatePicker}>
         <X className="size-5 text-zinc-400" />
        </button>
       </div>
      </div>

      <DayPicker
       mode="range"
       className="w-full"
       fromDate={new Date()}
       selected={eventStartAndEndDates}
       onSelect={setEventStartAndEndDates}
      />
     </div>
    </div>
   )}

   <div className="w-full sm:w-auto flex justify-center">
    <Button onClick={() => setConfirm(true)} variant="primary" size="full">
     Continue
     <ArrowRight className="size-5 ml-2" />
    </Button>
   </div>
  </div>
 );
}
