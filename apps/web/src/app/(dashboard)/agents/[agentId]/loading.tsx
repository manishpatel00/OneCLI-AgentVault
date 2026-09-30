import { Skeleton } from "@agentvault/ui/components/skeleton";

export default function AgentDetailLoading() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-background">
      {/* Top Header */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-8 w-8 rounded-lg" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>

      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Inner Left Nav */}
        <div className="hidden md:flex w-56 flex-col border-r bg-muted/20 p-3 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-8 w-full rounded-md" />
            <Skeleton className="h-8 w-full rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-8 w-full rounded-md" />
            <Skeleton className="h-8 w-full rounded-md" />
            <Skeleton className="h-8 w-full rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-8 w-full rounded-md" />
            <Skeleton className="h-8 w-full rounded-md" />
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="flex-1 flex flex-col p-6 space-y-4">
          <div className="flex justify-end">
            <Skeleton className="h-10 w-24 rounded-2xl" />
          </div>
          <div className="flex justify-start">
            <Skeleton className="h-24 w-80 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
