import { Search, SlidersHorizontal, ArrowUpDown, ChevronDown } from 'lucide-react';

const SearchFilter = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  sortOrder,
  onSortOrderChange,
  limit,
  onLimitChange,
}) => {
  const sortOptions = [
    { value: 'rank', label: 'Rank' },
    { value: 'name', label: 'Name' },
    { value: 'price', label: 'Price' },
    { value: 'change24h', label: '24h Change' },
    { value: 'marketCap', label: 'Market Cap' },
    { value: 'volume24h', label: 'Volume' },
  ];

  const limitOptions = [
    { value: 10, label: '10' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
      {/* Search Row */}
      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name or symbol..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-slate-900/70 border border-slate-600/50 rounded-xl
            text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50
            focus:border-blue-500/50 transition-all duration-200 text-base"
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-slate-400 mr-2">
          <SlidersHorizontal className="w-4 h-4" />
          <span className="text-sm font-semibold">Filters</span>
        </div>

        <div className="h-6 w-px bg-slate-600/50 hidden sm:block" />

        {/* Sort By */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400">Sort:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 bg-slate-900/70 border border-slate-600/50 rounded-lg text-white
                focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer text-sm font-medium
                hover:border-slate-500 transition-colors"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Sort Order */}
        <button
          onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
          className={`flex items-center gap-1.5 px-3 py-2 border rounded-lg text-sm font-medium
            transition-all duration-200 ${
              sortOrder === 'asc'
                ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                : 'bg-slate-900/70 border-slate-600/50 text-white hover:border-slate-500'
            }`}
          title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        >
          <ArrowUpDown className="w-4 h-4" />
          <span>{sortOrder === 'asc' ? 'Asc' : 'Desc'}</span>
        </button>

        {/* Limit */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400">Show:</span>
          <div className="relative">
            <select
              value={limit}
              onChange={(e) => onLimitChange(Number(e.target.value))}
              className="appearance-none pl-3 pr-8 py-2 bg-slate-900/70 border border-slate-600/50 rounded-lg text-white
                focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer text-sm font-medium
                hover:border-slate-500 transition-colors"
            >
              {limitOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
