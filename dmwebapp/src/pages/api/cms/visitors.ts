// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@blackstar/server/db';
import { visits_table } from '@blackstar/server/db/schema';
import { env } from '@blackstar/env';
import { eq, sql } from 'drizzle-orm';
import { visitor_info_t } from '@blackstar/server/db/schema/utils/visitor_info';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { body } = req;
  if (typeof body !== 'string') {
    res.status(400).json({});
    return;
  }

  try {
    const data: visitor_info_t = JSON.parse(body);
    const visitor_id = data?.cookies?.['visitor-id'];
    if (!visitor_id) {
      res.status(400).json({ success: false });
      return;
    }
    const where_clause = eq(sql`${visitor_id}::uuid`, visits_table.visitor_id);
    if (!data?.ua?.browser?.name) {
      res.status(400).json({ success: false });
      return;
    }
    const c = await db
      .select({
        count: visits_table.count,
        updated_at: visits_table.updated_at,
      })
      .from(visits_table)
      .where(where_clause)
      .limit(1);
    const count = c.pop();
    const now = new Date();
    if (!count) {
      await db.insert(visits_table).values({
        client: env.CLIENT_ID ?? '',
        count: 1,
        metadata: data,
        visitor_id,
        updated_at: now,
      });
      console.log('created new visit');
      res.status(200).json({ success: true });
      return;
    }
    // Calculating the time difference
    // of two dates
    let Difference_In_Time = now.getTime() - count.updated_at.getTime();
    if (
      (false && env.NODE_ENV === 'development') ||
      Difference_In_Time >= 60 * 60 * 1000
    ) {
      await db
        .update(visits_table)
        .set({
          count: count?.count ? count.count + 1 : 1,
          metadata: data,
          updated_at: now,
        })
        .where(where_clause);
      console.log('updated db');
    }

    res.status(200).json({ success: true });
    return;
  } catch (e) {
    res.status(403).json({ success: false });
    console.log('error');
  }
}
