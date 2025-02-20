import { getDate } from "../../../../commons/libraries/utils";
import { BL } from "./BoardList.styles";
import { IBoardListUIProps } from "./BoardList.types";
import Paginations01 from "../../../commons/paginations/01/Paginations01.container";
import Searchbars01, {
  highLightText,
} from "../../../commons/searchbars/01/Searchbars01.container";

export default function BoardListUI(props: IBoardListUIProps) {
  const {
    data,
    onClickMoveToBoardNew,
    onClickMoveToBoardDetail,
    refetch,
    count,
    refetchBoardsCount,
    keyword,
    onChangeKeyword,
  } = props;

  return (
    <BL.Custombody>
      <BL.Wrapper>
        <Searchbars01
          refetch={refetch}
          refetchBoardsCount={refetchBoardsCount}
          onChangeKeyword={onChangeKeyword}
        />
        <BL.TableTop />
        <BL.Row>
          <BL.ColumnHeaderBasic>ID</BL.ColumnHeaderBasic>
          <BL.ColumnHeaderTitle>제목</BL.ColumnHeaderTitle>
          <BL.ColumnHeaderBasic>작성자</BL.ColumnHeaderBasic>
          <BL.ColumnHeaderBasic>날짜</BL.ColumnHeaderBasic>
        </BL.Row>
        {data?.fetchBoards.map((el) => (
          <BL.Row key={el._id}>
            <BL.ColumnBasic>
              {String(el._id).slice(-4).toUpperCase()}
              {/* BL.ColumnBasic 컴포넌트를 사용하여 ID를 렌더링 ID의 
            마지막 4글자를 대문자로 변환하여 표시 */}
            </BL.ColumnBasic>
            <BL.ColumnTitle id={el._id} onClick={onClickMoveToBoardDetail}>
              {highLightText(el.title, keyword)}
            </BL.ColumnTitle>
            <BL.ColumnBasic>{el.writer}</BL.ColumnBasic>
            <BL.ColumnBasic>{getDate(el.createdAt)}</BL.ColumnBasic>
          </BL.Row>
        ))}
        <BL.TableBottom />
        <BL.Footer>
          <Paginations01 refetch={refetch} count={count} />
          <BL.Button onClick={onClickMoveToBoardNew}>
            <BL.PencilIcon src="/images/board/list/write.png" />
            게시물 등록하기
          </BL.Button>
        </BL.Footer>
      </BL.Wrapper>
    </BL.Custombody>
  );
}
