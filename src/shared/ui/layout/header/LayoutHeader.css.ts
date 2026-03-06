import { style } from '@vanilla-extract/css';

export const LH = {
  Wrapper: style({
    boxSizing: 'border-box',
    maxWidth: '100%',
    height: '70px',
    backgroundColor: '#f5f2fc',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  InnerWrapper: style({
    width: '1200px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '18px',
  }),
  InnerLogo: style({
    fontSize: '30px',
    fontWeight: 'bold',
    fontFamily: 'live',
    fontStyle: 'italic',
    color: '#5729ff',
    cursor: 'pointer',
  }),
  InnerButton: style({
    margin: '10px',
    color: '#5729ff',
    cursor: 'pointer',
  }),
};
