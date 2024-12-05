import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { CircleCheck, Trash } from "lucide-react";

import { Activities } from "../../../models/models";
import { DeleteModal } from "../../../components/delete-modal";
import { getActivities } from "../../../services/get-activities-service";
import { deleteActivityService } from "../../../services/delete-activity-service";

export function ActivitiesPage() {
 const { tripId } = useParams();
 const [isConfirmModal, setIsConfirmModal] = useState<boolean>(false);
 const [activitiesList, setActivitiesList] = useState<Activities[]>([]);
 const [selectedActivityId, setSelectedActivityId] = useState<string | null>(
  null
 );

 async function deleteActivity(activityId: string) {
  if (tripId && activityId) {
   await deleteActivityService(tripId, activityId);
  }
  closeConfirmModal();
  window.document.location.reload();
 }

 function openConfirmModal(activityId: string) {
  setSelectedActivityId(activityId);
  setIsConfirmModal(true);
 }

 function closeConfirmModal() {
  setIsConfirmModal(false);
  setSelectedActivityId(null);
 }

 useEffect(() => {
  if (tripId) {
   const fetchActivities = async () => {
    const activitiesData = await getActivities(tripId);
    setActivitiesList(activitiesData);
   };

   fetchActivities();
  }
 }, [tripId]);

 return (
  <div className="space-y-8">
   {activitiesList.map((day) => {
    return (
     <div key={day.data} className="space-y-2.5">
      <div className="flex gap-2 items-baseline">
       <span className="text-xl text-zinc-300 font-semibold">
        Day {format(day.data, "d")}
       </span>
       <span className="text-xs text-zinc-500">
        {format(day.data, "EEEE", { locale: enUS })}
       </span>
      </div>
      {day.activities.length > 0 ? (
       <div>
        {day.activities.map((activity) => {
         return (
          <div key={activity.id} className="space-y-2.5">
           <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
            <CircleCheck className="size-5 text-lime-300" />
            <span className="text-zinc-100">{activity.title}</span>
            <span className="text-zinc-400 text-sm ml-auto">
             {format(activity.occurs_at, "HH:mm")}h
            </span>
            <button onClick={() => openConfirmModal(activity.id)}>
             <Trash className="size-5" />
            </button>
           </div>
          </div>
         );
        })}
       </div>
      ) : (
       <p className="text-zinc-500 text-sm">
        None of the activities are scheduled for this date.
       </p>
      )}
     </div>
    );
   })}

   {isConfirmModal && selectedActivityId && (
    <DeleteModal
     type="Activity"
     closeDeleteModal={closeConfirmModal}
     confirmDeleteItem={() => deleteActivity(selectedActivityId)}
    />
   )}
  </div>
 );
}
