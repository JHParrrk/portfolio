import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import BoardDetailUI from "./BoardDetail.presenter";
import { FETCH_BOARD, DELETE_BOARD } from "./BoardDetail.queries"; // 필요한 쿼리 파일을 추가하세요

export default function BoardDetail() {
  const router = useRouter();
  const { loading, error, data } = useQuery(FETCH_BOARD, {
    variables: { boardId: router.query.boardId },
    skip: !router.query.boardId,
  });
  const [deleteBoard] = useMutation(DELETE_BOARD);

  const onClickDelete = async () => {
    try {
      await deleteBoard({ variables: { boardId: router.query.boardId } });
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const props = {
    data,
    onClickDelete,
    onClickList,
  };

  return <BoardDetailUI {...props} />;
}
