import { Button } from "./button";

export enum ModalType {
 InvalidCredentials = "InvalidCredentials",
 AuthenticationFailed = "AuthenticationFailed",
}

interface ErrorModalProps {
 type: string;
 closeErrorModal: () => void;
}

export function ErrorModal({ closeErrorModal, type }: ErrorModalProps) {
 return (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
   <div className="w-[430px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
    <div className="space-y-2">
     <div className="flex items-center justify-between">
      <h2 className="font-lg font-semibold">
       {type === ModalType.AuthenticationFailed
        ? "Authentication Failed!"
        : "Invalid Email or Password."}{" "}
      </h2>
     </div>
    </div>
    <p>
     {type === ModalType.AuthenticationFailed
      ? "We couldn't authenticate your account. Please try again or contact support if the issue persists."
      : "The email or password you entered is incorrect. Please check your credentials and try again."}
    </p>

    <Button onClick={closeErrorModal} size="full">
     OK
    </Button>
   </div>
  </div>
 );
}
