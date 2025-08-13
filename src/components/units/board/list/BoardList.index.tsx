// BoardList.tsx

import styled from "@emotion/styled";
import { useRouter } from "next/router";
// 커스텀 훅과 하위 컴포넌트들을 import 합니다.
import { usePagination } from "../../../commons/hooks/customs/usePagination";
import { useSearchbar } from "../../../commons/hooks/customs/useSearchbar";
import Paginations01 from "../../../commons/paginations/01/Paginations01.index";
import Searchbars01 from "@/src/components/commons/searchbars/01/Searchbars01.index";
import BoardListBody from "./body/BoardListBody.index";
import BoardListFooter from "./footer/BoardListFooter.index";
import BoardListHeader from "./header/BoardListHeader.index";
import { useQueryFetchBoards } from "../../../commons/hooks/queries/useQueryFetchBoards";
import { useQueryFetchBoardsCount } from "../../../commons/hooks/queries/useQueryFetchBoardsCount";
import { BLB } from "./body/BoardListBody.styles";

// 전체를 감싸는 Wrapper 스타일 컴포넌트입니다.
export const Wrapper = styled.div`
  width: 1200px;
  margin: 100px;
`;

export default function BoardList() {
  const router = useRouter();

  // router.query.search는 string | string[] | undefined 일 수 있으므로 안전하게 문자열로 변환합니다.
  const searchKeyword = Array.isArray(router.query.search)
    ? router.query.search[0] ?? ""
    : (router.query.search as string) ?? "";

  // URL의 page와 search 쿼리를 이용해 게시물 목록 데이터를 가져오는 쿼리입니다.
  const { data, refetch } = useQueryFetchBoards({
    page: router.query.page ? Number(router.query.page) : 1,
    search: searchKeyword,
  });

  // 검색 결과에 해당하는 게시물의 총 개수를 가져오는 쿼리입니다.
  const { data: dataBoardsCount, refetch: refetchBoardsCount } =
    useQueryFetchBoardsCount({
      search: searchKeyword,
    });

  // 위에서 가져온 데이터와 함수를 usePagination 훅에 전달하여 페이지네이션 로직을 초기화합니다.
  const paginationArgs = usePagination({
    refetch,
    count: dataBoardsCount?.fetchBoardsCount,
    search: searchKeyword,
    shallow: true,
  });

  // 검색창 로직을 관리하는 커스텀 훅입니다.
  const { keyword, onChangeSearchbar } = useSearchbar({
    refetch,
    refetchCount: refetchBoardsCount,
    shallow: true,
  });

  return (
    <Wrapper>
      {/* 헤더 영역: 검색창이 위치합니다. */}
      <BoardListHeader>
        <Searchbars01
          onChangeSearchbar={onChangeSearchbar}
          keyword={keyword} // 검색어 상태를 props로 전달
        />
      </BoardListHeader>
      {/* 바디 영역: 실제 게시물 목록이 표시됩니다. */}
      <BLB.BodyWrapper>
        <BoardListBody data={data} keyword={keyword} />
      </BLB.BodyWrapper>
      {/* 푸터 영역: 페이지네이션 컨트롤이 위치합니다. */}
      <BoardListFooter>
        {/* usePagination 훅이 반환한 객체를 spread operator로 한번에 전달합니다. */}
        <Paginations01 {...paginationArgs} />
      </BoardListFooter>
    </Wrapper>
  );
}