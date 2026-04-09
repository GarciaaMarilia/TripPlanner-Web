import { api } from "../lib/axios";

type UpdateTripData = {
 destination: string;
 starts_at: Date;
 ends_at: Date;
};

export default async function updatetrip(tripId: string, data: UpdateTripData) {
 try {
  const token = localStorage.getItem("token");
  if (!token) {
   return;
  }

  if (!tripId) {
   return;
  }

  const response = await api.put(`/trips/${tripId}`, data, {
   headers: {
    Authorization: `Bearer ${token}`,
   },
  });

  return { success: true, data: response.tripId };
 } catch (error) {
  console.log(error);
 }
}
