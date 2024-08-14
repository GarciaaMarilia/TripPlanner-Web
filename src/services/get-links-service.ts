import { AxiosError } from "axios";
import { api } from "../lib/axios";

export async function getLinks(tripId: string) {
 try {
  const response = await api.get(`trips/${tripId}/links`);

  return response.data.links;
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
