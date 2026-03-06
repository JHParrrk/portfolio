// components/units/board/best/index.tsx

import { IQuery } from '@/shared/types/generated/types';
import { BBC } from '@/features/boards/ui/best/BoardBestCard.css';
import { useMoveToPage } from '@/shared/hooks/customs/useMoveToPage';

interface IBoardBestProps {
  data: Pick<IQuery, 'fetchBoardsOfTheBest'>;
}

export default function BoardBest(props: IBoardBestProps): JSX.Element {
  const { data } = props;

  const { onClickMoveToPage } = useMoveToPage();

  return (
    <div className={BBC.Wrapper}>
      <h2>베스트 게시글</h2>
      <div className={BBC.List}>
        {data.fetchBoardsOfTheBest.map((board) => (
          <div
            className={BBC.BoardCard}
            key={board._id}
            id={board._id}
            onClick={onClickMoveToPage(`/boards/${board._id}`)}
          >
            <p className={BBC.CardTitle}>{board.title}</p>
            <p className={BBC.CardWriter}>작성자: {board.writer}</p>
            <p className={BBC.CardLikeCount}>❤️ {board.likeCount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
