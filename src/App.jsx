import { useState, useMemo } from 'react';
import { AlertCircle } from 'lucide-react';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import SearchFilter from './components/SearchFilter';
import CryptoTable from './components/CryptoTable';
import LoadingSpinner from './components/LoadingSpinner';
import { useCryptoData } from './hooks/useCryptoData';

function App() {
  // API Data Hook
  const { data, loading, error, lastUpdated, refresh } = useCryptoData(100);

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rank');
  const [sortOrder, setSortOrder] = useState('asc');
  const [displayLimit, setDisplayLimit] = useState(25);

  // Filter and Sort Data
  const filteredData = useMemo(() => {
    let result = [...data];

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        (coin) =>
          coin.name.toLowerCase().includes(searchLower) ||
          coin.symbol.toLowerCase().includes(searchLower)
      );
    }

    // Sort
    result.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // Handle string comparison for name
      if (sortBy === 'name') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });

    // Apply display limit
    return result.slice(0, displayLimit);
  }, [data, searchTerm, sortBy, sortOrder, displayLimit]);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <Header onRefresh={refresh} lastUpdated={lastUpdated} loading={loading} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <div>
              <p className="text-red-400 font-medium">Error loading data</p>
              <p className="text-red-300/70 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && data.length === 0 ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-6">
            {/* Stats Cards */}
            <section>
              <StatsCards data={data} />
            </section>

            {/* Search & Filters */}
            <section>
              <SearchFilter
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                sortBy={sortBy}
                onSortChange={setSortBy}
                sortOrder={sortOrder}
                onSortOrderChange={setSortOrder}
                limit={displayLimit}
                onLimitChange={setDisplayLimit}
              />
            </section>

            {/* Results Info */}
            <div className="flex items-center justify-between text-sm text-slate-400">
              <p>
                Showing{' '}
                <span className="text-white font-semibold">{filteredData.length}</span> of{' '}
                <span className="text-white font-semibold">{data.length}</span> cryptocurrencies
              </p>
              {loading && (
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Refreshing data...
                </p>
              )}
            </div>

            {/* Crypto Table */}
            <section>
              <CryptoTable data={filteredData} loading={loading} />
            </section>

            {/* Footer */}
            <footer className="text-center text-slate-500 text-sm py-4">
              <p>
                Data provided by{' '}
                <a
                  href="https://www.cryptocompare.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  CryptoCompare
                </a>
                . Auto-refreshes every 30 seconds.
              </p>
            </footer>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
