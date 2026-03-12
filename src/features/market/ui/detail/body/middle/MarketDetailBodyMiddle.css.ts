import { style, globalStyle } from '@vanilla-extract/css';

export const MDBM = {
  Body: style({
    width: '100%',
    minHeight: '400px',
    backgroundColor: '#ffffff',
  }),

  Title: style({
    fontSize: '40px',
    fontWeight: '800',
    color: '#1a202c',
    lineHeight: '1.3',
    marginBottom: '8px',
    wordBreak: 'break-word',
    letterSpacing: '-1px',
    paddingTop: '20px',
  }),

  Remarks: style({
    fontSize: '18px',
    color: '#718096',
    marginBottom: '16px',
    fontWeight: '500',
  }),

  Price: style({
    fontSize: '36px',
    fontWeight: '800',
    color: '#3182ce',
    paddingBottom: '32px',
    borderBottom: '1px solid #edf2f7',
    width: '100%',
    marginBottom: '40px',
  }),

  Contents: style({
    paddingTop: '20px',
    paddingBottom: '60px',
    lineHeight: 1.8,
    color: '#2d3748',
    fontSize: '17px',
  }),

  Tags: style({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    paddingBottom: '40px',
    borderBottom: '1px solid #edf2f7',
    width: '100%',
  }),

  Tag: style({
    color: '#3182ce',
    fontSize: '14px',
    fontWeight: '600',
    backgroundColor: '#ebf8ff',
    padding: '6px 16px',
    borderRadius: '20px',
    transition: 'all 0.2s',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#bee3f8',
      transform: 'translateY(-2px)',
    },
  }),

  CarouselWrapper: style({
    width: '100%',
    maxWidth: '700px',
    margin: '40px auto',
    borderRadius: '16px',
    overflow: 'hidden',
  }),

  MainImageWrapper: style({
    position: 'relative',
    width: '100%',
    paddingTop: '100%',
    borderRadius: '16px',
    overflow: 'hidden',
    backgroundColor: '#f7fafc',
    boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
    border: '1px solid #edf2f7',
  }),

  Image: style({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    transition: 'transform 0.4s ease',
  }),

  ThumbnailSliderWrapper: style({
    marginTop: '16px',
  }),

  ThumbnailImageWrapper: style({
    cursor: 'pointer',
    border: '2px solid transparent',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'all 0.2s',
    opacity: 0.7,
    ':hover': {
      opacity: 1,
    },
  }),

  ThumbnailImage: style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  }),

  LikeWrapper: style({
    marginTop: '60px',
    paddingTop: '40px',
    borderTop: '1px solid #edf2f7',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '32px',
  }),

  IconWrapper: style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80px',
    height: '80px',
    borderRadius: '20px',
    backgroundColor: '#f7fafc',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#edf2f7',
      transform: 'translateY(-4px)',
    },
  }),

  LikeIcon: style({
    fontSize: '28px',
    color: '#ecc94b',
    marginBottom: '8px',
  }),

  DislikeIcon: style({
    fontSize: '28px',
    color: '#a0aec0',
    marginBottom: '8px',
  }),

  LikeCount: style({
    fontSize: '15px',
    fontWeight: '700',
    color: '#d69e2e',
  }),

  DislikeCount: style({
    fontSize: '15px',
    fontWeight: '700',
    color: '#718096',
  }),

  Youtube: style({
    margin: '40px auto',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
  }),

  HeartIcon: style({
    width: '40px',
    height: '40px',
    color: '#ffd600',
    cursor: 'pointer',
  }),

  MapWrapper: style({
    width: '100%',
    height: '360px',
    marginTop: '40px',
    borderTop: '1px solid #bdbdbd',
    paddingTop: '40px',
  }),
};

// Global styles for nested slick classes
globalStyle(
  `${MDBM.CarouselWrapper} .slick-prev::before, ${MDBM.CarouselWrapper} .slick-next::before`,
  {
    fontSize: '30px',
    color: '#9e9e9e',
  }
);

globalStyle(`${MDBM.CarouselWrapper} .slick-prev`, {
  left: '-40px',
});

globalStyle(`${MDBM.CarouselWrapper} .slick-next`, {
  right: '-40px',
});

globalStyle(`${MDBM.CarouselWrapper} .slick-dots li button:before`, {
  color: '#bdbdbd',
});

globalStyle(
  `${MDBM.CarouselWrapper} .slick-dots li.slick-active button:before`,
  {
    color: '#ff5722',
  }
);

globalStyle(`${MDBM.ThumbnailSliderWrapper} .slick-slide`, {
  padding: '0 5px',
});

globalStyle(`.slick-current ${MDBM.ThumbnailImageWrapper}`, {
  borderColor: '#ff5722',
});
