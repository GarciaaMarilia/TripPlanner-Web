import { api } from "../lib/axios";

export async function saveTrip(data: any) {
 const {
  destination,
  eventStartAndEndDates,
  idUser,
  emailsToInvite,
  ownerName,
  ownerEmail,
 } = data;

 if (!destination) {
  return;
 }

 if (!eventStartAndEndDates?.from) {
  return;
 }

 if (emailsToInvite.length === 0) {
  return;
 }

 if (!ownerName || !ownerEmail) {
  return;
 }

 const tripData = {
  destination,
  id_user: idUser,
  starts_at: eventStartAndEndDates.from,
  ends_at: eventStartAndEndDates.to,
  emails_to_invite: emailsToInvite,
  owner_name: ownerName,
  owner_email: ownerEmail,
 };

 try {
  const response = await api.post("/trips", tripData);
  const { tripId } = response.data;
  return tripId;
 } catch (error) {
  return error;
 }
}
