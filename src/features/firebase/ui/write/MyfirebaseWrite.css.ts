import { style } from '@vanilla-extract/css';

export const MFBW = {
  CustomBody: style({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  Wrapper: style({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '50px',
    height: '200px',
    width: '500px',
  }),
  InputWrapper: style({
    paddingTop: '50px',
  }),
  MyInput: style({
    margin: '5px',
    width: '350px',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: '1px solid blue',
    selectors: {
      '&:focus': {
        outline: 'none',
      },
    },
  }),
  ButtonWrapper: style({
    paddingTop: '60px',
  }),
  MyButton: style({
    width: '400px',
    height: '50px',
    backgroundColor: 'beige',
    borderColor: 'yellow',
    cursor: 'pointer',
    selectors: {
      '&:hover': {
        fontWeight: 'bold',
        backgroundColor: 'yellow',
        borderColor: 'yellowgreen',
      },
    },
  }),
  InnerLogo: style({
    fontSize: '13px',
    fontWeight: 'bold',
    fontFamily: 'live',
    fontStyle: 'italic',
    color: '#5729ff',
  }),
};
