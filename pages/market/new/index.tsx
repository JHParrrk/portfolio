import MarketWrite from "@/src/components/units/market/write/MarketWrite.index";

const MarketNewPage = () => {
  const props = {
    isEdit: false,
  };

  return <MarketWrite {...props} />;
};

export default MarketNewPage;
