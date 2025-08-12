// BoardList.tsx

import styled from "@emotion/styled";
import { usePagination } from "../../../commons/hooks/customs/usePagination";
import { useSearchbar } from "../../../commons/hooks/customs/useSearchbar";
import Paginations01 from "../../../commons/paginations/01/Paginations01.index";
import Searchbars01 from "@/src/components/commons/searchbars/01/Searchbars01.index";
import BoardListBody from "./body/BoardListBody.index";
import BoardListFooter from "./footer/BoardListFooter.index";
import BoardListHeader from "./header/BoardListHeader.index";
import { useQueryFetchBoards } from "../../../commons/hooks/queries/useQueryFetchBoards";
import { useQueryFetchBoardsCount } from "../../../commons/hooks/queries/useQueryFetchBoardsCount";
import { useRouter } from "next/router";

export const Wrapper = styled.div`
  width: 1200px;
  margin: 100px;
`;

export default function BoardList() {
  const router = useRouter();

  // URL에서 page와 search 변수를 읽어와 초기 게시물 목록을 가져옴
  const { data, refetch } = useQueryFetchBoards({
    page: router.query.page ? Number(router.query.page) : 1,
    search: router.query.search as string,
  });

  // URL의 search 변수를 기반으로 검색 결과의 총 개수를 가져옴
  const { data: dataBoardsCount, refetch: refetchBoardsCount } =
    useQueryFetchBoardsCount({
      search: router.query.search as string,
    });

  const paginationArgs = usePagination({
    refetch,
    count: dataBoardsCount?.fetchBoardsCount, // 검색 결과 총 개수를 pagination에 전달
  });

  const { keyword, onChangeSearchbar } = useSearchbar({
    refetch,
    refetchBoardsCount,
  });

  return (
    <Wrapper>
      <BoardListHeader>
        <Searchbars01
          onChangeSearchbar={onChangeSearchbar}
          keyword={keyword} // useSearchbar의 keyword 상태를 Searchbars01 컴포넌트의 value로 전달
        />
      </BoardListHeader>
      <BoardListBody data={data} keyword={keyword} />
      <BoardListFooter>
        <Paginations01 {...paginationArgs} />
      </BoardListFooter>
    </Wrapper>
  );
}
