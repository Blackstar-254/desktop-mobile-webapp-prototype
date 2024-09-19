import { NextResponse, userAgent } from 'next/server';
import { NextRequest } from 'next/server';
import reroutes from '@blackstar/lib/utils/reroutes.json';
import { env } from './env';
import {
  RequestCookies,
  ResponseCookie,
} from 'next/dist/compiled/@edge-runtime/cookies';
import SuperJSON from 'superjson';

const valid_common_files = [
  'blackstar.js',
  'favicon.ico',
  'fonts.css',
  'jquery.js',
  'nicepage.js',
  'nicepage.css',
];

const skip_reroutes: string[] = ['api', '_next', 'static'];
export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const { pathname: relative_url } = nextUrl;
  // Log the current request pathname
  const base = `${nextUrl.protocol}${nextUrl.host}`;

  if (!skip_reroutes.filter((sub) => relative_url.startsWith(sub))?.length) {
    for (const { source, destination } of reroutes.redirects) {
      const source_matches_relative_url = source.startsWith(relative_url);
      if (source === destination && source_matches_relative_url) {
        break;
      }
      if (source_matches_relative_url) {
        if (false)
          console.log({
            loc: 'middleware.ts',
            action: 'redirect',
            source,
            destination,
            relative_url,
          });
        return NextResponse.rewrite(`${base}/${destination}`);
      }
    }
  }

  let res = NextResponse.next();
  HandleVisitorCookies(request, res);

  console.log(res.cookies.get('test'));
  return res;
}

type visit_info_t = {
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

async function HandleVisitorCookies(req: NextRequest, res: NextResponse) {
  const { ip, geo, cookies, headers } = req;
  const ua = userAgent(req);
  if (!ua?.browser?.name) {
    return;
  }

  const target: visit_info_t = {
    ua,
    headers: {},
    cookies: {},
    geo: {
      city: geo?.city ?? '',
      country: geo?.country ?? '',
      region: geo?.region ?? '',
      latitude: geo?.latitude ?? '',
      longitude: geo?.longitude ?? '',
    },
    ip: ip ?? '',
  };

  if (!cookies.has('visitor-id')) {
    const test_val = crypto.randomUUID();
    res.cookies.set('visitor-id', test_val);
    target.cookies['visitor-id'] = test_val;
  }
  headers.forEach((val, key, parent) => {
    // console.log({ key, val });
    target.headers[key] = val;
  });
  cookies.getAll().map(({ name, value }) => {
    target.cookies[name] = value;
  });

  const data = JSON.stringify(target);
  fetch(`${env.NEXT_PUBLIC_BLACKSTARTECH_CMS_URL}/visitors`, {
    method: 'POST',
    body: data,
  });
  // console.log(data);

  return;
}
