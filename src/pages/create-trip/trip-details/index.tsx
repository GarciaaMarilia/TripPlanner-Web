import { useState } from "react";
import { useLocation } from "react-router-dom";

import { Eye, Plus, X } from "lucide-react";

import { Guests } from "./guests";
import { ActivitiesPage } from "./activities";
import { ImportantLinks } from "./important-links";
import { Button } from "../../../components/button";
import { CreateActivityModal } from "./create-activity-modal";
import { DestinationAndDateHeader } from "./destination-and-date-header";

export function TripDetailsPage() {
 const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
  useState<boolean>(false);
 const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
 const location = useLocation();
 const { disabled } = location.state || {};

 function openCreateActivityModal() {
  setIsCreateActivityModalOpen(true);
 }

 function closeCreateActivityModal() {
  setIsCreateActivityModalOpen(false);
 }

 function toggleSidebar() {
  setIsSidebarOpen(!isSidebarOpen);
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
       variant={disabled ? "secondary" : "primary"}
       disabled={!!disabled}
      >
       <Plus className="sm:size-5 size-8" />
       Create an activity
      </Button>
     </div>
     <Button onClick={toggleSidebar} className="xl:hidden block" size="full">
      <Eye className="sm:size-5 size-8" />
      View more
     </Button>

     <ActivitiesPage />
    </div>

    <div
     className={`fixed inset-0 z-50 transition-transform transform ${
      isSidebarOpen ? "translate-x-0" : "translate-x-full"
     } sm:translate-x-0 sm:relative sm:w-80 bg-zinc-900 sm:bg-transparent px-[10%] sm:px-0`}
    >
     <button onClick={toggleSidebar} className="sm:hidden block py-10">
      <X className="size-5 text-zinc-400" />
     </button>
     <div className="w-80 space-y-6">
      <ImportantLinks />

      <div className="w-full h-px bg-zinc-800" />

      <Guests />
     </div>
    </div>
   </main>

   {isCreateActivityModalOpen && (
    <CreateActivityModal closeCreateActivityModal={closeCreateActivityModal} />
   )}
  </div>
 );
}
