import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductItemShimmer: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-3">
      <SkeletonTheme baseColor="gray" highlightColor="#D3D3D3">
        <Skeleton className="h-64 md:h-56 lg:h-52" />
        <div className="flex flex-col items-start gap-y-2">
          <Skeleton className="h-6" width={80} />
          <Skeleton className="h-6" width={105} />
          {/* <Skeleton height={50} width={50} circle={true} /> */}
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default ProductItemShimmer;
