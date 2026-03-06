import { style } from '@vanilla-extract/css';

export const BDBB = {
  BottomWrapper: style({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: '80px',
  }),

  Button: style({
    width: '179px',
    height: '45px',
    backgroundColor: 'white',
    border: '1px solid gray',
    margin: '0px 12px',
    cursor: 'pointer',

    ':hover': {
      backgroundColor: 'gold',
      borderColor: 'white',
    },
  }),
};
