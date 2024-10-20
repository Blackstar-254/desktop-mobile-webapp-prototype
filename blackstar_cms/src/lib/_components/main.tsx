import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { ParseReturnType } from 'zod';

import { logo } from "@blackstar/lib/globals.config.json"
import { MetaType } from '../utils/page_header_meta';



type MainProps = {
  secure?: {
    isSecured: boolean;
    fallBack?: string;
    next?: boolean;
  };

  children?: React.ReactNode;
  title?: string;
  heading?: string;
  meta?: MetaType[];
};

export type ScreenWidthType = 'mobile' | 'tablet' | 'laptop' | 'desktop' | '';
function setCookie(name: string, value: string, days = 365) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/`;
}
const getScreenWidth = () => {
  const [screenWidth, sScreenWidth] = React.useState<ScreenWidthType>('');
  const setScreenWidth = (newScreenWidth: ScreenWidthType) =>
    sScreenWidth((_curr) => {
      console.log(`new screenwidth: ${newScreenWidth}`);
      setCookie('device-type', newScreenWidth);
      return newScreenWidth;
    });
  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const w = window.screen.availWidth;
    const h = window.screen.availHeight;
    if (h > w) {
      if (h / 2 > w) {
        setScreenWidth('mobile');

        return;
      }
      setScreenWidth('tablet');
      return;
    }
    if (w > h) {
      if (w / 2 > h) {
        setScreenWidth('desktop');
        return;
      }

      setScreenWidth('laptop');
      return;
    }
  }, []);

  return {
    screenWidth,
  };
};

type SessionType = ReturnType<typeof useSession>;

export default function MainSection({
  children,
  title,
  secure,
  heading,
  meta,
}: MainProps) {
  const session = useSession();
  const { screenWidth } = getScreenWidth();
  const router = useRouter();

  React.useEffect(() => {
    if (!secure || session.status === 'loading') {
      return;
    }

    const fallBack = secure.fallBack ?? '/auth/login';
    if (session.status === 'unauthenticated') {
      if (secure.next) {
        router.push(
          `${secure.fallBack}${fallBack.includes('?') ? '&' : '?'}next=${encodeURI(router.asPath)}`,
        );
        return;
      }

      router.push(fallBack);
      return;
    }
  }, [session]);

  const HtmlHead = () => (
    <Head>
      <link rel="icon" href={logo.src} />

      <title>{title}</title>
      {meta?.map((props, i) => (
        <meta {...props} key={`meta_key_${i.toString().padStart(3, "0")}`} />
      ))}
    </Head>
  );
  if ((secure && session.status === 'loading') || screenWidth === '') {
    return (
      <>
        <HtmlHead />
        <LoadingSection />
      </>
    );
  }


  // we are unlikely to reach here
  return (
    <>
      <HtmlHead />
      <DesktopMainSection {...{ session, heading }}>
        {children}
      </DesktopMainSection>
    </>
  );
}

type CommonMainProps = {
  children?: React.ReactNode;
  session?: SessionType;
  heading?: string;
}

type DesktopMainProps = {

} & CommonMainProps;

const CommonCss = {
  MainSection: 'min-h-screen overflow-x-clip',
  MainDiv: ' flex h-[calc(100vh-3rem)] overflow-y-auto',
  Header: '',
  Nav: 'h-[3rem] text-black flex items-center h-full w-full',
  auth_button: "bg-blue-400 hover:bg-black text-white text-bold capitalize px-2 rounded-md"
};


type SideBarLinkType = {
  href: string
  label: string
}

const side_bar_links: SideBarLinkType[] = [
  { href: "/dashboard", label: "dashboard" },
  { href: "/dashboard/gallery", label: "gallery" },
  { href: "/dashboard/blog", label: "blog" },
  { href: "/dashboard/contact-forms", label: "contact forms" },
  { href: "/dashboard/billing", label: "billing" },
  { href: "/dashboard/profile", label: "Profile" }
]

export function DesktopMainSection({ children, heading, session }: DesktopMainProps) {

  return (
    <main className={`${CommonCss.MainSection}`}>
      <DesktopNavbarSection {...{ heading: heading ?? '', session }} />
      <div className={`${CommonCss.MainDiv}`}>
        <div className='w-[250px] bg-slate-200'>
          {
            side_bar_links.map((v) => {
              return (
                <a href={v.href} key={`link:${v.href}`} className='hover:bg-blue-200'>
                  <div className='flex items-center m-2 rounded-md justify-center capitalize text-lg bg-white hover:bg-blue-200 hover:text-white'>
                    {v.label}
                  </div>
                </a>
              )
            })
          }
        </div>
        <div className='w-full p-2'><h1 className="text-bold text-[3rem]">{heading}</h1>
          {children}</div>
      </div>
    </main>
  );
}

export function DesktopMainNoSessionSection({ children, heading, }: DesktopMainProps) {

  return (
    <main className={`${CommonCss.MainSection}`}>
      <DesktopNavbarSection {...{ heading: heading ?? '' }} />
      <div className={`${CommonCss.MainDiv}`}>

        <div className='w-full p-2'><h1 className="text-bold text-[3rem]">{heading}</h1>
          {children}</div>

      </div>
    </main>
  );
}

type MobileMainProps = {

} & CommonMainProps;

export function MobileMainSection({ children, heading }: MobileMainProps) {
  return (
    <main className={`${CommonCss.MainSection}`}>
      <MobileNavbarSection {...{ heading: heading ?? '' }} />
      <div className={`${CommonCss.MainDiv}`}>
        <h1 className="text-bold text-[2rem]">{heading}</h1>
        {children}
      </div>
    </main>
  );
}

export function LoadingSection({ children, }: { children?: React.ReactNode, }) {


  return (
    <>
      <div className="w-screen min-h-[80vh] flex items-center justify-center">
        <div>Loading </div>
      </div>
    </>
  );
}

type CommonNavbarProps = {
  children?: React.ReactNode;
  session?: SessionType;
  heading: string;
};

type DesktopNavbarSectionProps = {} & CommonNavbarProps;

export function DesktopNavbarSection({ children, session }: DesktopNavbarSectionProps) {
  const [session_data, sSessionData] = React.useState({
    domain_name: session?.data?.org?.domain_name,
    user_name: session?.data?.user?.name
  })

  return (
    <header className={`${CommonCss.Header}`}>
      <nav className={`${CommonCss.Nav}`}>
        <div className='flex px-2'>
          <img src={logo.src} alt={logo.alt} className='h-[3rem]' />
        </div>
        {children}
        <div className='flex w-full items-center  '>
          {session_data.domain_name}
        </div>
        <div className='flex flex-reverse ml-auto px-2 shrink-0'>

          <div className='p-2'>
            {session_data.user_name}
          </div>
          {session?.status === 'authenticated' ?
            <button className={CommonCss.auth_button} type="button" onClick={() => signOut()}>Sign Out</button> :
            <button className={CommonCss.auth_button} type="button" onClick={() => signIn("email")}>Sign In</button>
          }
        </div>
      </nav>
    </header>
  );
}

type MobileNavbarSectionProps = {} & CommonNavbarProps;

export function MobileNavbarSection({ children, session }: MobileNavbarSectionProps) {

  return (
    <header className={`${CommonCss.Header}`}>
      <nav className={`${CommonCss.Nav}`}>
        <div className='flex px-2'>
          <img src={logo.src} alt={logo.alt} className='h-[3rem]' />
        </div>
        {children}
        <div className='flex flex-reverse ml-auto px-2'>
          {session?.status === 'authenticated' ?
            <button className={CommonCss.auth_button} type="button" onClick={() => signOut()}>Sign Out</button> :
            <button className={CommonCss.auth_button} type="button" onClick={() => signIn("email")}>Sign In</button>
          }
        </div>
      </nav>
    </header>
  );
}
