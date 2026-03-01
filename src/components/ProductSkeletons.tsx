
interface SkeletonProps {
  className?: string; 
}

const Skeleton = ({ className = "" }: SkeletonProps) => (
  <div
    className={`bg-slate-200 rounded-lg relative overflow-hidden ${className}`}
  >
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
  </div>
);

export const ProductCardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">

    <Skeleton className="h-48 w-full rounded-none" />

    <div className="p-4 flex flex-col gap-3">

      <Skeleton className="h-3 w-20 rounded-full" />
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      <div className="flex items-center gap-2">
        <Skeleton className="h-3 w-24 rounded-full" /> 
        <Skeleton className="h-3 w-16 rounded-full" /> 
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-50 mt-auto">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-8 w-16 rounded-lg" /> 
      </div>

    </div>
  </div>
);

export const ProductsPageSkeleton = () => (
  <div className="min-h-screen bg-slate-50 pt-16">
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 py-6">

      <div className="flex gap-3 mb-6">
        <Skeleton className="h-10 w-64 rounded-lg" /> 
        <Skeleton className="h-10 w-40 rounded-lg" />  
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-24 rounded-full" />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>

    </div>
  </div>
);

export const ProductDetailSkeleton = () => (
  <div className="min-h-screen bg-slate-50 pt-16">
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <Skeleton className="h-4 w-56 rounded-full" />
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 py-8">

      <Skeleton className="h-5 w-16 mb-6 rounded-full" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-3xl p-6 lg:p-10 shadow-sm border border-slate-100">

        <div className="flex flex-col gap-4">
          <Skeleton className="w-full aspect-square rounded-2xl" />

          <div className="flex gap-3">
            <Skeleton className="flex-1 h-11 rounded-xl" />
            <Skeleton className="w-28 h-11 rounded-xl" />
          </div>

        </div>

        <div className="flex flex-col gap-5">
          <Skeleton className="h-3 w-24 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-full rounded-lg" />
            <Skeleton className="h-8 w-2/3 rounded-lg" />
          </div>

          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-28 rounded-full" /> 
            <Skeleton className="h-4 w-8  rounded-full" /> 
            <Skeleton className="h-4 w-24 rounded-full" /> 
          </div>

          <div className="flex items-baseline gap-3 py-3 border-y border-slate-100">
            <Skeleton className="h-10 w-32 rounded-lg" />  
            <Skeleton className="h-6  w-20 rounded-lg" />  
            <Skeleton className="h-6  w-24 rounded-full" />
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-20 rounded-full" />
            <div className="flex items-center gap-3">
              <Skeleton className="w-9 h-9 rounded-lg" />  
              <Skeleton className="w-10 h-7 rounded-lg" /> 
              <Skeleton className="w-9 h-9 rounded-lg" />  
            </div>
          </div>

          <div className="flex gap-3">
            <Skeleton className="flex-1 h-14 rounded-xl" />
            <Skeleton className="flex-1 h-14 rounded-xl" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>

        </div>
      </div>

    
      <div className="mt-8 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">

 
        <div className="flex border-b border-slate-100 px-6 py-4 gap-6">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>

      
        <div className="p-6 lg:p-8 flex flex-col gap-3">
          <Skeleton className="h-4 w-full  rounded-full" />
          <Skeleton className="h-4 w-full  rounded-full" />
          <Skeleton className="h-4 w-5/6  rounded-full" />
          <Skeleton className="h-4 w-4/5  rounded-full" />
          <Skeleton className="h-4 w-full  rounded-full" />
          <Skeleton className="h-4 w-2/3  rounded-full" />
        </div>

      </div>

      <div className="mt-10">
        <Skeleton className="h-7 w-44 mb-5 rounded-lg" /> 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              <Skeleton className="h-36 w-full rounded-none" />
              <div className="p-3 flex flex-col gap-2">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-3/4 rounded" />
                <div className="flex justify-between mt-1">
                  <Skeleton className="h-3 w-20 rounded-full" />
                  <Skeleton className="h-4 w-14 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
);

export const FeaturedProductsSkeleton = () => (
  <section className="bg-slate-50 py-20 px-4">
    <div className="max-w-7xl mx-auto">

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-36 rounded-full" />
          <Skeleton className="h-9 w-56 rounded-lg" />
          <Skeleton className="h-4 w-48 rounded-full" />
        </div>
        <Skeleton className="h-10 w-40 rounded-lg" />     
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>

    </div>
  </section>
);


