// MarketListBody.tsx
import { useMoveToPage } from "../../../../commons/hooks/customs/useMoveToPage";
import { IUseditem } from "@/src/commons/types/generated/types";
import { MLB } from "./MarketListBody.styles";
import { IMarketListBodyProps } from "./MarketListBody.types";

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
    <MLB.Wrapper>
      {/* --- ✨ 조건부 렌더링 로직 추가 ✨ --- */}
      {hasData ? (
        // 데이터가 있을 경우: 아이템 목록을 렌더링
        props.data?.fetchUseditems.map((el: IUseditem) => (
          <MLB.ItemWrapper
            key={el._id}
            onClick={onClickMoveToPage(`/market/${el._id}`)}
          >
            {/* 상품 이미지 */}
            {el.images?.[0] ? (
              <MLB.ItemImage
                src={`https://storage.googleapis.com/${el.images[0]}`}
              />
            ) : (
              <MLB.ImagePlaceholder>No Image</MLB.ImagePlaceholder>
            )}

            {/* 상품 정보 */}
            <MLB.InfoWrapper>
              <MLB.ItemName>
                {/* 검색어 하이라이팅 로직 */}
                {props.keyword && el.name.includes(props.keyword)
                  ? el.name
                      .replaceAll(props.keyword, `@#$%${props.keyword}@#$%`)
                      .split("@#$%")
                      .map((text, index) => (
                        <MLB.TextToken
                          key={`${text}-${index}`}
                          isMatched={props.keyword === text}
                        >
                          {text}
                        </MLB.TextToken>
                      ))
                  : el.name}
              </MLB.ItemName>
              <MLB.ItemRemarks>{el.remarks}</MLB.ItemRemarks>
              <MLB.ItemTags>{el.tags?.join(" ")}</MLB.ItemTags>
              <MLB.SellerInfo>
                <SellerIcon />
                <MLB.SellerName>{el.seller?.name ?? "판매자"}</MLB.SellerName>
                <MLB.PickedCount>
                  <HeartIcon />
                  {el.pickedCount}
                </MLB.PickedCount>
              </MLB.SellerInfo>
            </MLB.InfoWrapper>

            {/* 상품 가격 */}
            <MLB.ItemPrice>{el.price?.toLocaleString() ?? 0}원</MLB.ItemPrice>
          </MLB.ItemWrapper>
        ))
      ) : (
        // 데이터가 없을 경우: "결과 없음" 메시지를 렌더링
        <MLB.NoResults>검색된 상품이 없습니다.</MLB.NoResults>
      )}
    </MLB.Wrapper>
  );
}
