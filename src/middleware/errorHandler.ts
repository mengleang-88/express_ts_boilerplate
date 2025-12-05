import { NextFunction, Request, Response } from 'express';

export const notFound = (_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
};

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const message = err instanceof Error ? err.message : 'Internal Server Error';
  res.status(500).json({ error: message });
};
