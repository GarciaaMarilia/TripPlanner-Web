import { AxiosError } from "axios";

import { api } from "../lib/axios";

export async function deleteTripService(tripId: string) {
 try {
  const response = await api.delete(`/trips/${tripId}`);

  return { success: true, data: response.data };
 } catch (error) {
  const axiosError = error as AxiosError<{ message: string }>;
  if (axiosError.response) {
   console.error("Error response data:", axiosError.response.data);
   console.error("Error response status:", axiosError.response.status);
   console.error("Error response headers:", axiosError.response.headers);
   if (axiosError.response.data) {
    return { success: false, message: axiosError.response.data.message };
   }
  } else if (axiosError.request) {
   console.error("Error request data:", axiosError.request);
  } else {
   console.error("Error message:", axiosError.message);
  }
 }
}
