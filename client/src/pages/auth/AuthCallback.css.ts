import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: '20px',
  backgroundColor: '#f6f8fa',
});

export const card = style({
  backgroundColor: 'white',
  padding: '40px',
  borderRadius: '12px',
  boxShadow: '0 8px 24px rgba(140, 149, 159, 0.2)',
  textAlign: 'center',
  maxWidth: '400px',
  width: '100%',
});

export const title = style({
  fontSize: '24px',
  fontWeight: '600',
  color: '#24292f',
  marginBottom: '16px',
});

export const message = style({
  fontSize: '16px',
  color: '#656d76',
  marginBottom: '24px',
});

export const errorMessage = style({
  color: '#d1242f',
  fontSize: '14px',
  marginBottom: '16px',
  padding: '12px',
  backgroundColor: '#ffeef0',
  border: '1px solid #f1c2c8',
  borderRadius: '6px',
});

export const retryButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px 16px',
  backgroundColor: '#0366d6',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontSize: '14px',
  fontWeight: '500',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  ':hover': {
    backgroundColor: '#0256cc',
  },
});
