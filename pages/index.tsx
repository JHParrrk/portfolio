import Head from 'next/head';
import Image from 'next/image';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useQueryFetchUserLoggedIn } from '@/shared/hooks/queries/useQueryFetchUserLoggedIn';
import { useQueryFetchBoardsOfTheBest } from '@/shared/hooks/queries/useQueryFetchBoardsOfTheBest';
import { useQueryFetchUsedItemsOfTheBest } from '@/shared/hooks/queries/useQueryFetchUsedItemsOfTheBest';

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: var(--font-noto-sans-kr), sans-serif;
`;

const GreetingSection = styled.div`
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  border-radius: 16px;
  padding: 40px;
  color: white;
  margin-bottom: 60px;
  box-shadow: 0 10px 20px rgba(253, 160, 133, 0.2);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

const SubText = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
`;

const SectionContainer = styled.section`
  margin-bottom: 60px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #333;
  }
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  color: #888;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #ff5722;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
`;

const CardImagePlaceholder = styled.div`
  width: 100%;
  height: 160px;
  background-color: #f0f0f0;
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  overflow: hidden;
  position: relative;

  img {
    object-fit: cover;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #666;
`;

export default function Home() {
  const router = useRouter();
  const { data: userData } = useQueryFetchUserLoggedIn();
  const { data: boardsData } = useQueryFetchBoardsOfTheBest();
  const { data: marketData } = useQueryFetchUsedItemsOfTheBest();

  const user = userData?.fetchUserLoggedIn;
  const bestBoards = boardsData?.fetchBoardsOfTheBest || [];
  const bestItems = marketData?.fetchUseditemsOfTheBest || [];

  return (
    <>
      <Head>
        <title>NextMarket - 메인</title>
        <meta name="description" content="NextMarket Main Page" />
      </Head>
      <Wrapper>
        <GreetingSection>
          <Title>
            {user
              ? `환영합니다, ${user.name}님!`
              : 'NextMarket에 오신 것을 환영합니다!'}
          </Title>
          <SubText>
            {user
              ? `현재 보유 포인트: ${user.userPoint?.amount?.toLocaleString() || 0} P`
              : '로그인하고 다양한 중고 거래와 커뮤니티를 즐겨보세요.'}
          </SubText>
        </GreetingSection>

        <SectionContainer>
          <SectionHeader>
            <h2>🔥 베스트 중고상품</h2>
            <MoreButton onClick={() => router.push('/market')}>
              더보기 &gt;
            </MoreButton>
          </SectionHeader>
          <Grid>
            {bestItems.slice(0, 4).map((item) => (
              <Card
                key={item._id}
                onClick={() => router.push(`/market/${item._id}`)}
              >
                <CardImagePlaceholder>
                  {item.images?.[0] ? (
                    <Image
                      src={`https://storage.googleapis.com/${item.images[0]}`}
                      alt={item.name}
                      fill
                      sizes="100%"
                    />
                  ) : (
                    'No Image'
                  )}
                </CardImagePlaceholder>
                <CardTitle>{item.name}</CardTitle>
                <CardInfo>
                  <span style={{ color: '#ff5722', fontWeight: 'bold' }}>
                    {item.price?.toLocaleString()}원
                  </span>
                  <span>💛 {item.pickedCount}</span>
                </CardInfo>
              </Card>
            ))}
            {bestItems.length === 0 && <p>베스트 상품이 없습니다.</p>}
          </Grid>
        </SectionContainer>

        <SectionContainer>
          <SectionHeader>
            <h2>🗣 활발한 자유게시판</h2>
            <MoreButton onClick={() => router.push('/boards')}>
              더보기 &gt;
            </MoreButton>
          </SectionHeader>
          <Grid>
            {bestBoards.slice(0, 4).map((board) => (
              <Card
                key={board._id}
                onClick={() => router.push(`/boards/${board._id}`)}
              >
                <CardTitle>{board.title}</CardTitle>
                <CardInfo style={{ marginTop: '16px' }}>
                  <span>작성자: {board.writer || '익명'}</span>
                  <span>👍 {board.likeCount}</span>
                </CardInfo>
              </Card>
            ))}
            {bestBoards.length === 0 && <p>베스트 게시글이 없습니다.</p>}
          </Grid>
        </SectionContainer>
      </Wrapper>
    </>
  );
}
