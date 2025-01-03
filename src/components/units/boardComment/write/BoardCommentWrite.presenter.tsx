import { BCW } from "./BoardCommentWrite.styles";
import { IBoardCommentWriteUIProps } from "./BoardCommentWrite.types";

export default function BoardCommentWriteUI(props: IBoardCommentWriteUIProps) {
  return (
    <BCW.Custombody>
      <BCW.Wrapper>
        <>
          <BCW.PencilIcon src="/images/boardComment/write/pencil.png" />
          <span>댓글</span>
        </>
        <BCW.InputWrapper>
          <BCW.Input placeholder="작성자" onChange={props.onChangeWriter} />
          <BCW.Input
            type="password"
            placeholder="비밀번호"
            onChange={props.onChangePassword}
          />
        </BCW.InputWrapper>
        <BCW.ContentsWrapper>
          <BCW.Contents
            maxLength={100}
            onChange={props.onChangeContents}
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          />
          <BCW.BottomWrapper>
            <BCW.ContentsLength>{props.contents.length}/100</BCW.ContentsLength>
            <BCW.Button onClick={props.onClickWrite}>등록하기</BCW.Button>
          </BCW.BottomWrapper>
        </BCW.ContentsWrapper>
      </BCW.Wrapper>
    </BCW.Custombody>
  );
}
