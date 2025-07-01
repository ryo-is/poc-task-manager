import type { Request, Response } from 'express';

export function getHealth(_request: Request, response: Response): void {
  const healthResponse = {
    status: 'ok',
    timestamp: new Date().toISOString(),
  };

  response.status(200).json(healthResponse);
}
