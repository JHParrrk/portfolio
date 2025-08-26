import { useRouter } from "next/router";
import { useMoveToPage } from "../../../../../commons/hooks/customs/useMoveToPage";
import { MDBB } from "./MarketDetailBodyBottom.styles";
import { useMutationDeleteUseditem } from "@/src/components/commons/hooks/mutations/useMutationDeletUsedItem";

export default function MarketDetailBodyBottom() {
  const router = useRouter();
  const marketId = router.query.marketId;
  const { onClickMoveToPage } = useMoveToPage();
  const { deleteUseditem } = useMutationDeleteUseditem();

  const onClickDelete = async () => {
    try {
      await deleteUseditem({
        variables: { useditemId: router.query.marketId as string },
      });
      alert("게시글이 삭제되었습니다.");
      router.push("/market");
    } catch (error) {
      console.error(error);
      alert("삭제에 실패했습니다.");
    }
  };

  return (
    <MDBB.BottomWrapper>
      <MDBB.Button onClick={onClickMoveToPage("/market")}>목록으로</MDBB.Button>
      <MDBB.Button onClick={onClickMoveToPage(`/market/${marketId}/edit`)}>
        수정하기
      </MDBB.Button>
      <MDBB.Button onClick={onClickDelete}>삭제하기</MDBB.Button>
    </MDBB.BottomWrapper>
  );
}
