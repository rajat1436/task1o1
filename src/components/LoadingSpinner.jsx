const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Animated Spinner */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-slate-700 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
      </div>

      {/* Loading Text */}
      <p className="mt-6 text-slate-400 font-medium">Loading cryptocurrency data...</p>
      <p className="mt-2 text-slate-500 text-sm">Fetching real-time market data</p>

      {/* Skeleton Table Preview */}
      <div className="mt-8 w-full max-w-4xl">
        <div className="bg-slate-800/30 rounded-xl p-4 space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 animate-pulse"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-700 rounded w-1/4"></div>
                <div className="h-3 bg-slate-700/50 rounded w-1/6"></div>
              </div>
              <div className="h-4 bg-slate-700 rounded w-20"></div>
              <div className="h-4 bg-slate-700 rounded w-16 hidden md:block"></div>
              <div className="h-4 bg-slate-700 rounded w-24 hidden lg:block"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
