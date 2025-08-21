import { useMoveToPage } from "@/src/components/commons/hooks/customs/useMoveToPage";
import { BLF } from "./BoardListFooter.styles";

export default function BoardListFooter(props: IBoardListFooterProps) {
  const { onClickMoveToPage } = useMoveToPage();

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
