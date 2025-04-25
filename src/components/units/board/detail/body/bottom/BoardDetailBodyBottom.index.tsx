import { useRouter } from "next/router";
import { useMoveToPage } from "../../../../../commons/hooks/customs/useMoveToPage";
import { BDBB } from "./BoardDetailBodyBottom.styles";
import { useMutationDeleteBoard } from "@/src/components/commons/hooks/mutations/useMutationDeleteBoard";

export default function BoardDetailBodyBottom() {
  const router = useRouter();
  const boardId = router.query.boardId;
  const { onClickMoveToPage } = useMoveToPage();
  const { deleteBoard } = useMutationDeleteBoard();

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

  return (
    <BDBB.BottomWrapper>
      <BDBB.Button onClick={onClickMoveToPage("/boards")}>목록으로</BDBB.Button>
      <BDBB.Button onClick={onClickMoveToPage(`/boards/${boardId}/edit`)}>
        수정하기
      </BDBB.Button>
      <BDBB.Button onClick={onClickDelete}>삭제하기</BDBB.Button>
    </BDBB.BottomWrapper>
  );
}
