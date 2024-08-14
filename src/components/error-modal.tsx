import { Button } from "./button";

export enum ErrorModalType {
 InvalidCredentials = "InvalidCredentials",
 AuthenticationFailed = "AuthenticationFailed",
 CreateError = "CreateError",
}

interface ErrorModalProps {
 type: string;
 message?: string;
 closeErrorModal: () => void;
}

export function ErrorModal({
 closeErrorModal,
 type,
 message,
}: ErrorModalProps) {
 return (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
   <div className="w-[430px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
    <div className="space-y-2">
     <div className="flex items-center justify-between">
      <h2 className="font-lg font-semibold">
       {type === ErrorModalType.AuthenticationFailed
        ? "Authentication Failed!"
        : type === ErrorModalType.InvalidCredentials
        ? "Invalid Email or Password."
        : "Unsuccessful"}{" "}
      </h2>
     </div>
    </div>
    <p>
     {type === ErrorModalType.AuthenticationFailed
      ? "We couldn't authenticate your account. Please try again or contact support if the issue persists."
      : type === ErrorModalType.InvalidCredentials
      ? "The email or password you entered is incorrect. Please check your credentials and try again."
      : message}
    </p>

    <Button onClick={closeErrorModal} size="full">
     OK
    </Button>
   </div>
  </div>
 );
}
