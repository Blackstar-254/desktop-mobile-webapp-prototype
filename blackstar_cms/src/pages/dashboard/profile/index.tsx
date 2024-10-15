import MainSection from "@blackstar/lib/_components/main";
import { GetServerSideProps } from "next";


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: {}
    }

}


export default function ProfilePage() {


    return <MainSection title="Profile">
        Profile
    </MainSection>
}