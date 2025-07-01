import { atom } from 'jotai';

export interface User {
  id: number;
  login: string;
  name: string | null;
  email: string | null;
  avatarUrl: string;
  htmlUrl: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialAuthState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
};

function loadAuthStateFromStorage(): AuthState {
  try {
    const storedState = localStorage.getItem('authState');
    if (!storedState) {
      return initialAuthState;
    }

    const parsedState = JSON.parse(storedState) as AuthState;
    return {
      ...parsedState,
      isLoading: false,
    };
  } catch {
    return initialAuthState;
  }
}

function saveAuthStateToStorage(state: AuthState): void {
  try {
    localStorage.setItem('authState', JSON.stringify(state));
  } catch {
    // localStorageへの保存に失敗した場合は何もしない
  }
}

export const authStateAtom = atom<AuthState>(loadAuthStateFromStorage());

export const setAuthStateAtom = atom(null, (get, set, newState: Partial<AuthState>) => {
  const currentState = get(authStateAtom);
  const updatedState = { ...currentState, ...newState };
  set(authStateAtom, updatedState);
  saveAuthStateToStorage(updatedState);
});

export const clearAuthStateAtom = atom(null, (_get, set) => {
  set(authStateAtom, initialAuthState);
  try {
    localStorage.removeItem('authState');
  } catch {
    // localStorageからの削除に失敗した場合は何もしない
  }
});
