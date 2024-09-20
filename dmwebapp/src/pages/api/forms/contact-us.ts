import fs from 'node:fs';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { ReadFormData } from '@blackstar/lib/api/contact_us_forms';
import { db } from '@blackstar/server/db';
import { contact_us_form_table } from '@blackstar/server/db/schema';
import { env } from '@blackstar/env';
import { contactUsFormSchema } from '@blackstar/server/db/schema/utils/contact_info';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { body, cookies } = req;
  const referrer = req.headers?.referer;
  if (typeof body !== 'string') {
    res.status(400).json({});
    return;
  }
  try {
    const form_data = contactUsFormSchema.parse(ReadFormData(body));
    if (!form_data.valid) {
      res.status(400).json({ success: false });
      return;
    }

    const visitor_id = cookies['visitor-id'];
    await db.insert(contact_us_form_table).values({
      client: env.CLIENT_ID ?? '',
      form_data,
      updated_at: new Date(),
      visitor_id,
    });
    // console.log('inserted form to db');
    res.status(200).json({ success: false });
  } catch (e) {
    res.status(403).json({ success: false });
  }
}
