import { style } from '@vanilla-extract/css';

export const MDBT = {
  Header: style({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #bdbdbd',
    paddingBottom: '20px',
  }),
  AvatarWrapper: style({
    display: 'flex',
    flexDirection: 'row',
  }),
  Avatar: style({
    marginRight: '10px',
  }),
  Info: style({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }),
  Seller: style({}),
  CreatedAt: style({}),
  IconWrapper: style({
    textAlign: 'center',
  }),
  LocationIcon: style({}),
  LinkIcon: style({}),
};
