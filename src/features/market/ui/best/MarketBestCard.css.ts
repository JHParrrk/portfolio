import { style } from '@vanilla-extract/css';

export const MBC = {
  Wrapper: style({
    width: '100%',
    margin: '80px 0',
  }),

  Title: style({
    fontSize: '28px',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: '40px',
  }),

  List: style({
    display: 'flex',
    justifyContent: 'center',
    gap: '24px',
    flexWrap: 'wrap' /* 화면이 작아지면 줄바꿈 처리 */,
  }),

  ItemCard: style({
    width: '280px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    overflow: 'hidden',

    ':hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.12)',
    },
  }),

  ImageWrapper: style({
    width: '100%',
    height: '280px',
    backgroundColor: '#f5f5f5',
  }),

  ItemImage: style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }),

  InfoWrapper: style({
    padding: '20px 16px',
  }),

  Name: style({
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '4px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),

  Remarks: style({
    fontSize: '14px',
    color: '#888',
    marginBottom: '16px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),

  BottomWrapper: style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),

  Price: style({
    fontSize: '20px',
    fontWeight: 700,
  }),

  LikesWrapper: style({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
  }),
};
