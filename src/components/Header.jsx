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
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Title */}
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                Crypto<span className="text-blue-400">Stats</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 hidden sm:block">
                Real-time cryptocurrency data
              </p>
            </div>
          </div>

          {/* Refresh Button & Last Updated */}
          <div className="flex items-center gap-5">
            {lastUpdated && (
              <div className="hidden md:flex flex-col items-end">
                <p className="text-xs text-slate-500 font-medium">Last updated</p>
                <p className="text-sm text-slate-300 font-mono">{formatTime(lastUpdated)}</p>
              </div>
            )}
            <button
              onClick={onRefresh}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500
                disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white rounded-xl
                transition-all duration-200 font-semibold text-sm shadow-lg shadow-blue-600/20
                hover:shadow-blue-500/30"
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
