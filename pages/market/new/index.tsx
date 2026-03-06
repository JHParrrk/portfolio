import MarketWrite from '@/features/market/ui/write/MarketWrite.index';

const MarketNewPage = () => {
  const props = {
    isEdit: false,
  };

  return <MarketWrite {...props} />;
};

export default MarketNewPage;
