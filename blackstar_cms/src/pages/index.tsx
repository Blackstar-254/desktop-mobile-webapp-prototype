import MainSection from "@blackstar/lib/_components/main";
import { getServerAuthSession } from "@blackstar/server/auth";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import React from "react";


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getServerAuthSession(ctx)
    if (session) {
        return {
            redirect: {
                destination: "/dashboard",
                permanent: true
            }
        }
    }
    return {
        props: {}
    }

}


export default function HomePage() {
    const session = useSession()




    return (
        <MainSection title="blackstar_cms">
            Home Page
            <div className="mx-auto w-full p-[3rem]">
                <a href={"/dashboard"} className="bg-blue-400 hover:bg-black p-2 rounded-md text-white ">
                    Dashboard
                </a>

            </div>
        </MainSection>
    )
}