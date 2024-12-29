import { BD } from "./BoardDetail.styles";

export default function BoardDetailUI(props) {
  const { data, onClickDelete, onClickList } = props;

  return (
    <BD.Custombody>
      <BD.Wrapper>
        <BD.CardWrapper>
          <BD.Header>
            <BD.AvatarWrapper>
              <BD.Avatar src="/images/avatar.png" />
              <BD.Info>
                <BD.Writer>{data?.fetchBoard?.writer}</BD.Writer>
                <BD.CreatedAt>{data?.fetchBoard?.createdAt}</BD.CreatedAt>
              </BD.Info>
            </BD.AvatarWrapper>
          </BD.Header>
          <BD.Body>
            <BD.Title>{data?.fetchBoard?.title}</BD.Title>
            <BD.Contents>{data?.fetchBoard?.contents}</BD.Contents>
          </BD.Body>
        </BD.CardWrapper>
        <BD.BottomWrapper>
          <BD.Button onClick={onClickList}>목록으로</BD.Button>
          <BD.Button>수정하기</BD.Button>
          <BD.Button onClick={onClickDelete}>삭제하기</BD.Button>
        </BD.BottomWrapper>
      </BD.Wrapper>
    </BD.Custombody>
  );
}
