import { Button } from "./button";

interface DeleteModalProps {
 closeDeleteModal: () => void;
 confirmDeleteActivity: () => void;
}

export function DeleteModal({
 closeDeleteModal,
 confirmDeleteActivity,
}: DeleteModalProps) {
 return (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
   <div className="w-[340px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
    <div className="space-y-2">
     <div className="flex items-center justify-between">
      <h2 className="font-lg font-semibold">
       Are you sure to delete this activity?
      </h2>
     </div>
    </div>

    <div className="flex items-center flex-direction: row justify-between gap-4">
     <Button onClick={confirmDeleteActivity} variant="danger" size="full">
      Delete
     </Button>

     <Button onClick={closeDeleteModal} variant="secondary" size="full">
      Cancel
     </Button>
    </div>
   </div>
  </div>
 );
}
