import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatPrice, formatCurrency, formatPercentage, formatSupply } from '../utils/formatters';

const CryptoTable = ({ data, loading }) => {
  if (loading && data.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-slate-900/70">
              <th className="px-4 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider w-16">
                #
              </th>
              <th className="px-4 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider min-w-[200px]">
                Name
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider w-32">
                Price
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider w-32">
                24h Change
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider w-36 hidden md:table-cell">
                Market Cap
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider w-36 hidden lg:table-cell">
                Volume (24h)
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider w-44 hidden xl:table-cell">
                Circulating Supply
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/30">
            {data.map((coin, index) => (
              <tr
                key={coin.id}
                className="hover:bg-slate-700/30 transition-colors duration-150"
                style={{ animationDelay: `${index * 20}ms` }}
              >
                {/* Rank */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-sm font-bold text-slate-500">{coin.rank}</span>
                </td>

                {/* Name & Symbol */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    {coin.imageUrl ? (
                      <img
                        src={coin.imageUrl}
                        alt={coin.name}
                        className="w-9 h-9 rounded-full bg-slate-700 flex-shrink-0"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '';
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-white">
                          {coin.symbol?.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-semibold text-white truncate">{coin.name}</p>
                      <p className="text-sm text-slate-400 font-medium">{coin.symbol}</p>
                    </div>
                  </div>
                </td>

                {/* Price */}
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className="font-mono font-semibold text-white text-sm">
                    {formatPrice(coin.price)}
                  </span>
                </td>

                {/* 24h Change */}
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span
                    className={`inline-flex items-center justify-end gap-1 font-mono text-sm font-semibold ${
                      coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {coin.change24h >= 0 ? (
                      <TrendingUp className="w-3.5 h-3.5" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5" />
                    )}
                    {formatPercentage(coin.change24h)}
                  </span>
                </td>

                {/* Market Cap */}
                <td className="px-6 py-4 whitespace-nowrap text-right hidden md:table-cell">
                  <span className="font-mono text-sm text-slate-300">
                    {formatCurrency(coin.marketCap)}
                  </span>
                </td>

                {/* Volume */}
                <td className="px-6 py-4 whitespace-nowrap text-right hidden lg:table-cell">
                  <span className="font-mono text-sm text-slate-300">
                    {formatCurrency(coin.volume24h)}
                  </span>
                </td>

                {/* Supply */}
                <td className="px-6 py-4 whitespace-nowrap text-right hidden xl:table-cell">
                  <span className="font-mono text-sm text-slate-300">
                    {formatSupply(coin.supply)} <span className="text-slate-500">{coin.symbol}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {data.length === 0 && !loading && (
        <div className="p-16 text-center">
          <p className="text-slate-400 text-lg font-medium">No cryptocurrencies found</p>
          <p className="text-slate-500 text-sm mt-2">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default CryptoTable;
