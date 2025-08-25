import { useState } from "react";
import { useRouter } from "next/router"; // useRouter 임포트
import { asSingle } from "@/src/commons/libraries/utils/router"; // asSingle 유틸리티 임포트
import * as S from "./MarketList.styles";

// Hooks
import { useSmartPagination } from "@/src/components/commons/hooks/customs/useSmartPagination";
import { useQueryFetchUsedItems } from "@/src/components/commons/hooks/queries/useQueryFetchUsedItems";
import { useQueryFetchUsedItemsOfTheBest } from "@/src/components/commons/hooks/queries/useQueryFetchUsedItemsOfTheBest";
import { useSearchbar } from "@/src/components/commons/hooks/customs/useSearchbar";

// UI Components
import MarketBestCard from "@/src/components/units/market/best/MarketBestCard.index";
import MarketListBody from "@/src/components/units/market/list/body/MarketListBody.index";
import Searchbars01 from "@/src/components/commons/searchbars/01/Searchbars01.index";
import Paginations02 from "@/src/components/commons/paginations/02/Paginations02.index";

// Types
import {
  IQuery,
  IQueryFetchUseditemsArgs,
} from "@/src/commons/types/generated/types";

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
    // 토글 시 1페이지로 이동하도록 URL을 직접 변경하거나,
    // refetch 후 페이지네이션 상태를 초기화할 수 있습니다.
    // 여기서는 useSmartPagination의 movePage를 활용하는 것이 가장 이상적입니다.
    // (단, 훅을 수정해야 하므로 우선 refetch와 state 변경으로 처리)
    refetch({ isSoldout: soldoutStatus, page: 1 });
    setIsSoldout(soldoutStatus);
    onClickPage(1); // URL 기반 훅이므로 페이지 이동 함수 호출
  };

  return (
    <S.Wrapper>
      {dataMarketBest && <MarketBestCard data={dataMarketBest} />}

      <S.Header>
        <S.ToggleWrapper>
          <S.ToggleButton isActive={!isSoldout} onClick={onClickToggle(false)}>
            판매중 상품
          </S.ToggleButton>
          <S.ToggleButton isActive={isSoldout} onClick={onClickToggle(true)}>
            판매된 상품
          </S.ToggleButton>
        </S.ToggleWrapper>

        <Searchbars01 onChangeSearchbar={onChangeSearchbar} keyword={keyword} />
      </S.Header>

      <S.ListWrapper>
        <MarketListBody data={data} keyword={keyword} isSoldout={isSoldout} />
      </S.ListWrapper>

      {/* 페이지네이션 컴포넌트를 목록 하단에 렌더링 */}
      <Paginations02
        startPage={startPage}
        currentPage={currentPage}
        onClickPage={onClickPage}
        onClickPrev={onClickPrev}
        onClickNext={onClickNext}
      />
    </S.Wrapper>
  );
}
