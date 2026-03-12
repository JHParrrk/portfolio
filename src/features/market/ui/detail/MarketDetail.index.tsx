import styled from '@emotion/styled';
import MarketDetailBody from './body/MarketDetailBody.index';
import MarketDetailHeader from './header/MarketDetailHeader.index';
import MarketDetailFooter from './footer/MarketDetailFooter.index';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function MarketDetail() {
  return (
    <Wrapper>
      <MarketDetailHeader />
      <MarketDetailBody />
      <MarketDetailFooter />
    </Wrapper>
  );
}
