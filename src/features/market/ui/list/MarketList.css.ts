import { style } from '@vanilla-extract/css';

export const Wrapper = style({
  width: '1200px',
  margin: '80px auto',
});

export const ListWrapper = style({
  maxHeight: '705px',
  overflowY: 'auto',
  borderTop: '1px solid #dbdbdb',
  borderBottom: '1px solid #dbdbdb',
  marginBottom: '1px',
  selectors: {
    '&::-webkit-scrollbar': {
      width: '10px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#c1c1c1',
      borderRadius: '5px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#a8a8a8',
    },
  },
});
