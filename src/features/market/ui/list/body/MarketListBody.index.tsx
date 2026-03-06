// MarketListBody.tsx
import { useMoveToPage } from '@/shared/hooks/customs/useMoveToPage';
import { IUseditem } from '@/shared/types/generated/types';
import { MLB } from './MarketListBody.css';
import { IMarketListBodyProps } from './MarketListBody.types';

// 아이콘은 간단한 컴포넌트로 분리하거나 직접 사용
const SellerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#828282">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);
const HeartIcon = () => <>💛</>;

export default function MarketListBody(props: IMarketListBodyProps) {
  const { onClickMoveToPage } = useMoveToPage();
  const hasData = (props.data?.fetchUseditems.length ?? 0) > 0;

  return (
    <div className={MLB.Wrapper}>
      {/* --- ✨ 조건부 렌더링 로직 추가 ✨ --- */}
      {hasData ? (
        // 데이터가 있을 경우: 아이템 목록을 렌더링
        props.data?.fetchUseditems.map((el: IUseditem) => (
          <div
            key={el._id}
            className={MLB.ItemWrapper}
            onClick={onClickMoveToPage(`/market/${el._id}`)}
          >
            {/* 상품 이미지 */}
            {el.images?.[0] ? (
              <img
                className={MLB.ItemImage}
                src={`https://storage.googleapis.com/${el.images[0]}`}
              />
            ) : (
              <div className={MLB.ImagePlaceholder}>No Image</div>
            )}

            {/* 상품 정보 */}
            <div className={MLB.InfoWrapper}>
              <h2 className={MLB.ItemName}>
                {/* 검색어 하이라이팅 로직 */}
                {props.keyword && el.name.includes(props.keyword)
                  ? el.name
                      .replaceAll(props.keyword, `@#$%${props.keyword}@#$%`)
                      .split('@#$%')
                      .map((text, index) => (
                        <span
                          key={`${text}-${index}`}
                          className={MLB.TextToken}
                          style={{
                            color:
                              props.keyword === text ? 'orange' : 'inherit',
                          }}
                        >
                          {text}
                        </span>
                      ))
                  : el.name}
              </h2>
              <p className={MLB.ItemRemarks}>{el.remarks}</p>
              <div className={MLB.ItemTags}>{el.tags?.join(' ')}</div>
              <div className={MLB.SellerInfo}>
                <SellerIcon />
                <span className={MLB.SellerName}>
                  {el.seller?.name ?? '판매자'}
                </span>
                <span className={MLB.PickedCount}>
                  <HeartIcon />
                  {el.pickedCount}
                </span>
              </div>
            </div>

            {/* 상품 가격 */}
            <div className={MLB.ItemPrice}>
              {el.price?.toLocaleString() ?? 0}원
            </div>
          </div>
        ))
      ) : (
        // 데이터가 없을 경우: "결과 없음" 메시지를 렌더링
        <div className={MLB.NoResults}>검색된 상품이 없습니다.</div>
      )}
    </div>
  );
}
