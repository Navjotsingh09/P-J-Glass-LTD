export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="h-[50vh] min-h-[400px] bg-brand-offwhite animate-pulse" />
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-[3/4] bg-brand-offwhite animate-pulse rounded" />
              <div className="h-4 bg-brand-offwhite animate-pulse rounded w-3/4" />
              <div className="h-3 bg-brand-offwhite animate-pulse rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
