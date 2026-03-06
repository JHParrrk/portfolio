import { useMoveToPage } from '@/shared/hooks/customs/useMoveToPage';
import { BLF } from './BoardListFooter.css';

export default function BoardListFooter(props: IBoardListFooterProps) {
  const { onClickMoveToPage } = useMoveToPage();

  return (
    <div className={BLF.Footer}>
      <>{props.children}</>
      <button className={BLF.Button} onClick={onClickMoveToPage('/boards/new')}>
        <img className={BLF.PencilIcon} src="/images/board/list/write.png" />
        게시물 등록하기
      </button>
    </div>
  );
}
