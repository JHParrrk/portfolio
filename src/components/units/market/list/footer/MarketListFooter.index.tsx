import { useMoveToPage } from "@/src/components/commons/hooks/customs/useMoveToPage";
import { MLF } from "./MarketListFooter.styles";

export default function MarketListFooter(props: IMarketListFooterProps) {
  const { onClickMoveToPage } = useMoveToPage();

  return (
    <MLF.Footer>
      <>{props.children}</>
      <MLF.Button onClick={onClickMoveToPage("/market/new")}>
        <MLF.PencilIcon src="/images/board/list/write.png" />
        게시물 등록하기
      </MLF.Button>
    </MLF.Footer>
  );
}
