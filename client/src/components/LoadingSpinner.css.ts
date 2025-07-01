import { keyframes, style } from '@vanilla-extract/css';

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const container = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
});

export const spinner = style({
  width: '40px',
  height: '40px',
  border: '4px solid #f3f3f3',
  borderTop: '4px solid #0366d6',
  borderRadius: '50%',
  animation: `${spin} 1s linear infinite`,
});

export const message = style({
  marginLeft: '12px',
  fontSize: '14px',
  color: '#586069',
});
