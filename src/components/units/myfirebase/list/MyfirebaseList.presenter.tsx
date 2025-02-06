import { MFBL } from "./MyfirebaseList.styles";
import type { IMyfirebaseListUIProps } from "./MyfirebaseList.types";
import { v4 as uuidv4 } from "uuid";

export default function MyfirebaseListUI(
  props: IMyfirebaseListUIProps
): JSX.Element {
  return (
    <MFBL.CustomBody>
      <MFBL.Wrapper>
        <MFBL.Row>
          <MFBL.ColumnHeaderBasic>번호</MFBL.ColumnHeaderBasic>
          <MFBL.ColumnHeaderBasic>제목</MFBL.ColumnHeaderBasic>
          <MFBL.ColumnHeaderTitle>내용</MFBL.ColumnHeaderTitle>
          <MFBL.ColumnHeaderBasic>작성자</MFBL.ColumnHeaderBasic>
        </MFBL.Row>
        {props.dataBoards?.map((el: any, index: number) => (
          <MFBL.Row key={uuidv4()}>
            <MFBL.ColumnBasic>{index + 1}</MFBL.ColumnBasic>
            <MFBL.ColumnBasic>{el.title}</MFBL.ColumnBasic>
            <MFBL.ColumnTitle>{el.contents}</MFBL.ColumnTitle>
            <MFBL.ColumnBasic>{el.writer}</MFBL.ColumnBasic>
          </MFBL.Row>
        ))}
        <MFBL.Button onClick={props.onClickMoveToBoardNew}>
          <MFBL.PencilIcon src="/images/board/list/write.png" />
          게시물 등록하기
        </MFBL.Button>
      </MFBL.Wrapper>
    </MFBL.CustomBody>
  );
}
