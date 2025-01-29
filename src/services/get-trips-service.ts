import { AxiosError } from "axios";
import { api } from "../lib/axios";

export async function getTrips(userId: string) {
 if (userId) {
  try {
   const response = await api.get(`listTrips/${userId}`);

   return response.data;
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
 } else {
  console.error("No User ID found in localStorage");
  return [];
 }
}
