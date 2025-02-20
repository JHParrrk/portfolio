import BoardListUI from "./BoardList.presenter";
import { useQuery } from "@apollo/client";
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from "./BoardList.queries";
import { useRouter } from "next/router";
import type {
  IQuery,
  IQueryFetchBoardsArgs,
  IQueryFetchBoardsCountArgs,
} from "../../../../commons/types/generated/types";
import { useState } from "react";
import type { MouseEvent } from "react";

export default function BoardList() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  const { data: dataBoardsCount, refetch: refetchBoardsCount } = useQuery<
    Pick<IQuery, "fetchBoardsCount">,
    IQueryFetchBoardsCountArgs
  >(FETCH_BOARDS_COUNT);

  const onClickMoveToBoardNew = () => {
    router.push("/boards/new");
  };

  const onClickMoveToBoardDetail = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof HTMLDivElement)
      // 항상 태그가 아닐수 있으니 instanceof로 타입을 확인해준다.
      router.push(`/boards/${event.target.id}`);
  };

  const onChangeKeyword = (value: string): void => {
    setKeyword(value);
  };

  const props = {
    data,
    onClickMoveToBoardNew,
    onClickMoveToBoardDetail,
    refetch,
    count: dataBoardsCount?.fetchBoardsCount,
    refetchBoardsCount,
    keyword,
    onChangeKeyword,
  };

  return <BoardListUI {...props} />;
}
