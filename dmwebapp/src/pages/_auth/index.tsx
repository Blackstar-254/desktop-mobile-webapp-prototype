import { GetServerSideProps } from "next"



export const getServerSideProps: GetServerSideProps = async (context) => {

    return {
        redirect: {
            destination: "/auth/login",
            permanent: true
        }
    }
}

export default function AuthIndex() {

    return <main></main>
}