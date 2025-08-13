// BoardListBody.index.tsx

import { getDate } from "@/src/commons/libraries/utils/dateUtile";
import { useMoveToPage } from "../../../../commons/hooks/customs/useMoveToPage";
import { BLB } from "./BoardListBody.styles";
import { IBoardListBodyProps } from "./BoardListBody.types";

export default function BoardListBody(props: IBoardListBodyProps) {
  // 페이지 이동을 위한 커스텀 훅입니다.
  const { onClickMoveToPage } = useMoveToPage();

  return (
    <>
      <BLB.TableTop />
      {/* 테이블 헤더 부분 */}
      <BLB.Row>
        <BLB.ColumnHeaderBasic>ID</BLB.ColumnHeaderBasic>
        <BLB.ColumnHeaderTitle>제목</BLB.ColumnHeaderTitle>
        <BLB.ColumnHeaderBasic>작성자</BLB.ColumnHeaderBasic>
        <BLB.ColumnHeaderBasic>날짜</BLB.ColumnHeaderBasic>
      </BLB.Row>
      {/* props로 받은 데이터를 map으로 순회하며 각 행을 렌더링합니다. */}
      {props.data?.fetchBoards.map((el) => (
        <BLB.Row key={el._id}>
          {/* ID는 뒤 4자리만 잘라서 대문자로 보여줍니다. */}
          <BLB.ColumnBasic>
            {String(el._id).slice(-4).toUpperCase()}
          </BLB.ColumnBasic>
          <BLB.ColumnTitle
            id={el._id}
            onClick={onClickMoveToPage(`/boards/${el._id}`)} // 제목 클릭 시 상세 페이지로 이동합니다.
            style={{ cursor: "pointer" }}
          >
            {/* 검색어 하이라이팅 로직 */}
            {el.title
              // 1. 제목(el.title)에서 검색어(props.keyword)를 찾아 `@#$%`라는 특수문자로 감쌉니다.
              .replaceAll(props.keyword, `@#$%${props.keyword}@#$%`)
              // 2. 특수문자를 기준으로 문자열을 쪼개 배열로 만듭니다.
              .split("@#$%")
              // 3. 배열을 순회하며 각 부분을 렌더링합니다.
              .map((el, index) => (
                // 4. 만약 현재 텍스트 조각이 검색어와 일치한다면 isMatched={true} props를 전달하여 다른 스타일(색상 등)을 적용합니다.
                <BLB.TextToken
                  key={`${el}-${index}`}
                  isMatched={props.keyword === el}
                >
                  {el}
                </BLB.TextToken>
              ))}
          </BLB.ColumnTitle>
          <BLB.ColumnBasic>{el.writer}</BLB.ColumnBasic>
          <BLB.ColumnBasic>{getDate(el.createdAt)}</BLB.ColumnBasic>
        </BLB.Row>
      ))}
      <BLB.TableBottom />
    </>
  );
}
