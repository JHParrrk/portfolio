import { MFBL } from "./MyfirebaseList.css";
import type { IMyfirebaseListUIProps } from "./MyfirebaseList.types";
import { v4 as uuidv4 } from "uuid";

export default function MyfirebaseListUI(
  props: IMyfirebaseListUIProps
): JSX.Element {
  return (
    <div className={MFBL.CustomBody}>
      <div className={MFBL.Wrapper}>
        <div className={MFBL.Row}>
          <div className={MFBL.ColumnHeaderBasic}>번호</div>
          <div className={MFBL.ColumnHeaderBasic}>제목</div>
          <div className={MFBL.ColumnHeaderTitle}>내용</div>
          <div className={MFBL.ColumnHeaderBasic}>작성자</div>
        </div>
        {props.dataBoards?.map((el: any, index: number) => (
          <div className={MFBL.Row} key={uuidv4()}>
            <div className={MFBL.ColumnBasic}>{index + 1}</div>
            <div className={MFBL.ColumnBasic}>{el.title}</div>
            <div className={MFBL.ColumnTitle}>{el.contents}</div>
            <div className={MFBL.ColumnBasic}>{el.writer}</div>
          </div>
        ))}
        <button className={MFBL.Button} onClick={props.onClickMoveToBoardNew}>
          <img className={MFBL.PencilIcon} src="/images/board/list/write.png" />
          게시물 등록하기
        </button>
      </div>
    </div>
  );
}
