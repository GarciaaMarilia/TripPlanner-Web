import { get } from "lodash";

import { api } from "../lib/axios";

export default async function authenticate(email: string, password: string) {
 try {
  if (email && password) {
   const response = await api.post("/login", { email, password });

   const token = get(response, "data.token");

   if (token) {
    localStorage.setItem("token", token);

    const user = get(response, "data.user");

    if (user) {
     const userId = get(user, "id");
     localStorage.setItem("userId", userId);
     localStorage.setItem("username", get(user, "name"));
     return { userId: userId };
    }
   }
  }
 } catch (error) {
  return error;
 }
}
