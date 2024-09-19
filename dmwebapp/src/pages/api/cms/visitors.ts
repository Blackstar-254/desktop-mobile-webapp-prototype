import fs from 'node:fs';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { body } = req;
  const referrer = req.headers?.referer;
  if (typeof body !== 'string') {
    res.status(400).json({});
    return;
  }
  let data: Record<string, any> = {};
  try {
    data = JSON.parse(body);
    console.log(JSON.stringify({ data }, null, 2));
  } catch (e) {
    res.status(400).json({ success: false });
    return;
  }
  console.log(JSON.stringify({ data }, null, 4));
  res.status(200).json({ success: true });
}
