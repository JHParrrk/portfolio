import { style } from '@vanilla-extract/css';

export const PF = {
  CustomBody: style({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  Wrapper: style({
    width: '1200px',
    border: 'none',
    margin: '100px',
    padding: '80px 102px 100px 102px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0px 0px 10px gray',
  }),
  Title: style({
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '36px',
    fontWeight: 'bold',
  }),
  WriterWrapper: style({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '40px',
  }),
  InputItem: style({
    width: '486px',
    height: '52px',
    paddingLeft: '16px',
    border: '1px solid #bdbdbd',
  }),
  Label: style({
    paddingBottom: '16px',
    fontSize: '16px',
    fontWeight: 500,
  }),
  InputWrapper: style({
    paddingTop: '40px',
    width: '100%',
  }),
  Subject: style({
    width: '996px',
    height: '52px',
    paddingLeft: '16px',
    border: '1px solid #bdbdbd',
  }),
  ZipcodeWrapper: style({
    display: 'flex',
    flexDirection: 'row',
  }),
  Zipcode: style({
    width: '77px',
    height: '52px',
    paddingLeft: '16px',
    border: '1px solid #bdbdbd',
  }),
  SearchButton: style({
    width: '124px',
    height: '52px',
    marginLeft: '16px',
    backgroundColor: 'black',
    cursor: 'pointer',
    color: 'white',
    border: 'none',
  }),
  Address: style({
    width: '996px',
    height: '52px',
    marginTop: '16px',
    paddingLeft: '16px',
    border: '1px solid #bdbdbd',
  }),
  ImageWrapper: style({
    width: '996px',
    paddingTop: '40px',
  }),
  ImageBox: style({
    display: 'flex',
    flexDirection: 'row',
    marginTop: '20px',
    flexWrap: 'wrap',
    gap: '24px',
  }),
  ButtonWrapper: style({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: '80px',
  }),
  SubmitButton: style({
    width: '179px',
    height: '52px',
    border: 'none',
    fontSize: '16px',
    fontWeight: 500,
    margin: '0px 12px',
    cursor: 'pointer',
    backgroundColor: 'gold',
    selectors: {
      '&:disabled': {
        backgroundColor: '#bdbdbd',
        color: '#ffffff',
        cursor: 'not-allowed',
      },
    },
  }),
  Error: style({
    paddingTop: '10px',
    fontSize: '14px',
    color: 'red',
  }),
  TagWrapper: style({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '12px',
  }),
  TagItem: style({
    padding: '4px 12px',
    backgroundColor: 'gold',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    selectors: {
      '&:hover': {
        backgroundColor: '#ffd700',
        opacity: 0.8,
      },
    },
  }),
};
