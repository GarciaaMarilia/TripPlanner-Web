import { AxiosError } from "axios";
import { api } from "../lib/axios";

export async function getActivities(tripId: string) {
 try {
  const response = await api.get(`trips/${tripId}/activities`);

  return response.data.activities;
 } catch (error) {
  const axiosError = error as AxiosError;
  if (axiosError.response) {
   console.error("Error response data:", axiosError.response.data);
   console.error("Error response status:", axiosError.response.status);
   console.error("Error response headers:", axiosError.response.headers);
  } else if (axiosError.request) {
   console.error("Error request data:", axiosError.request);
  } else {
   console.error("Error message:", axiosError.message);
  }

  return [];
 }
}
