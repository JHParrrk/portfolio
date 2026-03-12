import { style } from '@vanilla-extract/css';

export const CBW = {
  Wrapper: style({
    width: '100%',
    maxWidth: '1024px',
    backgroundColor: '#ffffff',
    padding: '32px',
    borderRadius: '20px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
    border: '1px solid #edf2f7',
    boxSizing: 'border-box',
    marginBottom: '24px',
  }),

  PencilIcon: style({
    marginRight: '8px',
    verticalAlign: 'middle',
  }),

  InputWrapper: style({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '24px',
    gap: '16px',
  }),

  ContentsWrapper: style({
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    overflow: 'hidden',
    transition: 'border-color 0.2s ease',
    ':focus-within': {
      borderColor: '#cbd5e0',
    },
  }),

  Input: style({
    width: '180px',
    height: '48px',
    paddingLeft: '16px',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '15px',
    color: '#2d3748',
    outline: 'none',
    transition: 'all 0.2s',
    ':focus': {
      borderColor: '#cbd5e0',
      boxShadow: '0 0 0 3px rgba(226, 232, 240, 0.2)',
    },
  }),

  Contents: style({
    width: '100%',
    minHeight: '120px',
    padding: '20px',
    border: 'none',
    borderBottom: '1px solid #e2e8f0',
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#2d3748',
    resize: 'none',
    outline: 'none',
    boxSizing: 'border-box',
  }),

  BottomWrapper: style({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f7fafc',
  }),

  ContentsLength: style({
    height: '51px',
    lineHeight: '51px',
    paddingLeft: '20px',
    color: '#a0aec0',
    fontSize: '14px',
  }),

  Button: style({
    width: '100px',
    height: '51px',
    backgroundColor: '#1a202c',
    color: 'white',
    cursor: 'pointer',
    border: 'none',
    fontWeight: '600',
    fontSize: '15px',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#2d3748',
    },
  }),

  CancelIcon: style({
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    marginLeft: 'auto',
    opacity: 0.6,
    transition: 'opacity 0.2s',
    ':hover': {
      opacity: 1,
    },
  }),

  Star: style({
    fontSize: '24px',
    color: '#ecc94b',
  }),
};
