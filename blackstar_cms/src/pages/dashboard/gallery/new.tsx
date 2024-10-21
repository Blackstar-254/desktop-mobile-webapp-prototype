import { env } from '@blackstar/env';
import MainSection from '@blackstar/lib/_components/main';
import { getServerAuthSession } from '@blackstar/server/auth';
import type { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import { type NextRouter, useRouter } from 'next/router';
import { zodResolver } from "@hookform/resolvers/zod"
import React, { type DetailedHTMLProps, } from 'react';
import { useCookies } from 'react-cookie';
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';
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

const form_schema = z.object({
    img_name: z.string().min(3, "too short"),
    key_words: z.string().optional(),
    description: z.string().min(12, "too short"),
    alt: z.string().min(3, "too short"),
    file: z.any(),

})

export default function PhotoIdPage() {
    const router = useRouter()
    const session = useSession()
    const cookies = useCookies()
    const [identity, sIdentity] = React.useState<string>()


    const [page_url, sPageUrl] = React.useState<string>()

    const [default_data, sFormData] = React.useState({
        img_name: "",
        key_words: "",
        description: "",
        alt: "",
        file: new File([], ""),
        file_name: ""
    })
    const [auto_focus, sAutoFocus] = React.useState({
        img_name: false,
        key_words: false,
        description: false,
        alt: false,
        file: true,
    })
    const focus_on = (e: keyof typeof auto_focus) => {
        sAutoFocus((curr) => {

            let next = curr
            Object.keys(curr).map((k) => {
                let key = k as unknown as keyof typeof auto_focus
                next[key] = false

            })
            next[e] = true
            return next
        })
    }
    const input_id = {
        img_name: React.useId(),
        key_words: React.useId(),
        description: React.useId(),
        alt: React.useId(),
        file: React.useId(),
    }
    const [keywords_map, sKeywordsMap] = React.useState<Record<string, string>>({})
    const form_object = useForm({
        defaultValues: default_data,
        reValidateMode: 'onSubmit',
        mode: 'onSubmit',
        delayError: 200,
        resolver: zodResolver(form_schema),
    },
    )
    React.useEffect(() => {
        const { query, } = router
        if (query) {
            const uuid = query?.uuid as unknown as string | undefined
            if (uuid) {
                sIdentity(uuid);



            }
        }
    }, [router])
    const [preview, setPreview] = React.useState<string>()
    const [file, sFile] = React.useState<File>()
    const { errors } = form_object.formState

    const form_id = React.useId()

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
        if (res?.success) {
            router.push("/dashboard/gallery")
        }
    })



    return (
        <MainSection
            title={"Add New Photo"}
            heading={'New Photo'}>
            {/* Dashboard */}
            <form {...{
                onSubmit, onChange: (e) => {

                    const target = e.target as EventTarget & { id: string, value?: any }
                    // console.log({ target, id: target?.id, loc: "FormOnChange" })
                    Object.keys(input_id).map((v) => {
                        let key = v as unknown as keyof typeof input_id
                        const val = target?.value
                        if (input_id[key] === target.id) {
                            focus_on(key)



                            sFormData((curr) => {
                                let next = { ...curr };

                                if (key === 'file') {
                                    next.file_name = val
                                } else {
                                    next[key] = val;

                                }


                                return next
                            })

                        }
                    })
                    e.preventDefault()

                },
                id: form_id,

            }} className='p-2 border-2 border-black-800 max-w-[600px]'>
                <div className='flex items-center justify-center p-2 rounded-md bg-bray-200'>
                    <div className='min-w-[300px] min-h-[300px] flex flex-col items-center justify-center bg-gray-200 rounded-md'>

                        <div className={`relative ${preview?.length && preview?.length > 0 ? "" : "hidden"}`}>
                            <div className='p-2 rounded-md m-2 bg-blue-200 transparency-50 hover:bg-blue-500 absolute top-0 right-0'

                                onClick={reset_image(sFile, setPreview, form_object)}
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

                            }

                            , type: "file", accept: "image/*, video/*", className: "hover:bg-blue-200",
                            id: input_id.file,
                            autoFocus: auto_focus.file,


                        }} errors={errors} div_props={{ className: `h-full  w-full ${preview?.length ? "transparency-100" : ""}` }} />
                    </div>
                </div>


                <div className='flex p-2 flex-wrap'> {Object.keys(keywords_map).map((v, i) =>
                (<div key={`keywords:${i}`} className='bg-blue-200 rounded-md px-2 m-2 capitalize flex items-center p-2'><p className='px-2'>{v}</p>
                    <span className='p-2 rounded-md hover:bg-blue-400' onClick={keywords_map_delete(sKeywordsMap, v)}><FaX />
                    </span></div>))}
                </div>
                <FormInput input_props={{
                    ...form_object.register("key_words"),
                    autoFocus: auto_focus.key_words,


                    onKeyUp: (e) => {

                        const target = e?.target as unknown as { value?: string }

                        const key = e?.nativeEvent?.key

                        const val = target?.value

                        if (key !== ' ' && key !== 'Enter') {
                            return
                        }
                        e.stopPropagation()
                        e.preventDefault()
                        if (val?.length) {
                            const words_list = val.split(" ").map((v) => v.trim()).filter(v => v?.length)
                            sKeywordsMap((curr) => {
                                let next: Record<keyof typeof keywords_map, string> = {}

                                words_list.map((val) => {
                                    if (val) {
                                        next[val] = val
                                    }
                                })
                                return next
                            })

                        }
                        target.value = ""


                    }
                    , id: input_id.key_words
                }

                } input_label='Keyword' errors={errors} />

                <FormInput input_props={{
                    ...form_object.register("img_name"), required: true, id:
                        input_id.img_name, autoFocus: auto_focus.img_name,
                }} input_label='Image Name' errors={errors} />
                <FormInput input_props={{
                    ...form_object.register("description"), type: "textarea", id: input_id.description,
                    autoFocus: auto_focus.description,
                }} input_label='Description' errors={errors} />
                <FormInput input_props={{
                    ...form_object.register("alt"), id: input_id.alt, autoFocus: auto_focus.alt,

                }} input_label='Alt text' errors={errors} />

                {Object.keys(errors).map((v, i) => {
                    const err = (errors as unknown as Record<string, { message?: string }>)[v]
                    console.log(err)
                    return (<div key={`error:${i}`} className='flex w-full items-center  border-2 border-red capitalize rounded-md'>
                        <p className='text-red-900'> <span className='px-2 bg-red-200 text-black'>{v === 'img_name' ? "Image Name" : v}</span>  {err?.message} </p>
                    </div>)
                })}
                <div className='flex w-full'>

                    <button className='bg-gray-200 p-2 rounded-md hover:bg-red-200 hover:text-red-600 ' type="reset">Cancel</button>
                    <button className='bg-blue-200 p-2 px-5 rounded-md hover:bg-black hover:text-white ml-auto ' type="submit">Submit</button>
                </div>
            </form>
        </MainSection>
    );
}

