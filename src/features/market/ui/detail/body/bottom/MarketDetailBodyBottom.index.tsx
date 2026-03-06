import { useRouter } from 'next/router';
import { useMoveToPage } from '@/shared/hooks/customs/useMoveToPage';
import { MDBB } from './MarketDetailBodyBottom.css';
import { useMutationDeleteUseditem } from '@/shared/hooks/mutations/useMutationDeletUsedItem';

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
      alert('게시글이 삭제되었습니다.');
      router.push('/market');
    } catch (error) {
      console.error(error);
      alert('삭제에 실패했습니다.');
    }
  };

  return (
    <div className={MDBB.BottomWrapper}>
      <button className={MDBB.Button} onClick={onClickMoveToPage('/market')}>
        목록으로
      </button>
      <button
        className={MDBB.Button}
        onClick={onClickMoveToPage(`/market/${marketId}/edit`)}
      >
        수정하기
      </button>
      <button className={MDBB.Button} onClick={onClickDelete}>
        삭제하기
      </button>
    </div>
  );
}
