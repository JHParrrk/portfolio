import { BCW } from "./BoardCommentWrite.styles";
import { IBoardCommentWriteUIProps } from "./BoardCommentWrite.types";

export default function BoardCommentWriteUI(props: IBoardCommentWriteUIProps) {
  const { onClickWrite, register, errors, contents, setValue } = props; // setValue 추가

  const handleRateChange = (value: number) => {
    setValue("rating", value);
  };

  return (
    <BCW.Custombody>
      <BCW.Wrapper>
        <>
          <BCW.PencilIcon src="/images/boardComment/write/pencil.png" />
          <span>댓글</span>
        </>
        <form onSubmit={onClickWrite}>
          <BCW.InputWrapper>
            <BCW.Input
              placeholder="작성자"
              {...register("writer", {
                required: "작성자를 입력해주세요.",
              })}
            />
            {errors.writer && <p>{errors.writer.message}</p>}
            <BCW.Input
              type="password"
              placeholder="비밀번호"
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
              })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </BCW.InputWrapper>
          <BCW.ContentsWrapper>
            <BCW.Contents
              maxLength={100}
              {...register("contents", {
                required: "내용을 입력해주세요.",
              })}
              placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
            />
            {errors.contents && <p>{errors.contents.message}</p>}
            {/* <BCW.StyledRate
              allowHalf // 반 점 허용
              defaultValue={3} // 초기 별점 값
              count={5} // 총 5개의 별
              onChange={handleRateChange} // 별점 변경 시 호출되는 함수
            /> */}
            <BCW.BottomWrapper>
              <BCW.ContentsLength>{contents.length}/100</BCW.ContentsLength>
              <BCW.Button type="submit">등록하기</BCW.Button>
            </BCW.BottomWrapper>
          </BCW.ContentsWrapper>
        </form>
      </BCW.Wrapper>
    </BCW.Custombody>
  );
}
