import { useState, useMemo } from 'react';
import { AlertCircle } from 'lucide-react';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import SearchFilter from './components/SearchFilter';
import CryptoTable from './components/CryptoTable';
import LoadingSpinner from './components/LoadingSpinner';
import { useCryptoData } from './hooks/useCryptoData';

function App() {
  const { data, loading, error, lastUpdated, refresh } = useCryptoData(100);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rank');
  const [sortOrder, setSortOrder] = useState('asc');
  const [displayLimit, setDisplayLimit] = useState(25);

  const filteredData = useMemo(() => {
    let result = [...data];

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        (coin) =>
          coin.name.toLowerCase().includes(searchLower) ||
          coin.symbol.toLowerCase().includes(searchLower)
      );
    }

    result.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'name') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });

    return result.slice(0, displayLimit);
  }, [data, searchTerm, sortBy, sortOrder, displayLimit]);

  return (
    <div className="min-h-screen bg-slate-900">
      <Header onRefresh={refresh} lastUpdated={lastUpdated} loading={loading} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-8 p-5 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-4">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-red-400 font-semibold">Error loading data</p>
              <p className="text-red-300/70 text-sm mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {loading && data.length === 0 ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-8">
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
            <div className="flex items-center justify-between px-1">
              <p className="text-sm text-slate-400">
                Showing{' '}
                <span className="text-white font-semibold">{filteredData.length}</span>
                {' '}of{' '}
                <span className="text-white font-semibold">{data.length}</span>
                {' '}cryptocurrencies
              </p>
              {loading && (
                <p className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Refreshing...
                </p>
              )}
            </div>

            {/* Crypto Table */}
            <section>
              <CryptoTable data={filteredData} loading={loading} />
            </section>

            {/* Footer */}
            <footer className="text-center text-slate-500 text-sm py-6 border-t border-slate-800">
              <p>
                Data provided by{' '}
                <a
                  href="https://www.cryptocompare.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                >
                  CryptoCompare
                </a>
                {' '} | Auto-refreshes every 30 seconds
              </p>
            </footer>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
