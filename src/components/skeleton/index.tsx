import SkeletonBasic from "@mui/material/Skeleton";

type ISkeleton = {
  rows?: number;
  height?: number;
};

export const Skeleton: React.FC<ISkeleton> = ({ rows = 10, height = 44 }) => (
  <>
    {Array.from({ length: rows }).map((_, index) => (
      <SkeletonBasic
        key={`skeleton-row-${index}`}
        variant="rectangular"
        width="100%"
        height={height}
      />
    ))}
  </>
);
