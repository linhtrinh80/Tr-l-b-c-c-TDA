import type { Request, Response } from 'express';
import app, { handleCompareAoDai } from './index.ts';

/**
 * Dedicated serverless function handler for /api/compare-aodai
 * Works both when invoked directly by Vercel (where req.url might be '/' or '')
 * and when routed through Express middleware.
 */
export default async function handler(req: Request, res: Response) {
  if (req.method === 'POST') {
    return handleCompareAoDai(req, res);
  }
  // Fall back to Express app for other HTTP methods or middleware
  return app(req, res);
}
