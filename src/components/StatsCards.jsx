import { DollarSign, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../utils/formatters';

const StatCard = ({ title, value, subValue, icon: Icon, iconBg, trend }) => (
  <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700/50 rounded-2xl p-6 card-hover min-h-[140px] flex flex-col justify-between">
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        <p className="text-slate-400 text-sm font-medium mb-2 truncate">{title}</p>
        <p className="text-2xl lg:text-3xl font-bold text-white truncate">{value}</p>
      </div>
      <div className={`p-3 rounded-xl ${iconBg} flex-shrink-0`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
    {subValue && (
      <p
        className={`text-sm mt-3 flex items-center gap-1.5 ${
          trend === 'up'
            ? 'text-green-400'
            : trend === 'down'
            ? 'text-red-400'
            : 'text-slate-400'
        }`}
      >
        {trend === 'up' && <TrendingUp className="w-4 h-4" />}
        {trend === 'down' && <TrendingDown className="w-4 h-4" />}
        <span className="font-medium">{subValue}</span>
      </p>
    )}
  </div>
);

const StatsCards = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }

  const totalMarketCap = data.reduce((acc, coin) => acc + (coin.marketCap || 0), 0);
  const totalVolume = data.reduce((acc, coin) => acc + (coin.volume24h || 0), 0);

  const sortedByChange = [...data].sort((a, b) => b.change24h - a.change24h);
  const topGainer = sortedByChange[0];
  const topLoser = sortedByChange[sortedByChange.length - 1];

  const stats = [
    {
      title: 'Total Market Cap',
      value: formatCurrency(totalMarketCap),
      subValue: `${data.length} cryptocurrencies`,
      icon: DollarSign,
      iconBg: 'bg-blue-500/30',
      trend: null,
    },
    {
      title: '24h Trading Volume',
      value: formatCurrency(totalVolume),
      subValue: 'Across all coins',
      icon: BarChart3,
      iconBg: 'bg-purple-500/30',
      trend: null,
    },
    {
      title: 'Top Gainer',
      value: topGainer?.symbol || 'N/A',
      subValue: topGainer ? formatPercentage(topGainer.change24h) : 'N/A',
      icon: TrendingUp,
      iconBg: 'bg-green-500/30',
      trend: 'up',
    },
    {
      title: 'Top Loser',
      value: topLoser?.symbol || 'N/A',
      subValue: topLoser ? formatPercentage(topLoser.change24h) : 'N/A',
      icon: TrendingDown,
      iconBg: 'bg-red-500/30',
      trend: 'down',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
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
