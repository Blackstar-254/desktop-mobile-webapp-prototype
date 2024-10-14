import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@blackstar/server/api/trpc';
import { db } from '@blackstar/server/db';
import {
  contact_us_form_table,
  visits_table,
} from '@blackstar/server/db/schema';
import { eq } from 'drizzle-orm';
import { env } from '@blackstar/env';

import reroutes from '@blackstar/lib/utils/reroutes.json';

export type image_t = {
  label: string;
  url: string;
  alt: string;
};

export const dashboardGallery = createTRPCRouter({
  view_all: protectedProcedure.query(async ({ ctx }) => {
    if (!env.CLIENT_ID) {
      return [];
    }
    const { cookies } = ctx.request;

    let ImageSet: Record<string, any> = {};
    const session_token = cookies['next-auth.session-token'];
    // console.log({session_token})
    if (!session_token?.length) {
      return [];
    }

    const a = await fetch(
      `${env.NEXT_PUBLIC_BLACKSTARTECH_CMS_URL}/api/cms/gallery`,
      {
        method: 'GET',
        headers: {
          'client-id': env.CLIENT_ID,
          'visitor-id': ctx.visitor_id ?? '',
          'session-token': session_token,
        },
      },
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));

    console.log(JSON.stringify({ a }, null, 4));

    return [];
  }),
});
