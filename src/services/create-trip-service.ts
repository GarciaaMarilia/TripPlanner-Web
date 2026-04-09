import { api } from "../lib/axios";

export async function saveTrip(data: any) {
 // TODO: TIPAR DA MANEIRA CORRETA O DATA
 const {
  destination,
  eventStartAndEndDates,
  id_user,
  owner_name,
  owner_email,
 } = data;
 const token = localStorage.getItem("token");

 if (!token) {
  return;
 }

 if (!destination) {
  return;
 }

 if (!eventStartAndEndDates?.from) {
  return;
 }

 if (!owner_name || !owner_email) {
  return;
 }

 const tripData = {
  destination,
  id_user: id_user,
  starts_at: eventStartAndEndDates.from,
  ends_at: eventStartAndEndDates.to,
  owner_name: owner_name,
  owner_email: owner_email,
 };

 try {
  const response = await api.post("/trips", tripData, {
   headers: {
    Authorization: `Bearer ${token}`,
   },
  });
  const { tripId } = response.data; // TODO Padronizar return { succes: true, linkId: response };
  return tripId;
 } catch (error) {
  console.error(error);
  return error;
 }
}
