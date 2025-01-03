import { getDate } from "../../../../commons/libraries/utils";
import { BCL } from "./BoardCommentList.styles";
import { IBoardCommentListUIProps } from "./BoardCommentList.types";

export default function BoardCommentListUI(props: IBoardCommentListUIProps) {
  return (
    <div>
      {props.data?.fetchBoardComments.map((el) => (
        <BCL.Custombody>
          <BCL.ItemWrapper>
            <BCL.FlexWrapper>
              <BCL.Avatar src="/images/avatar.png" />
              <BCL.MainWrapper>
                <BCL.WriterWrapper>
                  <BCL.Writer>{el.writer}</BCL.Writer>
                </BCL.WriterWrapper>
                <BCL.Contents>{el.contents}</BCL.Contents>
              </BCL.MainWrapper>
              <BCL.OptionWrapper>
                <BCL.UpdateIcon src="/images/boardComment/list/option_update_icon.png/" />
                <BCL.DeleteIcon
                  id={el._id}
                  src="/images/boardComment/list/option_delete_icon.png/"
                  onClick={props.onClickDelete}
                />
              </BCL.OptionWrapper>
            </BCL.FlexWrapper>
            <BCL.DateString>{getDate(el?.createdAt)}</BCL.DateString>
          </BCL.ItemWrapper>
        </BCL.Custombody>
      ))}
    </div>
  );
}
