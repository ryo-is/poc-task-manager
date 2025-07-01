import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { getGitHubAuth, postGitHubCallback } from './routes/github.js';
import { getHealth } from './routes/health.js';

dotenv.config();

function createApplication(): express.Application {
  const application = express();

  // CORS設定
  application.use(
    cors({
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      credentials: true,
    })
  );

  application.use(express.json());

  // ヘルスチェックエンドポイント
  application.get('/health', getHealth);

  // GitHub OAuth エンドポイント
  application.get('/api/github/auth', getGitHubAuth);
  application.post('/api/github/callback', postGitHubCallback);

  return application;
}

function startServer(): void {
  const application = createApplication();
  const port = Number(process.env.PORT) || 3000;

  application.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

startServer();
