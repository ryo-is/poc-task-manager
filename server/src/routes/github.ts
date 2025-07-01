import type { Request, Response } from 'express';
import type { GitHubAuthResponse, GitHubTokenResponse, GitHubUser } from '../types/github.js';

function generateState(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function buildGitHubAuthUrl(clientId: string, state: string): string {
  const baseUrl = 'https://github.com/login/oauth/authorize';
  const params = new URLSearchParams({
    client_id: clientId,
    scope: 'user:email',
    state: state,
  });

  return `${baseUrl}?${params.toString()}`;
}

async function exchangeCodeForToken(
  code: string,
  clientId: string,
  clientSecret: string
): Promise<GitHubTokenResponse> {
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to exchange code for token');
  }

  return response.json() as Promise<GitHubTokenResponse>;
}

async function fetchGitHubUser(accessToken: string): Promise<GitHubUser> {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user information');
  }

  return response.json() as Promise<GitHubUser>;
}

export function getGitHubAuth(_request: Request, response: Response): void {
  const clientId = process.env.GITHUB_CLIENT_ID;

  if (!clientId) {
    response.status(500).json({ error: 'GitHub client ID not configured' });
    return;
  }

  const state = generateState();
  const authUrl = buildGitHubAuthUrl(clientId, state);

  response.redirect(authUrl);
}

export async function postGitHubCallback(request: Request, response: Response): Promise<void> {
  const { code } = request.body;
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    response.status(500).json({ error: 'GitHub OAuth not configured' });
    return;
  }

  if (!code) {
    response.status(400).json({ error: 'Authorization code is required' });
    return;
  }

  try {
    const tokenResponse = await exchangeCodeForToken(code, clientId, clientSecret);
    const user = await fetchGitHubUser(tokenResponse.access_token);

    const authResponse: GitHubAuthResponse = {
      user: user,
      accessToken: tokenResponse.access_token,
    };

    response.status(200).json(authResponse);
  } catch (error) {
    console.error('GitHub OAuth error:', error);
    response.status(500).json({ error: 'Authentication failed' });
  }
}
