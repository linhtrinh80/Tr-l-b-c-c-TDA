import type { Request, Response } from 'express';

export default function handler(_req: Request, res: Response) {
  return res.json({ status: 'ok', service: 'Hoa Sac Ao Dai AI Analyzer', version: '2.1' });
}
