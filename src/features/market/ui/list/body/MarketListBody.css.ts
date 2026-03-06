import { style } from '@vanilla-extract/css';

export const MLB = {
  Wrapper: style({
    borderBottom: '1px solid #e0e0e0',
  }),

  // 각 상품 아이템을 감싸는 행
  ItemWrapper: style({
    display: 'flex',
    alignItems: 'center',
    padding: '20px 10px',
    borderTop: '1px solid #e0e0e0',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    selectors: {
      '&:first-of-type': {
        borderTop: 'none',
      },
      '&:hover': {
        backgroundColor: '#fafafa',
      },
    },
  }),

  // 상품 이미지
  ItemImage: style({
    width: '160px',
    height: '160px',
    objectFit: 'cover',
    border: '1px solid #f0f0f0',
    borderRadius: '8px',
    marginRight: '24px',
  }),

  // 이미지가 없을 때 보여줄 플레이스홀더
  ImagePlaceholder: style({
    width: '160px',
    height: '160px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    marginRight: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#bdbdbd',
    fontSize: '14px',
  }),

  // --- ✨ "결과 없음" 메시지를 위한 스타일 컴포넌트 추가 ✨ ---
  NoResults: style({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '705px',
    fontSize: '18px',
    color: '#bdbdbd',
  }),
  InfoWrapper: style({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  }),
  ItemName: style({
    fontSize: '24px',
    fontWeight: 500,
    margin: 0,
  }),
  ItemRemarks: style({
    fontSize: '16px',
    color: '#4f4f4f',
    margin: '4px 0 0',
  }),
  ItemTags: style({
    fontSize: '14px',
    color: '#bdbdbd',
    marginTop: '8px',
  }),
  SellerInfo: style({
    display: 'flex',
    alignItems: 'center',
    marginTop: '24px',
    fontSize: '16px',
    color: '#4f4f4f',
  }),
  SellerName: style({
    marginLeft: '6px',
  }),
  PickedCount: style({
    marginLeft: '20px',
    color: '#ffd600',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  }),
  ItemPrice: style({
    fontSize: '24px',
    fontWeight: 700,
    textAlign: 'right',
  }),
  TextToken: style({
    // style={{ color: isMatched ? "orange" : "inherit" }} 로 대체
  }),
};
