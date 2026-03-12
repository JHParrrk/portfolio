import { style } from '@vanilla-extract/css';

export const BDBB = {
  BottomWrapper: style({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: '60px',
    gap: '16px',
    marginTop: '20px',
  }),

  Button: style({
    padding: '14px 32px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    color: '#4a5568',
    cursor: 'pointer',
    transition: 'all 0.2s ease',

    ':hover': {
      backgroundColor: '#f7fafc',
      borderColor: '#cbd5e0',
      color: '#1a202c',
      transform: 'translateY(-2px)',
    },

    ':active': {
      transform: 'translateY(0)',
    },
  }),
};
