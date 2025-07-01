import type { User } from '../stores/auth';

export interface GitHubAuthResponse {
  user: {
    id: number;
    login: string;
    name: string | null;
    email: string | null;
    avatar_url: string;
    html_url: string;
  };
  accessToken: string;
}

export interface GitHubErrorResponse {
  error: string;
  error_description?: string;
}

function convertGitHubUserToUser(githubUser: GitHubAuthResponse['user']): User {
  return {
    id: githubUser.id,
    login: githubUser.login,
    name: githubUser.name,
    email: githubUser.email,
    avatarUrl: githubUser.avatar_url,
    htmlUrl: githubUser.html_url,
  };
}

export async function initiateGitHubLogin(): Promise<void> {
  // サーバーのGitHub認証エンドポイントに直接リダイレクト
  window.location.href = '/api/github/auth';
}

export async function completeGitHubAuth(
  code: string
): Promise<{ user: User; accessToken: string }> {
  const response = await fetch('/api/github/callback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    const errorData = (await response.json()) as GitHubErrorResponse;
    throw new Error(errorData.error || '認証に失敗しました');
  }

  const authData = (await response.json()) as GitHubAuthResponse;

  return {
    user: convertGitHubUserToUser(authData.user),
    accessToken: authData.accessToken,
  };
}

export function logout(): void {
  // クライアントサイドでのログアウト処理
  // 実際のトークン無効化はサーバーサイドで行う場合もある
}
