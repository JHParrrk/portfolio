// components/units/board/best/index.tsx

import { IQuery } from "@/src/commons/types/generated/types";
import {BBC} from "@/src/components/units/board/best/BoardBestCard.styles";
import { useMoveToPage } from "@/src/components/commons/hooks/customs/useMoveToPage";

interface IBoardBestProps {
  data: Pick<IQuery, "fetchBoardsOfTheBest">;
}

export default function BoardBest(props: IBoardBestProps): JSX.Element {
  const { data } = props;

  const { onClickMoveToPage } = useMoveToPage();

  return (
    <BBC.Wrapper>
      <h2>베스트 게시글</h2>
      <BBC.List>
        {data.fetchBoardsOfTheBest.map((board) => (
          <BBC.BoardCard
            key={board._id}
            id={board._id}
            onClick={onClickMoveToPage(`/boards/${board._id}`)}
          >
            <p>{board.title}</p>
            <p>작성자: {board.writer}</p>
            <p>❤️ {board.likeCount}</p>
          </BBC.BoardCard>
        ))}
      </BBC.List>
    </BBC.Wrapper>
  );
}
