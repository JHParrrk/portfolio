import { useQueryFetchUsedItem } from '@/shared/hooks/queries/ustQueryFetchUsedItem';
import MarketWrite from '@/features/market/ui/write/MarketWrite.index';

const MarketEditPage = () => {
  const { data, loading, error } = useQueryFetchUsedItem();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data available</p>;

  const props = {
    isEdit: true,
    data,
  };

  return <MarketWrite {...props} />;
};

export default MarketEditPage;
