import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Menu, MoveLeft, Plus, X } from "lucide-react";

import { Sugestions } from "./guests";
import { ActivitiesPage } from "./activities";
import { ImportantLinks } from "./important-links";
import { Button } from "../../../components/button";
import { CreateActivityModal } from "./create-activity-modal";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import DestinationIllustration from "../../../../public/assets/aircraft-illustration.svg";

export function TripDetailsPage() {
 const navigate = useNavigate();
 const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
  useState<boolean>(false);
 const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
 const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
 const location = useLocation();
 const { disabled } = location.state || {};

 const userId = localStorage.getItem("userId");

 const handleCreateActivityModal = () => {
  setIsCreateActivityModalOpen((prev) => !prev);
 };

 const toggleSideBar = () => {
  setIsSideBarOpen((prev) => !prev);
 };

 useEffect(() => {
  const handleResize = () => {
   setIsSmallScreen(window.innerWidth < 640);
  };

  handleResize();
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
 }, []);

 const navigateHome = () => {
  navigate(`/listTrips/${userId}`);
 };

 return (
  <div
   className="lg:px-40 px-6 py-10 mx-auto space-y-8"

  >
   <div className="flex gap-4 justify-around">
    <button onClick={navigateHome}>
     <MoveLeft className="size-8" />
    </button>
    <img
     width={140}
     height={100}
     className="hidden lg:block"
     src={DestinationIllustration}
    />
    <DestinationAndDateHeader />
   </div>

   <main className="flex gap-16 px-4 lg:px-44">
    <div className="flex-1 space-y-6">
     <div className="flex flex-wrap flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-y-4">
      <h2 className="text-3xl font-semibold">Activities</h2>

      <Button
       onClick={handleCreateActivityModal}
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

     <Sugestions />
    </div>

    <div
     className={`fixed inset-y-0 right-0 w-[70%] px-2 bg-zinc-900 shadow-lg transform ${
      isSideBarOpen ? "translate-x-0" : "translate-x-full"
     } transition-transform lg:hidden`}
    >
     <button onClick={toggleSideBar} className="absolute top-4 right-4">
      <X className="size-6" />
     </button>

     <div className="p-4 space-y-6">
      <ImportantLinks />
      <div className="w-full h-px bg-zinc-800" />
      <Sugestions />
     </div>
    </div>
    {isCreateActivityModalOpen && (
     <CreateActivityModal
      closeCreateActivityModal={handleCreateActivityModal}
     />
    )}
   </main>

   <button
    onClick={toggleSideBar}
    className="lg:hidden fixed bottom-4 right-4 p-3 bg-zinc-950 text-white rounded-full shadow-lg"
   >
    <Menu className="size-6" />
   </button>
  </div>
 );
}
