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
  fontSize: '32px',
  fontWeight: '600',
  color: '#24292f',
  marginBottom: '8px',
});

export const subtitle = style({
  fontSize: '16px',
  color: '#656d76',
  marginBottom: '32px',
});

export const loginButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px 24px',
  backgroundColor: '#24292f',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontSize: '16px',
  fontWeight: '500',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  ':hover': {
    backgroundColor: '#32383f',
  },
  ':active': {
    backgroundColor: '#1c2128',
  },
});

export const githubIcon = style({
  marginRight: '8px',
  width: '20px',
  height: '20px',
});

export const errorMessage = style({
  color: '#d1242f',
  fontSize: '14px',
  marginTop: '16px',
  padding: '8px',
  backgroundColor: '#ffeef0',
  border: '1px solid #f1c2c8',
  borderRadius: '6px',
});
