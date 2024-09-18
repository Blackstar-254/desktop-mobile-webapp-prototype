import fs from 'fs';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const d = req.body;

  fs.writeFileSync('./test_data.txt', d, {
    encoding: 'utf-8',
    flag: 'w',
    flush: true,
  });
  console.log('hi');
  res.status(200).json({ success: true });
}
