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

  const session_token = request.cookies.has('next-auth.session-token');
  if (!session_token) {
    for (const protected_subroute of ['dashboard']) {
      if (nextUrl.pathname.includes(protected_subroute)) {
        return NextResponse.redirect(`${base}/api/auth/signin`);
      }
    }
  }
  let res = NextResponse.next();
  HandleVisitorCookies(request, res);

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
  const { ip, geo, cookies, headers, url } = req;
  const ua = userAgent(req);
  if (!ua?.browser?.name) {
    return;
  }
  const lower_case_url = url.toLowerCase();

  for (const skip_route of ['_next', 'dashboard', 'images', 'assets', 'api']) {
    if (lower_case_url.includes(skip_route)) {
      return;
    }
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
    target.headers[key] = val;
  });
  cookies.getAll().map(({ name, value }) => {
    target.cookies[name] = value;
  });

  const data = JSON.stringify(target);
  fetch(`${env.NEXTAUTH_URL}/api/cms/visitors`, {
    method: 'POST',
    body: data,
  });

  return;
}
