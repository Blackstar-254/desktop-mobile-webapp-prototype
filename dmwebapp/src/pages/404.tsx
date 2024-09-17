import MainSection from '@blackstar/lib/_components/main';
import fs from "fs"
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'


type PageProps = {}

export const getServerSideProps: GetServerSideProps<PageProps> = (async () => {

    const fl = fs.readDirSync("./public/error-message-images", { withFileTypes: true })


    return {
        props: {}
    }

});

export default function ErrorPage404({ }: PageProps) {


    return <MainSection></MainSection>
}