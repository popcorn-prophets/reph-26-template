import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 p-6">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
}
