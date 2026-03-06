import { style } from '@vanilla-extract/css';

export const MLH = {
  Header: style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',
    paddingBottom: '20px',
    borderBottom: '2px solid #000',
  }),

  ToggleWrapper: style({
    display: 'flex',
    gap: '12px',
  }),

  ToggleButton: style({
    padding: '10px 18px',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    selectors: {
      '&:hover': {
        borderColor: '#ffd600',
        color: '#000',
      },
    },
  }),
};
