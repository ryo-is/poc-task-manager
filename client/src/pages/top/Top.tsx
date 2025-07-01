import { useAtom, useAtomValue } from 'jotai';
import { authStateAtom, clearAuthStateAtom } from '../../stores/auth';
import { container, logoutButton, title, userInfo, welcomeMessage } from './Top.css';

export function Top() {
  const authState = useAtomValue(authStateAtom);
  const [, clearAuthState] = useAtom(clearAuthStateAtom);

  function handleLogout(): void {
    clearAuthState();
  }

  return (
    <div className={container}>
      <h1 className={title}>Task Manager</h1>
      {authState.user && (
        <div className={userInfo}>
          <p className={welcomeMessage}>
            ようこそ、{authState.user.name || authState.user.login}さん！
          </p>
          <button type="button" className={logoutButton} onClick={handleLogout}>
            ログアウト
          </button>
        </div>
      )}
    </div>
  );
}
