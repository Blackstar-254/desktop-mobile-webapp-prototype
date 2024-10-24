
import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { z } from "zod";

export type InputElProps = {
    error_message?: string
    description?: string
    input_props: Record<string, any> & { name: string } & Partial<InputHTMLAttributes<any>>

}

export function InputEl({ error_message, input_props, description }: InputElProps) {

    return (
        <div className="mb-2 mx-2">

            {/* include validation with required or other standard HTML validation rules */}
            <div className="">
                <p className="text-xl capitalize">{input_props.name}</p>
                <input {...{ ...input_props, className: "rounded-md border-2 border-blue-200 p-2 w-full" }} />
            </div>
            {(description && true) && <span className="text-blue px-2 ml-1">{description}</span>}
            {/* errors will return when field validation fails  */}
            {(error_message && true) && <span className="text-red">{error_message}</span>}
        </div>
    )
}

interface FormInputProps<T extends HTMLInputElement> {
    input_label?: string
    input_props: React.InputHTMLAttributes<T> & React.TextareaHTMLAttributes<T>
    div_props?: React.AllHTMLAttributes<any>
    errors?: Record<string, { message?: string }>
    description?: string

}


export function FormInput<T extends HTMLInputElement>({ input_props, input_label, div_props, errors, description }: FormInputProps<T>) {
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
            <div>
                <div {...{ ...div_props }} className={`w-full flex items-center ${div_props.className}`}>
                    {input_label && <label htmlFor={input_props.name} className='capitalize w-[150px] mx-2' > {input_label} </label>}
                    <InputType />
                </div>
                {(description) && <span className="text-blue px-2 ml-auto">{description}</span>}
            </div>
        )
    }

    return (
        <div>
            <div className="w-full flex items-center">
                {input_label && <label htmlFor={input_props.name} className='capitalize w-[150px] mx-2' > {input_label} </label>}
                <InputType />
            </div>
            {(description) && <span className="text-blue px-2 ml-auto">{description}</span>}
        </div>
    )
}

