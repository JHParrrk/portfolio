import { style } from '@vanilla-extract/css';

export const BLF = {
  Footer: style({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '50px',
  }),

  PencilIcon: style({}), // Empty as it has no CSS rules

  Button: style({
    width: '171px',
    height: '52px',
    backgroundColor: 'white',
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    cursor: 'pointer',

    ':hover': {
      backgroundColor: '#f5f2fc',
    },
  }),
};
