import { style } from '@vanilla-extract/css';

export const UploadImage = style({
  width: '78px',
  height: '78px',
  marginRight: '24px',
  cursor: 'pointer',
  objectFit: 'cover',
});

export const UploadButton = style({
  width: '78px',
  height: '78px',
  backgroundColor: '#bdbdbd',
  marginRight: '24px',
  outline: 'none',
  border: 'none',
  cursor: 'pointer',
});

export const UploadFileHidden = style({
  display: 'none',
});

export const DeleteButton = style({
  position: 'absolute',
  top: '4px',
  right: '1px',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  color: '#ffffff',
  border: 'none',
  borderRadius: '50%',
  width: '24px',
  height: '24px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 'bold',
  lineHeight: '1',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
  transition: 'all 0.2s ease',
  selectors: {
    '&:hover': {
      backgroundColor: '#f1f5f9',
      color: '#4516eb',
    },
  },
});
