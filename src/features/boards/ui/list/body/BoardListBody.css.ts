import { style, styleVariants } from '@vanilla-extract/css';

export const BLB = {
  BodyWrapper: style({
    vars: {
      '--row-height': '52px',
      '--border-height': '1px',
      '--table-top-margin': '20px',
      '--table-top-border': '2px',
      '--table-bottom-border': '2px',
    },
    minHeight:
      'calc(var(--table-top-margin) + var(--table-top-border) + (var(--row-height) + var(--border-height)) * 11 + var(--table-bottom-border))',
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

    ':hover': {
      color: 'blue',
    },
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
    cursor: 'pointer',

    ':hover': {
      color: 'blue',
    },
  }),
};

export const TextTokenMatched = style({
  color: 'red',
});

export const TextTokenUnmatched = style({
  color: 'black',
});
