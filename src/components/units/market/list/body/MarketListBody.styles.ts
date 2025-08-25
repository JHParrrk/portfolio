import styled from "@emotion/styled";
import { ITextTokenProps } from "./MarketListBody.types";

export const MLB = {
  Wrapper: styled.div`
    border-bottom: 1px solid #e0e0e0; /* 목록 전체의 하단 테두리 */
  `,

  // 각 상품 아이템을 감싸는 행
  ItemWrapper: styled.div`
    display: flex;
    align-items: center;
    padding: 20px 10px;
    border-top: 1px solid #e0e0e0;
    cursor: pointer;
    transition: background-color 0.2s;

    &:first-of-type {
      border-top: none; /* 첫 아이템의 상단 테두리는 제거 */
    }

    &:hover {
      background-color: #fafafa;
    }
  `,

  // 상품 이미지
  ItemImage: styled.img`
    width: 160px; /* 가로 크기를 160px로 고정 */
    height: 160px; /* 세로 크기를 160px로 고정 */
    object-fit: cover; /* 이미지가 영역에 맞게 잘리도록 설정 */
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    margin-right: 24px;
  `,

  // 이미지가 없을 때 보여줄 플레이스홀더
  ImagePlaceholder: styled.div`
    width: 160px; /* 이전 코드에 변수가 없어서 그대로 둡니다. */
    height: 160px; /* 필요하다면 var(--item-image-height)로 변경 가능합니다. */
    background-color: #f0f0f0;
    border-radius: 8px;
    margin-right: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #bdbdbd;
    font-size: 14px;
  `,

  // --- ✨ "결과 없음" 메시지를 위한 스타일 컴포넌트 추가 ✨ ---
  NoResults: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 705px; /* 스크롤 영역과 동일한 높이로 설정 */
    font-size: 18px;
    color: #bdbdbd;
  `,
  InfoWrapper: styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `,
  ItemName: styled.h2`
    font-size: 24px;
    font-weight: 500;
    margin: 0;
  `,
  ItemRemarks: styled.p`
    font-size: 16px;
    color: #4f4f4f;
    margin: 4px 0 0;
  `,
  ItemTags: styled.div`
    font-size: 14px;
    color: #bdbdbd;
    margin-top: 8px;
  `,
  SellerInfo: styled.div`
    display: flex;
    align-items: center;
    margin-top: 24px;
    font-size: 16px;
    color: #4f4f4f;
  `,
  SellerName: styled.span`
    margin-left: 6px;
  `,
  PickedCount: styled.span`
    margin-left: 20px;
    color: #ffd600;
    display: flex;
    align-items: center;
    gap: 6px;
  `,
  ItemPrice: styled.div`
    font-size: 24px;
    font-weight: 700;
    text-align: right;
  `,
  TextToken: styled.span`
    color: ${(props: ITextTokenProps) =>
      props.isMatched ? "orange" : "inherit"};
  `,
};
