import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ArrowRight, KeyRound, User } from "lucide-react";

import { api } from "../lib/axios";
import { Button } from "../components/button";
import { ErrorModal, ModalType } from "../components/error-modal";

export function LoginPage() {
 const navigate = useNavigate();
 const [email, setEmail] = useState<string>("");
 const [password, setPassword] = useState<string>("");
 const [modalType, setModalType] = useState<string>("");
 const [errorModalIsOpen, setErrorModalIsOpen] = useState<boolean>(false);

 async function authenticate() {
  try {
   const response = await api.post("/login", { email, password });

   if (response.data.token) {
    
    localStorage.setItem("token", response.data.token); 
    if (response.data.user) {
     const userId = response.data.user.id;
     localStorage.setItem("userId", userId);
     localStorage.setItem("username", response.data.user.name);
     navigate(`/listTrips/${userId}`);
    }
   } else {
    setModalType(ModalType.AuthenticationFailed);
    setErrorModalIsOpen(true);
    throw new Error("Authentication failed.");
   }
  } catch (error) {
   setModalType(ModalType.InvalidCredentials);
   setErrorModalIsOpen(true);
   throw new Error("Invalid email or password");
  }
 }

 return (
  <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
   <div className="max-w-3xl w-full px-6 text-center space-y-10">
    <div className="flex flex-col items-center gap-3">
     <img src="/logo.svg" alt="plann.er" />
     <p className="text-zinc-300 text-lg">
      Invite your friends and plan your next trip!
     </p>
    </div>

    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
     <div className="flex items-center gap-2 flex-1">
      <User className="size-5 text-zinc-400" />
      <input
       type="text"
       value={email}
       placeholder="User"
       onChange={(event) => setEmail(event.target.value)}
       className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
      />
     </div>
    </div>
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
     <div className="flex items-center gap-2 flex-1">
      <KeyRound className="size-5 text-zinc-400" />
      <input
       type="password"
       value={password}
       placeholder="Password"
       onChange={(event) => setPassword(event.target.value)}
       className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
      />
     </div>
    </div>
    <Button size="full" onClick={authenticate}>
     Continue
     <ArrowRight className="size-5" />
    </Button>

    <p className="text-sm text-zinc-500">
     By planning your trip with plann.er you automatically agree <br />
     to our{" "}
     <a className="text-zinc-300 underline" href="#">
      terms of use
     </a>{" "}
     and{" "}
     <a className="text-zinc-300 underline" href="#">
      privacy policies
     </a>
     .
    </p>
   </div>
   {errorModalIsOpen && (
    <ErrorModal
     type={modalType}
     closeErrorModal={() => setErrorModalIsOpen(false)}
    />
   )}
  </div>
 );
}
