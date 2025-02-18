import { useEffect, useState } from "react";

import { Link2, Plus, Trash } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";

import { Link } from "../../../models/models";
import { Button } from "../../../components/button";
import { RegisterLinkModal } from "./register-link-modal";
import { getLinks } from "../../../services/get-links-service";
import { DeleteModal } from "../../../components/delete-modal";
import { deleteLinkService } from "../../../services/delete-link-service";

export function ImportantLinks() {
 const { tripId } = useParams();
 const location = useLocation();
 const { disabled } = location.state || {};
 const [links, setLinks] = useState<Link[]>([]);
 const [isRegisterLinkModalOpen, setIsRegisterLinkModalOpen] =
  useState<boolean>(false);
 const [selectedLinkId, setSelectedLinkId] = useState<string>("");
 const [deleteLinkModal, setDeleteLinkModal] = useState<boolean>(false);

 function openRegisterLinkModal() {
  setIsRegisterLinkModalOpen(true);
 }

 function closeRegisterLinkModal() {
  setIsRegisterLinkModalOpen(false);
 }

 function openDeleteLinkModal(id: string) {
  setDeleteLinkModal(true);
  setSelectedLinkId(id);
 }

 function closeDeleteLinkModal() {
  setDeleteLinkModal(false);
  setSelectedLinkId("");
 }

 async function deleteLink(linkId: string) {
  if (tripId && linkId) {
   await deleteLinkService(tripId, linkId);
  }
  closeDeleteLinkModal();
  window.document.location.reload();
 }

 useEffect(() => {
  if (tripId) {
   const fetchLinks = async () => {
    const linksData = await getLinks(tripId);

    setLinks(linksData);
   };

   fetchLinks();
  }
 }, [tripId]);

 return (
  <div className="space-y-6">
   <h2 className="font-semibold text-xl">Important links</h2>
   {links.length > 0 ? (
    <div className="space-y-5">
     {links.map((link) => {
      return (
       <div key={link.id} className="flex items-center justify-between gap-4">
        <div className="space-y-1.5">
         <div className="flex gap-2">
          <span className="block font-medium text-zinc-100">{link.title}</span>
          <button
           onClick={() => openDeleteLinkModal(link.id)}
           disabled={disabled}
          >
           <Trash className="size-5" />
          </button>
         </div>
         <a
          href={link.url}
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

   <Button
    disabled={disabled}
    onClick={openRegisterLinkModal}
    variant={disabled ? "disabled" : "primary"}
    size="full"
   >
    <Plus className="size-5" />
    Register new link
   </Button>

   {isRegisterLinkModalOpen && (
    <RegisterLinkModal closeRegisterLinkModal={closeRegisterLinkModal} />
   )}

   {deleteLinkModal && selectedLinkId && (
    <DeleteModal
     type="Link"
     closeDeleteModal={closeDeleteLinkModal}
     confirmDeleteItem={() => deleteLink(selectedLinkId)}
    />
   )}
  </div>
 );
}
