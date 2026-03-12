import { style } from '@vanilla-extract/css';

export const CMV = {
  ItemWrapper: style({
    width: '100%',
    maxWidth: '1024px',
    padding: '24px 32px',
    borderBottom: '1px solid #edf2f7',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
  }),

  FlexWrapper: style({
    display: 'flex',
    flexDirection: 'row',
    gap: '16px',
  }),

  Avatar: style({
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '1px solid #e2e8f0',
  }),

  MainWrapper: style({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  }),

  WriterWrapper: style({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '12px',
  }),

  Writer: style({
    fontSize: '16px',
    fontWeight: '700',
    color: '#1a202c',
  }),

  Contents: style({
    fontSize: '15px',
    color: '#4a5568',
    lineHeight: '1.6',
    marginTop: '4px',
  }),

  OptionWrapper: style({
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    marginLeft: 'auto',
  }),

  UpdateIcon: style({
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    opacity: 0.5,
    transition: 'opacity 0.2s',
    ':hover': { opacity: 1 },
  }),

  DeleteIcon: style({
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    opacity: 0.5,
    transition: 'opacity 0.2s',
    ':hover': { opacity: 1 },
  }),

  DateString: style({
    color: '#a0aec0',
    fontSize: '13px',
    marginTop: '8px',
    paddingLeft: '64px',
  }),
};
