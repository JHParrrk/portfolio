import { getDate } from "../../../../../commons/libraries/utils";
import { useMoveToPage } from "../../../../commons/hooks/customs/useMoveToPage";
import { BLB } from "./BoardListBody.styles";
import { v4 as uuidv4 } from "uuid";
import { IBoardListBodyProps } from "./BoardListBody.types";

export default function BoardListBody(props: IBoardListBodyProps) {
  const { onClickMoveToPage } = useMoveToPage();

  return (
    <>
      <BLB.Row>
        <BLB.ColumnHeaderBasic>ID</BLB.ColumnHeaderBasic>
        <BLB.ColumnHeaderTitle>제목</BLB.ColumnHeaderTitle>
        <BLB.ColumnHeaderBasic>작성자</BLB.ColumnHeaderBasic>
        <BLB.ColumnHeaderBasic>날짜</BLB.ColumnHeaderBasic>
      </BLB.Row>
      {props.data?.fetchBoards.map((el, index) => (
        <BLB.Row key={el._id}>
          <BLB.ColumnBasic>
            {String(el._id).slice(-4).toUpperCase()}
          </BLB.ColumnBasic>
          <BLB.ColumnTitle
            id={el._id}
            onClick={onClickMoveToPage(`/boards/${el._id}`)}
            style={{ cursor: "pointer" }} /* 인라인 스타일로 명확히 설정 */

          >
            {el.title
              .replaceAll(props.keyword, `@#$%${props.keyword}@#$%`)
              .split("@#$%")
              .map((el) => (
                <BLB.TextToken key={uuidv4()} isMatched={props.keyword === el}>
                  {el}
                </BLB.TextToken>
              ))}
          </BLB.ColumnTitle>
          <BLB.ColumnBasic>{el.writer}</BLB.ColumnBasic>
          <BLB.ColumnBasic>{getDate(el.createdAt)}</BLB.ColumnBasic>
        </BLB.Row>
      ))}
    </>
  );
}
