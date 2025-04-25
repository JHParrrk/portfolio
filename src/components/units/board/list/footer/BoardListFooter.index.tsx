import { useMoveToPage } from "../../../../commons/hooks/customs/useMoveToPage";
import { BLF } from "./BoardListFooter.styles";

export default function BoardListFooter(props: IBoardListFooterProps) {
  const { onClickMoveToPage } = useMoveToPage();

  // boardWrite만들고 BoardId있으면 수정하기 이렇게 할까?
  return (
    <BLF.Footer>
      <>{props.children}</>
      <BLF.Button onClick={onClickMoveToPage("/boards/new")}>
        <BLF.PencilIcon src="/images/board/list/write.png" />
        게시물 등록하기
      </BLF.Button>
    </BLF.Footer>
  );
}
