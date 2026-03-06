import { style } from '@vanilla-extract/css';

export const MFBL = {
  CustomBody: style({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  Wrapper: style({
    width: '1200px',
    margin: '100px',
  }),
  TableTop: style({
    borderTop: '2px solid gray',
    marginTop: '20px',
  }),
  TableBottom: style({
    borderBottom: '2px solid gray',
  }),
  Row: style({
    display: 'flex',
    flexDirection: 'row',
    height: '52px',
    lineHeight: '52px',
    borderBottom: '1px solid gray',
  }),
  ColumnHeaderBasic: style({
    width: '10%',
    textAlign: 'center',
  }),
  ColumnHeaderTitle: style({
    width: '70%',
    textAlign: 'center',
  }),
  ColumnBasic: style({
    width: '10%',
    textAlign: 'center',
  }),
  ColumnTitle: style({
    width: '70%',
    textAlign: 'center',
  }),
  Footer: style({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '50px',
  }),
  PencilIcon: style({
    width: '24px',
    height: '24px',
  }),
  Button: style({
    marginTop: '40px',
    width: '171px',
    height: '52px',
    backgroundColor: 'white',
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    cursor: 'pointer',
    selectors: {
      '&:hover': {
        backgroundColor: '#f5f2fc',
      },
    },
  }),
};
