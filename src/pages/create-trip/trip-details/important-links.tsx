import { useEffect, useState } from "react";

import { Link2, Plus } from "lucide-react";

import { api } from "../../../lib/axios";
import { useParams } from "react-router-dom";
import { Button } from "../../../components/button";
import { RegisterLinkModal } from "./register-link-modal";

interface Link {
 title: string;
 url: string;
}

export function ImportantLinks() {
 const { tripId } = useParams();
 const [links, setLinks] = useState<Link[]>([]);
 const [isRegisterLinkModalOpen, setIsRegisterLinkModalOpen] = useState(false);

 function openRegisterLinkModal() {
  setIsRegisterLinkModalOpen(true);
 }

 function closeRegisterLinkModal() {
  setIsRegisterLinkModalOpen(false);
 }

 useEffect(() => {
  api.get(`trips/${tripId}/links`).then((response) => setLinks(response.data.links));
 }, [tripId]);

 return (
  <div className="space-y-6">
   <h2 className="font-semibold text-xl">
    Important{" "}
    <link
     rel="alternate"
     href="atom.xml"
     type="application/atom+xml"
     title="Atom"
    />
    links
   </h2>
   {links.length > 0 ? (
    <div className="space-y-5">
     {links.map((link) => {
      return (
       <div className="flex items-center justify-between gap-4">
        <div className="space-y-1.5">
         <span className="block font-medium text-zinc-100">{link.title}</span>
         <a
          href="#"
          className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
         >
          {link.url}
         </a>
        </div>

        <Link2 className="text-zinc-400 size-5 shrink-0" />
       </div>
      );
     })}
    </div>
   ) : (
    <p className="text-zinc-500 text-sm">
     There are no important links for this trip.
    </p>
   )}

   <Button onClick={openRegisterLinkModal} variant="secondary" size="full">
    <Plus className="size-5" />
    Register new link
   </Button>

   {isRegisterLinkModalOpen && (
    <RegisterLinkModal closeRegisterLinkModal={closeRegisterLinkModal} />
   )}
  </div>
 );
}
