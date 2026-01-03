import { TrendingUp, RefreshCw } from 'lucide-react';

const Header = ({ onRefresh, lastUpdated, loading }) => {
  const formatTime = (date) => {
    if (!date) return '';
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center pulse-glow">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold gradient-text">
                CryptoStats
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 hidden sm:block">
                Real-time cryptocurrency data
              </p>
            </div>
          </div>

          {/* Refresh Button & Last Updated */}
          <div className="flex items-center gap-4">
            {lastUpdated && (
              <div className="hidden md:block text-right">
                <p className="text-xs text-slate-500">Last updated</p>
                <p className="text-sm text-slate-300">{formatTime(lastUpdated)}</p>
              </div>
            )}
            <button
              onClick={onRefresh}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-blue-600 hover:bg-blue-700
                disabled:bg-blue-800 disabled:cursor-not-allowed text-white rounded-lg
                transition-all duration-200 font-medium text-sm"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
              />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
