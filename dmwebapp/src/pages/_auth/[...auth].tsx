import { useForm, SubmitHandler, FieldErrors, FieldValues } from "react-hook-form"
import MainSection from "@blackstar/lib/_components/main";
import { GetServerSideProps } from "next";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { InputHTMLAttributes } from "react";
import { InputEl } from "@blackstar/lib/_components/form_components";
import { logo } from "@blackstar/lib/globals.config.json"
import { env } from "@blackstar/env";

export const getServerSideProps: GetServerSideProps = async (context) => {

  return {
    props: {}
  }
}

export default function AuthPage() {
  const session = useSession()
  const router = useRouter()
  const [sub_page, sSubPage] = React.useState("login")
  switch (sub_page) {
    case "signout":
      return <SignoutPage {...{ session, router }} />
    case "login":
    default:
      return <LoginPage {...{ session, router }} />

  }

}

type SubPageProps = {
  session: ReturnType<typeof useSession>
  router: ReturnType<typeof useRouter>
}


function LoginPage({ session, router }: SubPageProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resetOptions: {
      keepDirty: true,
      keepDirtyValues: true,
    },

    defaultValues: {
      username: "",
      password: ""
    },
    reValidateMode: "onSubmit",
  })
  const onSubmit = handleSubmit((data) => {
    console.log(data)
    signIn("email", {
      callbackUrl: `${env.NEXTAUTH_URL}/dashboard`
    })

  })
  return <MainSection>
    {/* "handleSubmit" will validate your inputs before invoking "onSubmit"  */}
    <form onSubmit={onSubmit} className="p-2 flex flex-col mx-auto border-2 border-blue-200 w-[450px]">
      <div className="flex justify-center">
        <img src={logo.src} className="h-[3rem]" />
      </div>
      {/* register your input into the hook by invoking the "register" function */}
      <InputEl input_props={{ ...register("username", { min: 3, max: 256, required: true, pattern: /[0-9a-z\.@\-]+$/i }), }} error_message={errors["username"]?.message} />
      <InputEl input_props={{ ...register("password", { min: 3, max: 256, required: true }), type: 'password' }} error_message={errors["password"]?.message} />

      <input type="submit" className="bg-blue-400 hover:bg-black text-white mx-auto px-2 my-2 rounded-md" />
    </form>

  </MainSection>;
}

function SignoutPage({ }: SubPageProps) {
  return <MainSection>

  </MainSection>;
}