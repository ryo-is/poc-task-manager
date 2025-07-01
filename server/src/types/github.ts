export interface GitHubTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

export interface GitHubUser {
  id: number;
  login: string;
  name: string | null;
  email: string | null;
  avatar_url: string;
  html_url: string;
}

export interface GitHubAuthResponse {
  user: GitHubUser;
  accessToken: string;
}

export interface GitHubErrorResponse {
  error: string;
  error_description?: string;
}
