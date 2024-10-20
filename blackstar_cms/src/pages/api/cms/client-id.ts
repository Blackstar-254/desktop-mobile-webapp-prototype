import type { NextApiRequest, NextApiResponse } from 'next';

import { env } from '@blackstar/env';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { method, headers, cookies } = req;
  if (method !== 'GET') {
    res.status(400).write('');
    return;
  }
  const visitor_id = cookies['visitor-id'];
  const sess_token = cookies['next-auth.session-token'];

  res.status(200);
  res.json({
    ClientId: env.CLIENT_ID,
    VisitorId: visitor_id,
    SessionToken: sess_token,
  });
}
