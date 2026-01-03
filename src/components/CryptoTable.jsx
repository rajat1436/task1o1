import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatPrice, formatCurrency, formatPercentage, formatSupply } from '../utils/formatters';

const CryptoTable = ({ data, loading }) => {
  if (loading && data.length === 0) {
    return null;
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-900/50 border-b border-slate-700/50">
              <th className="px-4 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                #
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                24h Change
              </th>
              <th className="px-4 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">
                Market Cap
              </th>
              <th className="px-4 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">
                Volume (24h)
              </th>
              <th className="px-4 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider hidden xl:table-cell">
                Circulating Supply
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/30">
            {data.map((coin, index) => (
              <tr
                key={coin.id}
                className="table-row-hover stagger-animation"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                {/* Rank */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-slate-400">{coin.rank}</span>
                </td>

                {/* Name & Symbol */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    {coin.imageUrl ? (
                      <img
                        src={coin.imageUrl}
                        alt={coin.name}
                        className="w-8 h-8 rounded-full bg-slate-700"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">
                          {coin.symbol?.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-white">{coin.name}</p>
                      <p className="text-sm text-slate-400">{coin.symbol}</p>
                    </div>
                  </div>
                </td>

                {/* Price */}
                <td className="px-4 py-4 whitespace-nowrap text-right">
                  <span className="font-mono font-semibold text-white">
                    {formatPrice(coin.price)}
                  </span>
                </td>

                {/* 24h Change */}
                <td className="px-4 py-4 whitespace-nowrap text-right">
                  <div
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-semibold ${
                      coin.change24h >= 0
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-red-500/10 text-red-400'
                    }`}
                  >
                    {coin.change24h >= 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {formatPercentage(coin.change24h)}
                  </div>
                </td>

                {/* Market Cap */}
                <td className="px-4 py-4 whitespace-nowrap text-right hidden md:table-cell">
                  <span className="font-mono text-slate-300">
                    {formatCurrency(coin.marketCap)}
                  </span>
                </td>

                {/* Volume */}
                <td className="px-4 py-4 whitespace-nowrap text-right hidden lg:table-cell">
                  <span className="font-mono text-slate-300">
                    {formatCurrency(coin.volume24h)}
                  </span>
                </td>

                {/* Supply */}
                <td className="px-4 py-4 whitespace-nowrap text-right hidden xl:table-cell">
                  <span className="font-mono text-slate-300">
                    {formatSupply(coin.supply)} {coin.symbol}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {data.length === 0 && !loading && (
        <div className="p-12 text-center">
          <p className="text-slate-400 text-lg">No cryptocurrencies found</p>
          <p className="text-slate-500 text-sm mt-1">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default CryptoTable;
