import { style } from '@vanilla-extract/css';

export const BBC = {
  Wrapper: style({
    width: '100%',
    marginBottom: '50px',
  }),

  Title: style({
    fontSize: '24px',
    fontWeight: 700,
    color: '#333',
    textAlign: 'center',
    marginBottom: '30px',
  }),

  List: style({
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    padding: '0 20px',
  }),

  BoardCard: style({
    width: '33%',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginTop: '30px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
    cursor: 'pointer',

    ':hover': {
      transform: 'translateY(-10px)',
      boxShadow: '0 8px 12px rgba(0, 0, 0, 0.15)',
    },
  }),

  CardTitle: style({
    fontSize: '18px',
    fontWeight: 600,
    color: '#555',
    marginBottom: '10px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),

  CardWriter: style({
    fontSize: '14px',
    color: '#888',
    marginBottom: '10px',
  }),

  CardLikeCount: style({
    fontSize: '16px',
    fontWeight: 500,
    color: '#ff6347',
  }),
};
