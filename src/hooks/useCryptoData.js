import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = 'https://min-api.cryptocompare.com/data/top/mktcapfull';
const IMAGE_BASE_URL = 'https://www.cryptocompare.com';
const REFRESH_INTERVAL = 30000; // 30 seconds

/**
 * Custom hook to fetch and manage cryptocurrency data
 * @param {number} limit - Number of cryptocurrencies to fetch
 * @returns {Object} - Data, loading state, error, and refresh function
 */
export const useCryptoData = (limit = 100) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);

      const response = await fetch(`${API_BASE_URL}?limit=${limit}&tsym=USD`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.Response === 'Error') {
        throw new Error(result.Message || 'Failed to fetch data');
      }

      const transformedData = result.Data.map((item, index) => ({
        id: item.CoinInfo.Id,
        rank: index + 1,
        name: item.CoinInfo.FullName,
        symbol: item.CoinInfo.Name,
        imageUrl: item.CoinInfo.ImageUrl
          ? `${IMAGE_BASE_URL}${item.CoinInfo.ImageUrl}`
          : null,
        price: item.RAW?.USD?.PRICE || 0,
        change24h: item.RAW?.USD?.CHANGEPCT24HOUR || 0,
        marketCap: item.RAW?.USD?.MKTCAP || 0,
        volume24h: item.RAW?.USD?.VOLUME24HOUR || 0,
        supply: item.RAW?.USD?.SUPPLY || 0,
        high24h: item.RAW?.USD?.HIGH24HOUR || 0,
        low24h: item.RAW?.USD?.LOW24HOUR || 0,
      }));

      setData(transformedData);
      setLastUpdated(new Date());
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [limit]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
  }, [fetchData]);

  const refresh = useCallback(() => {
    setLoading(true);
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refresh,
  };
};

export default useCryptoData;
