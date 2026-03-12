import styled from '@emotion/styled';
import BoardDetailBody from './body/BoardDetailBody.index';
import BoardDetailFooter from './footer/BoardDetailFooter.index';
import BoardDetailHeader from './header/BoardDetailHeader.index';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function BoardDetail() {
  return (
    <Wrapper>
      <BoardDetailHeader />
      <BoardDetailBody />
      <BoardDetailFooter />
    </Wrapper>
  );
}
