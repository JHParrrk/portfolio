import { useMoveToPage } from "@/src/components/commons/hooks/customs/useMoveToPage";
import { IQuery } from "@/src/commons/types/generated/types";
import { MBC } from "@/src/components/units/market/best/MarketBestCard.styles"; //

interface IMarketBestProps {
  data: Pick<IQuery, "fetchUseditemsOfTheBest">;
}

export default function MarketBest(props: IMarketBestProps): JSX.Element {
  const { onClickMoveToPage } = useMoveToPage();

  return (
    <MBC.Wrapper>
      <MBC.Title>🔥 베스트 상품</MBC.Title>
      <MBC.List>
        {props.data?.fetchUseditemsOfTheBest.map((item) => {
          const imageUrl = item.images?.[0]
            ? `https://storage.googleapis.com/${item.images[0]}`
            : "/images/no-image-placeholder.png";

          return (
            <MBC.ItemCard
              key={item._id}
              onClick={onClickMoveToPage(`/market/${item._id}`)}
            >
              <MBC.ImageWrapper>
                <MBC.ItemImage src={imageUrl} alt={item.name} />
              </MBC.ImageWrapper>
              <MBC.InfoWrapper>
                <MBC.Name>{item.name}</MBC.Name>
                <MBC.Remarks>{item.remarks}</MBC.Remarks>
                <MBC.BottomWrapper>
                  <MBC.Price>{item.price?.toLocaleString()}원</MBC.Price>
                  <MBC.LikesWrapper>
                    <span>💛</span>
                    <span>{item.pickedCount}</span>
                  </MBC.LikesWrapper>
                </MBC.BottomWrapper>
              </MBC.InfoWrapper>
            </MBC.ItemCard>
          );
        })}
      </MBC.List>
    </MBC.Wrapper>
  );
}
