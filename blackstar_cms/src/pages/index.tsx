import MainSection from "@blackstar/lib/_components/main";
import { GetServerSideProps } from "next";


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: {}
    }

}


export default function HomePage() {


    return (
        <MainSection title="blackstar_cms">
            Home Page
        </MainSection>
    )
}