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
  res = await HandleVisitorCookies(relative_url, request, res);

  return res;
}

type visitor_t = {
  ip: string | undefined;
  geo:
    | {
        city?: string | undefined;
        country?: string | undefined;
        region?: string | undefined;
        latitude?: string | undefined;
        longitude?: string | undefined;
      }
    | undefined;
  cookies: RequestCookies;
  headers: Record<string, string>;
  ua: ReturnType<typeof userAgent>;
};

type CookieResInputT = {
  visitor: visitor_t;
  state?: 'update' | 'new';
  visitor_id?: string;
};

const get_cookie_res = ({ visitor, state, visitor_id }: CookieResInputT) => {
  const headers = new Headers();
  headers.append('client-id', env.CLIENT_ID ?? crypto.randomUUID());
  headers.append('visitor-id', visitor_id ?? '');

  return fetch(`${env.NEXT_PUBLIC_BLACKSTARTECH_CMS_URL}/visitors`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      state,
      visitor,
      visitor_id,
    }),
  }).then(async (v) => {
    const d = await v.json();

    return d as unknown as { new_cookie?: ResponseCookie; success: boolean };
  });
};
async function HandleVisitorCookies(
  relative_url: string,
  req: NextRequest,
  res: NextResponse,
): Promise<NextResponse> {
  if (relative_url.endsWith('/Home')) {
    return res;
  }
  console.log('here');

  const { ip, geo, cookies, headers } = req;

  const ua = userAgent(req);
  const sj = new SuperJSON({ dedupe: false });
  const data = sj.serialize({ ua, headers, cookies, geo });
  const dara_2 = data.json?.toString();
  console.log(data);
  console.log(JSON.stringify(data, null, 2));
  return res;
}
