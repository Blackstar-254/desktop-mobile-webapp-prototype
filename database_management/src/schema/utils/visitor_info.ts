import { customJsonb } from './custom_json_type';
import { NextResponse, userAgent } from 'next/server';
import { NextRequest } from 'next/server';

import {
  RequestCookies,
  ResponseCookie,
} from 'next/dist/compiled/@edge-runtime/cookies';

export type VisitorInfoType = {
  ip_address: string;
  last_visit: Date;
  visitor_cookie: string;
  ip: string | undefined;
  geo: {
    city?: string | undefined;
    country?: string | undefined;
    region?: string | undefined;
    latitude?: string | undefined;
    longitude?: string | undefined;
  };

  cookies: RequestCookies;
  headers: Record<string, string>;
  ua: ReturnType<typeof userAgent>;
  banned: {
    isBanned: boolean;
    time: Date;
    duration: number;
  };
};

export const exampleVisitorInfo: VisitorInfoType = {
  ip_address: '',
  last_visit: new Date(),
  visitor_cookie: '',
  banned: {
    isBanned: false,
    time: new Date(),
    duration: 0,
  },
  ip: '',
  geo: {
    city: '',
    country: '',
    region: '',
    latitude: '',
    longitude: '',
  },

  cookies: new RequestCookies(new Headers()),
  headers: {},
  ua: userAgent({ headers: new Headers() }),
};

export const visitor_info_t = customJsonb<VisitorInfoType>(exampleVisitorInfo);
