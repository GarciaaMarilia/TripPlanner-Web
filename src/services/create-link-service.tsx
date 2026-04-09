import { api } from "../lib/axios";
import { Link } from "../pages/create-trip/trip-details/register-link-modal";

export async function registerLink(tripId: string, link: Link) {
 try {
  const token = localStorage.getItem("token");

  if (!token) {
   return;
  }

  const response = await api.post(`/trips/${tripId}/links`, link, {
   headers: {
    Authorization: `Bearer ${token}`,
   },
  });

  return { succes: true, linkId: response };
 } catch (error) {
  console.error(error);
 }
}
