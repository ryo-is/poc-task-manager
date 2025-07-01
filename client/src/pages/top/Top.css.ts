import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: '2rem',
  fontFamily: 'system-ui, -apple-system, sans-serif',
});

export const title = style({
  fontSize: '3rem',
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '2rem',
  textAlign: 'center',
});
