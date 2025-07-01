import express from 'express';
import { getHealth } from './routes/health.js';

function createApplication(): express.Application {
  const application = express();

  application.use(express.json());

  application.get('/health', getHealth);

  return application;
}

function startServer(): void {
  const application = createApplication();
  const port = 3000;

  application.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

startServer();
