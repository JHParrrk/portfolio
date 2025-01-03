import BoardWrite from "../../../../src/components/units/board/write/BoardWrite.container";
import { FETCH_BOARD } from "../../../../src/components/units/board/detail/BoardDetail.queries";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchBoardArgs,
} from "../../../../src/commons/types/generated/types";
import useBoardForm from "../../../../src/hooks/useBoardForm";

const BoardsEditPage = () => {
  const router = useRouter();

  if (!router || typeof router.query.boardId !== "string") return <></>;
  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(
    FETCH_BOARD,
    { variables: { boardId: router.query.boardId } }
  );

  const boardFormProps = useBoardForm();

  const props = {
    isEdit: true,
    data,
    ...boardFormProps,
  };

  return <BoardWrite {...props} />;
};

export default BoardsEditPage;
