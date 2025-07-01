import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { completeGitHubAuth } from '../../features/auth';
import { setAuthStateAtom } from '../../stores/auth';
import { card, container, errorMessage, retryButton, title } from './AuthCallback.css';

export function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [, setAuthState] = useAtom(setAuthStateAtom);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    async function processCallback(): Promise<void> {
      const code = searchParams.get('code');
      const errorParam = searchParams.get('error');

      if (errorParam) {
        const errorDescription =
          searchParams.get('error_description') || 'GitHub認証がキャンセルされました';
        setError(errorDescription);
        setIsProcessing(false);
        return;
      }

      if (!code) {
        setError('認証コードが見つかりません');
        setIsProcessing(false);
        return;
      }

      try {
        const { user, accessToken } = await completeGitHubAuth(code);

        setAuthState({
          user,
          accessToken,
          isAuthenticated: true,
          isLoading: false,
        });

        navigate('/', { replace: true });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : '認証処理に失敗しました';
        setError(errorMessage);
        setIsProcessing(false);
      }
    }

    processCallback();
  }, [searchParams, setAuthState, navigate]);

  function handleRetry(): void {
    navigate('/login', { replace: true });
  }

  if (isProcessing) {
    return <LoadingSpinner message="認証処理中..." />;
  }

  if (error) {
    return (
      <div className={container}>
        <div className={card}>
          <h1 className={title}>認証エラー</h1>
          <div className={errorMessage}>{error}</div>
          <button type="button" className={retryButton} onClick={handleRetry}>
            ログインページに戻る
          </button>
        </div>
      </div>
    );
  }

  return <LoadingSpinner message="リダイレクト中..." />;
}
