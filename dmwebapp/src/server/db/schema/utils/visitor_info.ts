import { z } from 'zod';
import { customJsonb } from './custom_json_type';
import { userAgent } from 'next/server';

export type visitor_info_t = {
  ua: ReturnType<typeof userAgent>;
  headers: Record<string, string>;
  cookies: Record<string, string>;
  geo: Record<string, string> & {
    city: string;
    country: string;
    region: string;
    latitude: string;
    longitude: string;
  };
  ip: string;
  banned: {
    isBanned: boolean;
    time: Date;
    duration: number;
  };
};

export const exampleVisitorInfo: visitor_info_t = {
  ua: {
    ua: '',
    browser: {
      name: '',
      version: '',
    },
    engine: {
      name: '',
      version: '',
    },
    os: {
      name: '',
      version: '',
    },
    device: {},
    cpu: {
      architecture: '',
    },
    isBot: false,
  },
  headers: {
    accept: '',
    'accept-encoding': '',
    'accept-language': '',
    'cache-control': '',
    connection: '',
    cookie: '',
    host: '',
    pragma: '',
    referer: '',
    'sec-ch-ua': '',
    'sec-ch-ua-mobile': '',
    'sec-ch-ua-platform': '',
    'sec-fetch-dest': '',
    'sec-fetch-mode': '',
    'sec-fetch-site': '',
    'sec-gpc': '',
    'user-agent': '',
    'x-forwarded-for': '',
    'x-forwarded-host': '',
    'x-forwarded-port': '',
    'x-forwarded-proto': '',
  },
  cookies: {
    sessionId: '',
    userId: '',
  },
  geo: {
    city: '',
    country: '',
    region: '',
    latitude: '',
    longitude: '',
  },
  ip: '',
  banned: {
    isBanned: false,
    time: new Date(),
    duration: 0,
  },
};

export const visitorInfoSchema = z.object({
  ua: z.object({
    ua: z.string().optional(),
    browser: z.object({
      name: z.string().optional(),
      version: z.string().optional(),
    }),
    engine: z.object({
      name: z.string().optional(),
      version: z.string().optional(),
    }),
    os: z.object({
      name: z.string().optional(),
      version: z.string().optional(),
    }),
    device: z.object({}),
    cpu: z.object({
      architecture: z.string().optional(),
    }),
    isBot: z.boolean(),
  }),
  headers: z.object({
    accept: z.string().optional(),
    'accept-encoding': z.string().optional(),
    'accept-language': z.string().optional(),
    'cache-control': z.string().optional(),
    connection: z.string().optional(),
    cookie: z.string().optional(),
    host: z.string().optional(),
    pragma: z.string().optional(),
    referer: z.string().optional(),
    'sec-ch-ua': z.string().optional(),
    'sec-ch-ua-mobile': z.string().optional(),
    'sec-ch-ua-platform': z.string().optional(),
    'sec-fetch-dest': z.string().optional(),
    'sec-fetch-mode': z.string().optional(),
    'sec-fetch-site': z.string().optional(),
    'sec-gpc': z.string().optional(),
    'user-agent': z.string().optional(),
    'x-forwarded-for': z.string().optional(),
    'x-forwarded-host': z.string().optional(),
    'x-forwarded-port': z.string().optional(),
    'x-forwarded-proto': z.string().optional(),
  }),
  cookies: z.object({
    sessionId: z.string().optional(),
    userId: z.string().optional(),
  }),
  geo: z.object({
    city: z.string().optional(),
    country: z.string().optional(),
    region: z.string().optional(),
    latitude: z.string().optional(),
    longitude: z.string().optional(),
  }),
  ip: z.string().optional(),
  banned: z.object({
    isBanned: z.boolean().optional(),
    time: z.date(),
    duration: z.number(),
  }),
});
export const visitor_metadata_t = customJsonb(exampleVisitorInfo);
