const LoadingGrid = (length = 8) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-3">
      {[...Array(length)].map((_, i) => (
        <div
          key={i}
          className="bg-black rounded-xl border border-gray-500/[0.5] overflow-hidden animate-pulse"
        >
          <div className="w-full h-48 bg-black/50"></div>
          <div className="p-4 space-y-3">
            <div className="h-6 bg-white/50 rounded"></div>
            <div className="h-4 bg-white/50 rounded w-3/4"></div>
            <div className="h-4 bg-white/50 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingGrid;
