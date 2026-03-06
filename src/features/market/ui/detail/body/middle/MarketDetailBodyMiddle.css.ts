import { style, globalStyle } from '@vanilla-extract/css';

export const MDBM = {
  Body: style({
    width: '100%',
    minHeight: '800px',
    padding: '20px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
  }),

  Title: style({
    fontSize: '36px',
    fontWeight: 'bold',
    paddingTop: '20px',
    color: '#333333',
  }),

  Remarks: style({
    fontSize: '18px',
    color: '#757575',
    paddingTop: '4px',
  }),

  Price: style({
    fontSize: '36px',
    fontWeight: 'bold',
    paddingTop: '8px',
    paddingBottom: '40px',
    borderBottom: '1px solid #e0e0e0',
    width: '100%',
    color: '#ff5722',
  }),

  Contents: style({
    paddingTop: '40px',
    paddingBottom: '40px',
    lineHeight: 1.8,
    color: '#424242',
  }),

  Tags: style({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    paddingBottom: '40px',
    borderBottom: '1px solid #e0e0e0',
    width: '100%',
  }),

  Tag: style({
    color: '#616161',
    fontSize: '16px',
    backgroundColor: '#f5f5f5',
    padding: '5px 10px',
    borderRadius: '5px',
  }),

  CarouselWrapper: style({
    width: '100%',
    maxWidth: '600px',
    margin: '30px auto',
    backgroundColor: '#fafafa',
    borderRadius: '10px',
    padding: '10px',
  }),

  MainImageWrapper: style({
    position: 'relative',
    width: '100%',
    paddingTop: '100%',
    borderRadius: '10px',
    overflow: 'hidden',
    backgroundColor: '#eeeeee',
  }),

  Image: style({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    transition: 'transform 0.3s ease-in-out',

    ':hover': {
      transform: 'scale(1.1)',
    },
  }),

  ThumbnailSliderWrapper: style({
    marginTop: '20px',
  }),

  ThumbnailImageWrapper: style({
    cursor: 'pointer',
    border: '3px solid transparent',
    borderRadius: '5px',
    overflow: 'hidden',
    transition: 'border-color 0.3s',
  }),

  ThumbnailImage: style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  }),

  LikeWrapper: style({
    paddingTop: '160px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '20px',
  }),

  IconWrapper: style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }),

  LikeIcon: style({
    fontSize: '24px',
    color: '#ff5722',
    cursor: 'pointer',
  }),

  DislikeIcon: style({
    fontSize: '24px',
    color: '#9e9e9e',
    cursor: 'pointer',
  }),

  LikeCount: style({
    paddingTop: '4px',
    color: '#ff5722',
  }),

  DislikeCount: style({
    paddingTop: '4px',
    color: '#9e9e9e',
  }),

  Youtube: style({
    margin: 'auto',
    borderRadius: '10px',
    overflow: 'hidden',
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
