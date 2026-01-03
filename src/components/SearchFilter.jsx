import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

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
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or symbol..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-lg
                text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500
                focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-slate-400">
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">Filters:</span>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-400 hidden sm:inline">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-3 py-2 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white
                focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-sm"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Order */}
          <button
            onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center gap-1 px-3 py-2 bg-slate-900/50 border border-slate-600/50
              rounded-lg text-white hover:bg-slate-700/50 transition-colors duration-200"
            title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          >
            <ArrowUpDown className="w-4 h-4" />
            <span className="text-sm">{sortOrder === 'asc' ? 'Asc' : 'Desc'}</span>
          </button>

          {/* Limit */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-400 hidden sm:inline">Show:</label>
            <select
              value={limit}
              onChange={(e) => onLimitChange(Number(e.target.value))}
              className="px-3 py-2 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white
                focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-sm"
            >
              {limitOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
