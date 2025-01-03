import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import BoardDetailUI from "./BoardDetail.presenter";
import {
  IQuery,
  IQueryFetchBoardArgs,
  IMutation,
  IMutationDeleteBoardArgs,
} from "../../../../commons/types/generated/types";
import { FETCH_BOARD, DELETE_BOARD } from "./BoardDetail.queries"; // 필요한 쿼리 파일을 추가하세요

export default function BoardDetail() {
  const router = useRouter();

  // router.query.boardId를 string으로 단언
  if (!router || typeof router.query.boardId !== "string") return <></>;

  // useQuery 훅을 사용하여 FETCH_BOARD 쿼리 실행
  const { loading, error, data } = useQuery<
    Pick<IQuery, "fetchBoard">,
    IQueryFetchBoardArgs
  >(FETCH_BOARD, {
    variables: { boardId: router.query.boardId as string },
    skip: !router.query.boardId,
  });

  // useMutation 훅을 사용하여 DELETE_BOARD 뮤테이션 실행
  const [deleteBoard] = useMutation<
    Pick<IMutation, "deleteBoard">,
    IMutationDeleteBoardArgs
  >(DELETE_BOARD);

  const onClickDelete = async () => {
    try {
      await deleteBoard({
        variables: { boardId: router.query.boardId as string },
      });
      alert("게시글이 삭제되었습니다.");
      router.push("/boards");
    } catch (error) {
      console.error(error);
      alert("삭제에 실패했습니다.");
    }
  };

  const onClickList = () => {
    router.push("/boards");
  };

  const onClickEdit = () => {
    router.push(`/boards/${router.query.boardId}/edit`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const props = {
    data,
    onClickDelete,
    onClickList,
    onClickEdit,
  };

  return <BoardDetailUI {...props} />;
}
