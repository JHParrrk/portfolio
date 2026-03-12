import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

/**
 * BFF (Backend For Frontend) Example Component
 *
 * This component fetches data from our internal Next.js API route (/api/market/bff-example).
 * The complex logic and raw data formatting are handled on the server.
 */

interface IBFFItem {
  id: string;
  title: string;
  summary: string;
  priceTag: string;
  thumbnail: string;
  sellerName: string;
  isHot: boolean;
}

const Container = styled.div`
  padding: 24px;
  background-color: #f9f9f9;
  border-radius: 12px;
  margin: 20px 0;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const ItemCard = styled.div`
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const ImageBox = styled.div<{ src: string }>`
  height: 200px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const HotBadge = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff4d4f;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
`;

const Content = styled.div`
  padding: 16px;
`;

const ItemTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemSummary = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
  height: 40px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f0f0f0;
  padding-top: 12px;
`;

const Price = styled.span`
  font-weight: bold;
  color: #1890ff;
  font-size: 16px;
`;

const Seller = styled.span`
  font-size: 12px;
  color: #999;
`;

export default function MarketBFFExample() {
  const [items, setItems] = useState<IBFFItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBFFData = async () => {
      try {
        // Fetch from internal proxy API route
        const response = await fetch('/api/market/bff-example?page=1');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Failed to fetch BFF data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBFFData();
  }, []);

  if (isLoading) return <div>Loading BFF Data...</div>;

  return (
    <Container>
      <Title>Market BFF Pattern Example (Next.js API Routes)</Title>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        This data is pre-formatted by our Next.js server proxy. The client
        receives only the essential UI-friendly fields.
      </p>

      <ItemGrid>
        {items.map((item) => (
          <ItemCard key={item.id}>
            <ImageBox src={item.thumbnail}>
              {item.isHot && <HotBadge>HOT</HotBadge>}
            </ImageBox>
            <Content>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemSummary>{item.summary}</ItemSummary>
              <Footer>
                <Price>{item.priceTag}</Price>
                <Seller>Seller: {item.sellerName}</Seller>
              </Footer>
            </Content>
          </ItemCard>
        ))}
      </ItemGrid>
    </Container>
  );
}
