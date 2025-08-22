import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PetDetailsShimmer: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-3 w-full">
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <div className="flex flex-col-reverse md:flex-row gap-x-10 w-full gap-y-5">
          <div className="flex flex-col items-start gap-y-2 w-full ">
            <Skeleton className="h-6" width={150} />
            <Skeleton className="h-6" width={250} />
            <Skeleton className="h-6" width={150} />
          </div>
          <div className="flex flex-col items-start md:items-end gap-y-2 w-full">
            <Skeleton className="h-24" width={200} />
          </div>
        </div>
        <div className="">
          <Skeleton className="h-12 md:h-20 lg:h-28 w-full" />
          <Skeleton className="h-96 md:h-56 lg:h-52 w-full" />
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default PetDetailsShimmer;
