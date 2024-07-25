import { Button } from "./button";

export enum ModalType {
 Activity = "Activity",
 Link = "Link",
}

interface ConfirmModalProps {
 type: string;
 closeConfirmModal: () => void;
}

export function ConfirmModal({
 closeConfirmModal,
 type,
}: ConfirmModalProps) {
 return (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
   <div className="w-[340px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
    <div className="space-y-2">
     <div className="flex items-center justify-between">
      <h2 className="font-lg font-semibold">
       {type === ModalType.Activity
        ? "Activity created successfully"
        : "Link registered successfully"}{" "}
      </h2>
     </div>
    </div>

    <Button onClick={closeConfirmModal} size="full">
     OK
    </Button>
   </div>
  </div>
 );
}
