import Skeleton from "@mui/material/Skeleton";

export function SkeletonLoading() {
 return (
  <div className="max-w-6xl  py-6 mx-auto ">
   <Skeleton
    variant="text"
    animation="pulse"
    sx={{ bgcolor: "grey.900" }}
    width={280}
    height={40}
   />
   <Skeleton
    variant="text"
    animation="pulse"
    sx={{ bgcolor: "grey.900" }}
    width={180}
    height={40}
   />
   <Skeleton
    variant="rectangular"
    animation="pulse"
    sx={{ bgcolor: "grey.900" }}
    width={500}
    height={60}
   />
   <Skeleton
    variant="text"
    animation="pulse"
    sx={{ bgcolor: "grey.900" }}
    width={180}
    height={40}
   />
   <Skeleton
    variant="rectangular"
    animation="pulse"
    sx={{ bgcolor: "grey.900" }}
    width={500}
    height={60}
   />
  </div>
 );
}
