import { useSession } from "next-auth/react"
import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"
import { ParseReturnType } from "zod"

type MetaType = {
    property: string
    content: string
    key: string
}

type MainProps = {
    secure?: {
        isSecured: boolean
        fallBack?: string
        next?: boolean
    },
    children?: React.ReactNode
    title?: string
    heading?: string
    meta?: MetaType[]
}

export type ScreenWidthType = "mobile" | "tablet" | "laptop" | "desktop" | ""
function setCookie(name: string, value: string, days: number = 365) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
const getScreenWidth = () => {

    const [screenWidth, sScreenWidth] = React.useState<ScreenWidthType>("")
    const setScreenWidth = (newScreenWidth: ScreenWidthType) => sScreenWidth((curr) => {
        console.log(`new screenwidth: ${newScreenWidth}`)
        setCookie("device-type", newScreenWidth)
        return newScreenWidth
    })
    React.useEffect(() => {
        if (typeof window === 'undefined') {
            return
        }

        const w = window.screen.availWidth
        const h = window.screen.availHeight
        if (h > w) {
            if (h / 2 > w) {
                setScreenWidth("mobile")

                return
            }
            setScreenWidth("tablet")
            return
        }
        if (w > h) {
            if (w / 2 > h) {
                setScreenWidth("desktop")
                return
            }

            setScreenWidth("laptop")
            return
        }

    }, [])

    return {
        screenWidth
    }
}

type SessionType = ReturnType<typeof useSession>

export default function MainSection({ children, title, secure, heading, meta }: MainProps) {

    const session = useSession()
    const { screenWidth } = getScreenWidth()
    const router = useRouter()


    React.useEffect(() => {
        if (!secure || session.status === 'loading') {
            return
        }

        const fallBack = secure.fallBack ?? "/auth/login"
        if (session.status === 'unauthenticated') {
            if (secure.next) {
                router.push(`${secure.fallBack}${fallBack.includes("?") ? "&" : "?"}next=${encodeURI(router.asPath)}`)
                return
            }

            router.push(fallBack)
            return
        }
    }, [session])

    const HtmlHead = () => (
        <Head>
            <title>{title}</title>
            {meta?.map((props) => <meta {...props} />)}
        </Head>
    )
    if ((secure && session.status === 'loading') || screenWidth === "") {

        return <>
            <HtmlHead />
            <LoadingSection />
        </>
    }

    switch (screenWidth) {
        case "mobile":
        case "tablet":
            return (
                <>
                    <HtmlHead />
                    <MobileMainSection {...{ session, heading }}>
                        {children}
                    </MobileMainSection>
                </>
            )

        case "laptop":
        case "desktop":
            return (
                <>
                    <HtmlHead />
                    <DesktopMainSection {...{ session, heading }}>
                        {children}
                    </DesktopMainSection>
                </>
            )
    }

    // we are unlikely to reach here
    return <>
        <HtmlHead />
        <main> {children} </main>
    </>
}


type DesktopMainProps = {
    children?: React.ReactNode
    session?: SessionType
    heading?: string
}

const CommonCss = {
    MainSection: `w-screen min-h-screen overflow-x-clip`,
    MainDiv: `w-full h-full p-2`,
    Header: ``,
    Nav: `min-h-[3rem] text-black flex items-center h-full w-full`,
}

export function DesktopMainSection({ children, heading }: DesktopMainProps) {


    return <main className={`${CommonCss.MainSection}`}>
        <DesktopNavbarSection {...{ heading: heading ?? "" }} />
        <div className={`${CommonCss.MainDiv}`}>
            <h1 className="text-bold text-[3rem]">{heading}</h1>
            {children}
        </div>
    </main>
}


type MobileMainProps = {
    children?: React.ReactNode
    session?: SessionType
    heading?: string
}

export function MobileMainSection({ children, heading }: MobileMainProps) {


    return <main className={`${CommonCss.MainSection}`}>
        <MobileNavbarSection {...{ heading: heading ?? "" }} />
        <div className={`${CommonCss.MainDiv}`}>
            <h1 className="text-bold text-[2rem]">{heading}</h1>
            {children}
        </div>
    </main>
}


export function LoadingSection({ children }: { children?: React.ReactNode }) {


    return <>
        <div className="min-width-[100%] min-h-[80vh] flex items-center">
            <div>Loading</div>
        </div>
    </>
}

type CommonNavbarProps = {
    children?: React.ReactNode
    session?: SessionType
    heading: string

}

type DesktopNavbarSectionProps = {

} & CommonNavbarProps

export function DesktopNavbarSection({ children, }: DesktopNavbarSectionProps) {

    return <header className={`${CommonCss.Header}`}>
        <nav className={`${CommonCss.Nav}`}>
            <div>
                <img src="/logo.png" />
            </div>
            {children}
        </nav>
    </header>
}


type MobileNavbarSectionProps = {

} & CommonNavbarProps

export function MobileNavbarSection({ children }: MobileNavbarSectionProps) {

    return <header className={`${CommonCss.Header}`}>
        <nav className={`${CommonCss.Nav}`}>

            {children}
        </nav>
    </header>
}