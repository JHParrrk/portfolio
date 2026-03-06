import { style } from '@vanilla-extract/css';

export const BDBM = {
  Body: style({
    width: '100%',
    minHeight: '800px',
  }),
  Title: style({
    paddingTop: '80px',
  }),
  Contents: style({
    paddingTop: '40px',
    paddingBottom: '120px',
  }),
  IconWrapper: style({
    textAlign: 'center',
  }),
  Youtube: style({
    margin: 'auto',
  }),
  LikeWrapper: style({
    paddingTop: '160px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  }),
  LocationIcon: style({}), // Empty style since it adds no CSS rules
  LikeIcon: style({
    fontSize: '24px',
    color: '#ffd600',
    margin: '0px 20px',
    cursor: 'pointer',
  }),
  DislikeIcon: style({
    fontSize: '24px',
    color: '#828282',
    margin: '0px 20px',
    cursor: 'pointer',
  }),
  LikeCount: style({
    color: '#ffd600',
  }),
  DislikeCount: style({
    color: '#828282',
  }),
  ImageWrapper: style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }),
  Image: style({
    width: '75%',
    height: 'auto',
    maxWidth: '996px',
    marginBottom: '30px',
  }),
};
