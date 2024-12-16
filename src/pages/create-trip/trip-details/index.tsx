import { useState } from "react";
import { useLocation } from "react-router-dom";

import { Plus } from "lucide-react";

import { Guests } from "./guests";
import { ActivitiesPage } from "./activities";
import { ImportantLinks } from "./important-links";
import { Button } from "../../../components/button";
import { CreateActivityModal } from "./create-activity-modal";
import { DestinationAndDateHeader } from "./destination-and-date-header";

export function TripDetailsPage() {
 const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
  useState<boolean>(false);
  const location = useLocation();
  const { disabled } = location.state || {};

 function openCreateActivityModal() {
  setIsCreateActivityModalOpen(true);
 }

 function closeCreateActivityModal() {
  setIsCreateActivityModalOpen(false);
 }


 return (
  <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
   <DestinationAndDateHeader />

   <main className="flex gap-16 px-4">
    <div className="flex-1 space-y-6">
     <div className="flex items-center justify-between">
      <h2 className="text-3xl font-semibold">Activities</h2>

      <Button
       onClick={openCreateActivityModal}
       variant={disabled ? "disabled" : "primary"}
       disabled={!!disabled}
      >
       <Plus className="size-5" />
       Create an activity
      </Button>
     </div>

     <ActivitiesPage />
    </div>

    <div className="w-80 space-y-6">
     <ImportantLinks />

     <div className="w-full h-px bg-zinc-800" />

     <Guests />
    </div>
   </main>

   {isCreateActivityModalOpen && (
    <CreateActivityModal closeCreateActivityModal={closeCreateActivityModal} />
   )}
  </div>
 );
}