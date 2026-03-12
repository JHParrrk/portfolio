import { style } from '@vanilla-extract/css';

export const BDBT = {
  Header: style({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '24px',
    borderBottom: '1px solid #edf2f7',
    marginBottom: '32px',
  }),
  AvatarWrapper: style({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  }),
  Avatar: style({
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '1px solid #e2e8f0',
  }),
  Info: style({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '4px',
  }),
  Writer: style({
    fontSize: '18px',
    fontWeight: '700',
    color: '#1a202c',
    lineHeight: '1',
  }),
  CreatedAt: style({
    fontSize: '14px',
    fontWeight: '500',
    color: '#a0aec0',
    lineHeight: '1',
  }),
  IconWrapper: style({
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  }),
  LocationIcon: style({
    cursor: 'pointer',
    width: '24px',
    height: '24px',
    opacity: 0.6,
    transition: 'opacity 0.2s',
    ':hover': { opacity: 1 },
  }),
  LinkIcon: style({
    cursor: 'pointer',
    width: '24px',
    height: '24px',
    opacity: 0.6,
    transition: 'opacity 0.2s',
    ':hover': { opacity: 1 },
  }),
};
