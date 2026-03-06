import { useState } from "react";
import { useRouter } from "next/router"; // useRouter 임포트
import { asSingle } from "@/shared/api/libraries/utils/router"; // asSingle 유틸리티 임포트
import * as S from "./MarketList.css";

// Hooks
import { useSmartPagination } from "@/shared/hooks/customs/useSmartPagination"; 
import { useQueryFetchUsedItems } from "@/shared/hooks/queries/useQueryFetchUsedItems";                                                                         
import { useQueryFetchUsedItemsOfTheBest } from "@/shared/hooks/queries/useQueryFetchUsedItemsOfTheBest";                                                       
import { useSearchbar } from "@/shared/hooks/customs/useSearchbar";

// UI Components
import MarketBestCard from "@/features/market/ui/best/MarketBestCard.index";    
import MarketListBody from "@/features/market/ui/list/body/MarketListBody.index";                                                                               
import MarketListFooter from "@/features/market/ui/list/footer/MarketListFooter.index";                                                                         
import Paginations02 from "@/shared/ui/pagination/02/Paginations02.index";      

// Types
import {
  IQuery,
  IQueryFetchUseditemsArgs,
} from "@/shared/types/generated/types";
import MarketListHeader from "./header/MarketListHeader.index";

type SmartSearchbarVars = Omit<IQueryFetchUseditemsArgs, "page" | "search"> & { 
  page?: number;
  search?: string;
};

export default function MarketList() {
  const router = useRouter();
  const [isSoldout, setIsSoldout] = useState(false);

  const searchKeyword = asSingle(router.query.search, "");

  const { startPage, currentPage, onClickPage, onClickPrev, onClickNext } =     
    useSmartPagination();

  const { data, refetch } = useQueryFetchUsedItems({
    page: currentPage,
    isSoldout,
    search: searchKeyword,
  });

  const { keyword, onChangeSearchbar } = useSearchbar<
    Pick<IQuery, "fetchUseditems">,
    SmartSearchbarVars
  >({ refetch });

  const { data: dataMarketBest } = useQueryFetchUsedItemsOfTheBest();

  const onClickToggle = (soldoutStatus: boolean) => () => {
    if (isSoldout === soldoutStatus) return;
    refetch({ isSoldout: soldoutStatus, page: 1 });
    setIsSoldout(soldoutStatus);
    onClickPage(1); 
  };

  return (
    <div className={S.Wrapper}>
      {dataMarketBest && <MarketBestCard data={dataMarketBest} />}

      <MarketListHeader
        isSoldout={isSoldout}
        onClickToggle={onClickToggle}
        onChangeSearchbar={(value: string) =>
          onChangeSearchbar({
            target: { value },
          } as React.ChangeEvent<HTMLInputElement>)
        }
        keyword={keyword}
      />

      <div className={S.ListWrapper}>
        <MarketListBody data={data} keyword={keyword} isSoldout={isSoldout} />  
      </div>

      <MarketListFooter>
        <Paginations02
          startPage={startPage}
          currentPage={currentPage}
          onClickPage={onClickPage}
          onClickPrev={onClickPrev}
          onClickNext={onClickNext}
        />
      </MarketListFooter>
    </div>
  );
}
