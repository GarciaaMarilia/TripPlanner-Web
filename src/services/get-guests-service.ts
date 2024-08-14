import { AxiosError } from "axios";
import { api } from "../lib/axios";

export async function getGuests(tripId: string) {
 try {
  const response = await api.get(`trips/${tripId}/participants`);

  return response.data.participants;
 } catch (error) {
  const axiosError = error as AxiosError;

  if (axiosError.response) {
   console.error("Error response data:", axiosError.response.data);
  } else if (axiosError.request) {
   console.error("Error request data:", axiosError.request);
  } else {
   console.error("Error message:", axiosError.message);
  }
  return [];
 }
}
