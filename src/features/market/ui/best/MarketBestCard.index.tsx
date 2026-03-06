import { useMoveToPage } from '@/shared/hooks/customs/useMoveToPage';
import { IQuery } from '@/shared/types/generated/types';
import { MBC } from '@/features/market/ui/best/MarketBestCard.css'; //

interface IMarketBestProps {
  data: Pick<IQuery, 'fetchUseditemsOfTheBest'>;
}

export default function MarketBest(props: IMarketBestProps): JSX.Element {
  const { onClickMoveToPage } = useMoveToPage();

  return (
    <div className={MBC.Wrapper}>
      <h2 className={MBC.Title}>🔥 베스트 상품</h2>
      <div className={MBC.List}>
        {props.data?.fetchUseditemsOfTheBest.map((item) => {
          const imageUrl = item.images?.[0]
            ? `https://storage.googleapis.com/${item.images[0]}`
            : '/images/no-image-placeholder.png';

          return (
            <div
              className={MBC.ItemCard}
              key={item._id}
              onClick={onClickMoveToPage(`/market/${item._id}`)}
            >
              <div className={MBC.ImageWrapper}>
                <img className={MBC.ItemImage} src={imageUrl} alt={item.name} />
              </div>
              <div className={MBC.InfoWrapper}>
                <p className={MBC.Name}>{item.name}</p>
                <p className={MBC.Remarks}>{item.remarks}</p>
                <div className={MBC.BottomWrapper}>
                  <p className={MBC.Price}>{item.price?.toLocaleString()}원</p>
                  <div className={MBC.LikesWrapper}>
                    <span>💛</span>
                    <span>{item.pickedCount}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
