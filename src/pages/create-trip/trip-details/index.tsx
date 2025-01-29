import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Menu, MoveLeft, Plus, X } from "lucide-react";

import { Guests } from "./guests";
import { ActivitiesPage } from "./activities";
import { ImportantLinks } from "./important-links";
import { Button } from "../../../components/button";
import { CreateActivityModal } from "./create-activity-modal";
import { DestinationAndDateHeader } from "./destination-and-date-header";

export function TripDetailsPage() {
 const navigate = useNavigate();
 const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
  useState<boolean>(false);
 const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
 const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
 const location = useLocation();
 const { disabled } = location.state || {};

 const userId = localStorage.getItem("userId");

 function openCreateActivityModal() {
  setIsCreateActivityModalOpen(true);
 }

 function closeCreateActivityModal() {
  setIsCreateActivityModalOpen(false);
 }

 function toggleSideBar() {
  setIsSideBarOpen((prev) => !prev);
 }

 useEffect(() => {
  const handleResize = () => {
   setIsSmallScreen(window.innerWidth < 640);
  };

  handleResize();
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
 }, []);

 function navigateHome() {
  navigate(`/listTrips/${userId}`);
 }

 return (
  <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
   <div>
    <button onClick={navigateHome}>
     <MoveLeft className="size-8" />
    </button>
    <DestinationAndDateHeader />
   </div>

   <main className="flex gap-16 px-4">
    <div className="flex-1 space-y-6">
     <div className="flex flex-wrap flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-y-4">
      <h2 className="text-3xl font-semibold">Activities</h2>

      <Button
       onClick={openCreateActivityModal}
       variant={disabled ? "disabled" : "primary"}
       disabled={!!disabled}
       size={isSmallScreen ? "full" : "default"}
      >
       <Plus className="size-5" />
       Create an activity
      </Button>
     </div>

     <ActivitiesPage />
    </div>

    <div className="hidden lg:block w-80 space-y-6">
     <ImportantLinks />

     <div className="w-full h-px bg-zinc-800" />

     <Guests />
    </div>

    <div
     className={`fixed inset-y-0 right-0 w-[70%] px-2 bg-zinc-900 shadow-lg transform ${
      isSideBarOpen ? "translate-x-0" : "translate-x-full"
     } transition-transform lg:hidden`}
    >
     <button
      onClick={toggleSideBar}
      className="absolute top-4 right-4 text-zinc-800"
     >
      <X className="size-5" />
     </button>

     <div className="p-4 space-y-6">
      <ImportantLinks />
      <div className="w-full h-px bg-zinc-800" />
      <Guests />
     </div>
    </div>
    {isCreateActivityModalOpen && (
     <CreateActivityModal closeCreateActivityModal={closeCreateActivityModal} />
    )}
   </main>

   <button
    onClick={toggleSideBar}
    className="lg:hidden fixed bottom-4 right-4 p-3 bg-zinc-950 text-white rounded-full shadow-lg"
   >
    <Menu className="size-5" />
   </button>
  </div>
 );
}
