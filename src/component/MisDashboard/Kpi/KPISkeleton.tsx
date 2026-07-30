import { Skeleton } from "@/components/ui/skeleton";

export default function KPISkeleton() {
  return (
    <div className="rounded-2xl border p-5">
      <Skeleton className="mb-4 h-5 w-24" />

      <Skeleton className="mb-4 h-8 w-36" />

      <Skeleton className="mb-4 h-4 w-28" />

      <Skeleton className="h-10 w-full" />
    </div>
  );
}