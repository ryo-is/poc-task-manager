import { container, spinner } from './LoadingSpinner.css';

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = '読み込み中...' }: LoadingSpinnerProps) {
  return (
    <div className={container}>
      <div className={spinner} />
      <span className={message}>{message}</span>
    </div>
  );
}
