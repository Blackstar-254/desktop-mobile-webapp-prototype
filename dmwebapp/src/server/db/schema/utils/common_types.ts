import { customJsonb } from './custom_json_type';
import { userAgent } from 'next/server';

export type visit_info_t = {
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
};

export const exampleVisitorInfo: visit_info_t = {
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
};

export const visitor_metadata_t = customJsonb(exampleVisitorInfo);
