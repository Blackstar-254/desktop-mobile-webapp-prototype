import { env } from '@blackstar/env';
import MainSection from '@blackstar/lib/_components/main';
import { getServerAuthSession } from '@blackstar/server/auth';
import type { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { zodResolver } from "@hookform/resolvers/zod"
import React from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { FaX } from "react-icons/fa6";
import { z } from 'zod';


export const getServerSide: GetServerSideProps = async (ctx) => {
    const cookies = ctx.req.cookies
    const session = cookies["next-auth.session-token"]
    if (!session) {
        return {
            redirect: {
                destination: "/auth/login",
                permanent: true
            }
        }
    }


    return {
        props: {
            client_id: env.CLIENT_ID,
            visitor_id: cookies['visitor-id']
        }
    }
}

export default function PhotoIdPage({ client_id, visitor_id }: { client_id: string, visitor_id: string }) {
    const router = useRouter()
    const session = useSession()
    const cookies = useCookies()
    const [identity, sIdentity] = React.useState<string>()
    React.useEffect(() => {
        const { query } = router
        if (query) {
            const uuid = query?.uuid as unknown as string | undefined
            if (uuid) {
                sIdentity(uuid)
            } else {

            }
        }
    }, [router])

    const form_schema = z.object({
        img_name: z.string().min(3, "too short"),
        key_words: z.string().optional(),
        description: z.string().min(12, "too short"),
        alt: z.string().min(3, "too short"),
        file: z.any(),

    })
    const [default_data, sFormData] = React.useState({
        img_name: "",
        key_words: "",
        description: "",
        alt: "",
        file: new File([], ""),
    })
    const [keywords_map, sKeywordsMap] = React.useState<Record<string, string>>({})
    const form_object = useForm({
        defaultValues: default_data,
        delayError: 200,
        resolver: zodResolver(form_schema),
    },
    )

    const [preview, setPreview] = React.useState<string>()
    const [file, sFile] = React.useState<File>()

    const { errors } = form_object.formState

    const onSubmit = form_object.handleSubmit(async (data) => {
        const id_data = await fetch("/api/cms/client-id").then((res) => res.json())
        const sess = session?.data
        const file_data = (await file?.arrayBuffer())?.slice(0)
        if (!file_data || !sess) {
            if (!file_data) {
                alert("please choose a file to upload")
            }
            if (!sess) {
                console.log({ sess, cookies })
            }
            return
        }
        let hex = Buffer.from(file_data).toString('hex')
        const request = {
            ...default_data,
            ...data,
            keywords: [data.key_words, ...Object.keys(keywords_map)],
            uuid: identity,
            file_data: hex,
        }




        const res = await fetch(`${env.NEXT_PUBLIC_BLACKSTARTECH_CMS_URL}/api/cms/gallery`, {
            headers: {
                'client-id': id_data?.ClientId ?? "",
                'visitor-id': id_data?.VisitorId ?? "",
            },
            method: 'POST',
            body: JSON.stringify(request)
        }).then((res) => res.json())

        console.log({ res })
    })


    return (
        <MainSection
            title={"Add New Photo"}
            heading={'New Photo'}>
            {/* Dashboard */}
            <form {...{ onSubmit }} className='p-2 border-2 border-black-800 max-w-[600px]'>
                <div className='flex items-center justify-center p-2 rounded-md bg-bray-200'>
                    <div className='min-w-[300px] min-h-[300px] flex items-center justify-center bg-gray-200 rounded-md'>
                        {
                        }
                        <div className={`relative ${preview?.length && preview?.length > 0 ? "" : "hidden"}`}>
                            <div className='p-2 rounded-md m-2 bg-blue-200 transparency-50 hover:bg-blue-500 absolute top-0 right-0'

                                onClick={(e) => {
                                    e.preventDefault()

                                    setPreview(undefined)
                                    sFile(undefined)
                                    form_object.resetField("file")
                                }}
                            > <FaX /> </div>
                            <img src={preview} alt="image preview" className="" />

                        </div>

                        <FormInput input_props={{
                            ...form_object.register("file"),
                            onChange: (e) => {
                                const val = e?.target?.value as unknown as string | undefined
                                // console.log({ target: e?.target })
                                if (val) {
                                    console.log({ val })
                                    sFile((__) => {

                                        const nw_file = e?.target?.files?.[0]
                                        if (nw_file) {
                                            const objectUrl = URL.createObjectURL(nw_file)
                                            setPreview(objectUrl)
                                        }

                                        return nw_file
                                    })


                                }
                                const { uuid } = router?.query
                                if (!uuid) {
                                    router.push(`/dashboard/gallery/new?uuid=${crypto.randomUUID()}`)
                                }

                            }, type: "file", accept: "image/*, video/*", className: "w-full h-full", required: true,
                        }} div_props={{ className: `h-full w-full ${preview?.length ? "hidden" : ""}` }} />
                    </div>
                </div>


                <div className='flex p-2 flex-wrap'> {Object.keys(keywords_map).map((v, i) =>
                (<div key={`keywords:${i}`} className='bg-blue-200 rounded-md px-2 m-2 capitalize flex items-center p-2'><p className='px-2'>{v}</p>
                    <span className='p-2 rounded-md hover:bg-blue-400' onClick={(e) => {
                        e.preventDefault()
                        sKeywordsMap((curr) => {
                            let next: Record<string, string> = {}
                            Object.keys((curr)).filter((k) => k !== v).map((v) => {
                                next[v] = v
                            })
                            return next
                        })
                    }}><FaX />
                    </span></div>))}
                </div>
                <FormInput input_props={{
                    ...form_object.register("key_words"),
                    onKeyDown: (e) => {
                        const key = e?.nativeEvent?.key
                        if (key === 'Enter') {
                            e.preventDefault()
                        }
                    },
                    onKeyUp: (e) => {
                        const target = e?.target as unknown as { value?: string }
                        const key = e?.nativeEvent?.key
                        // console.log({ key, e })
                        const val = target?.value
                        switch (key) {

                            case 'Enter': {
                                e.preventDefault()
                            } break
                        }
                        if (val) {
                            sKeywordsMap((curr) => {

                                let next = { ...curr }
                                const update = () => val.split(" ").map((v) => v.trim()).filter(v => v?.length).map((val) => {
                                    if (val) {
                                        next[val] = val
                                    }
                                })

                                switch (key) {
                                    case ' ':
                                        update()
                                        break
                                    case 'Enter': {
                                        update()

                                        target.value = ""
                                        e.preventDefault()
                                    } break
                                }


                                return next
                            })
                        }


                    }

                }} input_label='Keyword' errors={errors} />
                <FormInput input_props={form_object.register("img_name")} input_label='Image Name' errors={errors} />
                <FormInput input_props={{ ...form_object.register("description"), className: "min-h-[100px]", type: "textarea" }} input_label='Description' errors={errors} />
                <FormInput input_props={form_object.register("alt")} input_label='Alt text' errors={errors} />


                <button className='bg-blue-200 p-2 rounded-md hover:bg-black hover:text-white' type="submit">Submit</button>
            </form>
        </MainSection>
    );
}

interface FornInputProps {
    input_label?: string
    input_props: React.InputHTMLAttributes<any>
    div_props?: React.AllHTMLAttributes<any>
    errors?: Record<string, { message?: string }>

}

function FormInput({ input_props, input_label, div_props, errors }: FornInputProps) {
    const [errors_message, sErrMessage] = React.useState("")
    React.useEffect(() => {
        const err_message = errors?.[input_props?.name ?? ""]?.message
        if (!err_message?.length) {
            return
        }
        sErrMessage(err_message)
    }, [errors])
    if (div_props) {
        return (
            <>
                <div {...{ ...div_props }} className={`w-full flex items-center ${div_props.className}`}>
                    {input_label && <label htmlFor={input_props.name} className='capitalize w-[150px] mx-2' > {input_label} </label>}
                    <input {...{ ...input_props }} className='bg-gray-200 rounded-md p-2 my-2 w-full' />

                </div>
                <div><p>{errors_message}</p></div>
            </>
        )
    }

    return (
        <div className="w-full flex items-center">
            {input_label && <label htmlFor={input_props.name} className='capitalize w-[150px] mx-2' > {input_label} </label>}
            <input {...{ ...input_props }} className='bg-gray-200 rounded-md p-2 my-2 w-full' />
        </div>
    )
}