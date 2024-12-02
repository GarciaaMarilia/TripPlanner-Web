import { Button } from "./button";

interface DeleteModalProps {
 closeDeleteModal: () => void;
 confirmDeleteItem: () => void;
 type: string;
}

export function DeleteModal({
 closeDeleteModal,
 confirmDeleteItem,
 type
}: DeleteModalProps) {
 return (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
   <div className="w-[340px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
    <div className="space-y-2">
     <div className="flex items-center justify-between">
      <h2 className="font-lg font-semibold">
       Are you sure to delete this {type}?
      </h2>
     </div>
    </div>

    <div className="flex items-center flex-direction: row justify-between gap-4">
     <Button onClick={confirmDeleteItem} variant="danger" size="full">
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
