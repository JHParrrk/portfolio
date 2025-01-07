import { getDate } from "../../../../commons/libraries/utils"; // 유틸리티 함수 getDate를 가져옵니다.
import { BCL } from "./BoardCommentList.styles"; // 스타일 컴포넌트를 가져옵니다.
import { IBoardCommentListUIProps } from "./BoardCommentList.types"; // 타입 정의를 가져옵니다.

export default function BoardCommentListUI(props: IBoardCommentListUIProps) {
  // BoardCommentListUI 컴포넌트를 정의합니다.
  const {
    data,
    onClickDelete,
    register,
    errors,
    isEditing,
    handleEditClick,
    handleCancelClick,
    handleSaveClick,
    handleRateChange,
  } = props; // props를 구조 분해 할당으로 가져옵니다.

  return (
    <div>
      {data?.fetchBoardComments.map((el) => (
        <BCL.Custombody key={el._id}>
          <BCL.ItemWrapper>
            <BCL.FlexWrapper>
              <BCL.Avatar src="/images/avatar.png" />
              {/* 아바타 이미지를 렌더링합니다. */}
              <BCL.MainWrapper>
                <BCL.WriterWrapper>
                  <BCL.Writer>{el.writer}</BCL.Writer>
                  {/* 작성자를 표시합니다. */}
                  <BCL.StyledRate value={el.rating} disabled />
                  {/* 별점을 표시합니다. */}
                </BCL.WriterWrapper>
                <BCL.Contents>{el.contents}</BCL.Contents>
                {/* 댓글 내용을 표시합니다. */}
              </BCL.MainWrapper>
              <BCL.OptionWrapper>
                <BCL.SaveIcon
                  id={el._id}
                  src="/images/boardComment/list/option_update_icon.png"
                  onClick={() => handleEditClick(el._id, el.contents)} // 수정 아이콘 클릭 시 handleEditClick 함수 호출
                />
                <BCL.DeleteIcon
                  id={el._id}
                  src="/images/boardComment/list/option_delete_icon.png"
                  onClick={onClickDelete} // 삭제 아이콘 클릭 시 onClickDelete 함수 호출
                />
              </BCL.OptionWrapper>
            </BCL.FlexWrapper>
            <BCL.DateString>{getDate(el.createdAt)}</BCL.DateString>
            {/* 댓글 작성 날짜를 표시합니다. */}
          </BCL.ItemWrapper>
          {isEditing === el._id && (
            <BCL.ItemWrapper>
              {/* 댓글 수정 폼을 표시합니다. */}
              <BCL.FlexWrapper>
                <BCL.MainWrapper>
                  <BCL.WriterWrapper>
                    <BCL.Writer>{el.writer}</BCL.Writer>
                    <input
                      type="password"
                      placeholder="비밀번호를 입력해주세요."
                      {...register("password", { required: true })}
                      style={{ marginLeft: "10px" }}
                    />
                    <BCL.StyledRate
                      onChange={handleRateChange}
                    />
                    {/* 별점을 표시합니다. */}
                  </BCL.WriterWrapper>
                  <BCL.Contents>
                    <input
                      type="text"
                      placeholder="내용을 적어주세요."
                      {...register("contents", { required: true })}
                    />
                  </BCL.Contents>
                  {errors.contents && <span>{errors.contents.message}</span>}
                  {errors.password && <span>{errors.password.message}</span>}
                </BCL.MainWrapper>
                <BCL.OptionWrapper>
                  <BCL.UpdateIcon
                    id={el._id}
                    src="/images/boardComment/list/option_update_icon.png"
                    onClick={handleSaveClick} // 저장 아이콘 클릭 시 handleSaveClick 함수 호출
                  />
                  <BCL.CancelIcon
                    id={el._id}
                    src="/images/boardComment/list/option_delete_icon.png"
                    onClick={handleCancelClick} // 취소 아이콘 클릭 시 handleCancelClick 함수 호출
                  />
                </BCL.OptionWrapper>
              </BCL.FlexWrapper>
            </BCL.ItemWrapper>
          )}
        </BCL.Custombody>
      ))}
    </div>
  );
}
