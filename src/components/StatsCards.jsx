import { DollarSign, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../utils/formatters';

const StatCard = ({ title, value, subValue, icon: Icon, iconBg, trend }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 sm:p-6 card-hover">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
        <p className="text-xl sm:text-2xl font-bold text-white">{value}</p>
        {subValue && (
          <p
            className={`text-sm mt-1 flex items-center gap-1 ${
              trend === 'up'
                ? 'text-green-400'
                : trend === 'down'
                ? 'text-red-400'
                : 'text-slate-400'
            }`}
          >
            {trend === 'up' && <TrendingUp className="w-3 h-3" />}
            {trend === 'down' && <TrendingDown className="w-3 h-3" />}
            {subValue}
          </p>
        )}
      </div>
      <div className={`p-3 rounded-lg ${iconBg}`}>
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </div>
    </div>
  </div>
);

const StatsCards = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }

  // Calculate statistics
  const totalMarketCap = data.reduce((acc, coin) => acc + (coin.marketCap || 0), 0);
  const totalVolume = data.reduce((acc, coin) => acc + (coin.volume24h || 0), 0);

  // Find top gainer and loser
  const sortedByChange = [...data].sort((a, b) => b.change24h - a.change24h);
  const topGainer = sortedByChange[0];
  const topLoser = sortedByChange[sortedByChange.length - 1];

  const stats = [
    {
      title: 'Total Market Cap',
      value: formatCurrency(totalMarketCap),
      subValue: `${data.length} cryptocurrencies`,
      icon: DollarSign,
      iconBg: 'bg-blue-500/20',
      trend: null,
    },
    {
      title: '24h Trading Volume',
      value: formatCurrency(totalVolume),
      subValue: 'Across all coins',
      icon: BarChart3,
      iconBg: 'bg-purple-500/20',
      trend: null,
    },
    {
      title: 'Top Gainer',
      value: topGainer?.symbol || 'N/A',
      subValue: topGainer ? formatPercentage(topGainer.change24h) : 'N/A',
      icon: TrendingUp,
      iconBg: 'bg-green-500/20',
      trend: 'up',
    },
    {
      title: 'Top Loser',
      value: topLoser?.symbol || 'N/A',
      subValue: topLoser ? formatPercentage(topLoser.change24h) : 'N/A',
      icon: TrendingDown,
      iconBg: 'bg-red-500/20',
      trend: 'down',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={stat.title}
          className="fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <StatCard {...stat} />
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
