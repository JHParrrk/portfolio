import { BCW } from "./BoardCommentWrite.styles";
import type { IBoardCommentWriteUIProps } from "./BoardCommentWrite.types";

export default function BoardCommentWriteUI({
  isEdit,
  el, // 계속 올라가 보면 디폴트밸류를 받기 위해서 필요
  register,
  watch,
  onClickWrite,
  onClickUpdate,
  handleRateChange,
  onClickCancel,
  errors,
  isValid,
}: IBoardCommentWriteUIProps): JSX.Element {
  return (
    <BCW.CustomBody>
      <BCW.Wrapper>
        {/* {isEdit === false && (
          <>
            <BCW.PencilIcon src="/images/boardComment/write/pencil.png" />
            <span>댓글</span>
          </>
        )} 댓글 좌상단에 떠야하는데 안뜸 isEdit가 언디파인드*/}
        <BCW.InputWrapper>
          <BCW.MainWrapper>
            <BCW.Input
              placeholder="작성자"
              {...register("writer", { required: "작성자를 입력해주세요." })}
              defaultValue={el?.writer ?? ""}
              readOnly={isEdit}
            />
            {errors.writer && <span>{errors.writer.message}</span>}
            <BCW.Input
              type="password"
              placeholder="비밀번호"
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}
            <BCW.Star defaultValue={3} onChange={handleRateChange} />
          </BCW.MainWrapper>
          {isEdit === true && (
            <>
              <BCW.CancelIcon
                src="/images/boardComment/list/option_delete_icon.png"
                onClick={onClickCancel}
              />
            </>
          )}
        </BCW.InputWrapper>
        <BCW.ContentsWrapper>
          <BCW.Contents
            maxLength={100}
            {...register("contents", { required: "내용을 입력해주세요." })}
            defaultValue={el?.contents ?? ""}
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          />
          {errors.contents && <span>{errors.contents.message}</span>}
          <BCW.BottomWrapper>
            <BCW.ContentsLength>
              {watch("contents")?.length ?? el?.contents.length ?? 0}/100
            </BCW.ContentsLength>
            <BCW.Button
              onClick={isEdit === true ? onClickUpdate : onClickWrite}
              disabled={!isValid}
            >
              {isEdit === true ? "수정하기" : "등록하기"}
            </BCW.Button>
          </BCW.BottomWrapper>
        </BCW.ContentsWrapper>
      </BCW.Wrapper>
    </BCW.CustomBody>
  );
}
