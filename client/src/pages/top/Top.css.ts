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

export const userInfo = style({
  textAlign: 'center',
  marginTop: '2rem',
});

export const welcomeMessage = style({
  fontSize: '1.2rem',
  color: '#555',
  marginBottom: '1rem',
});

export const logoutButton = style({
  padding: '8px 16px',
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontSize: '14px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  ':hover': {
    backgroundColor: '#c82333',
  },
});
