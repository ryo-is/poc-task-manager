# GitHub OAuth認証セットアップガイド

## 概要

このドキュメントでは、Task ManagerでGitHub OAuth認証を設定する方法について説明します。

## GitHub OAuth Appの作成

1. GitHubにログインし、[OAuth Apps設定ページ](https://github.com/settings/applications/new)にアクセスします。

2. 以下の情報を入力します：
   - **Application name**: `Task Manager` (任意の名前)
   - **Homepage URL**: `http://localhost:5173` (開発環境の場合)
   - **Application description**: `スプリント管理ツール` (任意の説明)
   - **Authorization callback URL**: `http://localhost:5173/auth/callback`

3. "Register application"をクリックしてアプリケーションを作成します。

4. 作成後、以下の情報をメモします：
   - **Client ID**
   - **Client Secret** (Generate a new client secretをクリックして生成)

## 環境変数の設定

1. `server/.env.example`を`server/.env`にコピーします：

   ```bash
   cp server/.env.example server/.env
   ```

2. `.env`ファイルを編集し、GitHub OAuth情報を設定します：

   ```env
   # GitHub OAuth Configuration
   GITHUB_CLIENT_ID=your_github_oauth_app_client_id_here
   GITHUB_CLIENT_SECRET=your_github_oauth_app_client_secret_here
   
   # Client URL (OAuth認証のリダイレクト先)
   CLIENT_URL=http://localhost:5173
   ```

## OAuth認証フロー

### 1. 認証開始

- ユーザーが「GitHubでログイン」ボタンをクリック
- クライアントが`GET /api/github/auth`を呼び出し
- サーバーがGitHubの認証URLを生成して返却
- ユーザーがGitHubの認証ページにリダイレクト

### 2. 認証許可

- ユーザーがGitHubで認証を許可
- GitHubが`http://localhost:5173/auth/callback?code=xxx&state=xxx`にリダイレクト
- `AuthCallback`コンポーネントがパラメータを処理

### 3. トークン取得

- クライアントが`POST /api/github/callback`を呼び出し（codeとstateを送信）
- サーバーがGitHubのトークンエンドポイントでアクセストークンを取得
- サーバーがユーザー情報を取得してクライアントに返却

### 4. 認証完了

- クライアントがアクセストークンとユーザー情報を保存
- ユーザーがログイン状態になる

## セキュリティ考慮事項

### State Parameter

- CSRF攻撃を防ぐため、stateパラメータを使用
- 認証開始時にランダムなstateを生成
- コールバック時にstateを検証

### HTTPS

- 本番環境では必ずHTTPSを使用
- OAuth callback URLもHTTPSで設定

### トークン管理

- アクセストークンはlocalStorageに保存（開発環境）
- 本番環境ではより安全な方法を検討（HttpOnly Cookie等）

## トラブルシューティング

### よくあるエラー

1. **"GitHub OAuth configuration not found"**
   - `.env`ファイルの`GITHUB_CLIENT_ID`と`GITHUB_CLIENT_SECRET`が設定されているか確認

2. **"Authorization code is required"**
   - GitHubからのコールバックでcodeパラメータが取得できていない
   - OAuth Appのcallback URLが正しく設定されているか確認

3. **"State parameter is required for security"**
   - stateパラメータが送信されていない
   - 認証フローが正しく実行されているか確認

### デバッグ方法

1. ブラウザの開発者ツールでネットワークタブを確認
2. サーバーのログを確認
3. GitHubのOAuth App設定を再確認

## 本番環境での設定

本番環境では以下の点を変更してください：

1. **OAuth App設定**：
   - Homepage URL: `https://yourdomain.com`
   - Authorization callback URL: `https://yourdomain.com/auth/callback`

2. **環境変数**：

   ```env
   CLIENT_URL=https://yourdomain.com
   ```

3. **セキュリティ**：
   - HTTPS必須
   - 適切なCORS設定
   - セキュアなトークン管理