const reset_image = <T extends FieldValues = FieldValues>(
    sFile: React.Dispatch<React.SetStateAction<File | undefined>>,
    setPreview: React.Dispatch<React.SetStateAction<string | undefined>>,
    form_object: UseFormReturn<T, any, undefined>
): React.MouseEventHandler<HTMLDivElement> => (e) => {
    e.preventDefault()

    setPreview(undefined)
    sFile(undefined)
    form_object.resetField("file" as unknown as Path<T>)
}

const file_on_change = (sFile: React.Dispatch<React.SetStateAction<File | undefined>>,
    setPreview: React.Dispatch<React.SetStateAction<string | undefined>>,
    router: NextRouter): React.ChangeEventHandler<any> => (e) => {
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


            return e
        }
        const { uuid } = router?.query
        if (!uuid) {
            router.push(`/dashboard/gallery/new?uuid=${crypto.randomUUID()}`)
        }

    }



const keywords_map_delete = (sKeywordsMap: React.Dispatch<React.SetStateAction<Record<string, string>>>,
    v: string): React.MouseEventHandler<HTMLSpanElement> =>
    (e) => {
        e.preventDefault()
        sKeywordsMap((curr) => {
            let next: Record<string, string> = {}
            Object.keys((curr)).filter((k) => k !== v).map((v) => {
                next[v] = v
            })
            return next
        })
    }

interface FormInputProps<T extends HTMLInputElement> {
    input_label?: string
    input_props: React.InputHTMLAttributes<T> & React.TextareaHTMLAttributes<T>
    div_props?: React.AllHTMLAttributes<any>
    errors?: Record<string, { message?: string }>

}

function FormInput<T extends HTMLInputElement>({ input_props, input_label, div_props, errors, }: FormInputProps<T>) {
    const [errors_message, sErrMessage] = React.useState<string>()
    React.useEffect(() => {
        const name = input_props?.name
        if (!name?.length) {
            sErrMessage(undefined)
            return
        }
        const err = errors?.[name]
        if (!err?.message?.length) {
            sErrMessage(undefined)
            return
        }

        sErrMessage(err.message)
    }, [errors])
    const input_class = `bg-gray-200 rounded-md p-2 my-2 w-full ${input_props.className}`
    const InputType = (props: React.InputHTMLAttributes<any>) => {

        switch (input_props.type) {

            case 'textarea':
                return (
                    <textarea {...{
                        ...(input_props as unknown as DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>),
                        rows: 4, cols: 80,
                    }} className={input_class} />

                )
            default:
                return (
                    <input {...{ ...input_props, }} className={input_class} />

                )

        }
    }

    if (div_props) {
        return (
            <>
                <div {...{ ...div_props }} className={`w-full flex items-center ${div_props.className}`}>
                    {input_label && <label htmlFor={input_props.name} className='capitalize w-[150px] mx-2' > {input_label} </label>}
                    <InputType />
                </div>
            </>
        )
    }

    return (
        <>
            <div className="w-full flex items-center">
                {input_label && <label htmlFor={input_props.name} className='capitalize w-[150px] mx-2' > {input_label} </label>}
                <InputType />
            </div>
        </>
    )
}